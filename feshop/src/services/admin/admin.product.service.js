import axios from "axios";
import { API_COMMON, config, convertObjectBlob} from "../../utils/utils";




const getAllProductService = async () => {
    const response = await axios.get(API_COMMON + "product/admin");
    return response;
}

const getProductById = async (id) => {
    const response = await axios.get(API_COMMON + `product/admin/${id}`);
    return response;
}


const createCProductService = async (dataRequest, file) => {
    const blob = convertObjectBlob(dataRequest);
    const formData = new FormData();
    formData.append('createProductRequest', blob);
    formData.append('productFile', file);
    const response = await axios.post(API_COMMON + "product/admin", formData, config);
    return response;
}

const updateProductService = async (dataRequest, file) => {
    const blob = convertObjectBlob(dataRequest);
    const formData = new FormData();
    formData.append('updateProductRequest', blob);
    formData.append('productFile', file);
    const response = await axios.put(API_COMMON + "product/admin", formData, config);
    return response;
}
const deleteProductService = async (id) => {
    const response = await axios.delete(API_COMMON + `product/admin/${id}`)
    return response;
}

const productService = {
    getAllProductService,
    getProductById,
    createCProductService,
    updateProductService,
    deleteProductService
}


export default productService;