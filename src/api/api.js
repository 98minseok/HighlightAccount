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

export async function loginValidation(id,pwd) {

    const response = await axios.post(createURL('member/login'),{
        id : id,
        pwd : pwd,
    }).then((response) => response.data)
    .catch((error) => error.response.data);
    return response;
}


export async function insertMember(id,pwd){
    const response = await axios.post(createURL('member/register'),{
        id : id,
        pwd : pwd,
    }).then((response) => response.data)
    .catch((error) => error.response.data);
    return response
}