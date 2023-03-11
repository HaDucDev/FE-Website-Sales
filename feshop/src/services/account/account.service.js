import axios from "axios";
import { API_COMMON } from "../../utils/utils";


function authHeader() {
    const user = JSON.parse(localStorage.getItem("currentUser"));
  
    if (user && user.jwtToken) {
      return { Authorization: "Bearer " + user.jwtToken };
    } else {
      return {};
    }
  }

const loginService = async(user) =>{
    const response = await axios.post( API_COMMON +"login",user);
    return response;
}

const registerService = async(user) =>{
    const response = await axios.post( API_COMMON +"register",user);
    return response;
}


const changePassService = async(user) =>{
    const response = await axios.put( API_COMMON +"change-pass",user,{ headers: authHeader() });
    return response;
}

const inforUserByIdService = async(userId) =>{// chung get user admin
    const response = await axios.get( API_COMMON +`user/${userId}`,{ headers: authHeader() });
    return response;
}



const accountService = {
    loginService,
    registerService,
    changePassService,
    inforUserByIdService
}

export default accountService;