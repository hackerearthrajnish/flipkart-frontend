import React, { useState, useEffect, useRef } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { InputBase, List, ListItem, Box, styled } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts as listProducts } from '../../redux/Features/ProductSlice';
import { Link } from 'react-router-dom';

const SearchContainer = styled(Box)`
  border-radius: 2px;
  margin-left: 10px;
  width: 38%;
  background-color: #fff;
  display: flex;
`;

const SearchIconWrapper = styled(Box)`
  margin-left: auto;
  padding: 5px;
  display: flex;
  color: blue;
`;

const ListWrapper = styled(List)`
  position: absolute;
  color: #000;
  background: #FFFFFF;
  margin-top: 36px;
`;

const InputSearchBase = styled(InputBase)(({ theme }) => ({
  fontSize: 'unset',
  width: '100%',
  paddingLeft: '20px',

  textOverflow: 'ellipsis',

  /* Required for text-overflow to do anything */
  whiteSpace: 'nowrap',
  overflow: 'hidden'

}));

const Search = () => {
  const [text, setText] = useState('');
  const [open, setOpen] = useState(true);
  const [placeholder, setPlaceholder] = useState("Search for products, brands and more");
  const inputRef = useRef(null);

  const getCurrentDimesion = () => {
    return window.innerWidth;
  };
  const [screenSize, setScreenSize] = useState(getCurrentDimesion());

  useEffect(() => {

    if (screenSize < 500) {
      setPlaceholder('Search....');
    } else {
      setPlaceholder('Search for products, brands and more');
    }

    const updateDimesion = () => {
      setScreenSize(getCurrentDimesion());
    };

    window.addEventListener('resize', updateDimesion);
    return () => window.removeEventListener('resize', updateDimesion);
  }, [screenSize]);

  const getText = (text) => {
    setText(text);
    setOpen(false);
  };
  const products = useSelector(state => state.products.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <SearchContainer className="search-container">
      <InputSearchBase
        ref={inputRef}
        placeholder={placeholder}
        inputProps={{ 'aria-label': 'search' }}
        onChange={(e) => getText(e.target.value)}
      />
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      {text && (
        <ListWrapper hidden={open}>
          {products
            .filter(product => product.title.longTitle.toLowerCase().includes(text.toLowerCase()))
            .map(product => (
              <ListItem>
                <Link
                  to={`/product/${product.id}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                  onClick={() => setOpen(true)}
                >
                  {product.title.longTitle}
                </Link>
              </ListItem>
            ))}
        </ListWrapper>
      )}
    </SearchContainer>
  );
};

export default Search;
