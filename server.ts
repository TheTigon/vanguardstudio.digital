import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// XSS / HTML Sanitization helper (Pure stateless transformation)
function sanitizeInput(input: any): any {
  if (typeof input === 'string') {
    return input
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .trim();
  }
  if (Array.isArray(input)) {
    return input.map(sanitizeInput);
  }
  if (input !== null && typeof input === 'object') {
    const sanitizedObj: Record<string, any> = {};
    for (const key of Object.keys(input)) {
      sanitizedObj[key] = sanitizeInput(input[key]);
    }
    return sanitizedObj;
  }
  return input;
}

// Cloudflare Worker-compatible Stateless Resend Dispatcher (matches src/index.js)
async function dispatchWithEnv(
  env: { RESEND_API_KEY?: string },
  payload: {
    packageType: string;
    name: string;
    email: string;
    phone?: string;
    message?: string;
  }
): Promise<{ delivered: boolean; status: number; error?: string }> {
  const { packageType, name, email, phone, message } = payload;
  const resendKey = env.RESEND_API_KEY;
  if (!resendKey || resendKey === 're_YOUR_RESEND_API_KEY') {
    return {
      delivered: false,
      status: 500,
      error: 'Sunucu yapılandırma hatası: RESEND_API_KEY çevre değişkeni bu ortamda tanımlanmamış.',
    };
  }

  // Doğru API Uç Noktası: https://api.resend.com/emails
  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: "VanGuard Sistem <sistem@vanguardstudio.digital>",
      to: "info@vanguardstudio.digital",
      reply_to: email,
      subject: `[B2B Proje Başvurusu] ${packageType?.toUpperCase()} - ${name}`,
      html: `
      <div style="font-family: sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #00e676;">Yeni Proje Talebi (Zero-DB)</h2>
        <p><strong>Paket Seçimi:</strong> ${packageType}</p>
        <hr style="border: 1px solid #eee;" />
        <p><strong>Müşteri Ad Soyad:</strong> ${name}</p>
        <p><strong>E-posta Adresi:</strong> ${email}</p>
        <p><strong>İletişim Telefonu:</strong> ${phone || "Belirtilmedi"}</p>
        <p style="background: #f9f9f9; padding: 15px; border-left: 4px solid #00e676;">
          <strong>Proje Notları / Mesaj:</strong><br/>
          ${message || "Mesaj bırakılmadı."}
        </p>
      </div>
    `
    })
  });

  if (!resendResponse.ok) {
    const errData = await resendResponse.json().catch(() => ({} as any));
    console.warn('Resend API status:', resendResponse.status, errData);
    return {
      delivered: false,
      status: resendResponse.status,
      error: errData?.message || `E-posta servisi hatası (Kod: ${resendResponse.status}).`,
    };
  }

  return { delivered: true, status: 200 };
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '256kb' }));

  // Pass Cloudflare-compatible `env` object into route handlers
  const workerEnv = {
    get RESEND_API_KEY() {
      return process.env['RESEND_API_KEY'];
    },
  };

  app.use('/api', (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
      return res.status(204).end();
    }
    next();
  });

  // Unified Project & Contact Application (Stateless Resend-Only, ZERO DB)
  app.post(['/api/apply', '/api/nexus/apply'], async (req, res) => {
    try {
      const sanitized = sanitizeInput(req.body || {});
      const name = sanitized.name || sanitized.fullName || '';
      const email = sanitized.email || '';
      const packageType =
        sanitized.packageType ||
        sanitized.preferredService ||
        sanitized.budgetRange ||
        'Genel Kurumsal Başvuru';
      const phone =
        sanitized.phone ||
        sanitized.companyAndSector ||
        sanitized.companyCountrySector ||
        'Belirtilmedi';
      const message =
        sanitized.message ||
        (sanitized.processAndVolume
          ? `Süreç & Hacim: ${sanitized.processAndVolume} | Süreç Sahibi: ${sanitized.processOwner || 'Belirtilmedi'} | Bütçe: ${sanitized.budgetRange || 'Belirtilmedi'}`
          : 'Mesaj bırakılmadı.');

      if (!name || !email) {
        return res.status(400).json({
          status: 'error',
          success: false,
          error: 'Lütfen zorunlu alanları (Ad Soyad ve E-posta) doldurun.',
        });
      }

      const result = await dispatchWithEnv(workerEnv, {
        packageType,
        name,
        email,
        phone,
        message,
      });

      if (!result.delivered) {
        return res.status(result.status || 500).json({
          status: 'error',
          success: false,
          error: result.error || 'E-posta iletimi sırasında bir hata oluştu.',
        });
      }

      return res.status(200).json({
        status: 'success',
        success: true,
        message: 'Başvuru Talebiniz Alınmıştır',
      });
    } catch (err) {
      console.error('Stateless Resend /api/apply error:', err);
      return res.status(500).json({
        status: 'error',
        success: false,
        error: 'İletim sırasında teknik bir hata oluştu. Lütfen tekrar deneyin.',
      });
    }
  });

  // Vite middleware for development
  const isProduction = process.env.NODE_ENV === 'production';
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Sunucu http://localhost:${port} adresinde çalışıyor (Stateless Resend-Only Modu).`);
  });
}

startServer();
