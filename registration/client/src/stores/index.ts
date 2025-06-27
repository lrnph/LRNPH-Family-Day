import { atom } from "jotai"
import type { Employee } from "../schemas"

export const activeStageAtom = atom<string>("Input")
export const activeEmployeeAtom = atom<Employee | null>(null)

