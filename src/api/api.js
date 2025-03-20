import axios from "axios";

const createURL = (url) => {
    return "http://localhost:8080/" + url;
}

export async function getAllMembers(){

    const response =  await axios.get(createURL("member/list")).
    then((response) => response.data)
    .catch((error) => error.response.data)

    console.log(response);
    return response
}

export async function getAllFeePayments(){
    const response =  await axios.get(createURL("feeinfo/list/2025")).
    then((response) => response.data)
    .catch((error) => error.response.data)
    return response
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

export async function updateFeeInfo(feeUpdateList){
    console.log(feeUpdateList);
    const response = await axios.post(createURL('feeinfo/list'),feeUpdateList,
    {
        headers :{
            "Content-Type" : "application/json"
        } 
    }).then((response) => response.data)
    .catch((error) => error.response.data);
    return response
}

export async function getAllExpense(){
    const response =  await axios.get(createURL("expense/list")).
    then((response) => response.data)
    .catch((error) => error.response.data)
    return response
}