import axios from "axios";
import { API_COMMON} from "../../utils/utils";

const checkProductOrderConfirmationService = async (data) => {// dung chung them va sua
    const response = await axios.post( API_COMMON +"order/order-confirmation",data)
    return response;
}

const orderServiceUser = {
  checkProductOrderConfirmationService
}

export default orderServiceUser;