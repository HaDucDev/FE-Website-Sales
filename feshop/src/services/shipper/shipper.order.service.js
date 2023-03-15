import axios from "axios";
import { API_COMMON, configJson } from "../../utils/utils"

//lay tat ca don hang cua nguoi dung
const getAllOrderByShipper = async (shipperId) => {
    const response = await axios.get(API_COMMON + `order/shipper/all-order/${shipperId}`,configJson);
    return response;
}

//don hang da giao thanh cong
const confirmOrderService = async (data) => {
    const response = await axios.put(API_COMMON + "order/shipper/received", data,configJson)
    return response;
}

// shipper khong nhan don
const removedOrderService = async (data) => {
    const response = await axios.put(API_COMMON + "order/shipper/removed", data,configJson)
    return response;
}

const orderShipperService = {
    getAllOrderByShipper,
    confirmOrderService,
    removedOrderService
}


export default orderShipperService;