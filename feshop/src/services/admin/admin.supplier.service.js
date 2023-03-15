import axios from "axios";
import { API_COMMON, configFormData, configJson, convertObjectBlob } from "../../utils/utils";


const getAllSupplierService = async () => {
    const response = await axios.get(API_COMMON + "supplier");
    return response;
}

const getSupplierById = async (id) => {
    const response = await axios.get(API_COMMON + `supplier/admin/${id}`,configJson);
    return response;
}


const createCSupplierService = async (dataRequest, file) => {
    const blob = convertObjectBlob(dataRequest);
    const formData = new FormData();
    formData.append('createSupplierRequest', blob);
    formData.append('supplierFile', file);
    const response = await axios.post(API_COMMON + "supplier/admin", formData, configFormData);
    return response;
}

const updateSupplierService = async (dataRequest, file) => {
    const blob = convertObjectBlob(dataRequest);
    const formData = new FormData();
    formData.append('updateSupplierRequest', blob);
    formData.append('supplierFile', file);
    const response = await axios.put(API_COMMON + "supplier/admin", formData, configFormData);
    return response;
}
const deleteSupplierService = async (id) => {
    const response = await axios.delete(API_COMMON + `supplier/admin/${id}`,configJson)
    return response;
}

const supplierService = {
    getAllSupplierService,
    getSupplierById,
    createCSupplierService,
    updateSupplierService,
    deleteSupplierService
}


export default supplierService;