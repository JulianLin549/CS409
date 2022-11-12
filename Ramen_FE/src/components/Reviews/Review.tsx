import {IReview} from "../../types/IReview";
import {DateTime} from "luxon";
import {Box, Grid, Paper, Typography} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import {useUser} from "../../Context/UserContext";
import {makeStyles, Theme} from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import ReactQuill from "react-quill";
import he from 'he';
import ReviewDropdown from "./ReviewDrowdown";

const useStyles = makeStyles((theme: Theme) => ({
    avatar: {
        marginRight: 10,
        width: theme.spacing(6),
        height: theme.spacing(6),
    },
    createdTime: {
        marginRight: 8,
        fontWeight: 'bold',
        margin: 0
    },
    paper: {
        marginTop: 15,
        backgroundColor: "#f8f6f6",
        boxShadow: "2px 2px 5px 1px rgba(0, 0, 0, 0.2)",
        borderRadius: 5,
        padding: 20,
        paddingTop: 0,
        "&::before": {
            content: '""',
            position: "relative",
            top: -30,
            width: 0,
            height: 0,
            borderLeft: "10px solid transparent",
            borderRight: "10px solid transparent",
            borderBottom: "10px solid #efefef",
        },
    },
    rateValue: {
        marginRight: 2,
        fontWeight: 'bold',
        display: 'inline',
    },
    reviewText: {
        "& > div.ql-editor": {
            fontSize: "1rem",
        },
        "& > div.ql-tooltip": {
            height: 0
        }
    }
}))

type Props = {
    review: IReview,
    storeId: string
}
const Review = (props: Props) => {
    const classes = useStyles();
    const {user} = useUser()!;
    const review = props.review;
    const storeId = props.storeId;
    const author = review.author;
    const reviewCreateTime = DateTime.fromISO(review.createdAt).setLocale('zh-tw');

    return (
        <Box mt={4} mb={4}>
            <Grid container spacing={1}>
                <Grid item>
                    {<Avatar variant="rounded" src={author.avatar} className={classes.avatar}/>}
                </Grid>
                <Grid item xs={12} sm container>
                    <Grid item xs container direction="column">
                        <Grid item xs>
                            <Typography variant="subtitle1">
                                {author.username}
                            </Typography>
                            <Box color={'grey.500'} display={'flex'} alignItems="flex-start" m={0}>
                                <Typography variant="body2" color="textSecondary" className={classes.createdTime}>
                                    {reviewCreateTime.toRelative()}
                                </Typography>
                                <Rating name={'rating'} value={review.rating} size={'small'} precision={0.1} readOnly/>
                            </Box>
                        </Grid>
                    </Grid>
                    {user && review && (user._id === author.id) &&
                    <Grid item>
                        <Typography variant="body2">
                            <ReviewDropdown review={review}
                                            storeId={storeId}
                            />
                        </Typography>
                    </Grid>
                    }
                </Grid>
            </Grid>

            <Paper className={classes.paper}>

                <ReactQuill
                    value={he.decode(review.text)}
                    readOnly={true}
                    theme={"bubble"}
                >
                    <div className={classes.reviewText}/>
                </ReactQuill>
            </Paper>


        </Box>
    );
};

export default Review;
