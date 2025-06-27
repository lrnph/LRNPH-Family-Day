import type { Confirmation } from "@schemas";
import {  REGISTER_ENDPOINT, EMPLOYEE_ENDPOINT } from "../constants/endpoints";
import axios from "axios";

export const createRegistration = async (data: Confirmation) => {
  try {
    const res = await axios.post(REGISTER_ENDPOINT, data)
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

