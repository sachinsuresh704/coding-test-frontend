import { performRequest } from "./api_handler";
import { URLS } from "../utility/urls";

export default () => {
    const { USER_DETAILS, GET_FILES } = URLS;
    return {
        userDetails: (body = {}, method = "get") => performRequest(method ? method : "get", USER_DETAILS, body),
        listFiles: (body = {}, method = "get") => performRequest(method ? method : "get", GET_FILES, body),
    };
};
