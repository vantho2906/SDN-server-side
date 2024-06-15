import { z } from 'zod';

export const loginValidate = z.object({
  body: z.object({
    username: z
      .string()
      .min(1, { message: 'Username must be greater than 1 characters!' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 chars!' }),
  }),
});