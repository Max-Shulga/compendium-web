import type { z } from 'zod';

const zodResolver = <T extends z.ZodTypeAny>(schema: T) =>
  (values: z.input<T>): Record<string, string> => {
    const result = schema.safeParse(values);
    if (result.success) return {};

    return result.error.issues.reduce<Record<string, string>>((acc, issue) => {
      const key = issue.path.join('.');
      if (key && !(key in acc)) acc[key] = issue.message;

      return acc;
    }, {});
  };

export default zodResolver;
