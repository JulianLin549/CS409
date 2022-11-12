import {IComment} from "../../types/IComment";
import {DateTime} from "luxon";
import Avatar from "@material-ui/core/Avatar";
import {makeStyles, Theme} from "@material-ui/core/styles";
import {Box, Grid, Paper, Typography} from "@material-ui/core";
import CommentDropdown from "./CommentDropdown";
import {useState} from "react";
import EditComment from "./EditComment";
import {useUser} from "../../Context/UserContext";

const useStyles = makeStyles((theme: Theme) => ({
    avatar: {
        marginRight: 10,
        width: theme.spacing(6),
        height: theme.spacing(6),
    },
    createdTime: {
        margin: 0
    },
    paper: {
        marginTop: 15,
        backgroundColor: "#efefef",
        boxShadow: "2px 2px 5px 1px rgba(0, 0, 0, 0.2)",
        borderRadius: 5,
        padding: 20,
        paddingTop:0,
        "&::before": {
            content: '""',
            position: "relative",
            top:-30,
            width: 0,
            height: 0,
            borderLeft: "10px solid transparent",
            borderRight: "10px solid transparent",
            borderBottom: "10px solid #efefef",
        },
    },
}))

type Props = {
    comment: IComment,
    storeId: string
}
const Comment = (props: Props) => {
    const {user} = useUser()!;
    const comment = props.comment;
    const storeId = props.storeId;
    const [commentText, setCommentText] = useState<string>(comment.text);
    const commentAuthorId = props.comment?.author?._id;
    const [editSectionShow, setEditSectionShow] = useState(false);
    const classes = useStyles();
    const dt = DateTime.fromISO(comment.createdAt).setLocale('zh-tw');

    return (
        <Box mt={4} mb={4}>
            <Grid container spacing={1}>
                <Grid item>
                    {<Avatar variant="rounded" src={comment.author.avatar} className={classes.avatar}/>}
                </Grid>
                <Grid item xs={12} sm container>
                    <Grid item xs container direction="column">
                        <Grid item xs>
                            <Typography variant="subtitle1">
                                {comment.author.username}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" className={classes.createdTime}>
                                {dt.toRelative()}
                            </Typography>
                        </Grid>
                    </Grid>

                    {user && comment && (user._id === commentAuthorId) &&
                    <Grid item>
                        <Typography variant="body2">
                            <CommentDropdown comment={comment}
                                             storeId={storeId}
                                             editSectionShow={editSectionShow}
                                             setEditSectionShow={setEditSectionShow}
                            />
                        </Typography>
                    </Grid>
                    }

                </Grid>
            </Grid>
            {editSectionShow &&
            <EditComment
                commentText={commentText}
                commentId={comment._id}
                setCommentText={setCommentText}
                setEditSectionShow={setEditSectionShow}
            />
            }
            {!editSectionShow &&
            <Paper className={classes.paper}>
                <Typography variant="body1">
                    {commentText}
                </Typography>
            </Paper>
            }
        </Box>
    );
};

export default Comment;
