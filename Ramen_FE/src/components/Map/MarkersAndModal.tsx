import Loading from "../Loading/Loading";
import {makeStyles} from "@material-ui/core/styles";
import {useEffect, useState} from "react";
import CustomMarker from "./CustomMarker";
import CustomPopup from "./CustomPopup";
import MapStoreModal from "./MapStoreModal";
import {IStore} from "../../types/IStore";


const useStyles = makeStyles(() => ({
    loading: {
        backgroundColor: "rgba(255,255,255,0.7)",
        padding: "15px",
        top: "50%"
    },
    error: {
        backgroundColor: "rgba(255,255,255,0.7)",
        padding: "15px"
    },
    elements: {
        position: "relative",
        zIndex: 500
    },
}))

type Props = {
    status?: string,
    error?: Error,
    stores?: IStore[],
    flyTo: Function
}

const MarkersAndModal = (props: Props) => {
    const stores = props?.stores;
    const error = props?.error;
    const status = props?.status;
    const classes = useStyles();
    const [index, setIndex] = useState<number | null>(null);

    useEffect(() => {
        closePopup()
    }, [stores])

    const openPopup = (index: number) => {
        setIndex(index);
    }
    const closePopup = () => {
        setIndex(null)
    }

    if (status === "loading") {
        return <div className={classes.error}>
            <Loading/>
        </div>;
    }

    if (status === "error") {
        return <div className={classes.error}>
            {error?.message}
        </div>;
    }
    return (
        <div className={classes.elements}>
            {stores && stores.map((store, index) => {
                return (
                    <CustomMarker
                        key={`marker-${index}`}
                        index={index}
                        store={store}
                        openPopup={openPopup}
                        flyTo={props?.flyTo}
                    />
                )
            })
            }
            {
                index !== null && stores &&
                <>
                    <CustomPopup
                        index={index}
                        store={stores[index]}
                        closePopup={closePopup}
                    />
                    <MapStoreModal store={stores[index]} closePopup={closePopup}/>
                </>
            }
        </div>
    );
};

export default MarkersAndModal;
