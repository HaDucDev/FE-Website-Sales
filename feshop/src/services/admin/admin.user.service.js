import axios from "axios";
import { API_COMMON} from "../../utils/utils";

const getAllUserService = async (number,size) => {
    const response = await axios.get(API_COMMON +`user/admin?number=${number}&size=${size}`);
    return response;
}

const userService = {
    getAllUserService,
}

export default userService;