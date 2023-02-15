import axios from "axios";
import { API_ADMIN} from "../../utils/utils";


const getAllHomeProductService = async () => {
    const response = await axios.get(API_ADMIN + "product");
    return response;
}


 const productServiceUser = {
    getAllHomeProductService,
}

export default productServiceUser;