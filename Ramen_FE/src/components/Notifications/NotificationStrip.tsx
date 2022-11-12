import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {makeStyles, Theme} from "@material-ui/core/styles";
import {DateTime} from "luxon";
import {Link} from "react-router-dom";
import {INotification} from "../../types/INotification";
import Typography from "@material-ui/core/Typography";
import cx from "clsx";


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
            padding: 10,
            margin: 5,
            boxShadow: '0 2px 4px -2px rgba(0,0,0,0.24), 0 4px 8px -2px rgba(0, 0, 0, 0.2)',
            color: theme.palette.text.primary,
            "&:hover": {
                color: theme.palette.text.primary,
                textDecoration: "none",
            }
        },
        unRead: {
            backgroundColor: "#ffeadd"
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
    notification: INotification
}
const NotificationStrip = (props: Props) => {
    const classes = useStyles();
    const notification = props.notification;
    const dt = DateTime.fromISO(notification.createdAt).setLocale('zh-tw');
    const isReadClass = notification.isRead ? null : classes.unRead;
    return (
        <>
            <List component={Link} to={`/stores/${notification.storeId}`} className={cx(classes.root, isReadClass)}>
                <ListItem
                    button
                >
                    <ListItemText primary={notification.storeName}/>
                    <Typography color={'textSecondary'} variant={'body2'}>
                        {`更新於 ${dt.toRelative()}`}
                    </Typography>
                </ListItem>
            </List>

        </>

    );
};

export default NotificationStrip;
