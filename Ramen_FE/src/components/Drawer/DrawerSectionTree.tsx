import {makeStyles} from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import NotificationsIcon from "@material-ui/icons/Notifications";
// import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import CommentIcon from "@material-ui/icons/Comment";
import BookmarkIcon from '@material-ui/icons/Bookmark';
import {useNotification} from "../../Context/NotificationContext";
import {faMapMarkedAlt, faStoreAlt, faStreetView, faUser} from "@fortawesome/free-solid-svg-icons";
import TaiwanIcon from "../../static/taiwan.svg";
import TaipeiMetroIcon from "../../static/taipei_metro_logo_gray.svg";
import KaohsiungMetroIcon from "../../static/kaohsiung_metro_logo_gray.svg";
// import InfoIcon from '@material-ui/icons/Info';
// import SettingsIcon from "@material-ui/icons/Settings";
import Divider from "@material-ui/core/Divider";
import {useUser} from "../../Context/UserContext";
import StyledTreeItemHead from "../StyledTree/StyledTreeItemHead";
import StyledTreeItem from "../StyledTree/StyledTreeItem";
import {Box} from "@material-ui/core";

const useStyles = makeStyles(() => ({
        root: {
            // height: 264,
            // flexGrow: 0.8,
            maxWidth: 240,
        },
    }),
);

type Props = {
    toggleDrawerOpen: () => void;
}


export default function CustomTreeView(props: Props) {
    const classes = useStyles();
    const {user} = useUser()!;
    // const {notificationCount, setNotificationCount} = useNotification()!;
    const toggleDrawerOpen = props.toggleDrawerOpen;

    return (

        <Box mt={1}>
            <TreeView
                className={classes.root}
                defaultExpanded={['10', '20']}
                defaultCollapseIcon={<ArrowDropDownIcon/>}
                defaultExpandIcon={<ArrowRightIcon/>}
            >
                {/* <StyledTreeItem
                    nodeId="0"
                    labelText="附近店家"
                    to="/storesAround"
                    labelIconFA={faStreetView}
                    onClick={toggleDrawerOpen}
                /> */}
                <Divider/>
                <StyledTreeItem
                    nodeId="1"
                    labelText="店家列表"
                    to="/stores"
                    labelIconFA={faStoreAlt}
                    onClick={toggleDrawerOpen}
                />
                <Divider/>

                <StyledTreeItemHead
                    nodeId="10"
                    labelText="地圖"
                    labelIconFA={faMapMarkedAlt}
                >
                    <StyledTreeItem
                        nodeId="11"
                        labelText="臺灣地圖"
                        to="/map"
                        labelIconSVG={TaiwanIcon}
                        onClick={toggleDrawerOpen}
                    />
                    {/* <StyledTreeItem
                        nodeId="12"
                        labelText="臺北捷運地圖"
                        labelIconSVG={TaipeiMetroIcon}
                        to="/map/TaipeiMetro"
                        onClick={toggleDrawerOpen}
                    />
                    <StyledTreeItem
                        nodeId="13"
                        labelText="高雄捷運地圖"
                        labelIconSVG={KaohsiungMetroIcon}
                        to="/map/KaohsiungMetro"
                        onClick={toggleDrawerOpen}
                    /> */}
                </StyledTreeItemHead>
                <Divider/>


            </TreeView>
        </Box>
    );
}
