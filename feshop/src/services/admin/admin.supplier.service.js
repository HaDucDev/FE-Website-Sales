import axios from "axios";
import { API_ADMIN } from "../../utils/utils";

const config = {     
    headers: {
        'Content-Type': 'multipart/form-data'
      }
}



const getAllSupplierService = async () => {
    const response = await axios.get(API_ADMIN + "supplier")
    return response;
}

const getSupplierById = async (id) => {
    const response = await axios.get(API_ADMIN + `supplier/${id}`)
    return response;
}


const createCSupplierService = async (dataRequest,file) => {
    const json = JSON.stringify(dataRequest);
        const blob = new Blob([json], {
            type: 'application/json'
        });
        const formData = new FormData();
        formData.append('createSupplierRequest', blob);
        formData.append('supplierFile', file)
    const response = await axios.post(API_ADMIN + "supplier", formData,config)
    return response;
}

const updateSupplierService = async (supplier) => {
    const response = await axios.put(API_ADMIN + "supplier", supplier,config)
    return response
}

const deleteSupplierService = async (id) => {
    const response = await axios.delete(API_ADMIN + `supplier/${id}`)
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