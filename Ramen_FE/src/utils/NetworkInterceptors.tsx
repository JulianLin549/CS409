import axios from "axios";
import Cookies from "js-cookie";
import {useUser} from "../Context/UserContext";
import useStackedSnackBar from "../customHooks/UseStackedSnackBar";
import {history} from "./history";

const NetworkInterceptors = () => {
    const {setUser} = useUser()!;
    const showSnackBar = useStackedSnackBar();
    axios.interceptors.response.use(
        function (successRes) {
            return successRes;
        }, async (error) => {
            const message = error?.response?.data?.message;
            switch (error.response.status) {
                case 401:
                    setUser(null);
                    window.localStorage.removeItem("current_user");
                    await Cookies.remove('access_token');
                    history.push("/login");
                    break;
                case 403:
                    history.go(0);
                    break;
                case 404:
                    history.push('/notFound');
                    break;
                case 422:
                    history.go(0);
                    break;
                case 500:
                    break;
                default:
                    //history.go(0);
                    break;
            }
            showSnackBar(message, 'error');
            return Promise.reject(error);
        }
    );
};

export default NetworkInterceptors;
