import axios from "axios";
import { API_COMMON} from "../../utils/utils";


const getAllHomeProductService = async (number,size) => {
    const response = await axios.get(API_COMMON +`product?number=${number}&size=${size}`);
    return response;
}

const getDetailProductService = async (id) => {
    const response = await axios.get(API_COMMON +`product/detail/${id}`);
    return response;
}


 const productServiceUser = {
    getAllHomeProductService,
    getDetailProductService
}

export default productServiceUser;