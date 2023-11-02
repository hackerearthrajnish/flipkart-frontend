import { AppBar, Toolbar, styled, Box, Typography, Drawer, List, Button, Divider, ListItem, Badge } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import Search from './Search'
import CustomButtons from './CustomButtons'
import { useNavigate } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu';
import Profile from './Profile'
import { Datacontext } from '../../context/dataProvider'
import LoginDialogue from '../login/LoginDialogue'
import flipkartImg from '../../assest/images/logo192.png'

//icons
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import WidgetsIcon from '@mui/icons-material/Widgets';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';
import AppsIcon from '@mui/icons-material/Apps';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import StorefrontIcon from '@mui/icons-material/Storefront';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';



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

const HeaderText = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%'
})

const Styledtext = styled(ListItem)({

    padding: 2,
    margin: '10px',
    width: 'inherit'


})
const Cart = styled(Box)`
    cursor: pointer;
    display: flex; 
    & > p{
      margin-left : 10px;
    }
`
const MenuList = styled(Typography)({
    marginLeft: '5px'
})

const Header = () => {
    const logoURL = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/flipkart-plus_8d85f4.png';
    const subURL = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/plus_aef861.png';

    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const { account, setAccount, isUpdate } = useContext(Datacontext)
    const [showDialog, setShowdialog] = useState(false)
    const auth = JSON.parse(localStorage.getItem('user'))
    const [totalItems, setTotalItems] = useState(auth ? auth.cart : 0)

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('user'))
        setTotalItems(data ? data.cart : 0)
    }, [isUpdate])


    const navigatePage = () => {
        navigate('/')
    }

    const handleClose = () => {
        setOpen(false)
    }
    const handleOpen = () => {
        setOpen(true)
    }
    const NavigateToCart = () => {
        navigate('/cart')
    }

    const ListHeader = () => {

        return (

            <Box sx={{ background: '#f2f2f2', padding: 0, width: '100%' }}>
                <List className='p-0' >
                    <StyledList>

                        {
                            account ?
                                <>
                                    <HeaderText>
                                        <Box className='d-flex align-items-center'>
                                            <Profile account={account} setAccount={setAccount} />
                                        </Box>
                                        <img src={flipkartImg} alt='flipkart icon' className='flipkart-img' />
                                    </HeaderText>
                                </> :
                                <LoginBtn variant='contained' onClick={() => setShowdialog(true)}>Login</LoginBtn>
                        }

                    </StyledList>
                    <Styledtext onClick={handleClose}>
                        <WidgetsIcon fontSize='13px' />
                        <MenuList>All Category</MenuList>

                    </Styledtext>
                    <Styledtext onClick={handleClose}>
                        <AttachMoneyIcon fontSize='13px' />
                        <MenuList>
                            SuperCoin Zone
                        </MenuList>
                    </Styledtext>
                    <Styledtext onClick={handleClose}>
                        <Cart onClick={NavigateToCart}>
                            <Badge badgeContent={totalItems} color="error" max={15}>
                                <ShoppingCartIcon />
                            </Badge>
                            <Typography>Cart</Typography>
                        </Cart>
                    </Styledtext>
                    <Divider />

                    <Styledtext onClick={handleClose}>
                        <AutoAwesomeIcon fontSize='13px' />
                        <MenuList>
                            Flipkart Plus Zone
                        </MenuList>
                    </Styledtext>
                    <Styledtext onClick={handleClose}>
                        <WidgetsIcon fontSize='13px' />
                        <MenuList>

                            All Category
                        </MenuList>
                    </Styledtext>
                    <Styledtext onClick={handleClose}>
                        <StoreMallDirectoryIcon fontSize='13px' />
                        <MenuList>
                            Trending items
                        </MenuList>
                    </Styledtext>

                    <Styledtext onClick={handleClose}>
                        <AppsIcon fontSize='13px' />
                        <MenuList>
                            More on Flipkart
                        </MenuList>
                    </Styledtext>
                    <Styledtext onClick={handleClose}>
                        <LocalOfferIcon fontSize='13px' />
                        <MenuList>
                            Offer Zone
                        </MenuList>
                    </Styledtext>
                    <Divider />

                    <Styledtext onClick={handleClose}>
                        <StorefrontIcon fontSize='13px' />
                        <MenuList>
                            Sell on Flipkart
                        </MenuList>
                    </Styledtext>
                    <Styledtext onClick={handleClose}>
                        <BusinessCenterIcon fontSize='13px' />
                        <MenuList>
                            My orders
                        </MenuList>
                    </Styledtext>
                    <Styledtext onClick={handleClose}>
                        <LoyaltyIcon fontSize='13px' />
                        <MenuList>
                            Cupons
                        </MenuList>
                    </Styledtext>
                    <Styledtext onClick={handleClose}>
                        <NotificationsActiveIcon fontSize='13px' />
                        <MenuList>
                            My Notification
                        </MenuList>
                    </Styledtext>
                    <Divider />
                    <Styledtext onClick={handleClose}>
                        <MenuList>
                            Notification Preferences
                        </MenuList>
                    </Styledtext>
                    <Styledtext onClick={handleClose}>
                        <MenuList>
                            Help Center
                        </MenuList>
                    </Styledtext>
                    <Styledtext onClick={handleClose}>
                        <MenuList>
                            Legal
                        </MenuList>
                    </Styledtext>
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
                <Drawer open={open} onClose={handleClose} >
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
