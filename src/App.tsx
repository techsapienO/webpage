import { useState } from 'react';
import { LoginPage } from './components/LoginPage';
import { SignUpPage } from './components/SignUpPage';
import { OTPPage } from './components/OTPPage';
import { SuccessPage } from './components/SuccessPage';
import { toast } from 'sonner@2.0.3';

type PageType = 'login' | 'signup' | 'otp' | 'success';

interface UserData {
  fullName: string;
  studentId: string;
  email: string;
  password: string;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('login');
  const [userData, setUserData] = useState<UserData | null>(null);

  const handleRegisterClick = () => {
    setCurrentPage('signup');
  };

  const handleBackToLogin = () => {
    setCurrentPage('login');
  };

  const handleSendOTP = (data: UserData) => {
    setUserData(data);
    setCurrentPage('otp');
    toast.success('OTP sent to your email!');
  };

  const handleOTPVerified = () => {
    // After successful registration, go back to login
    setCurrentPage('login');
    toast.success('Registration complete! Please login with your credentials.');
  };

  const handleLoginSuccess = () => {
    setCurrentPage('success');
  };

  const handleBackToSignUp = () => {
    setCurrentPage('signup');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'login':
        return (
          <LoginPage
            onRegisterClick={handleRegisterClick}
            onLoginSuccess={handleLoginSuccess}
          />
        );
      case 'signup':
        return (
          <SignUpPage
            onBackToLogin={handleBackToLogin}
            onSendOTP={handleSendOTP}
          />
        );
      case 'otp':
        return (
          <OTPPage
            email={userData?.email || ''}
            onOTPVerified={handleOTPVerified}
            onBackToSignUp={handleBackToSignUp}
          />
        );
      case 'success':
        return (
          <SuccessPage
            onBackToLogin={handleBackToLogin}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="dark">
      {renderCurrentPage()}
    </div>
  );
}