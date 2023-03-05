import axios from "axios";
import { API_COMMON} from "../../utils/utils";

//lay tat ca don hang cua nguoi dung
const getAllOrder = async () =>{
    const response = await axios.get( API_COMMON +"order/admin/all-order");
    return response;
  }

  const orderService = {
    getAllOrder,
  }
  
  export default orderService;