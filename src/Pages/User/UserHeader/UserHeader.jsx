import React, {useState,} from 'react';
import "./UserHeader.scss"
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import Logout from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import HistoryIcon from '@mui/icons-material/History';
import {Link, useNavigate} from 'react-router-dom';
import {useTranslation} from "react-i18next";

function UserHeader({setLoading}) {
    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const {t} = useTranslation();


    const navigate = useNavigate()

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const logOut = () => {
        window.localStorage.removeItem('TOKEN')
        window.localStorage.removeItem('HASH')
        setLoading(true)
        window.location.reload(false)
        navigate('/')
    }

    return (
        <div className='user_header'>
            <div className='user_container'>
                <div className='user'>
                    <Box sx={{display: 'flex', alignItems: 'center', textAlign: 'center'}}>
                        <IconButton
                            onClick={handleClick}
                            size="small"
                            sx={{ml: 2, color: 'white'}}
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                        >
                            <PersonIcon/>
                        </IconButton>
                    </Box>
                    <Menu
                        anchorEl={anchorEl}
                        id="user_account-menu"
                        className="user_account-menu"
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
                                '&:before': {
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
                        transformOrigin={{horizontal: 'right', vertical: 'top'}}
                        anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                    >
                        <MenuItem>
                            <Link to='/user-change-password'>
                                <ListItemIcon>
                                    <HomeIcon fontSize="small"/>
                                </ListItemIcon>
                                {t("home")}
                            </Link>
                        </MenuItem>
                        <MenuItem>
                            <Link to='/user-page'>
                                <ListItemIcon>
                                    <HistoryIcon fontSize="small"/>
                                </ListItemIcon>
                                {t("history")}
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={() => logOut()}>
                            <ListItemIcon>
                                <Logout fontSize="small"/>
                            </ListItemIcon>
                            {t("LogOut")}
                        </MenuItem>
                    </Menu>
                </div>
            </div>
        </div>
    )
}

export default UserHeader
