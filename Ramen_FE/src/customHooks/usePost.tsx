import axios from "axios";
import {useMutation} from "react-query";

type Props = {
    url: string,
    requestBody: Object,
    requestQuery?: Object,
    headers?: Object
}

const usePost = () => {
    const postData = async (props: Props) => {
        try {
            const url = props.url;
            const requestBody = props.requestBody;
            const params = props?.requestQuery;
            const headers = props?.headers;
            return await axios.post(url, requestBody, {
                params: params,
                headers: headers,
                withCredentials: true
            })
        } catch (error) {
            throw new Error("Problem fetching data");
        }
    }
    return useMutation((props: Props) => postData(props));
};

export default usePost;
