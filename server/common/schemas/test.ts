import * as z from "zod";
export const TestSchema = z.object({
  name1: z.string().min(2).max(20),
  name2: z.string().min(2).max(20),
  name3: z.string().min(2).max(20),
});

export type Test = z.infer<typeof TestSchema>;
