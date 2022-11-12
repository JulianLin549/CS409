import {IStore} from '../../types/IStore'
import Comments from "../Comment/Comments";
import Reviews from "../Reviews/Reviews";
import Box from "@material-ui/core/Box";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import FollowBtn from "../FollowBtn/FollowBtn";
import {Divider, Paper} from "@material-ui/core";
import {LocationOn} from "@material-ui/icons";
import StoreDropdown from "./StoreDropdown";
import TabPanel from "./TabPanel";
import {useRef} from "react";
import StoreIntro from "./StoreIntro";
import Tags from "./Tags";
import {useUser} from "../../Context/UserContext";
import {UserRole} from "../../enums/UserRole";

const useStyles = makeStyles(() => ({
    root: {
        padding: 10,
        borderRadius: 10,
    },
    title: {
        margin: 2
    },
    rateValue: {
        marginRight: 2,
        fontWeight: 'bold',
        display: 'inline',
    },
    locationIcon: {
        marginLeft: 0,
        marginRight: 4,
        fontSize: 18,
    },
    reviewCount: {
        color: "#2589ff",
        marginLeft: 8,
        fontWeight: 'bold',
        display: 'inline',
        textDecoration: "underline",
        "&:hover": {
            cursor: "pointer"
        }
    },
    storeDropdown: {
        margin: 10,
        display: "inline",
        float: "right",
    },
    divider: {
        color: 'black',
        margin: "25px auto 0px auto"
    }
}))

type Props = {
    currentTabNum: number,
    setCurrentTabNum: Function,
    data: {
        mapboxAccessToken: string,
        isStoreOwner: boolean,
        store: IStore
    }
}

const StoreRightCol = (props: Props) => {
    const commentEl = useRef<HTMLDivElement>(null);
    const currentTabNum = props.currentTabNum;
    const setCurrentTabNum = props.setCurrentTabNum;
    const classes = useStyles();
    const store = props.data.store;
    const reviewLength = store.storeRelations?.reviews.length;
    const storeId = store._id;
    const storeRating = (store.rating ? store.rating : 0).toFixed(1);
    const {user} = useUser()!;
    const canEdit = user && (user.userRole === UserRole.ADMIN ||
        (user.userRole === UserRole.STORE_OWNER && store.storeRelations?.owners?.includes(user._id)));

    const gotoComment = () => {
        setCurrentTabNum(1);
        if (commentEl.current) {
            commentEl.current.scrollIntoView();
        }
    }


    return (
        <Paper className={classes.root}>
            {/* <Box m={5} mb={1}>
                <FollowBtn store={store}/>
                {canEdit && <StoreDropdown store={store}/>}
            </Box> */}

            <Box pt={1} p={5}>
                <h2 className={classes.title}>{store.name}</h2>

                <Box color={'grey.500'} display={'flex'} alignItems={'center'} m={2} ml={0.5}>
                    <Typography variant={'body2'} className={classes.rateValue}>
                        {storeRating}
                    </Typography>
                    <Rating name={'rating'} value={store.rating} size={'small'} precision={0.1} readOnly/>
                    <Typography variant={'body2'} onClick={gotoComment} className={classes.reviewCount}>
                        {reviewLength} 則評論
                    </Typography>
                </Box>

                <Box color={'grey.500'} display={'flex'} alignItems={'center'} mb={1} ml={0}>
                    <LocationOn className={classes.locationIcon}/>
                    <span className={classes.locationIcon}>{store.city}</span>
                </Box>
                <Tags/>

                <Divider className={classes.divider} orientation="horizontal" variant="fullWidth"/>

                <TabPanel value={currentTabNum} index={0}>
                    <StoreIntro store={store}/>
                    <Comments storeId={storeId}/>
                </TabPanel>
                <TabPanel value={currentTabNum} index={1}>
                    <div ref={commentEl}>
                        <Reviews storeId={storeId}/>
                    </div>
                </TabPanel>

            </Box>

        </Paper>
    );
}

export default StoreRightCol;