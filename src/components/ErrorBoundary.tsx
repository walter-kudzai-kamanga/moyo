import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Heart, RotateCcw } from 'lucide-react';

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
    console.error('Romantic app error caught:', error, errorInfo);
  }

  private handleReset = () => {
    try {
      localStorage.clear();
    } catch (e) {
      // ignore
    }
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#120308] text-[#fbebf0] flex items-center justify-center p-6 text-center select-none">
          <div className="max-w-md p-8 rounded-3xl bg-rose-950/70 border border-rose-500/40 shadow-2xl backdrop-blur-xl">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-rose-600/30 flex items-center justify-center animate-pulse">
              <Heart className="w-8 h-8 text-rose-400 fill-rose-400" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-rose-100 mb-2">
              Little Piece of My Heart
            </h2>
            <p className="text-xs text-rose-300/90 mb-6 leading-relaxed">
              Something gentle needed a moment to catch its breath. Tap below to reload the romance.
            </p>
            <button
              onClick={this.handleReset}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 text-white text-xs font-semibold shadow-lg shadow-rose-600/30 hover:opacity-95 active:scale-95 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reload Our Story</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
