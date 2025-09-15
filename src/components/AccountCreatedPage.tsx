import { Button } from './ui/button';
import { CheckCircle } from 'lucide-react';

interface AccountCreatedPageProps {
  onBackToLogin: () => void;
}

export function AccountCreatedPage({ onBackToLogin }: AccountCreatedPageProps) {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header */}
      <header className="flex justify-center items-center py-12 relative">
        <h1 
          className="text-white text-6xl tracking-[0.4em] relative"
          style={{ 
            fontFamily: 'Bahnschrift, sans-serif', 
            fontWeight: '600',
            textShadow: '0 0 20px rgba(255, 255, 255, 0.3), 0 0 40px rgba(255, 255, 255, 0.2)',
            WebkitTextStroke: '1px rgba(255, 255, 255, 0.1)'
          }}
        >
          STACC
          <div 
            className="absolute inset-0 text-6xl tracking-[0.4em] opacity-30"
            style={{
              background: 'linear-gradient(180deg, transparent 50%, rgba(255, 255, 255, 0.4) 50%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              transform: 'scaleY(-1) translateY(100%)',
              filter: 'blur(2px)'
            }}
          >
            STACC
          </div>
        </h1>
      </header>
      
      {/* Divider Line */}
      <div className="w-full h-px bg-white"></div>

      {/* Success Message */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center space-y-6">
          <div className="flex justify-center">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
          
          <div>
            <h2 className="text-white text-2xl mb-2">Account Created!</h2>
            <p className="text-gray-400 text-lg">
              You have successfully created an account
            </p>
          </div>

          <Button
            onClick={onBackToLogin}
            className="w-full bg-white text-black hover:bg-gray-200 transition-colors"
          >
            Go to Login
          </Button>
        </div>
      </div>
    </div>
  );
}