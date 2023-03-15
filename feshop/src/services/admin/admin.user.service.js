import axios from "axios";
import { API_COMMON, configJson } from "../../utils/utils";


const getAllUserService = async (number, size) => {
    const response = await axios.get(API_COMMON + `user/admin?number=${number}&size=${size}`,configJson);
    return response;
}

//lay tat ca quyen de them nguoi dung
const getAllRoleService = async () => {
    const response = await axios.get(API_COMMON + "role/admin",configJson);
    return response;
}

// them nguoi dung
const createUserService = async (user) => {
    const response = await axios.post(API_COMMON + "user/admin", user,configJson)
    return response;
}

const getUserByIdService = async (id) => {
    const response = await axios.get(API_COMMON + `user/${id}`, configJson);
    return response;
}

const UpdateUserService = async (user) => {
    const response = await axios.put(API_COMMON + "user/admin", user,configJson)
    return response;
}

const deleteUserService = async (id) => {
    const response = await axios.delete(API_COMMON + `user/admin/${id}`,configJson)
    return response;
}

const userService = {
    getAllUserService,
    getAllRoleService,// list role
    createUserService,
    getUserByIdService,
    UpdateUserService,
    deleteUserService
}

export default userService;