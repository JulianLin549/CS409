import LoginAndRegisterBtn from "./LoginAndRegisterBtn";
import UserInfoAndLogout from "./UserInfoAndLogout";
import {useUser} from "../../Context/UserContext";


const UserSection = () => {
    const { user } = useUser()! ;
    return (
        <>
            { !user && <LoginAndRegisterBtn/>}
            { user && <UserInfoAndLogout />}
        </>
    );
}

export default UserSection;