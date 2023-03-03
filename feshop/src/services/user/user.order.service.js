import axios from "axios";
import { API_COMMON} from "../../utils/utils";

const checkProductOrderConfirmationService = async (data) => {// dung chung them va sua
    const response = await axios.post( API_COMMON +"order/order-confirmation",data)
    return response;
}

//xem dang dinh mua
const loadOrderComfirmService = async (userId) => {// dung chung them va sua
  const response = await axios.get( API_COMMON +`order/order-confirmation/${userId}`)
  return response;
}

const orderServiceUser = {
  checkProductOrderConfirmationService,
  loadOrderComfirmService
}

export default orderServiceUser;