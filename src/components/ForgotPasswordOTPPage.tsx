import { useState } from 'react';
import { Button } from './ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from './ui/input-otp';

interface ForgotPasswordOTPPageProps {
  email: string;
  onOTPVerified: () => void;
  onBackToForgotPassword: () => void;
}

export function ForgotPasswordOTPPage({ email, onOTPVerified, onBackToForgotPassword }: ForgotPasswordOTPPageProps) {
  const [otp, setOtp] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Accept any OTP and proceed
    if (otp.length === 6) {
      onOTPVerified();
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

      {/* OTP Form */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <h2 className="text-white text-2xl mb-2">Reset Password</h2>
            <p className="text-gray-400 mb-4">
              We've sent a reset code to
            </p>
            <p className="text-white">{email}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-white text-center mb-4">
                Enter 6-digit reset code
              </label>
              <div className="flex justify-center">
                <InputOTP 
                  maxLength={6} 
                  value={otp} 
                  onChange={setOtp}
                  className="gap-2"
                >
                  <InputOTPGroup className="gap-2">
                    <InputOTPSlot 
                      index={0} 
                      className="w-12 h-12 bg-gray-900 border-gray-700 text-white text-xl flex items-center justify-center rounded focus:border-white"
                    />
                    <InputOTPSlot 
                      index={1} 
                      className="w-12 h-12 bg-gray-900 border-gray-700 text-white text-xl flex items-center justify-center rounded focus:border-white"
                    />
                    <InputOTPSlot 
                      index={2} 
                      className="w-12 h-12 bg-gray-900 border-gray-700 text-white text-xl flex items-center justify-center rounded focus:border-white"
                    />
                    <InputOTPSlot 
                      index={3} 
                      className="w-12 h-12 bg-gray-900 border-gray-700 text-white text-xl flex items-center justify-center rounded focus:border-white"
                    />
                    <InputOTPSlot 
                      index={4} 
                      className="w-12 h-12 bg-gray-900 border-gray-700 text-white text-xl flex items-center justify-center rounded focus:border-white"
                    />
                    <InputOTPSlot 
                      index={5} 
                      className="w-12 h-12 bg-gray-900 border-gray-700 text-white text-xl flex items-center justify-center rounded focus:border-white"
                    />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>

            <Button
              type="submit"
              disabled={otp.length !== 6}
              className="w-full bg-white text-black hover:bg-gray-200 transition-colors disabled:bg-gray-600 disabled:text-gray-400"
            >
              Verify Reset Code
            </Button>
          </form>

          <div className="text-center space-y-2">
            <button className="text-white hover:underline block">
              Resend code
            </button>
            <button
              onClick={onBackToForgotPassword}
              className="text-gray-400 hover:text-white"
            >
              Change email address
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}