import axios from "axios";
import { API_ADMIN } from "../../utils/utils";

const getAllCategoryService = async () => {
        const response = await axios.get( API_ADMIN +"category")
        return response;
}
export default getAllCategoryService;