import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'http://116.203.81.70:3000/',
});

export const fetchData = async (params) => {
    const response = await axiosInstance.get("/getFlights", { params })
    console.log(response)
    return response
}

