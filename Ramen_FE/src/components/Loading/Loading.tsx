import './Loading.css';
import LoadingSpinner from "./LoadingSpinner";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = (props: Props) => makeStyles(() => ({
    spinner: {
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",
        height: props.iconSize || 60,
        width: props.iconSize || 60,
    },
    loadingMessage: {
        textAlign: "center",
        float: "none",
        color: "#787878",
        fontSize: props.fontSize || "1.25rem",
    },
}))

type Props = {
    iconSize?: number,
    fontSize?: string
}
const Loading = (props: Props) => {

    const classes = useStyles(props)();
    return (
        <div className=" loading">
            <LoadingSpinner className={classes.spinner}/>
            <p className={classes.loadingMessage}>載入中，請稍等</p>
        </div>
    );
};

export default Loading;
