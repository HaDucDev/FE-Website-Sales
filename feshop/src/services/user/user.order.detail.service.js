import axios from "axios";
import { API_COMMON, configJson} from "../../utils/utils";

const getAllOrderDetailByOrdersId = async (ordersId) =>{
    const response = await axios.get( API_COMMON +`order-detail/all-order/${ordersId}`,configJson)
    return response;
  }
  
  const orderDeailServiceUser = {
    getAllOrderDetailByOrdersId
  }
  
  export default orderDeailServiceUser;