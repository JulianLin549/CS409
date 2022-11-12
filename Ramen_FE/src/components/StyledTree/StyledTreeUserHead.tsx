import TreeItem, {TreeItemProps} from "@material-ui/lab/TreeItem";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import React from "react";
import {SvgIconProps} from "@material-ui/core/SvgIcon";
import {makeStyles, Theme} from "@material-ui/core/styles";

type StyledTreeUserHeadProps = TreeItemProps & {
    labelIcon?: React.ElementType<SvgIconProps> | string;
    labelInfo?: string | number | null;
    labelText?: string;
    avatar?: string;
};
const useStyles = makeStyles((theme: Theme) => ({
        root: {
            marginTop: "10px",
            color: theme.palette.text.secondary,
            '&:hover > $content': {
                backgroundColor: theme.palette.action.hover,
            },
            '&:focus > $content, &$selected > $content ': {
                backgroundColor: `#e8f0fe`,
                color: '#1a73e8',
            },
            '&:focus > $content $label, &:hover > $content $label, &$selected > $content $label': {
                backgroundColor: 'transparent',
            },
        },
        content: {
            padding: 3,
            margin: "1px 0",
            color: theme.palette.text.secondary,
            borderTopRightRadius: theme.spacing(2),
            borderBottomRightRadius: theme.spacing(2),
            paddingRight: theme.spacing(1),
            fontWeight: theme.typography.fontWeightMedium,
            '$expanded > &': {
                fontWeight: theme.typography.fontWeightRegular,
            },
        },
        group: {
            marginLeft: 0,
            '& $content': {
                paddingLeft: theme.spacing(2),
            },
        },
        expanded: {},
        selected: {},
        label: {
            fontWeight: 'inherit',
            color: 'inherit',
            "&:hover": {
                color: '#1a73e8',
                textDecoration: "none",
            }
        },
        labelIcon: {
            width: "24px",
            height: "24px",
            marginRight: theme.spacing(2),
        },
        labelText: {
            fontSize: '1rem',
            fontWeight: 500,
            flexGrow: 1,
        },
        headLabel: {
            margin: "5px 0",
            display: 'flex',
            alignItems: 'center',
            color: theme.palette.text.secondary,
            fontSize: '0.9rem',
            padding: theme.spacing(0.5, 0),
            "&:hover": {
                color: '#1a73e8',
                textDecoration: "none",
            }
        },
        avatar: {
            marginRight: theme.spacing(2),
        },
    }),
);


function StyledTreeUserHead(props: StyledTreeUserHeadProps) {
    const {avatar, labelText, labelIcon: LabelIcon, labelInfo, ...other} = props;
    const classes = useStyles();
    // @ts-ignore
    return (
        <TreeItem
            label={
                <div className={classes.headLabel}>
                    <Avatar alt="avatar" src={avatar} className={classes.avatar}/>
                    {LabelIcon && <LabelIcon color="inherit" className={classes.labelIcon}/>}
                    <Typography variant="body2" className={classes.labelText}>
                        {labelText}
                    </Typography>
                    {!!labelInfo && labelInfo != 0 && <Chip
                        variant="outlined"
                        size="small"
                        clickable
                        label={labelInfo}
                        color="secondary"
                    />}
                </div>
            }
            classes={{
                root: classes.root,
                content: classes.content,
                expanded: classes.expanded,
                selected: classes.selected,
                group: classes.group,
                label: classes.label,
            }}
            {...other}
        />
    );
}

export default StyledTreeUserHead;
