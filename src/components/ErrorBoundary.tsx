import React, { Component, ErrorInfo, ReactNode } from 'react';
import { RotateCw, Home, AlertCircle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (typeof console !== 'undefined' && console.error) {
      console.error('ErrorBoundary yakaladı:', error, errorInfo);
    }
  }

  private handleReload = () => {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  private handleGoHome = () => {
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-center space-y-6 shadow-2xl">
            {/* Logo */}
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-extrabold text-2xl mx-auto shadow-lg shadow-blue-500/20">
              V
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-bold">
                <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Teknik Güvenlik Kalkanı</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Sayfa Başarıyla Yeniden Yüklenebilir
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed text-justify" style={{ textAlign: 'justify' }}>
                Mobil tarayıcınızdaki önbellek değişimi veya bağlantı zaman aşımı nedeniyle sayfa bileşeni güvenli modda durduruldu. Aşağıdaki butonlarla sayfayı tazeleyebilir veya doğrudan ana sayfaya dönebilirsiniz.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={this.handleReload}
                aria-label="Sayfayı Yeniden Yükle"
                className="flex-1 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
              >
                <RotateCw className="w-4 h-4" aria-hidden="true" />
                <span>Sayfayı Yenile</span>
              </button>

              <button
                type="button"
                onClick={this.handleGoHome}
                aria-label="Ana Sayfaya Git"
                className="flex-1 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-bold border border-slate-700 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
              >
                <Home className="w-4 h-4" aria-hidden="true" />
                <span>Ana Sayfa</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
