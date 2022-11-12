import axios from "axios";
import {useMutation} from "react-query";

type Props = {
    url: string,
    requestBody: Object,
    requestQuery?: Object
}

const usePut = () => {
    const putData = async (props: Props) => {

        const url = props.url;
        const requestBody = props.requestBody;
        const params = props?.requestQuery;
        return await axios.put(url, requestBody, {params: params, withCredentials: true})

    }
    return useMutation((props: Props) => putData(props));
};

export default usePut;
