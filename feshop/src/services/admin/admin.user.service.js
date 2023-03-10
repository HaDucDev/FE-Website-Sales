import axios from "axios";
import { API_COMMON} from "../../utils/utils";

const getAllUserService = async (number,size) => {
    const response = await axios.get(API_COMMON +`user/admin?number=${number}&size=${size}`);
    return response;
}

//lay tat ca quyen de them nguoi dung
const getAllRoleService = async () => {
    const response = await axios.get(API_COMMON +"role/admin");
    return response;
}

// them nguoi dung
const createUserService = async (user) => {
    const response = await axios.post( API_COMMON +"user/admin",user)
    return response;
}

const userService = {
    getAllUserService,
    getAllRoleService,// list role
    createUserService
}

export default userService;