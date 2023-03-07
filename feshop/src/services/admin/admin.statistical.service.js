import axios from "axios";
import { API_COMMON } from "../../utils/utils";

const getRevenueStatisticsService = async () => {
    const response = await axios.get( API_COMMON +"statistical/product-revenue-chart")
    return response;
}


const statisticalService = {
    getRevenueStatisticsService,
}


export default statisticalService;