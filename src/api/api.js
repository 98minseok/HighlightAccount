import axios from "axios";

const createURL = (url) => {
    return "http://localhost:8080/" + url;
}

export async function getAllMembers(){
    const response = await axios.get(createURL("api/members"))
    console.log(response.data);
    return response.data;
}

export async function getAllFeePayments(){
    const response = await axios.get(createURL("api/fee-payments"))
    console.log(response.data);
    return response.data;
}