import { useState } from 'react';
import { Button } from './ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from './ui/input-otp';
import { CheckCircle, XCircle } from 'lucide-react';

interface OTPPageProps {
  email: string;
  onOTPVerified: () => void;
  onBackToSignUp: () => void;
}

export function OTPPage({ email, onOTPVerified, onBackToSignUp }: OTPPageProps) {
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 6) {
      setIsSubmitting(true);
      
      // Simulate OTP verification
      setTimeout(() => {
        // For demo: accept any 6-digit OTP as valid
        if (otp.length === 6) {
          setMessage({ type: 'success', text: 'Account successfully created.' });
          setTimeout(() => {
            onOTPVerified();
          }, 2000);
        } else {
          setMessage({ type: 'error', text: 'Invalid OTP. Please try again.' });
          setOtp('');
        }
        setIsSubmitting(false);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header */}
      <header className="flex justify-center items-center py-12 relative">
        <div className="relative">
          <h1 
            className="text-white text-6xl tracking-[0.4em]"
            style={{ 
              fontFamily: 'Bahnschrift, sans-serif', 
              fontWeight: '600',
              textShadow: '0 0 20px rgba(255, 255, 255, 0.3), 0 0 40px rgba(255, 255, 255, 0.2)',
              WebkitTextStroke: '1px rgba(255, 255, 255, 0.1)'
            }}
          >
            STACC
          </h1>
          <div 
            className="absolute top-full left-0 text-6xl tracking-[0.4em] opacity-20 pointer-events-none"
            style={{
              fontFamily: 'Bahnschrift, sans-serif', 
              fontWeight: '600',
              background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.4) 0%, transparent 70%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              transform: 'scaleY(-1)',
              filter: 'blur(1px)'
            }}
          >
            STACC
          </div>
        </div>
      </header>
      
      {/* Divider Line */}
      <div className="w-full h-px bg-white"></div>

      {/* OTP Form */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <h2 className="text-white text-2xl mb-2">Verify Your Email</h2>
            <p className="text-gray-400 mb-4">
              We've sent a verification code to
            </p>
            <p className="text-white">{email}</p>
          </div>

          {message && (
            <div className={`flex items-center justify-center space-x-2 p-3 rounded-lg ${
              message.type === 'success' ? 'bg-green-900/20 border border-green-500' : 'bg-red-900/20 border border-red-500'
            }`}>
              {message.type === 'success' ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <XCircle className="w-5 h-5 text-red-500" />
              )}
              <p className={`${message.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                {message.text}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-white text-center mb-4">
                Enter 6-digit code
              </label>
              <div className="flex justify-center">
                <InputOTP 
                  maxLength={6} 
                  value={otp} 
                  onChange={setOtp}
                  className="gap-2"
                  disabled={isSubmitting || message?.type === 'success'}
                >
                  <InputOTPGroup className="gap-2">
                    <InputOTPSlot 
                      index={0} 
                      className="w-12 h-12 bg-gray-900 border-gray-700 text-white text-xl flex items-center justify-center rounded focus:border-white disabled:opacity-50"
                    />
                    <InputOTPSlot 
                      index={1} 
                      className="w-12 h-12 bg-gray-900 border-gray-700 text-white text-xl flex items-center justify-center rounded focus:border-white disabled:opacity-50"
                    />
                    <InputOTPSlot 
                      index={2} 
                      className="w-12 h-12 bg-gray-900 border-gray-700 text-white text-xl flex items-center justify-center rounded focus:border-white disabled:opacity-50"
                    />
                    <InputOTPSlot 
                      index={3} 
                      className="w-12 h-12 bg-gray-900 border-gray-700 text-white text-xl flex items-center justify-center rounded focus:border-white disabled:opacity-50"
                    />
                    <InputOTPSlot 
                      index={4} 
                      className="w-12 h-12 bg-gray-900 border-gray-700 text-white text-xl flex items-center justify-center rounded focus:border-white disabled:opacity-50"
                    />
                    <InputOTPSlot 
                      index={5} 
                      className="w-12 h-12 bg-gray-900 border-gray-700 text-white text-xl flex items-center justify-center rounded focus:border-white disabled:opacity-50"
                    />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>

            <Button
              type="submit"
              disabled={otp.length !== 6 || isSubmitting || message?.type === 'success'}
              className="w-full bg-white text-black hover:bg-gray-200 transition-colors disabled:bg-gray-600 disabled:text-gray-400"
            >
              {isSubmitting ? 'Verifying...' : 'Verify Code'}
            </Button>
          </form>

          {message?.type !== 'success' && (
            <div className="text-center space-y-2">
              <button className="text-white hover:underline block">
                Resend code
              </button>
              <button
                onClick={onBackToSignUp}
                className="text-gray-400 hover:text-white"
              >
                Change email address
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}