import useFetch from "../../customHooks/UseFetch";
import Loading from "../Loading/Loading";
import {IReview} from "../../types/IReview";
import ListItem from "@material-ui/core/ListItem";
import {Link} from "react-router-dom";
import {makeStyles, Theme} from "@material-ui/core/styles";
import ReactQuill from "react-quill";
import he from "he";

const useStyles = makeStyles((theme: Theme) => ({
    selection: {
        fontFamily: "JFOpen",
        fontSize: "1rem",
        color: theme.palette.text.primary,
        "&:hover": {
            backgroundColor: "#efefef",
            color: theme.palette.text.primary,
            textDecoration: "none",
        }
    },
    reviewText: {
        "& > div.ql-editor": {
            fontSize: "1rem",
        },
        "& > div.ql-tooltip": {
            height: 0
        },
        "&:hover": {
            cursor: "pointer"
        }
    }
}))
type UserReviewRes = {
    review: IReview | null
}
type Props = {
    storeId: string
}
const ReviewInfo = (props: Props) => {
    const storeId = props.storeId;
    const classes = useStyles();

    const options = {
        key: "userReview",
        url: process.env.REACT_APP_BE_URL + `/api/v1/reviews/userReview/${storeId}`,
        requestQuery: {}
    }
    const {data, status, error} = useFetch<UserReviewRes>(options);

    if (status === "loading") {
        return <Loading iconSize={40} fontSize={"15px"}/>;
    }

    if (status === "error") {
        return <div>{error?.message}</div>;
    }

    return data?.review ? (
        <ListItem component={Link} to={`/stores/${storeId}`} className={classes.selection}>
            <ReactQuill
                value={he.decode(data.review.text)}
                readOnly={true}
                theme={"bubble"}
            >
                <div className={classes.reviewText}/>
            </ReactQuill>
        </ListItem>
    ) : null;
};

export default ReviewInfo;
