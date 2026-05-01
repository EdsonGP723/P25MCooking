import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate API login token fetch
    login("dummy-jwt-token-12345");
    navigate('/');
  };

  return (
    <main className="flex-grow flex items-center justify-center relative w-full h-full min-h-screen">
      {/* Background Image with Blur */}
      <div 
        className="absolute inset-0 z-0 opacity-80" 
        style={{
          backgroundImage: 'url(https://lh3.googleusercontent.com/aida-public/AB6AXuCaFfhDa2N_xIOrnCJ_gA27wJChmHMqH8faP6gJJrtjfhuk6Smr7C2kUgXqtwnfWvUnaI_yX6Xgo_rvWku1qJAAMJgXQ3CM6HH5hvwxDOrZunqsdeZ0lSF6h83xDN-36ro4CdCmodJxYNTi3JTWsSgHt3V6rd58kivpoH6EZDZr34462orThCNBn4ayDNtJoAD8hXcGmnK5q_wMt_dfIIoXknEHoG2C7VTkNmhv1ybWxYARpSTphcgwZB2IhDOkycwDCzx1_AQnXfHj)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(8px) brightness(0.9)'
        }}
      ></div>
      
      {/* Tonal Overlay for readabilty */}
      <div className="absolute inset-0 z-0 bg-surface/40"></div>
      
      {/* Login Card Container */}
      <div className="relative z-10 w-full max-w-md px-6 py-12 md:px-12 md:py-16 bg-surface-container-lowest/90 backdrop-blur-2xl rounded-xl shadow-2xl border border-outline-variant/20 flex flex-col gap-8 mx-4">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="serif-display text-3xl md:text-4xl text-on-surface tracking-tight">Welcome back, Muse</h1>
          <p className="font-body text-sm text-on-surface-variant">Sign in to access your digital heirloom.</p>
        </div>
        
        {/* Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-6 w-full">
          
          {/* Email Input */}
          <div className="flex flex-col gap-2">
            <label className="font-label text-xs tracking-wide text-on-surface font-medium ml-1" htmlFor="email">Email</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-4 flex items-center text-outline pointer-events-none material-symbols-outlined text-xl">mail</span>
              <input 
                className="w-full pl-12 pr-4 py-4 bg-surface-container-low rounded-lg border border-outline-variant/20 text-on-surface font-body text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors placeholder:text-outline-variant" 
                id="email" name="email" placeholder="your@email.com" type="email" required
              />
            </div>
          </div>
          
          {/* Password Input */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center ml-1 mr-1">
              <label className="font-label text-xs tracking-wide text-on-surface font-medium" htmlFor="password">Password</label>
              <a className="font-label text-xs text-primary hover:text-primary-container transition-colors underline underline-offset-2" href="#">Forgot Password?</a>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-4 flex items-center text-outline pointer-events-none material-symbols-outlined text-xl">lock</span>
              <input 
                className="w-full pl-12 pr-4 py-4 bg-surface-container-low rounded-lg border border-outline-variant/20 text-on-surface font-body text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors placeholder:text-outline-variant" 
                id="password" name="password" placeholder="••••••••" type="password" required
              />
            </div>
          </div>
          
          {/* Actions */}
          <div className="pt-4 flex flex-col gap-4">
            <button 
              className="w-full py-4 px-6 rounded-full gradient-btn text-on-primary font-body text-sm font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2" 
              type="submit"
            >
              Sign In
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
