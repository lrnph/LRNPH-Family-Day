import type { BoothFormData, Booth } from "../schemas";
import { BOOTH_ENDPOINT, DASHBOARD_ENPOINT, EXPORT_ENDPOINT } from "../constants/endpoints";
import axios from "axios";


export const createBooth = async (data: BoothFormData) => {
  try {
    const res = await axios.post(BOOTH_ENDPOINT, data)
    return res.data
  } catch (error) {
    throw error
  }
}

export const updateBooth = async (id: number , status: boolean) => {
  try {
    const res = await axios.put(BOOTH_ENDPOINT, {booth_id:id, status:status })
    return res.data
  } catch (error) {
    throw error
  }
}

export const deleteBooth = async (id: string) => {
  try {
    const res = await axios.delete(BOOTH_ENDPOINT, { params: {id}})
    return res.data
  } catch (error) {
    throw error
  }
}

export const getBooth = async () => {
  try {
    const res = await axios.get(BOOTH_ENDPOINT)
    return res.data as Booth[]
  } catch (error) {
    throw error
  }
}

export const getChart = async (department: string) => {
  try {
    const { data } = await axios.get(DASHBOARD_ENPOINT, { params: { department}});
    return data.data
  } catch (error) {
    throw error;
  }
};

export const getAnalytics = async () => {
  try {
    const { data } = await axios.post(DASHBOARD_ENPOINT);
    return data.data
  } catch (error) {
    throw error;
  }
};



export const getExport = async () => {
  try {
    const res = await axios.get(EXPORT_ENDPOINT, {
      responseType: "blob", // Important: get binary blob
    });
    return res.data; // this is now a Blob
  } catch (error) {
    throw error;
  }
};
