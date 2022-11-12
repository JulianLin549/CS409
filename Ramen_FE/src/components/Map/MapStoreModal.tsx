import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import {IStore} from "../../types/IStore";
import StoreCard from "../StoreCard/StoreCard";

const useStyles = makeStyles(() => ({
    storeModal: {
        margin: 16,
        marginTop:0,
        position: "absolute",
        zIndex: 500,
        justifyContent: "left"
    },
    modalRoot: {
        padding: 0,
        width: "25vw",
        maxWidth: 350,
        maxHeight: 300
    },
    closeButton: {
        padding:5,
        margin:10,
        float:"right",
        zIndex: 600,
        backgroundColor: "rgba(255,255,255,0.5)",
        "&:hover": {
            backgroundColor: "rgba(255,255,255,1.0)",
        }
    },
    storeCard:{
        maxHeight:100
    }
}))

type Props = {
    store: IStore,
    closePopup: () => void
}
const MapStoreModal = (props:Props) => {
    const store = props.store;
    const closePopup = props.closePopup;
    const classes = useStyles();

    return (
        <div className={classes.storeModal}>
            <Paper className={classes.modalRoot}>
                <IconButton className={classes.closeButton} onClick={closePopup}>
                    <CloseIcon/>
                </IconButton>
                <div className={classes.storeCard}>
                    <StoreCard store={store} />
                </div>
            </Paper>
        </div>
    );
};

export default MapStoreModal;
