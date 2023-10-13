import { AppBar, Toolbar, styled, Box, Typography, Drawer, List, ListItem, Button } from '@mui/material'
import React, { useContext, useState } from 'react'
import Search from './Search'
import CustomButtons from './CustomButtons'
import { useNavigate } from 'react-router-dom'
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import Profile from './Profile'
import { Datacontext } from '../../context/dataProvider'
import LoginDialogue from '../login/LoginDialogue'


// for styling of AppBar component 
const StyleHeader = styled(AppBar)`
         backgroundColor : #2874f0 ;
         min-heigth : 50px;
`
const Component = styled(Box)(({ theme }) => ({

    marginLeft: '12%',
    lineHeigth: 0,
    cursor: 'pointer',
    [theme.breakpoints.down('lg')]: {
        marginLeft: '15px'
    }
}))


const SubHeading = styled(Typography)`
       font-size : 10px;
       font-style: italic;
`;

const CustomBtnBox = styled(Box)(({ theme }) => ({

    margin: 'auto',
    [theme.breakpoints.down('md')]: {
        display: 'none'
    }
}))


const MenuBtn = styled(Box)(({ theme }) => ({

    display: 'none',
    color: 'white',
    [theme.breakpoints.down('md')]: {
        display: 'block'
    }
}))

const StyledList = styled(ListItem)({
    background: '#1976d2',
    color: '#fff',

})
const LoginBtn = styled(Button)(({ theme }) => ({

    
    boxShadow: 'none',
    padding: '2px 30px',
    fontWeight: ' bold',
}));



const Header = () => {
    const logoURL = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/flipkart-plus_8d85f4.png';
    const subURL = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/plus_aef861.png';

    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const { account, setAccount } = useContext(Datacontext)
    const [showDialog, setShowdialog] = useState(false)


    const navigatePage = () => {
        navigate('/')
    }

    const handleClose = () => {
        setOpen(false)
    }
    const handleOpen = () => {
        setOpen(true)
    }

    const ListHeader = () => {
        return (

            <Box sx={{ background: '#f2f2f2', padding: 0 }}>
                <List >
                    <StyledList>

                        {
                            account ?
                                <>
                                    <PersonIcon /> &nbsp;
                                    <Profile account={account} setAccount={setAccount} />
                                </> :
                                <LoginBtn variant='contained' onClick={() => setShowdialog(true)}>Login</LoginBtn>
                        }

                    </StyledList>
                    <ListItem onClick={handleClose}>
                        <CustomButtons />
                    </ListItem>
                </List>
            </Box>
        )
    }
    return (

        <StyleHeader>
            <Toolbar>
                <MenuBtn >
                    <MenuIcon onClick={handleOpen} />
                </MenuBtn>
                <Drawer open={open} onClose={handleClose} width={100} >
                    {ListHeader()}
                </Drawer>
                <LoginDialogue isopen={showDialog} handle={setShowdialog} />
                <Component onClick={navigatePage}>

                    <img src={logoURL} alt="flipkart logo" style={{ width: '75px' }} />
                    <Box id='sub-heading'>
                        <SubHeading>Explore &nbsp;
                            <Box component='span' style={{ color: '#ffE500' }}>Plus</Box>
                        </SubHeading>
                        <img src={subURL} alt="sublogo" id='sub-heading-logo' />
                    </Box>

                </Component>
                <Search />
                <CustomBtnBox>
                    <CustomButtons />
                </CustomBtnBox>
            </Toolbar>
        </StyleHeader>
    )
}

export default Header
