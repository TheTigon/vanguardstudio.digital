/**
 * VanGuard Studio Digital — Stateless Resend-Only Cloudflare Worker (src/index.js)
 * Zero-DB: Hiçbir veritabanı (D1/SQL) bağlantısı içermez.
 */

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Content-Type": "application/json; charset=utf-8"
};

export default {
  async fetch(request, env, ctx) {
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    if (request.method !== "POST") {
      return new Response(
        JSON.stringify({ status: "error", success: false, error: "Method Not Allowed" }),
        { status: 405, headers: CORS_HEADERS }
      );
    }

    try {
      const body = await request.json();

      const name = body.name || body.fullName || "İsimsiz Müşteri";
      const email = body.email || "Belirtilmedi";
      const phone = body.phone || body.companyAndSector || body.companyCountrySector || "Belirtilmedi";
      const packageType = body.packageType || body.preferredService || body.budgetRange || "Genel Proje";
      const message =
        body.message ||
        (body.processAndVolume
          ? `Süreç & Hacim: ${body.processAndVolume} | Süreç Sahibi: ${body.processOwner || "Belirtilmedi"} | Bütçe: ${body.budgetRange || "Belirtilmedi"}`
          : "Mesaj bırakılmadı.");

      const resendKey = env.RESEND_API_KEY;
      if (!resendKey) {
        return new Response(
          JSON.stringify({
            status: "error",
            success: false,
            error: "Sunucu yapılandırma hatası: RESEND_API_KEY çevre değişkeni tanımlanmamış."
          }),
          { status: 500, headers: CORS_HEADERS }
        );
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
        const errData = await resendResponse.json().catch(() => ({}));
        console.warn("Resend API Yanıtı:", resendResponse.status, errData);
        return new Response(
          JSON.stringify({
            status: "error",
            success: false,
            error: errData.message || `E-posta servisi hatası (Kod: ${resendResponse.status}).`
          }),
          { status: resendResponse.status, headers: CORS_HEADERS }
        );
      }

      return new Response(
        JSON.stringify({
          status: "success",
          success: true,
          message: "Başvuru Talebiniz Alınmıştır"
        }),
        { status: 200, headers: CORS_HEADERS }
      );
    } catch (error) {
      return new Response(
        JSON.stringify({
          status: "error",
          success: false,
          error: "İstek işlenirken sunucu hatası oluştu."
        }),
        { status: 500, headers: CORS_HEADERS }
      );
    }
  }
};
