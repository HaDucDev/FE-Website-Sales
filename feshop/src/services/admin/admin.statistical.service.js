import axios from "axios";
import { API_COMMON, configJson } from "../../utils/utils";

const getRevenueStatisticsService = async () => {
    const response = await axios.get( API_COMMON +"statistical/product-revenue-chart",configJson)
    return response;
}


const statisticalService = {
    getRevenueStatisticsService,
}


export default statisticalService;