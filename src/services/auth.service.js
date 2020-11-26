import { performAuthRequest } from "./api_handler";
import { URLS } from "../utility/urls";

export default () => {
    const { USER_LOGIN, USER_REGISTER } = URLS;
    return {
        loginUser: (body = {}, method = "post") => performAuthRequest(method ? method : "post", USER_LOGIN, body),
        registerUser: (body = {}, method = "post") => performAuthRequest(method ? method : "post", USER_REGISTER, body),
    };
};
