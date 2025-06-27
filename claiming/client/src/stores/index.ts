import { atom } from "jotai"
import type { Booth, Employee } from "../schemas"

const atomWithLocalStorage = (key: string, initialValue: Booth) => {
  const getInitialValue = () => {
    const item = localStorage.getItem(key)
    if (item !== null) {
      return JSON.parse(item)
    }
    return initialValue
  }
  const baseAtom = atom(getInitialValue())
  const derivedAtom = atom(
    (get) => get(baseAtom),
    (get, set, update) => {
      const nextValue =
        typeof update === 'function' ? update(get(baseAtom)) : update
      set(baseAtom, nextValue)
      localStorage.setItem(key, JSON.stringify(nextValue))
    },
  )
  return derivedAtom
}


export const activeBoothAtom = atomWithLocalStorage("name",{id: 0, booth_name: "Home"})
export const activeStageAtom = atom<string>("Input")
export const activeEmployeeAtom = atom<Employee | null>(null)

