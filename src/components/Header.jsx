import { useEffect, useState } from 'react';
import HeaderLogo from '../assets/img/Fafco-Portal-Logo.jpg'
import { Link } from 'react-router-dom';
import { Avatar, Backdrop, Box, CircularProgress, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import Logout from '@mui/icons-material/Logout';
import cookie from 'react-cookies'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../redux/slices/CustomSlice";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const navbarLinks = [
    {
        name: 'HOME',
        link: '/',
    },
    {
        name: 'REGISTRATION LOOKUP',
        link: '/registrationLookup',
    },
    {
        name: ' ADDRESS VALIDATION',
        link: '/addressValidation',
    },
]

const Header = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const apiUrl = `api/auth/logout/`
    let token = cookie.load('token')
    const open = Boolean(anchorEl);
    const dispatch = useDispatch();
    // const id = cookie.load('id')
    const name = cookie.load("name");
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        setAnchorEl(null);
        cookie.remove('token')
        cookie.remove('role')
        dispatch(logout(apiUrl, token))
    }

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };
    const customSliceSuccess = useSelector((state) => state.CustomSlice.isSuccess);
    const logoutSuccess = useSelector((state) => state.CustomSlice.data);
    const logoutLoading = useSelector((state) => state.CustomSlice.isLoading);


    useEffect(() => {
        token = cookie.load('token');
        console.log("testing header")
    }, [customSliceSuccess, logoutSuccess])

    return (
        <div className=" bg-white px-7 py-1 shadow-md ">
            {/* <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={logoutLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop> */}
            <nav >
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 ">
                    <div className="flex items-center justify-between h-16 ">
                        <div className="flex-shrink-0 w-44">
                            <img src={HeaderLogo} alt="logo" />
                        </div>


                        {token &&
                            <div className="hidden xl:block">
                                <div className="ml-10 flex items-baseline space-x-4">
                                    {navbarLinks.map((item, i) => (
                                        <Link key={i} to={item.link} className=" hover:text-blue-600 px-5 py-2 rounded-md text-xl font-medium">
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        }


                        {token &&
                            <div className='hidden xl:block'>
                                <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                                    <Typography>Welcome,{name}</Typography>
                                    <Tooltip title="Account settings">
                                        <IconButton
                                            onClick={handleClick}
                                            size="small"
                                            sx={{ ml: 2 }}
                                            aria-controls={open ? 'account-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={open ? 'true' : undefined}
                                        >
                                            <Avatar sx={{ width: 32, height: 32 }}></Avatar>
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                                <Menu
                                    anchorEl={anchorEl}
                                    id="account-menu"
                                    open={open}
                                    onClose={handleClose}
                                    onClick={handleClose}
                                    PaperProps={{
                                        elevation: 0,
                                        sx: {
                                            overflow: 'visible',
                                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                            mt: 1.5,
                                            '& .MuiAvatar-root': {
                                                width: 32,
                                                height: 32,
                                                ml: -0.5,
                                                mr: 1,
                                            },
                                            '&::before': {
                                                content: '""',
                                                display: 'block',
                                                position: 'absolute',
                                                top: 0,
                                                right: 14,
                                                width: 10,
                                                height: 10,
                                                bgcolor: 'background.paper',
                                                transform: 'translateY(-50%) rotate(45deg)',
                                                zIndex: 0,
                                            },
                                        },
                                    }}
                                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                >
                                    <MenuItem onClick={handleClose}>
                                        <Avatar /> Profile
                                    </MenuItem>
                                    <MenuItem onClick={handleClose}>
                                        <Avatar /> My account
                                    </MenuItem>
                                    <Divider />
                                    <MenuItem onClick={handleLogout}>
                                        <ListItemIcon>
                                            <Logout fontSize="small" />
                                        </ListItemIcon>
                                        Logout
                                    </MenuItem>
                                </Menu>
                            </div>
                        }



                        {token &&
                            <div className="-mr-2 flex xl:hidden">
                                <button
                                    onClick={toggleNavbar}
                                    type="button"
                                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                    aria-expanded="false"
                                >
                                    <span className="sr-only">Open main menu</span>
                                    <MenuIcon sx={{ display: isOpen ? 'none' : 'block'  }} />
                                    <CloseIcon sx={{ display: isOpen ? 'block' : 'none'}} />
                                </button>
                            </div>
                        }
                    </div>
                </div>



                {token &&
                    <div className={`${isOpen ? 'block ' : 'hidden'} xl:hidden`}>
                        <div className="  pt-2 space-y-1 pb-2 sm:px-3">
                            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                                <Tooltip title="Account settings">
                                    <IconButton
                                        onClick={handleClick}
                                        size="small"
                                        sx={{ ml: 2 }}
                                        aria-controls={open ? 'account-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                    >
                                        <Avatar sx={{ width: 32, height: 32 }}></Avatar>
                                    </IconButton>
                                </Tooltip>
                                <Typography>Welcome,{name}</Typography>
                            </Box>
                            <Menu
                                anchorEl={anchorEl}
                                id="account-menu"
                                open={open}
                                onClose={handleClose}
                                onClick={handleClose}
                                PaperProps={{
                                    elevation: 0,
                                    sx: {
                                        overflow: 'visible',
                                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                        mt: 1.5,
                                        '& .MuiAvatar-root': {
                                            width: 32,
                                            height: 32,
                                            ml: -0.5,
                                            mr: 1,
                                        },
                                        '&::before': {
                                            content: '""',
                                            display: 'block',
                                            position: 'absolute',
                                            top: 0,
                                            right: 14,
                                            width: 10,
                                            height: 10,
                                            bgcolor: 'background.paper',
                                            transform: 'translateY(-50%) rotate(45deg)',
                                            zIndex: 0,
                                        },
                                    },
                                }}
                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                            >
                                <MenuItem onClick={handleClose}>
                                    <Avatar /> Profile
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                    <Avatar /> My account
                                </MenuItem>
                                <Divider />
                                <MenuItem onClick={handleLogout}>
                                    <ListItemIcon>
                                        <Logout fontSize="small" />
                                    </ListItemIcon>
                                    Logout
                                </MenuItem>
                            </Menu>
                        </div>
                        <Divider />
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navbarLinks.map((item,i)=>(
                            <Link key={i} to={item.link} className=" hover:text-blue-600 block px-3 py-2 rounded-md text-md font-medium">
                               {item.name}
                            </Link>
                        ))}
                        </div>
                    </div>
                }
            </nav>
        </div>
    )
}

export default Header
