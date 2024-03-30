import axios from "axios";

const DesaKajii = axios.create({
    baseURL: "http://127.0.0.1:8088/api",
});

export default DesaKajii;
