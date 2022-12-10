import {ChangeEvent} from 'react';
import {IStore} from "../../types/IStore";
import {useState} from "react";
import Loading from "../Loading/Loading";
import StoreCardList from "../StoreCard/StoreCardList";
import './StoreIndex.css';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';

import SearchBar from "../SearchBar/SearchBar";
import useFetch from "../../customHooks/UseFetch";
import CustomPagination from "../CustomPagination";
import {Button} from "@material-ui/core";

type Stores = {
    current: number;
    mapboxAccessToken: string;
    pages: number;
    search: boolean;
    stores: IStore[]
};
const StoreIndex = () => {
    const [page, setPage] = useState<number>(1);
    const [searchInput, setSearchInput] = useState<string | null>(null);

    const handlePageChange = (_event: ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const options = {
        key: "stores",
        url: process.env.REACT_APP_BE_URL + "/api/v1/stores",
        requestQuery: {
            page: page,
            search: searchInput
        }
    }

    const {data, status, error} = useFetch<Stores>(options);


    if (status === "loading") {
        return <Loading/>;
    }

    if (status === "error") {
        return <div>{error?.message}</div>;
    }
    if (data?.stores?.length === 0) {
        return searchInput ? <div>
            {`Did not find store using input:"${searchInput}"`}
            <Button variant="outlined" className="goBack-btn" onClick={() => setSearchInput(null)}>
                <ArrowLeftIcon/>
                Go back to store list
            </Button>
        </div> : <div>Did not find store</div>
    }

    return data ?
        <>
            <SearchBar setPage={setPage} setSearchInput={setSearchInput}/>
            <StoreCardList stores={data.stores}/>

            {data && <CustomPagination pages={data.pages} page={page} handlePageChange={handlePageChange}/>}

        </> : null;
}


export default StoreIndex;