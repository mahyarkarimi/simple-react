import React from "react";
import Header from "../../components/header";
import { Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";

const menuItems = [
    { title: 'Home', href: '/' },
    { title: 'Users', href: '/users' },
    { title: 'Contact Us', href: '/' },
    { title: 'About', href: '/' },

]

const Home: React.FC = ({
        
}) => {
    return (
        <>
            <Header items={menuItems} />
            <Box id="detail" flex={1} width='100%' height='100%' overflowY='auto'>
                <Outlet />
            </Box>
        </>
    )
}

export default Home;