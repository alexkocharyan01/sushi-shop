import React, {useState} from 'react';
import "./AdminHeader.scss";
import PersonIcon from '@mui/icons-material/Person';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import {Link, useNavigate, NavLink} from 'react-router-dom';
import logo from '../../../Assets/logo1.png';

function AdminHeader() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false)

    const navigate = useNavigate();

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logOut = () => {
        window.localStorage.removeItem('ADMIN_TOKEN')
        navigate('/admin-login')
    }

    return (
        <div className={'header ' + (menuOpen && "active_header")}>
            <div className='container'>
                <NavLink to="/">
                    <img src={logo} className='logo' alt='logo'/>
                </NavLink>
                <div className={"hamburger " + (menuOpen && "active")} onClick={() => setMenuOpen(!menuOpen)}>
                    <span className="line1"></span>
                    <span className="line2"></span>
                    <span className="line3"></span>
                </div>
                <div className={"menu " + (menuOpen && "open_menu")}>
                    <div className={'products ' + (menuOpen && "show_items")}>
                        <NavLink to="/admin-page" activeclass="active">
                            Ապրանքներ
                        </NavLink>
                    </div>
                    <div className={'slider ' + (menuOpen && "show_items")}>
                        <NavLink to="/slider" activeclass="active">
                            Սլայդերներ
                        </NavLink>
                    </div>
                    <div className={'orders ' + (menuOpen && "show_items")}>
                        <NavLink to="/orders" activeclass="active">
                            Պատվերներ
                        </NavLink>
                    </div>
                    <div className={'orders ' + (menuOpen && "show_items")}>
                        <NavLink to="/admin-order-history" activeclass="active">
                            Պատմություն
                        </NavLink>
                    </div>
                    <div className={'orders hamburger_item ' + (menuOpen && "show_items")}>
                        <NavLink to="/slider" activeclass="active">
                            Փոխել գաղտնաբառը
                        </NavLink>
                    </div>
                    <div className={'orders hamburger_item ' + (menuOpen && "show_items")}>
                        <NavLink to="/orders" activeclass="active">
                            Գլխավոր էջ
                        </NavLink>
                    </div>
                    <div className={'orders hamburger_item ' + (menuOpen && "show_items")}>
                        <NavLink to="/admin-order-history" activeclass="active">
                            Դուրս գալ
                        </NavLink>
                    </div>
                    <div className='user'>
                        <Box sx={{display: 'flex', alignItems: 'center', textAlign: 'center'}}>
                            <IconButton
                                onClick={handleClick}
                                size="small"
                                sx={{ml: 2}}
                                aria-controls={open ? 'account-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                            >
                                <PersonIcon/>
                            </IconButton>
                        </Box>
                        <Menu
                            anchorEl={anchorEl}
                            className="account-menu"
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
                                <Link to='/'>
                                    <ListItemIcon>
                                        <HomeIcon fontSize="small"/>
                                    </ListItemIcon>
                                    Գլխավոր էջ
                                </Link>
                            </MenuItem>
                            <MenuItem>
                                <Link to='/change-password'>
                                    <ListItemIcon>
                                        <Settings fontSize="small"/>
                                    </ListItemIcon>
                                    Փոխել գաղտնաբառը
                                </Link>
                            </MenuItem>
                            <MenuItem onClick={() => logOut()}>
                                <ListItemIcon>
                                    <Logout fontSize="small"/>
                                </ListItemIcon>
                                Դուրս գալ
                            </MenuItem>
                        </Menu>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminHeader
