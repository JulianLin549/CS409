import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import useDelete from "../../customHooks/UseDelete";
import useStackedSnackBar from "../../customHooks/UseStackedSnackBar";
import {useHistory} from "react-router-dom";


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
    storeName: {
        borderRadius: 4,
        padding: 10,
        fontSize: "1rem",
        backgroundColor: "#e2dfdf",
    },

}))

type Props = {
    commentId: string,
    storeId: string,
    commentText: string,
    open: boolean,
    onClose: () => void
}
const DeleteCommentModal = (props: Props) => {
    const classes = useStyles();
    const commentId = props.commentId;
    const storeId = props.storeId;
    const history = useHistory();
    const commentText = props.commentText;
    const {mutateAsync} = useDelete();
    const showSnackBar = useStackedSnackBar();

    const handleDeleteComment = async () => {
        try {
            const reqProps = {
                url: process.env.REACT_APP_BE_URL + `/api/v1/comments`,
                requestQuery: {},
                requestBody: {commentId: commentId, storeId: storeId},
            };
            await mutateAsync(reqProps);
            showSnackBar(`成功刪除: ${commentText}`, 'success');
            history.go(0);
        } catch (e) {
            showSnackBar(`刪除: ${commentText} 失敗`, 'error')
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
                <DialogTitle id="form-dialog-title">{`刪除留言`}</DialogTitle>
                <DialogContent>
                    <DialogContentText className={classes.storeNameOuter}>
                        <span className={classes.storeName}>{commentText}</span>
                    </DialogContentText>
                </DialogContent>
                <DialogActions className={classes.bottom}>
                    <Button variant="outlined" color="secondary" onClick={handleDeleteComment}>
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

export default DeleteCommentModal;

