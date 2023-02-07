import axios from "axios";

const getAllCategoryService = async () => {
    try {
        const response = await axios.get("http://localhost:8080/api/admin/category")
        return response;
    }
    catch (error) {
        console.log(error)
    }
}

export default getAllCategoryService;