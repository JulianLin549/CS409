import axios from "axios";
import {useMutation} from "react-query";

type Props = {
    url: string,
    requestBody: Object,
    requestQuery?: Object
}

const useDelete = () => {

    const deleteData = async (props: Props) => {
        const url = props.url;
        const requestBody = props.requestBody;
        const params = props?.requestQuery;
        return await axios.delete(url, {data: requestBody, params: params, withCredentials: true})
    }
    return useMutation((props: Props) => deleteData(props));
};

export default useDelete;
