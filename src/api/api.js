import axios from "axios"

const createURL = (url) => {
  return "http://localhost:8080/" + url
}

export async function getAllMembers() {
  try {
    const response = await axios.get(createURL("member/list"))
    return response.data
  } catch (error) {
    return error.response.data
  }
}

export async function getAllFeePayments() {
  try {
    const response = await axios.get(createURL("feeinfo/list/2025"))
    return response.data
  } catch (error) {
    return error.response.data
  }
}

export async function loginValidation(id, pwd) {
  try {
    const response = await axios.post(createURL("user/login"), {
      id: id,
      pwd: pwd,
    })
    return response.data
  } catch (error) {
    return error.response.data
  }
}

export async function insertUser(id, pwd) {
  try {
    const response = await axios.post(createURL("user/register"), {
      id: id,
      pwd: pwd,
    })
    return response.data
  } catch (error) {
    return error.response.data
  }
}

export async function updateFeeInfo(feeUpdateList) {
  try {
    const response = await axios.post(
      createURL("feeinfo/list"),
      feeUpdateList,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    return response.data
  } catch (error) {
    return error.response.data
  }
}

export async function getAllExpense() {
  try {
    const response = await axios.get(createURL("expense/list"))
    return response.data
  } catch (error) {
    return error.response.data
  }
}

export async function getExpenseByDate(request) {
  try {
    const response = await axios.post(createURL("expense/list"), request)
    console.log(response)
    return response.data
  } catch (error) {
    return error.response.data
  }
}

export async function getExpenseImage() {
  try {
    const response = await axios.get(createURL("expense/image"))
    return response.data
  } catch (error) {
    return error.response.data
  }
}

export async function insertMember(member) {
  try {
    const response = await axios.post(createURL("member"), member)
    return response.data
  } catch (error) {
    return error.response.data
  }
}

export async function insertFeeInfo(feeInfo) {
  try {
    const response = await axios.post(createURL("feeInfo"), feeInfo)
    return response.data
  } catch (error) {
    return error.response.data
  }
}

export async function insertExpense(expense, images) {
  try {
    const formData = new FormData()
    let url = ""
    console.log(images.length);
    if(images.length > 0){
      images.forEach((element) => {
        formData.append("images", element)
      })
      url = createURL("expense")
    }
    else{
      url = createURL("expense/no-image")
    }
    formData.append("date", expense.date);
    formData.append("content", expense.content);    
    formData.append("cost", expense.cost);
    console.log(formData , "FormData");
    const response = await axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return response.data
  } catch (error) {
    return error.response.data
  }
}


export async function deleteMember(member){
  console.log(member);
  try{
    const response = await axios.delete(createURL("member"),{
      data : member
    })
    return response.data
  }
  catch(error){
    return error.response.data
  }
}

export async function updateMember(member){
  console.log(member);
  try{
    const response = await axios.put(createURL("member"),member)
    return response.data
  }
  catch(error){
    return error.response.data
  }
}