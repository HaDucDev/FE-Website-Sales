import axios from "axios";
import { API_COMMON } from "../../utils/utils";

const getAllCategoryService = async () => {
        const response = await axios.get( API_COMMON +"category")
        return response;
}

const getCategoryById = async (id) =>{
    const response = await axios.get(API_COMMON + `category/admin/${id}`)
    return response;
}


const createCategoryService = async (category) => {
    const response = await axios.post( API_COMMON +"category/admin",category)
    return response;
}

const updateCategoryService = async (category) => {
    const response = await axios.put(API_COMMON + "category/admin",category)
    return response
}

const deleteCategoryService = async (id) =>{
    const response = await axios.delete(API_COMMON+ `category/admin/${id}`)
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