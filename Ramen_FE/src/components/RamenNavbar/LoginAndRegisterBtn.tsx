import {Button} from '@material-ui/core';
import {makeStyles, Theme} from "@material-ui/core/styles";
import {Link as RouterLink} from "react-router-dom";

const useStyles = makeStyles((theme: Theme) => ({
    login: {
        color: theme.palette.text.secondary,
        "&:hover": {
            color: theme.palette.text.primary,
        }
    },
}));
const LoginAndRegisterBtn = () => {
    const classes = useStyles();
    return (
        <Button
            variant="outlined"
            component={RouterLink}
            className={classes.login}
            to="/login"
        >
            登入
        </Button>
    );
};

export default LoginAndRegisterBtn;
