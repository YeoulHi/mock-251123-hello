
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '../Button';
import { Input } from '../ui/Input';
import { useAuthStore } from '../../store/useAuthStore';
import { motion } from 'framer-motion';
import * as Dialog from '@radix-ui/react-dialog';
import { CheckCircle, X } from 'lucide-react';

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignupData = z.infer<typeof signupSchema>;

interface SignupPageProps {
  onNavigateToLogin: () => void;
}

export const SignupPage: React.FC<SignupPageProps> = ({ onNavigateToLogin }) => {
  const { signup, isLoading } = useAuthStore();
  const [showSuccess, setShowSuccess] = React.useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<SignupData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupData) => {
    // Simulate signup process then show success dialog
    await new Promise(resolve => setTimeout(resolve, 800)); 
    setShowSuccess(true);
  };

  const handleSuccessClose = async () => {
    setShowSuccess(false);
    // Assuming signup automatically logs in for this simple demo, or redirects to login
    // The PRD says "Automatically return to login page".
    onNavigateToLogin();
  };

  return (
    <div className="flex flex-col items-center justify-center h-full px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-slate-100"
      >
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Create Account</h1>
          <p className="text-slate-500 mt-2">Get started with StreamChat today</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Full Name"
            placeholder="John Doe"
            error={errors.name?.message}
            {...register('name')}
          />
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            error={errors.email?.message}
            {...register('email')}
          />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            error={errors.password?.message}
            {...register('password')}
          />
          
          <Button 
            type="submit" 
            fullWidth 
            size="lg" 
            disabled={isLoading}
            className="mt-2"
          >
            {isLoading ? "Creating Account..." : "Sign Up"}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{' '}
          <button 
            onClick={onNavigateToLogin}
            className="font-semibold text-brand-600 hover:text-brand-700 hover:underline"
          >
            Sign in
          </button>
        </div>
      </motion.div>

      {/* Success Dialog */}
      <Dialog.Root open={showSuccess} onOpenChange={handleSuccessClose}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-in fade-in" />
          <Dialog.Content className="fixed left-[50%] top-[50%] z-50 w-full max-w-sm translate-x-[-50%] translate-y-[-50%] rounded-lg bg-white p-6 shadow-xl animate-in zoom-in-95">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                <CheckCircle size={24} />
              </div>
              <div>
                <Dialog.Title className="text-lg font-semibold text-slate-900">Account Created</Dialog.Title>
                <Dialog.Description className="text-sm text-slate-500 mt-1">
                  Your account has been successfully created. Please sign in to continue.
                </Dialog.Description>
              </div>
              <Button fullWidth onClick={handleSuccessClose}>
                Go to Login
              </Button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};
