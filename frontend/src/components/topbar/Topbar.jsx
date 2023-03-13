import './topbar.css'
import { AccountCircle, ShoppingBag, Search, Home, Store, Sell, Chat, Help } from '@mui/icons-material'
import { Badge } from '@mui/material'
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'


import * as React from 'react';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import { logoutCall } from '../../api/apiCall'

export const Topbar = () => {
    const navigate = useNavigate()
    const { user, dispatch } = useContext(AuthContext)

    const handleLogout = async () => {
        await logoutCall(dispatch)
        navigate('/')
    }
    const handleNavigate = () => {
        navigate('/profile')
        setOpen(false)
    }

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <div className="topbarContainer">
            <div className="topbarMisc">
                <div className="miscLeft">
                    <span className="miscEmail">carstore@gmail.com</span>
                    <span className="miscPhone">9840765312</span>
                </div>
                <div className="miscRight">
                    {
                        user
                            ? (<Stack direction="row" spacing={2}>
                                <div>
                                    <Button
                                        ref={anchorRef}
                                        id="composition-button"
                                        aria-controls={open ? 'composition-menu' : undefined}
                                        aria-expanded={open ? 'true' : undefined}
                                        aria-haspopup="true"
                                        onClick={handleToggle}
                                        sx={{ color: 'black' }}
                                    >
                                        <div className='miscRightProfile'><AccountCircle />{user.name}</div>
                                    </Button>
                                    <Popper
                                        open={open}
                                        anchorEl={anchorRef.current}
                                        role={undefined}
                                        placement="bottom-start"
                                        transition
                                        disablePortal
                                    >
                                        {({ TransitionProps, placement }) => (
                                            <Grow
                                                {...TransitionProps}
                                                style={{
                                                    transformOrigin:
                                                        placement === 'bottom-start' ? 'left top' : 'left bottom',
                                                    width: '140px',
                                                    zIndex: '1'
                                                }}
                                            >
                                                <Paper>
                                                    <ClickAwayListener onClickAway={handleClose}>
                                                        <MenuList
                                                            autoFocusItem={open}
                                                            id="composition-menu"
                                                            aria-labelledby="composition-button"
                                                            onKeyDown={handleListKeyDown}
                                                        >
                                                            <MenuItem onClick={() => handleNavigate()}>Profile</MenuItem>
                                                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                                        </MenuList>
                                                    </ClickAwayListener>
                                                </Paper>
                                            </Grow>
                                        )}
                                    </Popper>
                                </div>
                            </Stack>)
                            : (<div className="miscRightProfile" onClick={() => navigate('/login')}>
                                <AccountCircle />
                                <span className="miscProfileName">Login</span>
                            </div>)
                    }

                    <div className="wishlist" onClick={() => navigate('/wishlist')}>
                        <Badge badgeContent={user? user.wishlist.length : 0} color="success">
                            <ShoppingBag />
                        </Badge>
                        <span>Watchlist</span>
                    </div>
                </div>
            </div>
            <div className="topbarHeading">
                <span className="headingTitle">
                    Car Store
                </span>
            </div>
            <div className="topbarNavigation">
                <ul className='navigationList'>
                    <li><Link to={"/"} ><Home />Home</Link></li>
                    <li><Link to={"/buy"} ><Store />Buy</Link></li>
                    <li><Link to={"/sell"} ><Sell />Sell</Link></li>
                    <li><Link to={"/"} ><Badge badgeContent={3} color="primary"> <Chat /> </Badge>Messages</Link></li>
                    <li><Link to={"/"} ><Help />Help</Link></li>
                </ul>
            </div>
        </div>
    )
}
