import axios from "axios";
import { API_COMMON} from "../../utils/utils";


const addReviewPropductService = async (data) => {// dung chung them va sua
    const response = await axios.post( API_COMMON +"reviews",data)
    return response;
}


const reviewServiceUser = {
    addReviewPropductService,
}

export default reviewServiceUser;