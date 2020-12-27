import { Typography } from "@material-ui/core";
import BannerSlider from "../../BannerSlider/BannerSlider";
import CardsSlider from "../../CardsSlider/CardsSlider";
import { useStyles } from './HomePageClasses';
import { useHttp } from '../../../hooks/http.hook';
import { useEffect, useState } from 'react';
import BransSlider from "../../BrandsSlider/BrandsSlider";

function HomePage() {
  const classes = useStyles();
  const { loading: popularProductsLoading, request: popularProductsRequest } = useHttp();
  const { loading: saleProductsLoading, request: saleProductsRequest } = useHttp();
  const { loading: newProductsLoading, request: newProductsRequest } = useHttp();
  const [popularProducts, setPopularProducts] = useState([1,2,3,4]);
  const [saleProducts, setSaleProducts] = useState([1,2,3,4]);
  const [newProducts, setNewProducts] = useState([1,2,3,4]);

  useEffect(() => {
    document.title = 'Home Page';

    popularProductsRequest('/api/products', 'POST', {
      filter: {},
      max: 8,
      sort: ['popular']
    }).then(data => setPopularProducts(data));

    saleProductsRequest('/api/products', 'POST', {
      filter: {
        sale: true
      },
      max: 8,
    }).then(data => setSaleProducts(data));

    newProductsRequest('/api/products', 'POST', {
      filter: {},
      max: 8,
      sort: ['newer']
    }).then(data => setNewProducts(data));
  }, []);

  return (<>
    <BannerSlider className={classes.bannerSlider} />
    <Typography
      variant="button"
      className={classes.title}
    >
      Popular
    </Typography>
    <CardsSlider loading={popularProductsLoading} cards={popularProducts} />
    <Typography
      variant="button"
      className={classes.title}
    >
      Sales
    </Typography>
    <CardsSlider loading={saleProductsLoading} cards={saleProducts} />
    <Typography
      variant="button"
      className={classes.title}
    >
      New
    </Typography>
    <CardsSlider loading={newProductsLoading} cards={newProducts} />
    <Typography
      variant="button"
      className={classes.title}
    >
      Brands
    </Typography>
    <BransSlider cards={[
      "/images/brands/mi.jpg",
      "/images/brands/apple.jpg",
      "/images/brands/samsung.jpg",
      "/images/brands/lg.jpg",
      "/images/brands/sony.jpg"
    ]} />
  </>);
}

export default HomePage;