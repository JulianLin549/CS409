import React, {MutableRefObject} from 'react';
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Popper from "@material-ui/core/Popper";
import {makeStyles, Theme} from "@material-ui/core/styles";


const useStyles = makeStyles((theme: Theme) => ({
    popper: {
        zIndex: 9999,
        position: "relative"
    },
    arrow: {
        overflowX: "unset",
        overflowY: "unset",
        width: 0,
        height: 0,
        "&::before": {
            content: '""',
            position: "absolute",
            marginRight: "-1.1em",
            bottom: 0,
            right: "50%",
            width: 20,
            height: 20,
            boxShadow: "2px 2px 5px 1px rgba(0, 0, 0, 0.1)",
            backgroundColor: theme.palette.grey[500],
            transform: "translate(-50%, 50%) rotate(135deg)",
            clipPath: "polygon(-5px -5px, calc(100% + 5px) -5px, calc(100% + 5px) calc(100% + 5px))",
        },
    },
    paper: {
        padding: 15,
        overflow: 'auto',
        boxShadow: "2px 2px 5px 1px rgba(0, 0, 0, 0.1)"
    },
}))

type Props = {
    open: boolean,
    anchorEl: MutableRefObject<null>,
    hoverStationName: string
}

const MetroMapPopper = (props: Props) => {
    const classes = useStyles();
    const [arrowRef] = React.useState(null);

    return (
        <Popper
            id={'popper-bottom'}
            open={props.open}
            anchorEl={props.anchorEl.current}
            placement='top'
            className={classes.popper}
            modifiers={{
                flip: {
                    enabled: true,
                },
                preventOverflow: {
                    enabled: true,
                    boundariesElement: 'scrollParent',
                },
                arrow: {
                    enabled: true,
                    element: arrowRef,
                },
            }}
        >
            <span className={classes.arrow} ref={arrowRef}/>
            <Paper className={classes.paper}>
                <Typography variant="body1">
                    {props.hoverStationName}
                </Typography>
            </Paper>
        </Popper>
    );
};

export default MetroMapPopper;
