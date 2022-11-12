import SearchBar from "../SearchBar/SearchBar";
import {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import useFetch from "../../customHooks/UseFetch";
import MarkersAndModal from "./MarkersAndModal";
import {IStore} from "../../types/IStore";

const useStyles = makeStyles( () => ({
    mapComponent: {
      position:"relative",
    },
}))


type MapBound = {
    N: number, S: number,
    E: number, W: number,
}

type Props = {
    mapBound?: MapBound,
    flyTo: Function
}

const MapContent = (props:Props) => {
    const classes = useStyles();
    const [searchInput, setSearchInput] = useState<string | null>(null);
    const mapBound = props.mapBound!;

    const options = {
        enabled: !!mapBound,
        key:"mapStores",
        url: process.env.REACT_APP_BE_URL + "/api/v1/map/getStoresInMapBound",
        requestQuery: {...mapBound, search: searchInput}
    }

    const { data:stores, status, error } = useFetch<IStore[]>(options);


    return (
        <div className={classes.mapComponent}>
            <SearchBar setSearchInput={setSearchInput}/>
            <MarkersAndModal stores={stores} status={status} error={error!} flyTo={props.flyTo} />
        </div>
    );
};

export default MapContent;
