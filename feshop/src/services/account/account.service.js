import axios from "axios";
import { API_COMMON } from "../../utils/utils";


const loginService = async(user) =>{
    const response = await axios.post( API_COMMON +"login",user);
    return response;
}

const accountService = {
    loginService,
}

export default accountService;