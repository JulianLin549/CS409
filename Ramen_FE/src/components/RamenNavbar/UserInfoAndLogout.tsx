import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircle from "@material-ui/icons/AccountCircle";
import InfoIcon from '@material-ui/icons/Info';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Avatar from '@material-ui/core/Avatar';
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import StyledMenu from "../StyledMenu/StyledMenu";
import {makeStyles} from "@material-ui/core/styles";
import {useUser} from "../../Context/UserContext";
import {useHistory} from "react-router-dom";
import Cookies from "js-cookie";
import {Divider} from "@material-ui/core";

const useStyles = makeStyles(() => ({
        imageIcon: {
            height: "24px",
            width: "24px"
        },
        listItemIcon: {
            minWidth: 36,
        },
        divider: {
            width: 190,
            margin: "1px auto"
        }
    }),
);
const UserInfoAndLogout = () => {
    const classes = useStyles();
    const history = useHistory();
    const {user, setUser} = useUser()!;
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        setUser(null);
        await Cookies.remove('access_token', {path: '', domain: process.env.REACT_APP_DOMAIN});
        window.localStorage.removeItem("current_user");
        history.push("/");
    }

    return (
        <div>
            <Button
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                color="inherit"
                onClick={handleClick}
            >
                {user && <Box m={2}>
                    <Typography variant="button" display="inline">
                        {user?.fbName}
                    </Typography>
                </Box>}
                {user ? <Avatar src={user?.avatar}/> : <AccountCircle/>}
                <ExpandMoreIcon/>
            </Button>

            <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem>
                    <ListItemIcon className={classes.listItemIcon}>
                        <InfoIcon className={classes.imageIcon}/>
                    </ListItemIcon>
                    <ListItemText primary="個人資料"/>
                </MenuItem>
                <Divider className={classes.divider} orientation="horizontal"/>
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon className={classes.listItemIcon}>
                        <ExitToAppIcon className={classes.imageIcon}/>
                    </ListItemIcon>
                    <ListItemText primary="登出"/>
                </MenuItem>
            </StyledMenu>
        </div>
    );
}
export default UserInfoAndLogout;
