import {Button, Grid, TextField} from "@material-ui/core";
import {makeStyles, Theme} from "@material-ui/core/styles";
import {useUser} from "../../Context/UserContext";
import {ChangeEvent, useState} from "react";
import Avatar from "@material-ui/core/Avatar";
import usePost from "../../customHooks/usePost";
import useStackedSnackBar from "../../customHooks/UseStackedSnackBar";


const useStyles = makeStyles((theme: Theme) => ({
    input: {
        maxHeight: 60,
        margin: "0 5px",
        float: "right"
    },
    avatar: {
        width: theme.spacing(6),
        height: theme.spacing(6),
    },
    commentBtn: {
        margin: 5,
        padding: 0,
        maxHeight: 60
    }
}))

type Props = {
    storeId: string
}

const AddCommentModal = (props: Props) => {
    const classes = useStyles();
    const storeId = props.storeId;

    const [comment, setComment] = useState<string>("");
    const [commentBtnDisabled, setCommentBtnDisabled] = useState<boolean>(true);
    const [isInputFocus, setIsInputFocus] = useState<boolean>(false);

    const {mutateAsync} = usePost();
    const {user} = useUser()!;
    const showSnackBar = useStackedSnackBar();

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        setComment(input);
        if (input.length !== 0) {
            setCommentBtnDisabled(false)
        } else {
            setCommentBtnDisabled(true)
        }
    }

    const addComment = async () => {
        try {
            const reqProps = {
                url: process.env.REACT_APP_BE_URL + `/api/v1/comments`,
                requestBody: {
                    storeId: storeId,
                    comment: comment,
                },
            };
            await mutateAsync(reqProps);
            showSnackBar(`成功新增留言`, 'success');
            window.location.reload();
        } catch (e) {
            showSnackBar(`新增留言失敗`, 'error');
        }
    }

    return (
        <>
            <Grid container spacing={1}>
                <Grid item>
                    {<Avatar variant="rounded" src={user?.avatar} className={classes.avatar}/>}
                </Grid>
                <Grid item sm={12} md container>

                    <TextField
                        id="storeName"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        className={classes.input}
                        autoComplete='off'
                        onChange={handleInput}
                        onFocus={() => setIsInputFocus(true)}
                        onBlur={() => setIsInputFocus(false)}
                        error={commentBtnDisabled && isInputFocus}
                        helperText={commentBtnDisabled && isInputFocus ? '輸入不能為空' : ''}
                        defaultValue={"發表些店家的最新資訊！"}
                    />
                </Grid>

                <Button variant="outlined" disabled={commentBtnDisabled} className={classes.commentBtn}
                        onClick={addComment}>
                    留言
                </Button>

            </Grid>

        </>

    )

};

export default AddCommentModal;

