'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export default function LoginPage() {
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, sendOTP } = useAuth();
  const router = useRouter();

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await sendOTP(email);
      setStep('otp');
    } catch (err: any) {
      const msg = err?.response?.data?.detail || (err instanceof Error ? err.message : 'Failed to send OTP');
      setError(typeof msg === 'string' ? msg : 'Failed to send OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await login(email, otp);
      router.push('/chat');
    } catch (err: any) {
      const msg = err?.response?.data?.detail || (err instanceof Error ? err.message : 'Invalid OTP');
      setError(typeof msg === 'string' ? msg : 'Invalid OTP');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          animate={{ y: [0, 100, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          style={{ top: '-50px', left: '-50px' }}
        />
        <motion.div
          className="absolute w-96 h-96 bg-accent/5 rounded-full blur-3xl"
          animate={{ y: [0, -100, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
          style={{ bottom: '-50px', right: '-50px' }}
        />
      </div>

      {/* Login card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md z-10"
      >
        <Card className="p-8 shadow-xl border border-primary/10">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center"
            >
              <Image src="/logo.png" alt="LingualRAG" width={64} height={64} />
            </motion.div>
          </div>

          {/* Heading */}
          <h1 className="text-3xl font-bold text-center text-foreground mb-2">
            LingualRAG
          </h1>
          <p className="text-center text-muted-foreground text-sm mb-8">
            Multilingual AI-Powered Document Understanding
          </p>

          {/* Form */}
          <form onSubmit={step === 'email' ? handleSendOTP : handleVerifyOTP} className="space-y-5">
            {step === 'email' ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email Address
                </label>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  className="h-11"
                />
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground">
                    We&apos;ve sent an OTP to <span className="font-semibold text-foreground">{email}</span>
                  </p>
                </div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Enter OTP
                </label>
                <Input
                  type="text"
                  placeholder="000000"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.slice(0, 6))}
                  maxLength={6}
                  required
                  disabled={isLoading}
                  className="h-11 text-center text-2xl tracking-widest"
                />
              </motion.div>
            )}

            {/* Error message */}
            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-3 bg-destructive/10 text-destructive text-sm rounded-lg"
              >
                {error}
              </motion.div>
            )}

            {/* Submit button */}
            <Button
              type="submit"
              className="w-full h-11 font-semibold"
              disabled={isLoading || !email || (step === 'otp' && !otp)}
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="mr-2 animate-spin" />
                  {step === 'email' ? 'Sending OTP...' : 'Verifying...'}
                </>
              ) : step === 'email' ? (
                'Send OTP'
              ) : (
                'Verify & Login'
              )}
            </Button>

            {/* Back button for OTP step */}
            {step === 'otp' && (
              <Button
                type="button"
                variant="outline"
                className="w-full h-11"
                onClick={() => {
                  setStep('email');
                  setOtp('');
                  setError('');
                }}
              >
                Back
              </Button>
            )}
          </form>

          {/* Sign up link */}
          <p className="text-center text-sm text-muted-foreground mt-6">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-primary font-semibold hover:underline">
              Sign up
            </Link>
          </p>
        </Card>
      </motion.div>
    </div>
  );
}
