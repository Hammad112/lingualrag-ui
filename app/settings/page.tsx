'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { ProtectedLayout } from '@/components/ProtectedLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import {
  User,
  Globe,
  Lock,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { getLanguagePreference, setLanguagePreference } from '@/lib/auth';

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'ar', name: 'العربية' },
  { code: 'ur', name: 'اردو' },
  { code: 'zh', name: '中文' },
  { code: 'ja', name: '日本語' },
];

export default function SettingsPage() {
  const { user } = useAuth();
  const [language, setLanguage] = useState(getLanguagePreference());
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleLanguageChange = (newLang: string) => {
    setLanguage(newLang);
    setLanguagePreference(newLang);
    setMessage('Language preference updated');
    setTimeout(() => setMessage(''), 3000);
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setMessage('Password must be at least 8 characters');
      return;
    }

    setIsLoading(true);
    // API call would go here
    setTimeout(() => {
      setIsLoading(false);
      setPassword('');
      setConfirmPassword('');
      setMessage('Password updated successfully');
    }, 2000);
  };

  return (
    <ProtectedLayout>
      <div className="flex flex-col h-full max-h-screen overflow-hidden bg-background">
        {/* Header */}
        <div className="flex-shrink-0 px-4 py-4 border-b border-border md:px-6 md:py-5">
          <h1 className="text-xl md:text-2xl font-bold text-foreground">
            Settings
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your account and preferences
          </p>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-2xl">
            {/* Profile section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <User size={20} className="text-primary" />
                  </div>
                  <h2 className="text-xl font-semibold text-foreground">
                    Profile Information
                  </h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Name
                    </label>
                    <Input
                      type="text"
                      value={user?.name || ''}
                      disabled
                      className="bg-muted"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email
                    </label>
                    <Input
                      type="email"
                      value={user?.email || ''}
                      disabled
                      className="bg-muted"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    To change your profile information, please contact support.
                  </p>
                </div>
              </Card>
            </motion.div>

            {/* Language section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-8"
            >
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <Globe size={20} className="text-accent" />
                  </div>
                  <h2 className="text-xl font-semibold text-foreground">
                    Language & Region
                  </h2>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-4">
                    Preferred Language
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`px-4 py-3 rounded-lg font-medium transition-all ${
                          language === lang.code
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-foreground hover:bg-muted/80'
                        }`}
                      >
                        {lang.name}
                      </button>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Password section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-destructive/10 rounded-lg">
                    <Lock size={20} className="text-destructive" />
                  </div>
                  <h2 className="text-xl font-semibold text-foreground">
                    Password & Security
                  </h2>
                </div>

                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      New Password
                    </label>
                    <Input
                      type="password"
                      placeholder="Enter new password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Confirm Password
                    </label>
                    <Input
                      type="password"
                      placeholder="Confirm password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>

                  {message && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={`p-3 rounded-lg flex items-center gap-2 text-sm ${
                        message.includes('Error')
                          ? 'bg-destructive/10 text-destructive'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {message.includes('Error') ? (
                        <AlertCircle size={16} />
                      ) : (
                        <CheckCircle2 size={16} />
                      )}
                      {message}
                    </motion.div>
                  )}

                  <Button
                    type="submit"
                    disabled={!password || !confirmPassword || isLoading}
                    className="w-full"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 size={16} className="mr-2 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      'Update Password'
                    )}
                  </Button>
                </form>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </ProtectedLayout>
  );
}
