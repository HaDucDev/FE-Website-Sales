import axios from "axios";
import { API_COMMON} from "../../utils/utils";


const getAllHomeProductService = async (number,size) => {
    const response = await axios.get(API_COMMON +`product?number=${number}&size=${size}`);
    return response;
}


 const productServiceUser = {
    getAllHomeProductService,
}

export default productServiceUser;