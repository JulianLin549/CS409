import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {makeStyles, Theme} from "@material-ui/core/styles";
import {IStore} from "../../types/IStore";
import {DateTime} from "luxon";
import {Box, Collapse, Divider} from "@material-ui/core";
import {useState} from "react";
import {ExpandLess, ExpandMore} from "@material-ui/icons";
import Rating from "@material-ui/lab/Rating";
import ReviewInfo from "./ReviewInfo";
import {IReview} from "../../types/IReview";
import Typography from "@material-ui/core/Typography";


const useStyles = makeStyles((theme: Theme) => ({
        title: {
            display: "flex",
            justifyContent: "left",
            marginLeft: 15,
            fontSize: "1.25rem",
        },
        root: {
            width: '100%',
            backgroundColor: theme.palette.background.paper,
            paddingLeft: 10,
            paddingRight: 10,
            margin: 5,
            boxShadow: '0 2px 4px -2px rgba(0,0,0,0.24), 0 4px 8px -2px rgba(0, 0, 0, 0.2)',
            color: theme.palette.text.primary,
            "&:hover": {
                color: theme.palette.text.primary,
                textDecoration: "none",
            }
        }
    }),
);

type Props = {
    review: IReview
}
const ReviewStrip = (props: Props) => {
    const classes = useStyles();
    const review = props.review
    const store = review.store as IStore;
    const [open, setOpen] = useState(false);

    const dt = DateTime.fromISO(review.updatedAt ? review.updatedAt : review.createdAt).setLocale('zh-tw');

    const handleClick = () => {
        setOpen(!open);
    };


    return (
        <>
            <List className={classes.root}>
                <ListItem button onClick={handleClick}>
                    <ListItemText primary={store.name}
                                  secondary={`評論更新於 ${dt.toRelative()}`}/>
                    <Rating name={'rating'} value={store.rating} size={'small'} precision={0.1}
                            readOnly/>
                    {open ? <ExpandLess/> : <ExpandMore/>}
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Divider/>
                    <Box m={2}>
                        <Typography color={'textPrimary'} variant={'body1'}>
                            您的評論：
                        </Typography>
                    </Box>
                    <List component="div" disablePadding>
                        <ReviewInfo storeId={store._id}/>
                    </List>
                </Collapse>
            </List>
        </>

    );
};

export default ReviewStrip;
