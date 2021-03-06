import { Paper, Typography } from "@material-ui/core";
import { useEffect, useState, memo, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useHttp } from "../../hooks/http.hook";
import { useStyles } from "./ProductPageClasses";
import ThumbsSlider from '../../components/ThumbsSlider/ThumbsSlider';
import ProductInfo from "./productPageComponents/ProductInfo/ProductInfo";
import { Skeleton } from "@material-ui/lab";
import CardsSlider from "../../components/CardsSlider/CardsSlider";

function ProductPage() {
  const classes = useStyles();
  const { url } = useParams();
  const { request, status } = useHttp();
  const [images, setImages] = useState([]);
  const [product, setProduct] = useState({
    name: null,
    rating: null,
    url: null,
    price: null,
    options: [],
    sale: null,
    mainImage: null,
    count: null,
    images: [],
    categories: [],
    date: null
  });

  const sliderFilter = useMemo(() => ({
    '!ids': [product._id],
    filter: {
      price: { from: (product.price / 100) * 50, to:  (product.price / 100) * 150},
      categories: product.categories,
    }
  }), [product.price, product.categories, product._id]);

  useEffect(() => {
    request(`/api/product/${url}`)
      .then(data => setProduct(data));
  }, [request, url]);

  useEffect(() => {
    document.title = product.name ?? '...';
  }, [product.name]);

  useEffect(() => {
    setImages([product.mainImage, ...product.images]);
  }, [product.images, product.mainImage]);

  let productSlider = null;
  if (!status.isSuccess) productSlider = (
    <Skeleton
      className={classes.productSlider}
      animation="wave"
    />
  )
  else productSlider = (
    <Paper
      variant="outlined"
      className={classes.productSlider}
    >
      <ThumbsSlider slides={images} />
    </Paper>
  )

  return (<>
    <div className={classes.root}>
      {productSlider}
      <ProductInfo status={status} product={product} />
    </div>
    <Typography
      variant="button"
      className={classes.title}
    >
      Similar Products
    </Typography>
    <CardsSlider className={classes.moreSlider} filter={sliderFilter} />
  </>);
}

export default memo(ProductPage);