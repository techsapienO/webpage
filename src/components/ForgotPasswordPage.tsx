import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface ForgotPasswordPageProps {
  onBackToLogin: () => void;
  onEmailSubmit: (email: string) => void;
}

export function ForgotPasswordPage({ onBackToLogin, onEmailSubmit }: ForgotPasswordPageProps) {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      onEmailSubmit(email);
    }
  };

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

      {/* Forgot Password Form */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <h2 className="text-white text-2xl mb-2">Reset Password</h2>
            <p className="text-gray-400">Enter your email to reset your password</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:border-white"
                placeholder="Enter your email"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-white text-black hover:bg-gray-200 transition-colors"
            >
              Send Reset Code
            </Button>
          </form>

          <div className="text-center">
            <p className="text-gray-400">
              Remember your password?{' '}
              <button
                onClick={onBackToLogin}
                className="text-white hover:underline"
              >
                Back to Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}