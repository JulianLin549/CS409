import './App.css';
import {Route, Switch, Redirect} from 'react-router-dom';
import NotFound from '../src/components/ErrorPages/NotFound';
import ProtectedRoute from './ProtectedRoute';
import Profile from './Profile';
import StoreIndex from './components/AllStores/StoreIndex';
import {useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {NotificationProvider} from './Context/NotificationContext';

import Store from "./components/Store/Store";
import Footer from "./components/Footer/Footer";
import RamenNavbar from './components/RamenNavbar/RamenNavbar'
import Landing from "./components/Landing/Landing";
import {makeStyles} from "@material-ui/core/styles";
import Map from "./components/Map/Map";
import LoginPage from "./components/Login/LoginPage";
import UserFollowingPage from "./components/UserFollowing/UserFollowingPage";
import {Container} from "@material-ui/core";
import NetworkInterceptors from "./utils/NetworkInterceptors";
import UnAuthorized from "./components/ErrorPages/UnAuthorized";
import ErrorPage from "./components/ErrorPages/ErrorPage";
import AddReviewPage from "./components/Reviews/AddReviewPage";
import Notifications from "./components/Notifications/Notifications";
import UserReviewed from "./components/UserReviewed/UserReviewed";
import UserInfo from "./components/SettingAndInfo/UserInfo";
import UserSetting from "./components/SettingAndInfo/UserSetting";
import SignupPage from "./components/Signup/SignupPage";

const useStyles = makeStyles(() => ({
        container: {
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            maxWidth: "1440px",
            width: "90%",
            padding: "0 15px",
            margin: "100px auto 0 auto",
        }
    }),
);

function App() {
    const classes = useStyles();
    useEffect(() => {
        document.title = "Asian Food Club";
    }, []);
    NetworkInterceptors();
    return (
            <div className="App">
                <NotificationProvider>
                    <RamenNavbar/>
                </NotificationProvider>
                <Switch>
                    {/* landing page only */}
                    {/* <Route exact path="/">
                        <Landing/>
                        <Footer/>
                    </Route> */}
                    <Route>
                        <Container className={classes.container}>

                            <Switch>
                                <Route exact path="/stores">
                                    <StoreIndex/>
                                </Route>
                                <Route exact path="/map">
                                    <Map/>
                                </Route>

                                <Route path="/login">
                                    <LoginPage/>
                                </Route>

                                <Route path="/signup">
                                    <SignupPage/>
                                </Route>

                                {/*user section*/}
                                <ProtectedRoute path="/notification" component={Notifications}/>
                                <ProtectedRoute path="/following" component={UserFollowingPage}/>
                                <ProtectedRoute path="/wishlist" component={Profile}/>
                                <ProtectedRoute path="/reviewed" component={UserReviewed}/>
                                <ProtectedRoute path="/setting" component={UserSetting}/>
                                <ProtectedRoute path="/userInfo" component={UserInfo}/>



                                <ProtectedRoute path="/stores/:id/newReview" component={AddReviewPage}/>
                                <ProtectedRoute path="/stores/new" component={Profile}/>
                                <ProtectedRoute path="/stores/:id" component={Store}/>


                                <Route exact path="/notFound" component={NotFound}/>
                                <Route exact path="/unAuthorized" component={UnAuthorized}/>
                                <Route exact path="/error" component={ErrorPage}/>
                                <Redirect from='/' to="/map"/>
                                <Redirect from='*' to="/notFound"/>
                                <Route component={NotFound} />
                            </Switch>


                        </Container>
                    </Route>
                </Switch>
            </div>
    );
}

export default App;
