import React, { useEffect } from 'react'
import { Box, Container } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from "react-router-dom";
import { appConfigApi } from '../appConfig';

export default function Profile() {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [user, setUser] = React.useState({})

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const getUserProfilePage = async () => {
    try {
      const res = await fetch(appConfigApi.profile, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          "Content-Type": "application/json"
        },
        credentials: "include"
      })
      if (res.status !== 200) {
        navigate('/')
        throw new Error(res.statusText)
      }
      const data = await res.json();
      setUser(data);
    } catch (err) {
      console.log(err.message)
    }
  }



  useEffect(() => {
    getUserProfilePage();
  }, [])


  const handleLogOut = async () => {
    try {
      const res = await fetch(appConfigApi.logout, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          "Content-Type": "application/json"
        },
        credentials: "include"
      })
      if (res.status !== 200) {
        navigate('/')
        throw new Error(res.statusText)
      }
      const data = await res.json();
      navigate('/')
    } catch (err) {
      console.log(err.message)
    }
  }


  return <>{
    <>
      <Box>
        <AppBar position='static'>
          <Toolbar>
            <Typography variant='h5' flexGrow={1} >Dashboard</Typography>
            <Box>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleLogOut}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>
        Welcome to {user.firstName}
      </Box>

    </>
  }
  </>


}
