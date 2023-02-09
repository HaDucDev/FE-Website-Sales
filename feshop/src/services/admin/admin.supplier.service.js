import axios from "axios";
import { API_ADMIN } from "../../utils/utils";


const getAllSupplierService = async () => {
    const response = await axios.get(API_ADMIN + "supplier")
    return response;
}

// const getSupplierById = async (id) => {
//     const response = await axios.get(API_ADMIN + `supplier/${id}`)
//     return response;
// }


// const createCSupplierService = async (supplier) => {
//     const response = await axios.post(API_ADMIN + "supplier", supplier)
//     return response;
// }

// const updateSupplierService = async (supplier) => {
//     const response = await axios.put(API_ADMIN + "supplier", supplier)
//     return response
// }

// const deleteSupplierService = async (id) => {
//     const response = await axios.delete(API_ADMIN + `supplier/${id}`)
//     return response;
// }

const supplierService = {
    getAllSupplierService,
    // getSupplierById,
    // createCSupplierService,
    // updateSupplierService,
    // deleteSupplierService
}


export default supplierService;