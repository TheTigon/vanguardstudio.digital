import React, { useEffect, useState } from 'react';
import {
  TrendingUp,
  ShoppingBag,
  RotateCcw,
  Activity,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  CreditCard,
  Truck,
  Sparkles,
  Play,
  Pause,
} from 'lucide-react';
import { EcommerceDemoTab, LiveActivityLog } from './types';
import { INITIAL_LIVE_LOGS, STREAMING_LOG_POOL } from './mockData';
import { AnimatedNumber } from './AnimatedNumber';

interface DashboardPageProps {
  onNavigate: (tab: EcommerceDemoTab) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate }) => {
  const [dailyRevenue, setDailyRevenue] = useState<number>(482650);
  const [orderCount, setOrderCount] = useState<number>(348);
  const [returnRate, setReturnRate] = useState<number>(0.84);
  const [lastIncrement, setLastIncrement] = useState<number>(4250);
  const [liveLogs, setLiveLogs] = useState<LiveActivityLog[]>(INITIAL_LIVE_LOGS);
  const [streamIndex, setStreamIndex] = useState<number>(0);
  const [isStreaming, setIsStreaming] = useState<boolean>(true);
  const [selectedTimeRange, setSelectedTimeRange] = useState<'bugun' | '7gun' | '30gun'>('bugun');

  useEffect(() => {
    if (!isStreaming) return;

    const interval = setInterval(() => {
      const nextLogTemplate = STREAMING_LOG_POOL[streamIndex % STREAMING_LOG_POOL.length];
      const randomSale = Math.floor(1850 + Math.random() * 5400);

      setDailyRevenue((prev) => prev + randomSale);
      setOrderCount((prev) => prev + 1);
      setLastIncrement(randomSale);
      setReturnRate((prev) => {
        const delta = (Math.random() - 0.52) * 0.02;
        const next = Math.max(0.68, Math.min(0.95, Number((prev + delta).toFixed(2))));
        return next;
      });

      const newLog: LiveActivityLog = {
        id: `live-${Date.now()}`,
        city: nextLogTemplate.city,
        user: nextLogTemplate.user,
        action: nextLogTemplate.action,
        amount: `₺${randomSale.toLocaleString('tr-TR')}`,
        timeAgo: '3 saniye önce',
        type: nextLogTemplate.type,
      };

      setLiveLogs((prev) => {
        const aged = prev.slice(0, 6).map((item, idx) => ({
          ...item,
          timeAgo: `${(idx + 1) * 7 + 3} saniye önce`,
        }));
        return [newLog, ...aged];
      });

      setStreamIndex((prev) => prev + 1);
    }, 3600);

    return () => clearInterval(interval);
  }, [isStreaming, streamIndex]);

  const hourlyBars = [
    { hour: '09:00', val: 42 },
    { hour: '10:00', val: 58 },
    { hour: '11:00', val: 65 },
    { hour: '12:00', val: 81 },
    { hour: '13:00', val: 74 },
    { hour: '14:00', val: 89 },
    { hour: '15:00', val: 94 },
    { hour: '16:00', val: 86 },
    { hour: '17:00', val: 98 },
    { hour: '18:00', val: 100 },
  ];

  return (
    <div className="space-y-8">
      {/* Top Executive Welcome & Live Control Bar */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="space-y-2 max-w-3xl">
          <div className="text-xs font-semibold text-[#25D366] tracking-wide">
            Kurumsal E-Ticaret Otomasyon Çekirdeği · Gerçek Zamanlı Ciro &amp; Sipariş İzleme
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Yönetim Paneli (Canlı Mağaza Kokpiti)
          </h1>
          <p
            className="text-sm text-zinc-300 leading-relaxed text-justify"
            style={{ textAlign: 'justify' }}
          >
            Mağazanızdan geçen tüm perakende ve B2B bayi siparişlerini, ödeme ağ geçidi onaylarını ve kargo otomasyon kuyruklarını saniyelik veri akışıyla tek ekrandan takip edin. Aşağıdaki metrik kartları ve sağ taraftaki canlı hareket akışı, gerçek bir e-ticaret operasyonunun anlık temposunu simüle etmektedir.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setIsStreaming((prev) => !prev)}
            aria-label={isStreaming ? 'Canlı veri akışını duraklat' : 'Canlı veri akışını başlat'}
            className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border border-zinc-700 text-xs font-bold transition-colors inline-flex items-center gap-2 cursor-pointer whitespace-nowrap"
          >
            {isStreaming ? (
              <>
                <Pause className="w-3.5 h-3.5 text-[#25D366]" aria-hidden="true" />
                <span>Canlı Akış Aktif</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
                <span>Akış Duraklatıldı</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => onNavigate('urunler')}
            aria-label="Otomasyon eklenti ve ürün kataloğuna git"
            className="px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-zinc-950 text-xs font-extrabold transition-all inline-flex items-center gap-2 cursor-pointer shadow-lg shadow-[#25D366]/20 whitespace-nowrap"
          >
            <span>Otomasyon Modüllerini İncele</span>
            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* 3 Main Live KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Bugünkü Toplam Satış */}
        <div className="bg-zinc-900 border border-zinc-800 hover:border-[#25D366]/50 rounded-2xl p-6 transition-all space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              Bugünkü Toplam Satış
            </span>
            <div className="w-10 h-10 rounded-xl bg-[#25D366]/15 border border-[#25D366]/30 text-[#25D366] flex items-center justify-center">
              <TrendingUp className="w-5 h-5" aria-hidden="true" />
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              <AnimatedNumber value={dailyRevenue} prefix="₺" />
            </div>
            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-[#25D366] font-bold">
                +₺{lastIncrement.toLocaleString('tr-TR')} son işlem
              </span>
              <span className="text-zinc-400 font-mono tabular-nums">Düne göre +%18,4</span>
            </div>
          </div>

          <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400">
            <span>BDDK Onaylı Sanal POS</span>
            <span className="text-zinc-200 font-semibold">Ort. Sepet: ₺1.386</span>
          </div>
        </div>

        {/* Card 2: Gelen Sipariş Sayısı */}
        <div className="bg-zinc-900 border border-zinc-800 hover:border-[#25D366]/50 rounded-2xl p-6 transition-all space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              Gelen Sipariş Sayısı
            </span>
            <div className="w-10 h-10 rounded-xl bg-[#25D366]/15 border border-[#25D366]/30 text-[#25D366] flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" aria-hidden="true" />
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              <AnimatedNumber value={orderCount} suffix=" Adet" />
            </div>
            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-[#25D366] font-bold">Otomatik Barkod Basıldı</span>
              <span className="text-zinc-400 font-mono tabular-nums">%99,2 Zamanında Sevk</span>
            </div>
          </div>

          <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400">
            <span>Kargo API Kuyruğu</span>
            <span className="text-zinc-200 font-semibold">0 Bekleyen Hata</span>
          </div>
        </div>

        {/* Card 3: İptal / İade Oranı */}
        <div className="bg-zinc-900 border border-zinc-800 hover:border-[#25D366]/50 rounded-2xl p-6 transition-all space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              İptal / İade Oranı
            </span>
            <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-zinc-700 text-[#25D366] flex items-center justify-center">
              <RotateCcw className="w-5 h-5" aria-hidden="true" />
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              <AnimatedNumber value={returnRate} prefix="%" decimals={2} />
            </div>
            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-[#25D366] font-bold">Sektör Ortalamasının %72 Altında</span>
              <span className="text-zinc-400 font-mono tabular-nums">Hedef: &lt;%1,20</span>
            </div>
          </div>

          <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400">
            <span>AI Beden &amp; Ürün Eşleştirme</span>
            <span className="text-zinc-200 font-semibold">Aktif Koruma</span>
          </div>
        </div>
      </div>

      {/* Main Split: Left 8 Cols (Chart & Channel Breakdown) + Right 4 Cols (Canlı Hareketler Stream) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Column: Real-Time Revenue Chart & Channel Metrics */}
        <div className="lg:col-span-7 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-zinc-800">
              <div>
                <h2 className="text-base font-extrabold text-white">
                  Saatlik Mağaza Cirosu &amp; Otomasyon Performansı
                </h2>
                <p className="text-xs text-zinc-400">
                  Web mağaza, mobil uygulama ve pazaryeri API kanallarının birleşik hacmi
                </p>
              </div>

              <div className="flex items-center gap-1 bg-zinc-950 p-1 rounded-xl border border-zinc-800 self-start">
                {[
                  { id: 'bugun', label: 'Bugün' },
                  { id: '7gun', label: '7 Gün' },
                  { id: '30gun', label: '30 Gün' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setSelectedTimeRange(tab.id as 'bugun' | '7gun' | '30gun')}
                    aria-label={`${tab.label} satış verilerini göster`}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
                      selectedTimeRange === tab.id
                        ? 'bg-[#25D366] text-zinc-950'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Bar Chart Visualization */}
            <div className="pt-4 pb-2">
              <div className="grid grid-cols-10 gap-2 sm:gap-3 items-end h-44 px-2">
                {hourlyBars.map((bar, index) => {
                  const multiplier =
                    selectedTimeRange === 'bugun'
                      ? 1
                      : selectedTimeRange === '7gun'
                      ? 0.92
                      : 0.88;
                  const heightPercent = Math.min(100, Math.round(bar.val * multiplier));
                  const isPeak = index >= 7;
                  return (
                    <div
                      key={bar.hour}
                      className="flex flex-col items-center gap-2 h-full justify-end group"
                    >
                      <div className="text-[10px] font-mono tabular-nums text-zinc-400 group-hover:text-[#25D366] transition-colors">
                        %{heightPercent}
                      </div>
                      <div className="w-full bg-zinc-950 rounded-t-lg h-32 flex items-end overflow-hidden border border-zinc-800/80">
                        <div
                          style={{ height: `${heightPercent}%` }}
                          className={`w-full rounded-t-md transition-all duration-500 ${
                            isPeak
                              ? 'bg-gradient-to-t from-[#16a34a] to-[#25D366]'
                              : 'bg-zinc-700 group-hover:bg-[#25D366]/70'
                          }`}
                        />
                      </div>
                      <span className="text-[10px] font-mono text-zinc-400">{bar.hour}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Channel Distribution */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-zinc-800">
            <div className="bg-zinc-950/80 border border-zinc-800/90 rounded-xl p-3.5 space-y-1">
              <div className="text-[11px] text-zinc-400 font-semibold">Doğrudan Web Vitrin</div>
              <div className="text-base font-extrabold text-white font-mono tabular-nums">
                %54,2 Pay
              </div>
              <div className="text-[11px] text-[#25D366] font-medium">Komisyonsuz Net Tahsilat</div>
            </div>
            <div className="bg-zinc-950/80 border border-zinc-800/90 rounded-xl p-3.5 space-y-1">
              <div className="text-[11px] text-zinc-400 font-semibold">B2B Bayi Portalı</div>
              <div className="text-base font-extrabold text-white font-mono tabular-nums">
                %28,6 Pay
              </div>
              <div className="text-[11px] text-[#25D366] font-medium">Toplu Koli &amp; Cari Sipariş</div>
            </div>
            <div className="bg-zinc-950/80 border border-zinc-800/90 rounded-xl p-3.5 space-y-1">
              <div className="text-[11px] text-zinc-400 font-semibold">Pazaryeri API Senkron</div>
              <div className="text-base font-extrabold text-white font-mono tabular-nums">
                %17,2 Pay
              </div>
              <div className="text-[11px] text-zinc-300 font-medium">Otomatik Stok Eşitleme</div>
            </div>
          </div>
        </div>

        {/* Right Column: Anlık Sipariş Akış Ekranı ("Canlı Hareketler") */}
        <div className="lg:col-span-5 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#25D366]/15 border border-[#25D366]/40 text-[#25D366] flex items-center justify-center">
                <Activity className="w-4 h-4" aria-hidden="true" />
              </div>
              <div>
                <h2 className="text-base font-extrabold text-white">Canlı Hareketler</h2>
                <p className="text-[11px] text-zinc-400">
                  Gerçek zamanlı müşteri sipariş ve sepet onay akışı
                </p>
              </div>
            </div>
            <span className="text-[11px] font-mono text-[#25D366] font-bold">
              CANLI AKIŞ
            </span>
          </div>

          {/* Scrolling Live Feed List */}
          <div className="space-y-2.5 overflow-hidden">
            {liveLogs.map((log, index) => (
              <div
                key={log.id}
                className={`p-3.5 rounded-xl border transition-all duration-500 ${
                  index === 0
                    ? 'bg-[#25D366]/10 border-[#25D366]/40 shadow-md'
                    : 'bg-zinc-950/80 border-zinc-800/90'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                        log.type === 'order'
                          ? 'bg-[#25D366]/20 text-[#25D366]'
                          : log.type === 'payment'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-zinc-800 text-zinc-300'
                      }`}
                    >
                      {log.type === 'order' ? (
                        <ShoppingBag className="w-3.5 h-3.5" aria-hidden="true" />
                      ) : log.type === 'payment' ? (
                        <CreditCard className="w-3.5 h-3.5" aria-hidden="true" />
                      ) : (
                        <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                      )}
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-xs text-zinc-100 leading-snug">
                        <span className="font-bold text-[#25D366]">{log.timeAgo}</span>{' '}
                        <strong className="font-bold text-white">{log.city}</strong>&apos;dan{' '}
                        <strong className="font-bold text-white">{log.user}</strong> kullanıcısı{' '}
                        {log.action}.
                      </p>
                      <div className="flex items-center gap-2 text-[11px] text-zinc-400">
                        <span className="inline-flex items-center gap-1">
                          <Clock className="w-3 h-3" aria-hidden="true" />
                          <span>Otomatik E-Fatura &amp; Kargo Kuyruğu</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  {log.amount && (
                    <span className="text-xs font-mono font-extrabold text-[#25D366] tabular-nums shrink-0">
                      {log.amount}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-400">
            <span className="inline-flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-[#25D366]" aria-hidden="true" />
              <span>Lojistik Webhook Senkronizasyonu: Aktif</span>
            </span>
            <button
              type="button"
              onClick={() => onNavigate('sepet')}
              aria-label="Ticari paket baremleri ve sepet sayfasına git"
              className="text-[#25D366] hover:underline font-bold cursor-pointer"
            >
              Paket Baremlerini Gör →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
