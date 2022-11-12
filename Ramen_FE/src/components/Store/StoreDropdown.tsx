import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import StyledMenu from "../StyledMenu/StyledMenu";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DeleteModal from "./DeleteModal";
import {IStore} from "../../types/IStore";

const useStyles = makeStyles(() => ({
        dropdownBtn: {
            color: "#585b5d",
            margin: 10,
            display: "inline",
            float: "right",
            padding: 5
        },
        divider: {
            height: 28,
            margin: 8,
        },
        listItemIcon: {
            minWidth: 36,
        },
        menuItem: {
            margin:5
        }
    }),
);

type Props = {
    store: IStore
}
const StoreDropdown = (props: Props) => {
    const classes = useStyles();
    const store = props.store;
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [modalShow, setModalShow] = useState(false);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleEditBtnClick = () => {
        setAnchorEl(null);
        setModalShow(true);
    }
    const handleDeleteBtnClick = () => {
        setAnchorEl(null);
        setModalShow(true);
    }
    return (
        <>
            <Button variant="outlined" className={classes.dropdownBtn} onClick={handleClick}>
                <MoreHorizIcon/>
                <ExpandMoreIcon/>
            </Button>
            <StyledMenu
                id="store-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
            >
                <MenuItem className={classes.menuItem} onClick={handleEditBtnClick}>
                    <ListItemIcon className={classes.listItemIcon}>
                        <EditIcon/>
                    </ListItemIcon>
                    <ListItemText primary="編輯"/>
                </MenuItem>
                <MenuItem className={classes.menuItem} onClick={handleDeleteBtnClick}>
                    <ListItemIcon className={classes.listItemIcon}>
                        <DeleteForeverIcon/>
                    </ListItemIcon>
                    <ListItemText primary="刪除"/>
                </MenuItem>
            </StyledMenu>
            <DeleteModal
                storeId={store._id}
                storeName={store.name}
                open={modalShow}
                onClose={() => setModalShow(false)}
            />
        </>
    );
};

export default StoreDropdown;
