import axios from "axios";
import { API_ADMIN } from "../../utils/utils";

const getAllCategoryService = async () => {
    try {
        const response = await axios.get( API_ADMIN +"category")
        return response;
    }
    catch (error) {
        console.log(error)
    }
}

export default getAllCategoryService;