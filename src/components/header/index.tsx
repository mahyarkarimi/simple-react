import React, { useEffect, useState } from "react";
import { Tabs, Button, TabList, Tab, Box, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, useDisclosure, IconButton, MenuIcon, AccordionIcon } from '@chakra-ui/react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { useAuth } from "../../context/AuthContext";
import { useWindowSize } from "../../hooks/useWindowWidth";

interface HeaderProps {
    items: {
        title: string;
        href?: string;
    }[]
}
const Header: React.FC<HeaderProps> = ({
    items
}) => {
    const auth = useAuth();
    const location = useLocation();
    const size = useWindowSize();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef();
    const Icon = <svg fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 30 30" width="30px" height="30px"><path d="M 3 7 A 1.0001 1.0001 0 1 0 3 9 L 27 9 A 1.0001 1.0001 0 1 0 27 7 L 3 7 z M 3 14 A 1.0001 1.0001 0 1 0 3 16 L 27 16 A 1.0001 1.0001 0 1 0 27 14 L 3 14 z M 3 21 A 1.0001 1.0001 0 1 0 3 23 L 27 23 A 1.0001 1.0001 0 1 0 27 21 L 3 21 z"/></svg>;
    return (
        <Box bg='white' padding='32px 16px' width='100%' position='sticky' top='0'>
            <Box display='flex' flexWrap='wrap' justifyContent='space-between' alignItems='center' mx='auto'>
                {size.width < 576 ? (
                    <div>
                        <IconButton icon={Icon} onClick={onOpen} ref={btnRef} aria-label='drawer' />
                        <Drawer
                            isOpen={isOpen}
                            placement='right'
                            onClose={onClose}
                            finalFocusRef={btnRef}
                        >
                            <DrawerOverlay />
                            <DrawerContent>
                                <DrawerCloseButton />
                                <DrawerHeader>Header Menu</DrawerHeader>

                                <DrawerBody>
                                    <Tabs orientation="horizontal" variant='soft-rounded' colorScheme='green' flex={1} defaultIndex={items.findIndex(item => item.href === location.pathname)}>
                                        {items.map(item => (

                                            <Link to={item.href} key={item.title}>
                                                <Tab>
                                                    {item.title}
                                                </Tab>
                                            </Link>
                                        ))}
                                    </Tabs>

                                </DrawerBody>
                            </DrawerContent>
                        </Drawer>
                    </div>
                ) : (
                    <Tabs variant='soft-rounded' colorScheme='green' flex={1} defaultIndex={items.findIndex(item => item.href === location.pathname)}>
                        <TabList>
                            {items.map(item => (

                                <Link to={item.href} key={item.title}>
                                    <Tab>
                                        {item.title}
                                    </Tab>
                                </Link>
                            ))}
                        </TabList>
                    </Tabs>
                )}


                <Link to={auth.isAuthenticated ? '' : '/login'}>
                    <Button colorScheme='teal' variant='solid' onClick={() => auth.isAuthenticated ? auth.signout() : null}>
                        {auth.isAuthenticated ? 'Logout' : 'Login'}
                    </Button>
                </Link>

            </Box>
        </Box>
    )
}

export default Header;