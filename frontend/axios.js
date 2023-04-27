import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'http://116.203.81.70:3000',
    timeout: 5000
});

export const fetchData = (params) => {
    console.log("start")
    axiosInstance.get("/getFlights", { params }
    ).then(response => {
        console.log("asdf")
    }).catch(err => {
        console.log("fdsa")
    })
}

