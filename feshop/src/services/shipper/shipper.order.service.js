import axios from "axios";
import { API_COMMON } from "../../utils/utils"

//lay tat ca don hang cua nguoi dung
const getAllOrderByShipper = async (shipperId) => {
    const response = await axios.get(API_COMMON + `order/shipper/all-order/${shipperId}`);
    return response;
}

const confirmOrderService = async (data) => {
    const response = await axios.put(API_COMMON + "order/shipper/received", data)
    return response;
}

const orderShipperService = {
    getAllOrderByShipper,
    confirmOrderService
}


export default orderShipperService;