import axios from "axios";
import { API_COMMON } from "../../utils/utils";


const loginService = async(user) =>{
    const response = await axios.post( API_COMMON +"login",user);
    return response;
}

const registerService = async(user) =>{
    const response = await axios.post( API_COMMON +"register",user);
    return response;
}

const inforUserByIdService = async(userId) =>{
    const response = await axios.get( API_COMMON +`user/${userId}`);
    return response;
}



const accountService = {
    loginService,
    registerService,
    inforUserByIdService
}

export default accountService;