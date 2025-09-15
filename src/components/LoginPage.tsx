import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface LoginPageProps {
  onRegisterClick: () => void;
  onLoginSuccess: () => void;
}

export function LoginPage({ onRegisterClick, onLoginSuccess }: LoginPageProps) {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Accept any input and show success
    onLoginSuccess();
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

      {/* Login Form */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md space-y-6 border border-white rounded-lg p-8">
          <div className="text-center">
            <h2 className="text-white text-2xl mb-2">Welcome Back</h2>
            <p className="text-gray-400">Sign in to your account</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="studentId" className="text-white">Student ID</Label>
              <Input
                id="studentId"
                type="text"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className="bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:border-white"
                placeholder="Enter your student ID"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:border-white"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="flex gap-3">
              <Button
                type="submit"
                className="flex-1 bg-white text-black hover:bg-gray-200 transition-colors"
              >
                Login
              </Button>
              <Button
                type="button"
                onClick={onRegisterClick}
                variant="outline"
                className="flex-1 border-white text-white hover:bg-white hover:text-black transition-colors"
              >
                Register
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}