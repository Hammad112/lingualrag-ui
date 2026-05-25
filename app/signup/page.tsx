'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export default function SignupPage() {
  const [step, setStep] = useState<'info' | 'otp' | 'success'>('info');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { signup, sendOTP } = useAuth();
  const router = useRouter();

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await sendOTP(email, name);
      setStep('otp');
    } catch (err: any) {
      const msg = err?.response?.data?.detail || (err instanceof Error ? err.message : 'Failed to send OTP');
      setError(typeof msg === 'string' ? msg : 'Failed to send OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyAndSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await signup(email, name, otp);
      setStep('success');
      setTimeout(() => {
        router.push('/chat');
      }, 2000);
    } catch (err: any) {
      const msg = err?.response?.data?.detail || (err instanceof Error ? err.message : 'Signup failed');
      setError(typeof msg === 'string' ? msg : 'Signup failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
      {/* Animated background */}
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

      {/* Signup card */}
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
            Join LingualRAG
          </h1>
          <p className="text-center text-muted-foreground text-sm mb-8">
            Start exploring multilingual AI-powered documents
          </p>

          {/* Success state */}
          {step === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center text-center space-y-4"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.5 }}
              >
                <CheckCircle2 size={64} className="text-green-500 mx-auto" />
              </motion.div>
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Welcome to LingualRAG!
                </h2>
                <p className="text-muted-foreground">
                  Your account has been created successfully. Redirecting...
                </p>
              </div>
            </motion.div>
          ) : (
            /* Form */
            <form
              onSubmit={step === 'info' ? handleSendOTP : handleVerifyAndSignup}
              className="space-y-5"
            >
              {step === 'info' ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-5"
                >
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Full Name
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      disabled={isLoading}
                      className="h-11"
                    />
                  </div>
                  <div>
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
                  </div>
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
                disabled={
                  isLoading ||
                  !email ||
                  (step === 'info' && !name) ||
                  (step === 'otp' && !otp)
                }
              >
                {isLoading ? (
                  <>
                    <Loader2 size={18} className="mr-2 animate-spin" />
                    {step === 'info' ? 'Sending OTP...' : 'Signing up...'}
                  </>
                ) : step === 'info' ? (
                  'Send OTP'
                ) : (
                  'Create Account'
                )}
              </Button>

              {/* Back button */}
              {step === 'otp' && (
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-11"
                  onClick={() => {
                    setStep('info');
                    setOtp('');
                    setError('');
                  }}
                >
                  Back
                </Button>
              )}
            </form>
          )}

          {/* Login link */}
          {step !== 'success' && (
            <p className="text-center text-sm text-muted-foreground mt-6">
              Already have an account?{' '}
              <Link href="/login" className="text-primary font-semibold hover:underline">
                Login
              </Link>
            </p>
          )}
        </Card>
      </motion.div>
    </div>
  );
}
