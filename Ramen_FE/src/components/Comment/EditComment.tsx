import {Box, Button, TextField} from "@material-ui/core";
import {makeStyles, Theme} from "@material-ui/core/styles";
import useStackedSnackBar from "../../customHooks/UseStackedSnackBar";
import usePut from "../../customHooks/UsePut";
import {useState} from "react";

const useStyles = makeStyles((theme: Theme) => ({
    input: {
        marginTop: 20,
    },
    buttons: {
        float: "right",
    },
    submitButton: {
        padding: 5,
        margin: 2
    },
    cancelButton: {
        color: theme.palette.text.secondary,
        padding: 5,
        margin: 2

    }
}))
type Props = {
    commentText: string,
    commentId: string,
    setCommentText: Function,
    setEditSectionShow: Function,
}
const EditComment = (props: Props) => {
    const classes = useStyles();
    const commentText = props.commentText;
    const commentId = props.commentId;
    const setCommentText = props.setCommentText;
    const [editedComment, setEditedComment] = useState(commentText);
    const setEditSectionShow = props.setEditSectionShow;
    const {mutateAsync} = usePut();
    const showSnackBar = useStackedSnackBar();

    const handleUpdate = async () => {
        try {
            const reqProps = {
                url: process.env.REACT_APP_BE_URL + `/api/v1/comments`,
                requestQuery: {},
                requestBody: {
                    commentId: commentId,
                    comment: editedComment
                },
            };
            await mutateAsync(reqProps);
            setCommentText(editedComment);
            showSnackBar(`成功更新留言`, 'success');
            setEditSectionShow(false);
        } catch (error) {
            showSnackBar(`更新留言失敗`, 'error');
            setEditSectionShow(false);
        }
    }

    return (
        <div>
            <TextField
                id="storeName"
                defaultValue={commentText}
                fullWidth
                margin="normal"
                variant="outlined"
                className={classes.input}
                autoComplete='off'
                onChange={(e: any) => setEditedComment(e.target.value)}
            />


            <Box className={classes.buttons} m={1}>
                <Button onClick={() => setEditSectionShow(false)} className={classes.cancelButton}>
                    取消
                </Button>
                <Button variant="outlined" color="primary" onClick={handleUpdate} className={classes.submitButton}>
                    送出
                </Button>
            </Box>

        </div>
    );
};

export default EditComment;
