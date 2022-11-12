import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {makeStyles, Theme} from "@material-ui/core/styles";
import {IStore} from "../../types/IStore";
import {DateTime} from "luxon";
import {Link} from "react-router-dom";
import FollowBtn from "../FollowBtn/FollowBtn";
import {ListItemSecondaryAction} from "@material-ui/core";


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
            margin: 10,
            boxShadow: '0 2px 4px -2px rgba(0,0,0,0.24), 0 4px 8px -2px rgba(0, 0, 0, 0.2)',
            color: theme.palette.text.primary,
            "&:hover": {
                color: theme.palette.text.primary,
                textDecoration: "none",
            }
        },
        selection: {
            fontFamily: "JFOpen",
            fontSize: "1rem",
            color: theme.palette.text.primary,
            "&:hover": {
                color: theme.palette.text.primary,
            }
        },
    }),
);

type Props = {
    store: IStore
}
const FollowingStrip = (props: Props) => {
    const classes = useStyles();
    const store = props.store;
    const dt = DateTime.fromISO(store.updatedAt ? store.updatedAt : store.createdAt).setLocale('zh-tw');

    return (
        <List className={classes.root}>
            <ListItem button component={Link} to={`/stores/${store._id}`}>
                <ListItemText primary={store.name}
                              secondary={`更新於 ${dt.toRelative()}`}/>
                <ListItemSecondaryAction>
                    <FollowBtn store={store}/>
                </ListItemSecondaryAction>
            </ListItem>
        </List>
    );
};

export default FollowingStrip;
