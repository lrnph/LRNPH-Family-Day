import { z } from "zod";

export const claimSchema = z.object({
  employee_id: z.string().min(1, { message: "Employee ID is required" }),
  booth_id: z.number({ required_error: "Booth ID is required" }),
});

export type Claim = z.infer<typeof claimSchema>;


export type Employee = {
  employeeId: string
  firstName: string
  middleName: string
  lastName: string
  department: string
  guests: number;
}

export const boothSchema = z.object({
  booth_name: z.string().min(1, { message: "Booth Name is required" }),
});

export type BoothFormData = z.infer<typeof boothSchema>;
export type Booth = { id: number } & BoothFormData

