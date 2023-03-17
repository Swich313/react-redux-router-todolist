import {Outlet} from 'react-router-dom';

import MainNavigation from "../component/mainNavigation/MainNavigation.jsx";

const RootLayout = () => {
    return (
        <>
            <MainNavigation />
            <Outlet />
        </>
                );
};

export default RootLayout;
