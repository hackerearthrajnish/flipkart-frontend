    import { styled, Grid } from '@mui/material'
    import React from 'react'
    import { imageURL } from '../../Constants/data'

    import MobUrl from '../../assest/images/add.png'

    const url = 'https://rukminim1.flixcart.com/flap/3006/433/image/4789bc3aefd54494.jpg?q=50';

    const Wrapper = styled(Grid)`
        margin-top: 10px;
    `
    const Image = styled('img')(({theme}) => ({
        width: '100%',
        marginTop: '8px',
        [theme.breakpoints.down('sm')]: {
           display : 'none'
        
        },

    }));
    const MobImage = styled('img')(({theme}) => ({
        width: '100%',
        height: '120px',
        marginTop: '8px',
        display : 'none',
        [theme.breakpoints.down('sm')]: {
           display : 'block'
        
        },

    }));


    const MidSection = () => {
        return (
            <>

                <Wrapper  container>
                    {
                        imageURL.map((data) => {
                            return (
                                <Grid item xs={12} sm={12} md={4} lg={4} key={data}>

                                    <img src={data} alt='img' width='100%' />
                                </Grid>
                            )
                        })
                    }

                </Wrapper>
                <Image src={url} alt='img' />
                <MobImage src={MobUrl} alt='img'/>
            </>
        )
    }

    export default MidSection
