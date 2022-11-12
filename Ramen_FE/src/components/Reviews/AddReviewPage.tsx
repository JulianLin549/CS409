import {useHistory, withRouter} from "react-router-dom";
import useStackedSnackBar from "../../customHooks/UseStackedSnackBar";
import {useState} from "react";
import QuillEditor from "../QuillEditor/QuillEditor";
import {IStore} from "../../types/IStore";
import useFetch from "../../customHooks/UseFetch";
import Loading from "../Loading/Loading";
import {Box, Button, Dialog, DialogContent, DialogContentText, Paper} from "@material-ui/core";
import usePost from "../../customHooks/usePost";
import LoadingIcon from "../Loading/LoadingIcon";
import Rating from "@material-ui/lab/Rating";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDoubleLeft} from "@fortawesome/free-solid-svg-icons";
import {useParams} from "react-router";

const useStyles = makeStyles(() => ({
    root: {
        padding: 50,
        paddingTop:20,
        borderRadius: 10,
    },
    goBackText:{
        marginLeft: 10
    },
    goBackBtn:{
        color: "gray",
        marginTop:20,
        marginBottom:20
    },
    submitBtn: {
        margin: 5,
        float: "right",
    },
    cancelBtn: {
        margin: 5,
        float: "right",
        color: "gray"
    },
    ratingTitle: {
        marginBottom: 5
    },
    ratingText: {
        alignText:"middle",
        color: "red"
    },
}))

type StoreResponse = {
    mapboxAccessToken: string,
    isStoreOwner: boolean,
    store: IStore
}
interface ParamTypes {
    id: string
}

const AddReviewPage = () => {
    const showSnackBar = useStackedSnackBar();
    const history = useHistory();
    const classes = useStyles();

    const {id} = useParams<ParamTypes>()

    if (!id.match(/[a-fA-F0-9]{24}/g)) {
        showSnackBar('新增評論的店家ID錯誤', 'error');
        history.push("/stores");
    }

    const storageKey = `addReview_${id}`;
    const [rating, setRating] = useState<number | null>(null);

    const options = {
        key: "store",
        url: process.env.REACT_APP_BE_URL + `/api/v1/stores/${id}`,
        requestQuery: {}
    }
    const {data, status, error} = useFetch<StoreResponse>(options);
    const {mutateAsync, isLoading} = usePost();

    if (status === "loading") {
        return <Loading/>;
    }

    if (status === "error") {
        return <div>{error?.message}</div>;
    }

    if (status === "success" && data?.store) {
        let store = data?.store

        const onSubmit = async () => {
            if (rating === null) {
                showSnackBar(`評分不可為空`, 'error');
                return;
            }
            let review = window.localStorage.getItem(storageKey);
            if (review === null || review === "<p><br></p>") {
                showSnackBar(`評論不可為空！`, 'error');
                return;
            }
            const reqProps = {
                url: process.env.REACT_APP_BE_URL + `/api/v1/reviews`,
                requestBody: {
                    storeId: id,
                    review: review,
                    rating: rating
                },
            };
            let response = await mutateAsync(reqProps);

            if (response.status === 200) {
                showSnackBar(`上傳評論成功`, 'success');
                window.localStorage.removeItem(storageKey);
                history.push(`/stores/${id}`)
            } else {
                showSnackBar(`上傳評論失敗`, 'error');
                return new Error()
            }

        }

        return <Paper className={classes.root}>
            <Button variant="outlined" className={classes.goBackBtn} onClick={()=>history.push(`/stores/${id}`)}>
                <FontAwesomeIcon icon={faAngleDoubleLeft}/>
                <span className={classes.goBackText}>返回店家</span>
            </Button>
            <Box>
                <h3>
                    新增評論
                </h3>
                <Typography variant="body1" color="textSecondary" component="p">
                    {store.name}
                </Typography>
            </Box>
            <Box mt={3} mb={3}>
                <Typography variant="body1" color="textPrimary" component="p" className={classes.ratingTitle}>
                    評分：
                </Typography>
                <Rating
                    name="customized-empty"
                    value={rating}
                    size={"large"}
                    onChange={(_event, newValue) => {
                        setRating(newValue);
                    }}
                    emptyIcon={<StarBorderIcon fontSize="inherit"/>}
                />
                {!rating && <Typography variant="caption" component="p" className={classes.ratingText}>
                    請輸入評分
                </Typography>}
            </Box>
            <QuillEditor
                storageKey={storageKey}
            />
            <Box mt={2} mb={2}>
                <Button variant="outlined" color="primary" className={classes.submitBtn} onClick={onSubmit}>
                    送出
                </Button>
                <Button variant="outlined" color="default" className={classes.cancelBtn}>
                    取消
                </Button>
            </Box>


            <Dialog open={isLoading}>
                <DialogContent>
                    <DialogContentText id="loading">
                        上傳中，請稍等
                        <LoadingIcon/>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </Paper>
    }
    return null;
};

export default withRouter(AddReviewPage);
