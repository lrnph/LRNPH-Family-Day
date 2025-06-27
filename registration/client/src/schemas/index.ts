import { z } from "zod";

export const registerSchema = z.object({
  employee_id: z.string().min(1, { message: "Employee ID is required" }),
});

export const confirmationSchema = z.object({
  employee_id: z.string().min(1, "Employee ID is required"),
  invited_guests: z.number({ required_error: "Please select number of guests"}).min(0, "Please select number of guests").max(2),
});

export type Register = z.infer<typeof registerSchema>;
export type Confirmation = z.infer<typeof confirmationSchema>;

export type Employee = {
  employeeId: string
  firstName: string
  middleName: string
  lastName: string
  department: string
  guests: number;
}
