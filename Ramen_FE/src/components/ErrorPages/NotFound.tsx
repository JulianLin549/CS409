import {useHistory, withRouter} from "react-router-dom"
import {Box, Button, Divider, Paper, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles(() => ({
    root: {
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        maxHeight: "50vh",
        top: 100,
    },
    paper: {
        backgroundColor: '#f8f9fa!important',
        maxWidth: 800,
        width: "80vw",
    },
    title: {
        textAlign: "center",
        fontSize: "2rem",
        fontWeight: 700,
        margin: 15
    },
    content: {
        height: "60vh",
        position: "relative",
        overflowY: "scroll",
        fontSize: "1rem",
        fontWeight: 400,
        margin: "50px",
        whiteSpace: "pre-line"
    },
    actions: {
        flex: "0 0 auto",
        display: "flex",
        padding: 8,
        alignItems: "center",
        margin: 10,
        justifyContent: "center"
    },
    loginBtn: {
        right: 10
    }
}));

const NotFound = () => {
    const classes = useStyles();
    const history = useHistory();
    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Typography className={classes.title}>
                    404 NOT FOUND
                </Typography>
                <Divider/>
                <div className={classes.content}>
                    <Typography>
                        {`Failed to find resources \n
                        If you are the owner, please report using the link or email below. \n
                        ${process.env.REACT_APP_SUPPORT_EMAIL}`}

                    </Typography>
                    <Divider/>
                    <div className={classes.actions}>
                        <Box m={1}>
                            <Button size={'large'} variant="outlined" color="primary">
                                Submit
                            </Button>
                        </Box>
                        <Box m={1}>
                            <Button size={'large'} variant="outlined" color="primary" onClick={() => history.go(-1)}>
                                Back
                            </Button>
                        </Box>
                    </div>
                </div>

            </Paper>
        </div>);
}

export default withRouter(NotFound);