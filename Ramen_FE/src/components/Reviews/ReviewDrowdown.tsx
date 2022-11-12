import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import StyledMenu from "../StyledMenu/StyledMenu";
import DeleteReviewModal from "./DeleteReviewModal";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {IconButton} from "@material-ui/core";
import {IReview} from "../../types/IReview";
import EditReviewModal from "./EditReviewModal";

const useStyles = makeStyles(() => ({
        dropdownBtn: {
            color: "#585b5d",
            padding: 5,
            display: "inline",
            float: "right",
        },
        divider: {
            height: 28,
            margin: 8,
        },
        listItemIcon: {
            minWidth: 36,
        },
        menuItem: {
            margin: 5
        }
    }),
);

type Props = {
    review: IReview,
    storeId: string,
}
const ReviewDropdown = (props: Props) => {
    const classes = useStyles();
    const review = props.review;
    const storeId = props.storeId;
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);


    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleEditBtnClick = () => {
        setAnchorEl(null);
        setEditModalShow(true);
    }
    const handleDeleteBtnClick = () => {
        setAnchorEl(null);
        setDeleteModalShow(true);
    }
    return (
        <>
            <IconButton className={classes.dropdownBtn} onClick={handleClick}>
                <MoreVertIcon/>
            </IconButton>
            <StyledMenu
                id="review-menu"
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

            <EditReviewModal
                review={review}
                storeId={storeId}
                open={editModalShow}
                onClose={() => setEditModalShow(false)}
            />
            <DeleteReviewModal
                review={review}
                storeId={storeId}
                open={deleteModalShow}
                onClose={() => setDeleteModalShow(false)}
            />


        </>
    );
};

export default ReviewDropdown;
