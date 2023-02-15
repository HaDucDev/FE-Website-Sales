import axios from "axios";
import { API_ADMIN} from "../../utils/utils";


const getAllHomeProductService = async (number) => {
    const response = await axios.get(API_ADMIN +`product?number=${number}`);
    return response;
}


 const productServiceUser = {
    getAllHomeProductService,
}

export default productServiceUser;