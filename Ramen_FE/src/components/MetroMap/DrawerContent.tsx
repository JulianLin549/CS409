import useFetch from "../../customHooks/UseFetch";
import Loading from "../Loading/Loading";
import {IStore} from "../../types/IStore";
import MetroStoreCard from "./MetroStoreCard";


type Stores = {
    current: number,
    pages: number,
    stores: (IStore & { distance: number })[]
};
type Props = {
    city: string,
    stationCode: string
}
const DrawerContent = (props: Props) => {
    const city = props.city;
    const stationCode = props.stationCode;

    const options = {
        key: "stores",
        url: process.env.REACT_APP_BE_URL + `/api/v1/metro/getStoresNearMetro`,
        requestQuery: {
            city, stationCode
        }
    }
    const {data, status, error} = useFetch<Stores>(options);

    if (status === "loading") {
        return <Loading fontSize={"1rem"} iconSize={50}/>;
    }

    if (status === "error") {
        return <div>{error?.message}</div>;
    }


    if (data?.stores?.length === 0) {
        return <div>沒有找到店家</div>
    }

    return data!.stores.length > 0 ?
        <div>
            {data?.stores.map(store => <MetroStoreCard key={store._id} store={store}/>)}
        </div> : <div>沒有找到店家</div>


};

export default DrawerContent;
