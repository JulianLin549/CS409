import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {QueryClient, QueryClientProvider} from 'react-query';
import {SnackbarProvider} from 'notistack';
import {UserProvider} from "./Context/UserContext";
import {history} from "./utils/history";
import {Grow} from "@material-ui/core";
import ScrollToTop from "./customHooks/ScrollToTop";
import {BrowserRouter, HashRouter} from "react-router-dom";

const queryClient = new QueryClient();

ReactDOM.render(
    <React.StrictMode>
        <SnackbarProvider
            maxSnack={3}
            TransitionComponent={Grow}
        >
            <QueryClientProvider client={queryClient}>
                <UserProvider>
                    <BrowserRouter history={history}>
                        <ScrollToTop />
                        <App/>
                    </BrowserRouter>
                </UserProvider>
            </QueryClientProvider>
        </SnackbarProvider>

    </React.StrictMode>,
    document.getElementById('root')
);
