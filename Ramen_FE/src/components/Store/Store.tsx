import {useParams} from "react-router";

import StoreLeftCol from "./StoreLeftCol";
import StoreRightCol from "./StoreRightCol";
import Loading from "../Loading/Loading";
import {IStore} from '../../types/IStore'
import Grid from "@material-ui/core/Grid";
import useFetch from "../../customHooks/UseFetch";
import React from "react";
import {withRouter} from "react-router-dom";


type StoreResponse = {
    mapboxAccessToken: string,
    isStoreOwner: boolean,
    store: IStore
}

interface ParamTypes {
    id: string
}

const Store = () => {

    const {id} = useParams<ParamTypes>()
    const [currentTabNum, setCurrentTabNum] = React.useState(0);

    const options = {
        key: "store",
        url: process.env.REACT_APP_BE_URL + `/api/v1/stores/${id}`,
        requestQuery: {}
    }

    const {data, status, error} = useFetch<StoreResponse>(options);


    if (status === "loading") {
        return <Loading/>;
    }

    if (status === "error") {
        return <div>{error?.message}</div>;
    }


    return data ?
        <Grid container direction="row" justify="space-between" spacing={3}>
            <Grid key={"leftCol"} item sm={12} md={3}>
                <StoreLeftCol store={data.store} currentTabNum={currentTabNum} setCurrentTabNum={setCurrentTabNum}/>
            </Grid>
            <Grid key={"rightCol"} item sm={12} md={9}>
                <StoreRightCol data={data} currentTabNum={currentTabNum} setCurrentTabNum={setCurrentTabNum}/>
            </Grid>
        </Grid>
        : null;
};

export default withRouter(Store);
