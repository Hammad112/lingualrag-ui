'use client';

import { useState } from 'react';
import Link from 'next/link';
import { User } from '@/types';
import { useAuth } from '@/hooks/useAuth';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Menu, X, LogOut, Settings, FileText, MessageSquare, BarChart3 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface SidebarProps {
  user: User | null;
}

/**
 * Sidebar navigation component with mobile hamburger menu
 */
export default function Sidebar({ user }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();

  const navItems = [
    {
      label: 'Chat',
      href: '/chat',
      icon: MessageSquare,
    },
    {
      label: 'Documents',
      href: '/documents',
      icon: FileText,
    },
    {
      label: 'Admin',
      href: '/admin',
      icon: BarChart3,
    },
    {
      label: 'Settings',
      href: '/settings',
      icon: Settings,
    },
  ];

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-40 p-2 rounded-lg bg-primary text-primary-foreground lg:hidden hover:bg-primary/90 transition-smooth"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={isOpen ? { x: -300 } : { x: -300 }}
        animate={isOpen ? { x: 0 } : { x: -300 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed left-0 top-0 h-full w-60 bg-sidebar border-r border-sidebar-border z-40 flex flex-col lg:relative lg:translate-x-0 lg:w-60"
      >
        {/* Logo and branding */}
        <div className="p-6 border-b border-sidebar-border">
          <Link href="/chat" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center overflow-hidden">
              <Image
                src="/logo.png"
                alt="LingualRAG"
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="font-bold text-sidebar-foreground text-sm group-hover:text-primary transition-smooth">
                LingualRAG
              </h1>
              <p className="text-xs text-muted-foreground">RAG System</p>
            </div>
          </Link>
        </div>

        {/* Navigation items */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground transition-smooth group"
              >
                <Icon size={20} className="text-muted-foreground group-hover:text-primary transition-smooth" />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User profile section */}
        <div className="p-4 border-t border-sidebar-border space-y-3">
          {user && (
            <Card className="p-3 bg-sidebar-accent border-sidebar-border">
              <p className="text-xs font-semibold text-sidebar-foreground truncate">
                {user.name}
              </p>
              <p className="text-xs text-muted-foreground truncate">{user.email}</p>
            </Card>
          )}
          <Button
            onClick={handleLogout}
            variant="outline"
            size="sm"
            className="w-full justify-center gap-2"
          >
            <LogOut size={16} />
            Logout
          </Button>
        </div>
      </motion.div>

      {/* Main content offset on desktop */}
      <div className="hidden lg:block w-60" />
    </>
  );
}
