import axios from "axios";
import { API_ADMIN, config, convertObjectBlob} from "../../utils/utils";


const getAllProductService = async () => {
    const response = await axios.get(API_ADMIN + "product");
    return response;
}

// const getSupplierById = async (id) => {
//     const response = await axios.get(API_ADMIN + `supplier/${id}`);
//     return response;
// }


const createCProductService = async (dataRequest, file) => {
    const blob = convertObjectBlob(dataRequest);
    const formData = new FormData();
    formData.append('createProductRequest', blob);
    formData.append('productFile', file);
    const response = await axios.post(API_ADMIN + "product", formData, config);
    return response;
}

// const updateSupplierService = async (dataRequest, file) => {
//     const blob = convertObjectBlob(dataRequest);
//     const formData = new FormData();
//     formData.append('updateProductRequestRequest', blob);
//     formData.append('productFile', file);
//     const response = await axios.put(API_ADMIN + "supplier", formData, config);
//     return response;
// }
// const deleteSupplierService = async (id) => {
//     const response = await axios.delete(API_ADMIN + `supplier/${id}`)
//     return response;
// }

const productService = {
    getAllProductService,
    // getSupplierById,
    createCProductService,
    // updateSupplierService,
    // deleteSupplierService
}


export default productService;