import loadingSpinner from "../../static/Spinner-1s-200px.svg";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    spinner: {
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",
        height: "100%",
        width: "100%",
    },
}))
const LoadingSpinner = ({...props}: any) => {
    const classes = useStyles();

    return (
        <div {...props}>
            <img className={classes.spinner} src={loadingSpinner} alt="" />
        </div>
    );
};

export default LoadingSpinner;
