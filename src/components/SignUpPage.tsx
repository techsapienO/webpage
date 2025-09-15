import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface SignUpPageProps {
  onBackToLogin: () => void;
  onSendOTP: (data: { fullName: string; studentId: string; email: string; password: string }) => void;
}

interface FormData {
  fullName: string;
  studentId: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface ValidationErrors {
  fullName?: string;
  studentId?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export function SignUpPage({ onBackToLogin, onSendOTP }: SignUpPageProps) {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    studentId: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validatePassword = (password: string): string[] => {
    const errors: string[] = [];
    if (password.length < 8) errors.push('At least 8 characters');
    if (!/[A-Z]/.test(password)) errors.push('One uppercase letter');
    if (!/[a-z]/.test(password)) errors.push('One lowercase letter');
    if (!/\d/.test(password)) errors.push('One digit');
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) errors.push('One special character');
    return errors;
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.studentId.trim()) {
      newErrors.studentId = 'Student ID is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    const passwordErrors = validatePassword(formData.password);
    if (passwordErrors.length > 0) {
      newErrors.password = `Password must have: ${passwordErrors.join(', ')}`;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSendOTP({
        fullName: formData.fullName,
        studentId: formData.studentId,
        email: formData.email,
        password: formData.password
      });
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
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

      {/* Sign Up Form */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <h2 className="text-white text-2xl mb-2">Create Account</h2>
            <p className="text-gray-400">Enter your email to get started</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-white">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                className="bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:border-white"
                placeholder="Enter your full name"
                required
              />
              {errors.fullName && <p className="text-red-400 text-sm">{errors.fullName}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="studentId" className="text-white">Student ID</Label>
              <Input
                id="studentId"
                type="text"
                value={formData.studentId}
                onChange={(e) => handleInputChange('studentId', e.target.value)}
                className="bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:border-white"
                placeholder="Enter your student ID"
                required
              />
              {errors.studentId && <p className="text-red-400 text-sm">{errors.studentId}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email ID</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:border-white"
                placeholder="Enter your email"
                required
              />
              {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:border-white"
                placeholder="Enter your password"
                required
              />
              {errors.password && <p className="text-red-400 text-sm">{errors.password}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-white">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                className="bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:border-white"
                placeholder="Confirm your password"
                required
              />
              {errors.confirmPassword && <p className="text-red-400 text-sm">{errors.confirmPassword}</p>}
            </div>

            <Button
              type="submit"
              className="w-full bg-white text-black hover:bg-gray-200 transition-colors"
            >
              Send OTP
            </Button>
          </form>

          <div className="text-center">
            <p className="text-gray-400">
              Already have an account?{' '}
              <button
                onClick={onBackToLogin}
                className="text-white hover:underline"
              >
                Back to Login
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}