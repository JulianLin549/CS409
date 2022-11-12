import {withRouter} from "react-router-dom";

const ErrorPage = () => {
    return (
        <div>
            <h1>Internal Server Error</h1>
        </div>
    );
};

export default withRouter(ErrorPage);
