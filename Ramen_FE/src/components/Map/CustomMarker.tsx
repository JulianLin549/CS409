import {Marker} from "react-map-gl";
import {makeStyles} from "@material-ui/core/styles";
import ramenIcon from "../../static/ramen.svg";
import {IStore} from "../../types/IStore";


const useStyles = makeStyles( () => ({
    marker: {
        backgroundImage: `url(${ramenIcon})`,
        backgroundSize: "cover",
        width: "45px",
        height: "45px",
        borderRadius: "50%",
        cursor: "pointer",
        zIndex:600
    },
}))

type Props = {
    index:number,
    store:IStore,
    openPopup: Function,
    flyTo: Function
}

const CustomMarker = (props: Props) => {
    const store = props.store;
    const index = props.index;
    const openPopup = props.openPopup;
    const flyTo = props.flyTo;
    const lng = store?.location?.coordinates[0];
    const lat = store?.location?.coordinates[1];
    const classes = useStyles();

    const handleMarkerClick = () => {
        flyTo(lng, lat);
        openPopup(index);

    }
    return (
        <Marker
            longitude={lng}
            latitude={lat}>
            <div className={classes.marker} onClick={handleMarkerClick}>
            </div>
        </Marker>
    )
};

export default CustomMarker;
