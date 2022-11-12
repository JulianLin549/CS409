import React from 'react';
import TreeItem, {TreeItemProps} from "@material-ui/lab/TreeItem";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import {SvgIconProps} from "@material-ui/core/SvgIcon";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {makeStyles, Theme} from "@material-ui/core/styles";


const useStyles = makeStyles((theme: Theme) => ({
        root: {
            margin: 5,
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
        avatar: {
            marginRight: theme.spacing(2),
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
        labelText: {
            fontSize: '1rem',
            fontWeight: 500,
            flexGrow: 1,
        },
    }),
);

type StyledTreeItemHeadProps = TreeItemProps & {
    labelIcon?: React.ElementType<SvgIconProps> | string;
    labelIconFA?: IconProp;
    labelIconSVG?: string;
    labelInfo?: string | number | null;
    labelText?: string;
};


function StyledTreeItemHead(props: StyledTreeItemHeadProps) {
    const classes = useStyles();
    const {labelText, labelIcon: LabelIcon, labelIconFA, labelIconSVG, labelInfo, ...other} = props;

    return (
        <TreeItem
            label={
                <div className={classes.headLabel}>
                    {LabelIcon && <LabelIcon color="inherit" className={classes.labelIcon}/>}
                    {labelIconFA && <FontAwesomeIcon icon={labelIconFA} color="inherit" className={classes.labelIcon}/>}
                    {labelIconSVG && <img className={classes.labelIcon} src={labelIconSVG} alt="alt"/>}
                    <Typography variant="body2" className={classes.labelText}>
                        {labelText}
                    </Typography>
                    {!!labelInfo && labelInfo !== 0 && <Chip
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

export default StyledTreeItemHead;
