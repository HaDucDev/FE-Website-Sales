import axios from "axios";
import { API_COMMON} from "../../utils/utils";

const getAllOrderDetailByOrdersId = async (ordersId) =>{
    const response = await axios.get( API_COMMON +`order-detail/all-order/${ordersId}`)
    return response;
  }
  
  const orderDeailServiceUser = {
    getAllOrderDetailByOrdersId
  }
  
  export default orderDeailServiceUser;