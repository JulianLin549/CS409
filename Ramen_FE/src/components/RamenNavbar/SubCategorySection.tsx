import Button from "@material-ui/core/Button";
import {Link as RouterLink} from "react-router-dom";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Divider from "@material-ui/core/Divider";
import {makeStyles, Theme} from "@material-ui/core/styles";
import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import StyledMenu from "../StyledMenu/StyledMenu";
import KaohsiungMetroIcon from '../../static/kaohsiung_metro_logo_gray.svg';
import TaipeiMetroIcon from '../../static/taipei_metro_logo_gray.svg';
import TaiwanIcon from '../../static/taiwan.svg';


const useStyles = makeStyles((theme: Theme) => ({
        selection: {
            fontFamily: "JFOpen",
            fontSize: "1rem",
            color: theme.palette.text.primary,
            display: 'none',
            [theme.breakpoints.up('sm')]: {
                display: 'block',
            },
            "&:hover": {
                color: theme.palette.text.primary,
            }
        },
        divider: {
            height: 28,
            margin: 8,
        },
        imageIcon: {
            width: "24px",
            height: "24px",
        },
        listItemIcon: {
            minWidth: 36,
        }
    }),
);

const SubCategorySection = () => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
            <Button component={RouterLink} className={classes.selection} to="/storesAround">
                附近店家
            </Button>
            <Divider className={classes.divider} orientation="vertical"/>

            <Button component={RouterLink} className={classes.selection} to="/stores">
                店家列表
            </Button>
            <Divider className={classes.divider} orientation="vertical"/>

            <Button className={classes.selection} onClick={handleClick}>
                地圖
                <ExpandMoreIcon/>
            </Button>

            <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem component={RouterLink} to="/map" onClick={handleClose}>
                    <ListItemIcon className={classes.listItemIcon}>
                        <img className={classes.imageIcon} src={TaiwanIcon} alt={"Taiwan icon"}/>
                    </ListItemIcon>
                    <ListItemText primary="臺灣地圖"/>
                </MenuItem>
                {/* <MenuItem component={RouterLink} to="/map/TaipeiMetro" onClick={handleClose}>
                    <ListItemIcon className={classes.listItemIcon}>
                        <img className={classes.imageIcon} src={TaipeiMetroIcon} alt={"Taipei MetroMap icon"}/>
                    </ListItemIcon>
                    <ListItemText primary="臺北捷運地圖"/>
                </MenuItem>
                <MenuItem component={RouterLink} to="/map/KaohsiungMetro" onClick={handleClose}>
                    <ListItemIcon className={classes.listItemIcon}>
                        <img className={classes.imageIcon} src={KaohsiungMetroIcon} alt={"Kaohsiung MetroMap icon"}/>
                    </ListItemIcon>
                    <ListItemText primary="高雄捷運地圖"/>
                </MenuItem> */}
            </StyledMenu>
        </>
    );
};

export default SubCategorySection;
