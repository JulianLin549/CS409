import {Popup} from "react-map-gl";
import {IStore} from "../../types/IStore";
import {makeStyles} from "@material-ui/core/styles";
import {Button} from "@material-ui/core";
import {Link} from "react-router-dom";

const markerSize = 45;
const useStyles = makeStyles(() => ({
    popup: {
        maxWidth:250,
        padding:10
    },
    storeName:{

    }
}));


type Props = {
    index: number,
    store: IStore,
    closePopup: Function
};

const CustomPopup = (props: Props) => {
    const store = props.store;
    const closePopup = props.closePopup;
    const classes = useStyles();
    return (
        <Popup
            longitude={store?.location?.coordinates[0]}
            latitude={store?.location?.coordinates[1]}
            onClose={closePopup}
            closeButton={false}
            offsetLeft={markerSize / 2}
            closeOnClick={false}
            className={classes.popup}
        >
            <Button component={Link} to={`/stores/${store._id}`} className={classes.storeName}>
                {store.name}
            </Button>
        </Popup>
    )
};

export default CustomPopup;
