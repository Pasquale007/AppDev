import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'http://116.203.81.70:3000',
    timeout: 10000
});

export const fetchData = async (params) => {
    const date = new Date();
    const timezoneOffset = date.getTimezoneOffset();
    const timezoneOffsetHours = -1 * timezoneOffset / 60;
    const response = await axiosInstance.get(`/getFlights?origin=${params.origin.iata}&destination=${params.destination.iata}&ignoredDestinations=${params.ignoredDestinations}&outFromDate=${params.outFromDate}&outToDate=${params.outToDate}&lengthMin=${params.lengthMin}&lengthMax=${params.lengthMax}&timeShift=${timezoneOffsetHours}`);
    return response.data;
}