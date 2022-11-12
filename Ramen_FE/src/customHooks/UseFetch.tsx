import {useQuery} from "react-query";
import axios from "axios";

type Props = {
    enabled?: boolean,
    key: string,
    url: string,
    requestQuery: Object
}


export default function useFetch<T>(props: Props) {
    const enabled = (props.enabled !== null) ? props.enabled : true;
    const key = props.key;
    const requestQuery = props.requestQuery;
    const url = props.url;

    const getData = async (url: string, params: Object): Promise<T> => {
        try {
            const response = await axios.get(url, {params: params, withCredentials: true});
            return await response.data.data;
        } catch (error) {
            throw new Error("Problem fetching data, please retry later");
        }
    }

    const {data, status, error} = useQuery<T, Error>(
        [key, url, requestQuery],
        () => getData(url, requestQuery),
        {
            keepPreviousData: true,
            enabled: enabled
        }
    );
    return {data, status, error}
};


