'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Mail, Sparkles, Pencil, ArrowRight } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function AuthPage({ isSignin }: { isSignin: boolean }) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black px-4 relative overflow-hidden">
      {/* Background Ambient Glows - Matching Hero Section */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-orange-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />
      
      {/* Decorative Sketch Elements */}
      <div className="absolute top-10 right-10 opacity-20 hidden lg:block rotate-12">
        <div className="p-4 border-2 border-zinc-700 rounded-lg font-mono text-xs text-white" 
             style={{ borderRadius: '2px 255px 3px 25px / 255px 5px 225px 5px' }}>
          Input: Biology Lesson
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md z-10"
      >
        {/* Logo / Brand Link */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center -rotate-3">
            <Pencil className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
            Cognitive Canvas
          </span>
        </div>

        {/* Card */}
        <div className="rounded-3xl border border-white/10 bg-zinc-900/50 backdrop-blur-2xl shadow-2xl overflow-hidden">
          <div className="px-8 pt-10 pb-6 text-center">
            <h2 className="text-3xl font-bold text-white tracking-tight">
              {isSignin ? "Welcome back" : "Create account"}
            </h2>
            <p className="mt-3 text-zinc-400">
              {isSignin
                ? "Your sketches are waiting to become slides."
                : "The fastest way from napkin sketch to PPT."}
            </p>
          </div>

          <form className="px-8 pb-10 space-y-5" onSubmit={(e) => e.preventDefault()}>
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-500 ml-1 uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative group">
                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-orange-500 transition-colors"
                />
                <input
                  type="email"
                  placeholder="name@example.com"
                  className="w-full rounded-xl bg-zinc-950/50 border border-white/10 pl-10 pr-4 py-3 text-sm text-white placeholder:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-500 ml-1 uppercase tracking-wider">
                Password
              </label>
              <div className="relative group">
                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-orange-500 transition-colors"
                />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full rounded-xl bg-zinc-950/50 border border-white/10 pl-10 pr-4 py-3 text-sm text-white placeholder:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-4 group relative flex items-center justify-center gap-2 rounded-xl bg-orange-500 py-3.5 text-sm font-bold text-black hover:bg-orange-400 transition-all active:scale-[0.98]"
            >
              {isSignin ? (
                <>
                  Sign In <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              ) : (
                <>
                   Create account
                </>
              )}
            </button>

            {/* Switch Mode */}
            <div className="pt-4 text-center">
              <p className="text-sm text-zinc-500">
                {isSignin ? "New to the canvas?" : "Already a creator?"}{" "}
                <button 
                  type="button"
                  className="text-orange-400 font-semibold hover:text-orange-300 transition-colors underline-offset-4 hover:underline"
                >
                  {isSignin ? "Create an account" : "Log in here"}
                </button>
              </p>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

//Make it more generic reusable code snippet