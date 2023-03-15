import axios from "axios";
import { API_COMMON, configJson } from "../../utils/utils";

//lay tat ca don hang cua nguoi dung
const getAllOrder = async () => {
    const response = await axios.get(API_COMMON + "order/admin/all-order",configJson);
    return response;
}


//huy don hang neu chua duyet

const cancelOrderService = async (ordersId) => {
    const response = await axios.delete(API_COMMON + `order/${ordersId}`,configJson)
    return response;
}

const acceptOrderService = async (data) => {
    const response = await axios.post(API_COMMON + "order/assignment/shipper", data,configJson)
    return response;
}


const orderService = {
    getAllOrder,
    cancelOrderService,
    acceptOrderService
}

export default orderService;