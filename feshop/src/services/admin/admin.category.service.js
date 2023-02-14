import axios from "axios";
import { API_ADMIN } from "../../utils/utils";

const getAllCategoryService = async () => {
        const response = await axios.get( API_ADMIN +"category")
        return response;
}

const getCategoryById = async (id) =>{
    const response = await axios.get(API_ADMIN + `category/${id}`)
    return response;
}


const createCategoryService = async (category) => {
    const response = await axios.post( API_ADMIN +"category/admin",category)
    return response;
}

const updateCategoryService = async (category) => {
    const response = await axios.put(API_ADMIN + "category/admin",category)
    return response
}

const deleteCategoryService = async (id) =>{
    const response = await axios.delete(API_ADMIN+ `category/admin/${id}`)
    return response;
}

const categoryService = {
    getAllCategoryService,
    getCategoryById,
    createCategoryService,
    updateCategoryService,
    deleteCategoryService
}


export default categoryService;