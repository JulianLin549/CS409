import {Divider, Paper, Typography, TextField, Box} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Signup from "./Signup";
import {ChangeEvent, useState} from "react";
import {useUser} from "../../Context/UserContext";
import {useHistory, useLocation} from "react-router-dom";

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
        height: "50vh",
        position: "relative",
        overflowY: "scroll",
        fontSize: "1rem",
        fontWeight: 400,
        margin: "50px",
        whiteSpace: "pre-line"
    },
    checkBox: {
        margin: "10px 30px",
    },
    actions: {
        flex: "0 0 auto",
        display: "flex",
        padding: 8,
        flexDirection: "row-reverse",
    },
    loginBtn: {
        right: 10
    }
}));
interface LocationState {
    from: {
        pathname: string;
    };
}
const LoginPage = () => {
    const location = useLocation<LocationState>();

    const { from } = location.state || { from: { pathname: "/" } };

    const history = useHistory();
    const {user} = useUser()!;

    const classes = useStyles();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const handleUserNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    }

    if (user) {
        history.push(from)
    }


    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Typography className={classes.title}>
                    Signup
                </Typography>
                <Divider/>
                <div className={classes.content}>
                <Box
                    m={4} 
                    sx={{
                    display: 'flex',
                    flexDirection: 'column',
                }} >
                    <TextField
                        required
                        onChange={handleUserNameChange}
                        id="username"
                        label="User Name"
                        />
                </Box>
                <Box
                    m={4} 
                    sx={{
                    display: 'flex',
                    flexDirection: 'column',
                }} >
                   <TextField
                        required
                        onChange={handlePasswordChange}
                        id="password"
                        label="Password"
                        type="password"
                        />
                </Box>
                </div>

                <Divider/>
                <div className={classes.actions}>
                    <Signup username={username} password={password}/>
                </div>
            </Paper>
        </div>
    );
};

export default LoginPage;
