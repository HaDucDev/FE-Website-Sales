import axios from "axios";
import { API_COMMON} from "../../utils/utils";

const getCountProductCategoryService = async (userId) => {
    const response = await axios.get(API_COMMON +`cart/count-cart/${userId}`);
    return response;
}

const getAllProductInCartService = async (userId) => {
    const response = await axios.get(API_COMMON +`cart/all-product/${userId}`);
    return response;
}

const cartServiceUser = {
    getCountProductCategoryService,
    getAllProductInCartService
}

export default cartServiceUser;