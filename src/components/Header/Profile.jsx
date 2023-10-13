import { Box, Menu, MenuItem, Typography, styled } from '@mui/material'
import React, { useContext } from 'react'
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { Datacontext } from '../../context/dataProvider';

const ProfileBox = styled(Box)`
      cursor: pointer;
`
const Logout = styled(Typography)`
      margin-left: 0.5em ;
      font-size : 14px;
`;
const Component = styled(Menu)`
    margin-top: 0.7em;
`

const Profile = ({ account, setAccount }) => {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const {setisUpdate} = useContext(Datacontext)



    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
   
    const Logoutuser = () => {

        setAccount('')
        localStorage.clear()
        setisUpdate(0)
    }

    return (
        <>

            <ProfileBox onClick={handleClick}>
                <Typography>{account}</Typography>
            </ProfileBox>
            <Component
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={() => {
                    handleClose();
                    Logoutuser();
                }
                }>
                    <PowerSettingsNewIcon color='primary' fontSize='small' />
                    <Logout>Logout</Logout>
                </MenuItem>
            </Component>
        </>
    )
}

export default Profile
