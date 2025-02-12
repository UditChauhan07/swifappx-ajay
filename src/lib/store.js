import axios from 'axios';

export const Url = "https://apiv4-hl3bjt37ia-uc.a.run.app/";

export const FieldUserLoginApi = async (formData) => {
    try {
      const response = await axios.post(`${Url}/flo34md53r`, formData, {
        headers: {  
          "Content-Type": "application/json",
        },
      });
      // console.log(response.data, "login api data");
      return response.data;
    } catch (error) {
      if (error.response) {
        return error.response.data;
      }
      throw new Error("An unexpected error occurred");
    }
};

export const getWorkerOrderList = async (workerId,token) => {
    try {
      const response = await axios.get(`${Url}/gfwok235mt/${encodeURIComponent(workerId)}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
      });
      // console.log(response, "worker response");
      return response.data;
    } catch (error) {
      if (error.response) {
        return error.response.data;
      }
      throw new Error("An unexpected error occurred");
    }
  };

export const updateWorkOrderStatus = async (woId,payload,token) => {
    try {
      const response = await axios.put(`${Url}/ufu2w34e5t/${encodeURIComponent(woId)}`,payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
      });
      console.log(response, "worker response");
      return response.data;
    } catch (error) {
      if (error.response) {
        return error.response.data;
      }
      throw new Error("An unexpected error occurred");
    }
  };

export const startWorkOrder = async (woId,payload,token) => {
    try {
      const response = await axios.post(`${Url}/stm345r43e/${encodeURIComponent(woId)}`,payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
      });
      console.log(response, "worker response");
      return response.data;
    } catch (error) {
      if (error.response) {
        return error.response.data;
      }
      throw new Error("An unexpected error occurred");
    }
  };
