import Button from "@material-ui/core/Button";
import LocalOfferRoundedIcon from "@material-ui/icons/LocalOfferRounded";
import {makeStyles} from "@material-ui/core/styles";
import usePut from "../../customHooks/UsePut";
import useStackedSnackBar from "../../customHooks/UseStackedSnackBar";
import {IStore} from "../../types/IStore";
import {useState} from "react";
import {useUser} from "../../Context/UserContext";


const useStyles = makeStyles(() => ({
    followBg: {
        zIndex: 100,
        margin: 10,
        backgroundColor: "white",
        "&:hover": {
            backgroundColor: "#efefef",
            boxShadow: '0 3px 7px 2px rgba(0,0,0,0.1)'

        },
        "&:hover, &.Mui-focusVisible": {
            backgroundColor: "white"
        }
    },
    follow: {
        margin: "2px",
        color: "#7d7d7d",
        fontSize: "0.85rem"
    },
    unfollow: {
        margin: "2px",
        color: "#2589ff",
        fontSize: "0.85rem"
    },
}))
type Props = {
    store: IStore,
}
const FollowBtn = (props: Props) => {
    const classes = useStyles();
    const store = props.store;
    const {user} = useUser()!;

    const [isUserFollowStore, setIsUserFollowStore] = useState<boolean | undefined>(store.storeRelations?.followers?.includes(user?._id as string));

    const {mutateAsync} = usePut();
    const showSnackBar = useStackedSnackBar();


    const handleFollowBtnClick = async () => {
        // if followed, unFollow
        if (isUserFollowStore) {
            try {
                const reqProps = {
                    url: process.env.REACT_APP_BE_URL + `/api/v1/stores/${store._id}/unfollow`,
                    requestBody: {},
                };
                await mutateAsync(reqProps);
                showSnackBar(`成功取消追蹤: ${store.name}`, 'default');
                setIsUserFollowStore(!isUserFollowStore);
            } catch (e) {
                showSnackBar(`取消追蹤: ${store.name} 失敗`, 'error')
            }

        } else {
            try {
                const reqProps = {
                    url: process.env.REACT_APP_BE_URL + `/api/v1/stores/${store._id}/follow`,
                    requestBody: {},
                };
                await mutateAsync(reqProps);
                showSnackBar(`成功追蹤: ${store.name}`, 'success');
                setIsUserFollowStore(!isUserFollowStore);
            } catch (e) {
                showSnackBar(`追蹤: ${store.name} 失敗`, 'error')
            }
        }

    }
    return (
        <>
            {
                !isUserFollowStore &&
                <Button size={"medium"} variant="outlined" className={classes.followBg}
                        onClick={() => handleFollowBtnClick()}>
                    <LocalOfferRoundedIcon className={classes.follow}/>
                    <span className={classes.follow}>追蹤</span>
                </Button>
            }
            {
                isUserFollowStore &&
                <Button size={"medium"} variant="outlined" className={classes.followBg}
                        onClick={() => handleFollowBtnClick()}>
                    <LocalOfferRoundedIcon className={classes.unfollow}/>
                    <span className={classes.unfollow}>已追蹤</span>
                </Button>
            }
        </>
    )
        ;
};

export default FollowBtn;
