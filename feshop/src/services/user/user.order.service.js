import axios from "axios";
import { API_COMMON} from "../../utils/utils";

function authHeader() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  if (user && user.jwtToken) {
    return { Authorization: "Bearer " + user.jwtToken };
  } else {
    return {};
  }
}

const checkProductOrderConfirmationService = async (data) => {// dung chung them va sua
    const response = await axios.post( API_COMMON +"order/order-confirmation",data)
    return response;
}

//xem cac san pham dang dinh mua
const loadOrderComfirmService = async (userId) => {
  const response = await axios.get( API_COMMON +`order/order-confirmation/${userId}`)
  return response;
}

// tao don hang bang thanh toan tien mat hoac xuat link thanh toan
const createOrderOfflineOrPaymentLinkOnline = async (data) =>{
  const response = await axios.post( API_COMMON +"order/create-offline-or-link-payment-online",data, { headers: authHeader() })
  return response;
}

//lay tat ca don hang cua nguoi dung
const getAllOrderByUserId = async (userId) =>{
  const response = await axios.get( API_COMMON +`order/all-order/${userId}`)
  return response;
}



const orderServiceUser = {
  checkProductOrderConfirmationService,
  loadOrderComfirmService,
  createOrderOfflineOrPaymentLinkOnline,
  getAllOrderByUserId
}

export default orderServiceUser;