import { z } from 'zod';

/**
 * Shared Zod validation schemas.
 * Used by the web app (react-hook-form resolver) and mirrored by API DTOs.
 */

export const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .email('Please enter a valid email address');

/**
 * Nigerian mobile numbers in local (0XXXXXXXXXX) or international (+234XXXXXXXXXX) form.
 */
export const phoneSchema = z
  .string()
  .trim()
  .regex(/^(?:\+234|0)[789][01]\d{8}$/, 'Please enter a valid Nigerian phone number');

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(128, 'Password is too long')
  .regex(/[a-z]/, 'Password must contain a lowercase letter')
  .regex(/[A-Z]/, 'Password must contain an uppercase letter')
  .regex(/\d/, 'Password must contain a number');

export const registerSchema = z
  .object({
    firstName: z.string().trim().min(2, 'First name is required'),
    lastName: z.string().trim().min(2, 'Last name is required'),
    email: emailSchema,
    phone: phoneSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
    acceptTerms: z.literal(true, {
      errorMap: () => ({ message: 'You must accept the terms to continue' }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type RegisterInput = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
  .object({
    token: z.string().min(1),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

export const createTicketSchema = z.object({
  subject: z.string().trim().min(5, 'Please provide a short subject').max(140),
  category: z.string().trim().min(1, 'Please select a category'),
  description: z.string().trim().min(20, 'Please describe the issue in more detail').max(5000),
});

export type CreateTicketInput = z.infer<typeof createTicketSchema>;

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Name is required'),
  email: emailSchema,
  phone: phoneSchema.optional().or(z.literal('')),
  subject: z.string().trim().min(3, 'Subject is required'),
  message: z.string().trim().min(10, 'Message is required').max(5000),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const chatMessageSchema = z.object({
  conversationId: z.string().uuid().optional(),
  message: z.string().trim().min(1, 'Message cannot be empty').max(2000),
  language: z.enum(['en', 'pcm', 'yo', 'ig', 'ha']).optional(),
});

export type ChatMessageInput = z.infer<typeof chatMessageSchema>;
