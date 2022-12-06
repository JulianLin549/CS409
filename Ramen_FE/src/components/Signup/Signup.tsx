import {useState} from "react";
import axios from 'axios';
import Cookies from 'js-cookie';
import {useUser} from "../../Context/UserContext";
import LoadingIcon from "../Loading/LoadingIcon";
import Button from "@material-ui/core/Button";
import {UserRole} from "../../enums/UserRole";

type Props = {
    disabled?: boolean,
    username?: string,
    password?: string
}
const Login = (props: Props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isLoginFail, setIsLoginFail] = useState(false);
    const [loginCount, setLoginCount] = useState(0);

    const {user, setUser} = useUser();
    const url = `${process.env.REACT_APP_BE_URL}/api/v1/user/signup`;

    const loginToOurServer = async () => {
        try {
            const username = props.username;
            const password = props.password;
            if (username === '' || password === '') {
                throw new Error('username or password is empty!');
            }

            let payload = { username, password };
            let options = {
                method: 'post',
                url: url,
                data: payload,
                config: {headers: {'Content-Type': 'application/json'}}
            };
            let serverRes = await axios(options);
            let loginUser = serverRes.data.data.user;
            setUser(loginUser);
            Cookies.set('access_token', serverRes.data.data.token);
            window.localStorage.setItem("current_user", JSON.stringify(loginUser));
        } catch (e) {
            console.log("error:", e);
            setIsLoginFail(true);
            setLoginCount(loginCount + 1)
        } finally {
            setIsLoading(false);
        }
    };


    const handleFailure = () => {
        setIsLoginFail(false);
    };


    if (user) {
        return <></>
    }

    return (
        <div className="m-3">
            {isLoading && <div className="m-2">
                <LoadingIcon/>
                <span>Signing up, please wait</span>
            </div>}

            {isLoginFail && loginCount < 3 &&
            <div>
                <Button variant="outlined" color="secondary" size="large" onClick={handleFailure} className="m-2">
                    Signup fail, please retry
                </Button>
            </div>
            }
            {loginCount >= 3 && <div className="m-2">
                <p>Signup unsuessfully, please wait a second to retry.</p>
            </div>}

            {!isLoading && !isLoginFail && <Button
                color="primary"
                variant="contained"
                onClick={loginToOurServer}
                >Signup
                </Button>}
        </div>
    );
};

export default Login;
