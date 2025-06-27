import { z } from "zod";

export const boothSchema = z.object({
  booth_name: z.string().min(1, { message: "Booth Name is required" }),
});

export type BoothFormData = z.infer<typeof boothSchema>;
export type Booth = { id: number, is_active: boolean } & BoothFormData

