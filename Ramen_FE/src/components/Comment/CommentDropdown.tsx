import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import StyledMenu from "../StyledMenu/StyledMenu";
import DeleteCommentModal from "./DeleteCommentModal";
import {IComment} from "../../types/IComment";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {IconButton} from "@material-ui/core";

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
    comment: IComment,
    storeId: string,
    editSectionShow: boolean,
    setEditSectionShow: Function
}
const CommentDropdown = (props: Props) => {
    const classes = useStyles();
    const comment = props.comment;
    const storeId = props.storeId;
    const setEditSectionShow = props.setEditSectionShow;
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [modalShow, setModalShow] = useState(false);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleEditBtnClick = () => {
        setEditSectionShow(true);
    }
    const handleDeleteBtnClick = () => {
        setAnchorEl(null);
        setModalShow(true);
    }
    return (
        <>
            <IconButton className={classes.dropdownBtn} onClick={handleClick}>
                <MoreVertIcon/>
            </IconButton>
            <StyledMenu
                id="comment-menu"
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
            <DeleteCommentModal
                commentId={comment._id}
                storeId={storeId}
                commentText={comment.text}
                open={modalShow}
                onClose={() => setModalShow(false)}
            />
        </>
    );
};

export default CommentDropdown;
