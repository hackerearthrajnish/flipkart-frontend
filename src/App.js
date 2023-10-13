
import { Box, styled } from '@mui/material';
import Header from './components/Header/header';
import Home from './components/Home/Home';
import DataProvider from './context/dataProvider';

import { Provider } from 'react-redux';
import store from './redux/Store/Store';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Route, Routes } from 'react-router-dom';
import DetailView from './components/details/DetailView';
import Error from './Error/Error';
import Cart from './components/cart/Cart';
import MakeOrder from './components/Order/MakeOrder';
import AllProducts from './components/details/AllProducts';


const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

const Wrapper = styled(Box)`
        margin-top : 63px;
`
function App() {
  
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <DataProvider>
          <Header />
          <Wrapper>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/product/:id' element={<DetailView />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/place-order' element={<MakeOrder />} />
              <Route path='/allproducts' element={<AllProducts />} />
              <Route path='*' element={<Error />} />
            </Routes>


          </Wrapper>
        </DataProvider>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
