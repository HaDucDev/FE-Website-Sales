import axios from "axios";
import { API_COMMON} from "../../utils/utils";


const getAllHomeProductService = async (number,size) => {
    const response = await axios.get(API_COMMON +`product?number=${number}&size=${size}`);
    return response;
}

const getDetailProductService = async (id) => {
    const response = await axios.get(API_COMMON +`product/detail/${id}`);
    return response;
}

// api search filter san pham
const getAllSearchFilterProductService = async (number,size, categoryId,supplierId,text) => {
    const response = await axios.get(API_COMMON 
        +`product/search-filter?number=${number}&size=${size}&categoryId=${categoryId}&supplierId=${supplierId}&textSearch=${text}`);
        console.log(API_COMMON 
            +`product?number=${number}&size=${size}&categoryId=${categoryId}&supplierId=${supplierId}&textSearch=${text}`)
    return response;
}


// lay tat ca supplier from category
const getAllSupplierFromCatgoryService = async (categoryId) => {
    const response = await axios.get(API_COMMON +`product/filter-menu/${categoryId}`);
    return response;
}

//producseliing top10
const getSellingTop10Service = async () => {
    const response = await axios.get(API_COMMON +`product/selling-top-10-product`);
    return response;
}


 const productServiceUser = {
    getAllHomeProductService,
    getDetailProductService,
    getAllSearchFilterProductService,
    getAllSupplierFromCatgoryService,
    getSellingTop10Service
}

export default productServiceUser;