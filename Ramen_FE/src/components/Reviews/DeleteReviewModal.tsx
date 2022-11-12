import {
    Button,
    Dialog,
    DialogActions, DialogContent, DialogContentText,
    DialogTitle,
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import useDelete from "../../customHooks/UseDelete";
import useStackedSnackBar from "../../customHooks/UseStackedSnackBar";
import {useHistory} from "react-router-dom";
import he from "he";
import ReactQuill from "react-quill";
import {IReview} from "../../types/IReview";


const useStyles = makeStyles(() => ({
    dialog: {
        padding: 10,
        width: "50vw",
        minWidth: 300,
        maxWidth: 600
    },
    content: {
        color: "#585b5d",
        marginBottom: 30
    },
    btn: {
        color: "#585b5d",
        "&:hover": {
            backgroundColor: "#efefef",
        },
    },
    bottom: {
        margin: 10,
    },
    input: {
        marginTop: 20,
    },
    storeNameOuter: {
        margin: '10px 0'
    },
    reviewText: {
        "& > div.ql-editor": {
            borderRadius: 5,
            fontSize: "1rem",
            backgroundColor: "#e2dfdf",
        },
        "& > div.ql-tooltip": {
            height: 0
        }
    }
}))

type Props = {
    review: IReview,
    storeId: string,
    open: boolean,
    onClose: () => void
}
const DeleteReviewModal = (props: Props) => {
    const classes = useStyles();
    const reviewId = props.review._id;
    const storeId = props.storeId;
    const history = useHistory();
    const reviewText = props.review.text;
    const {mutateAsync} = useDelete();
    const showSnackBar = useStackedSnackBar();

    const handleDeleteReview = async () => {
        try {
            const reqProps = {
                url: process.env.REACT_APP_BE_URL + `/api/v1/reviews`,
                requestQuery: {},
                requestBody: {reviewId, storeId},
            };
            await mutateAsync(reqProps);
            showSnackBar(`成功刪除評論`, 'success');
            history.go(0);
        } catch (e) {
            showSnackBar(`刪除評論失敗`, 'error')
        } finally {
            props.onClose();
        }
    }
    const handleDialogClose = () => {
        props.onClose();
    }

    return (
        <Dialog open={props.open} onClose={handleDialogClose} aria-labelledby="form-dialog-title">
            <div className={classes.dialog}>
                <DialogTitle id="form-dialog-title">{`確認刪除評論，這個動作無法返回`}</DialogTitle>
                <DialogContent>
                    <DialogContentText className={classes.storeNameOuter}>
                        <ReactQuill
                            value={he.decode(reviewText)}
                            readOnly={true}
                            theme={"bubble"}
                        >
                            <div className={classes.reviewText}/>
                        </ReactQuill>
                    </DialogContentText>
                </DialogContent>
                <DialogActions className={classes.bottom}>
                    <Button variant="outlined" color="secondary" onClick={handleDeleteReview}>
                        刪除
                    </Button>
                    <Button variant='text' onClick={props.onClose} className={classes.btn}>
                        取消
                    </Button>
                </DialogActions>
            </div>
        </Dialog>
    );
};

export default DeleteReviewModal;

