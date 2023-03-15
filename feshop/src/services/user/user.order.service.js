import axios from "axios";
import { API_COMMON, configJson} from "../../utils/utils";


const checkProductOrderConfirmationService = async (data) => {// dung chung them va sua
    const response = await axios.post( API_COMMON +"order/order-confirmation",data,configJson)
    return response;
}

//xem cac san pham dang dinh mua
const loadOrderComfirmService = async (userId) => {
  const response = await axios.get( API_COMMON +`order/order-confirmation/${userId}`,configJson)
  return response;
}

// tao don hang bang thanh toan tien mat hoac xuat link thanh toan
const createOrderOfflineOrPaymentLinkOnline = async (data) =>{
  const response = await axios.post( API_COMMON +"order/create-offline-or-link-payment-online",data, configJson )
  return response;
}

//lay tat ca don hang cua nguoi dung
const getAllOrderByUserId = async (userId) =>{
  const response = await axios.get( API_COMMON +`order/all-order/${userId}`,configJson)
  return response;
}

//huy don hang neu chua duyet

const cancelOrderService = async (ordersId) =>{
  const response = await axios.delete(API_COMMON+ `order/${ordersId}`,configJson)
  return response;
}



const orderServiceUser = {
  checkProductOrderConfirmationService,
  loadOrderComfirmService,
  createOrderOfflineOrPaymentLinkOnline,
  getAllOrderByUserId,
  cancelOrderService
}

export default orderServiceUser;