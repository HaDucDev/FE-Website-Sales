import axios from "axios";
import { API_COMMON, configJson } from "../../utils/utils";


function authHeaderJson() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  if (user && user.jwtToken) {

    return {
      Authorization: "Bearer " + user.jwtToken,
    };
  } else {
    return {};
  }
}// dungf ham truc tiep o day thi chay opk nhe doi

const getAllUserService = async (number, size) => {

  console.log("ok roi ban oi");

  console.log("ok roi ban oi" + localStorage.getItem("currentUser"));
  console.log("xit roi ban oi" + JSON.stringify(authHeaderJson()));
  console.log(API_COMMON);
  console.log(JSON.stringify(configJson));
  console.log(typeof (configJson));
  const response = await axios.get(API_COMMON + `user/admin?number=${number}&size=${size}`, { headers: authHeaderJson() });
  return response;

}

//lay tat ca quyen de them nguoi dung
const getAllRoleService = async () => {
  const response = await axios.get(API_COMMON + "role/admin", configJson);
  return response;
}

// them nguoi dung
const createUserService = async (user) => {
  const response = await axios.post(API_COMMON + "user/admin", user, configJson)
  return response;
}

const getUserByIdService = async (id) => {
  const response = await axios.get(API_COMMON + `user/${id}`, configJson);
  return response;
}

const UpdateUserService = async (user) => {
  const response = await axios.put(API_COMMON + "user/admin", user, configJson)
  return response;
}

const deleteUserService = async (id) => {
  const response = await axios.delete(API_COMMON + `user/admin/${id}`, configJson)
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