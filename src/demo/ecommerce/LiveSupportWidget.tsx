import React, { useState } from 'react';
import { MessageCircle, X, Send, Bot, CheckCircle2 } from 'lucide-react';

interface LiveSupportWidgetProps {
  isOpen: boolean;
  onToggle: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'assistant' | 'user';
  text: string;
  time: string;
}

export const LiveSupportWidget: React.FC<LiveSupportWidgetProps> = ({
  isOpen,
  onToggle,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'assistant',
      text: 'Merhaba, e-ticaret altyapımız hakkında bir sorunuz mu var?',
      time: 'Şimdi',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickQuestions = [
    'Kaynak kod mülkiyeti devrediliyor mu?',
    'Sanal POS ve kargo kurulumu ne kadar sürer?',
    'EKO ve PRO paket farkı nedir?',
  ];

  const handleSendMessage = (customText?: string) => {
    const textToSend = (customText ?? inputText).trim();
    if (!textToSend) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      time: 'Şimdi',
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customText) setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      let reply =
        'VanGuard Studio Digital e-ticaret otomasyon altyapımız BDDK uyumlu ödeme ağ geçidi ve 8 ulusal kargo API entegrasyonuyla anahtar teslim kurulur. Sepet ekranından paket baremlerimizi test edebilirsiniz.';

      if (textToSend.toLowerCase().includes('kaynak kod') || textToSend.toLowerCase().includes('mülkiyet')) {
        reply =
          'PRO Paket (59.000 TL) ve Nexus AI (35.000 TL) seçildiğinde tüm kaynak kod mülkiyeti resmi sözleşme ile şirketinize devredilir. EKO Pakette (19.900 TL) ise kaynak kod mülkiyeti devredilmez.';
      } else if (textToSend.toLowerCase().includes('pos') || textToSend.toLowerCase().includes('kargo')) {
        reply =
          'BDDK onaylı 3D Secure sanal POS ve gelişmiş kargo barkod otomasyonlarımız 1 iş günü içinde mağazanıza entegre edilerek canlıya alınmaktadır.';
      } else if (textToSend.toLowerCase().includes('eko') || textToSend.toLowerCase().includes('fark')) {
        reply =
          'EKO Paket 5 iş gününde hazır standart şablonla kurulur. PRO Paket ise sıfırdan özel tasarım, çoklu dil, ERP/pazaryeri köprüsü ve %100 kaynak kod devri içerir.';
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'assistant',
          text: reply,
          time: 'Şimdi',
        },
      ]);
      setIsTyping(false);
    }, 550);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="VanGuard E-Ticaret Asistanı Canlı Destek Penceresi"
          className="mb-3 w-[340px] sm:w-[370px] bg-zinc-900 border-2 border-[#25D366] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.75)] overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200"
        >
          {/* Header */}
          <div className="bg-zinc-950 px-4 py-3.5 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#25D366] text-zinc-950 flex items-center justify-center font-bold shadow-sm">
                <Bot className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <div className="text-xs font-extrabold text-white">
                  VanGuard E-Ticaret Asistanı
                </div>
                <div className="text-[11px] text-[#25D366] font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" aria-hidden="true" />
                  <span>Çevrimiçi · Otomatik Yanıt Simülasyonu</span>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={onToggle}
              aria-label="Canlı destek penceresini kapat"
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="p-4 h-64 overflow-y-auto space-y-3 bg-zinc-900/95">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed text-justify ${
                    msg.sender === 'user'
                      ? 'bg-[#25D366] text-zinc-950 font-bold rounded-br-xs'
                      : 'bg-zinc-800 text-zinc-100 border border-zinc-700 rounded-bl-xs'
                  }`}
                  style={{ textAlign: 'justify' }}
                >
                  {msg.text}
                </div>
                <span className="text-[10px] text-zinc-500 mt-1 px-1">{msg.time}</span>
              </div>
            ))}

            {isTyping && (
              <div className="text-xs text-[#25D366] font-semibold px-2 animate-pulse">
                VanGuard E-Ticaret Asistanı yazıyor...
              </div>
            )}
          </div>

          {/* Quick Questions */}
          <div className="px-3 py-2 bg-zinc-950/80 border-t border-zinc-800 flex flex-wrap gap-1.5">
            {quickQuestions.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => handleSendMessage(q)}
                aria-label={`Hızlı soru sor: ${q}`}
                className="text-[11px] bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 hover:border-[#25D366] rounded-lg px-2.5 py-1 transition-colors cursor-pointer"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-zinc-950 border-t border-zinc-800 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              aria-label="Canlı destek mesajınızı yazın"
              placeholder="Sorunuzu buraya yazın..."
              className="flex-1 bg-zinc-900 border border-zinc-700 focus:border-[#25D366] text-white text-xs rounded-xl px-3 py-2 outline-none"
            />
            <button
              type="submit"
              aria-label="Canlı destek mesajını gönder"
              className="p-2 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-zinc-950 font-bold cursor-pointer transition-colors"
            >
              <Send className="w-4 h-4" aria-hidden="true" />
            </button>
          </form>
        </div>
      )}

      {/* Continuously Fluttering / Bouncing Live Support Bubble */}
      <button
        type="button"
        onClick={onToggle}
        aria-label="VanGuard E-Ticaret Asistanı canlı destek balonunu aç veya kapat"
        className="group relative flex items-center gap-2.5 px-4 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-zinc-950 font-extrabold text-xs shadow-[0_10px_35px_rgba(37,211,102,0.45)] transition-all cursor-pointer animate-bounce"
      >
        <MessageCircle className="w-5 h-5 fill-zinc-950" aria-hidden="true" />
        <span>Canlı Destek Asistanı</span>
      </button>
    </div>
  );
};
