import { z } from 'zod';

const signInSchema = z.object({
  email: z.email('Enter a valid email'),
  password: z.string().min(1, 'Enter your password')
});

export { signInSchema };
