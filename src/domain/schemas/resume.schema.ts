import { z } from "zod";

export const resumeSchema = z.object({
  id: z.string().uuid(), 
  basics: z.object({
    name: z.string().min(2, "Mínimo 2 caracteres"),
    email: z.string().email("Email inválido"),
    label: z.string().optional().default(""),
    summary: z.string().optional().default(""),
    phone: z.string().optional().default(""),
  }),
  // El .default([]) es vital para registros antiguos
  experience: z.array(z.object({
    company: z.string(),
    position: z.string(),
    period: z.string(),
    description: z.string(),
  })).default([]),
  customHtml: z.string().default(""),
  updatedAt: z.coerce.date().default(() => new Date()),
});

export type ResumeProps = z.infer<typeof resumeSchema>;