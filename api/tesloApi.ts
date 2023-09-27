import axios from "axios";

const tesloApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_URL_BASE,
})

export default tesloApi;