import type { Booth, Claim } from "../schemas";
import { BOOTH_ENDPOINT, CLAIM_ENDPOINT, EMPLOYEE_ENDPOINT } from "../constants/endpoints";
import axios from "axios";


export const claimRewards = async (data: Claim) => {
  try {
    const res = await axios.post(CLAIM_ENDPOINT, data)
    return res.data
  } catch (error) {
    throw error
  }
}

export const getEmployee = async (id: string) => {
  try {
    const res = await axios.get(EMPLOYEE_ENDPOINT + "/" + id)
    return res.data
  } catch (error) {
    throw error
  }
}


export const getBooth = async () => {
  try {
    const res = await axios.get(BOOTH_ENDPOINT, {params: { filter: "active"}})
    return res.data ?? [] as Booth[] 
  } catch (error) {
    throw error
  }
}