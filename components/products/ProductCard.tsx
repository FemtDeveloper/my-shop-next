import NextLink from "next/link";
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  Box,
  Typography,
  Link,
  Chip,
} from "@mui/material";
import { FC, useMemo, useState } from "react";
import { IProduct } from "../../interfaces";

interface Props {
  product: IProduct;
}

export const ProductCard: FC<Props> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const productImage = useMemo(
    () =>
      isHovered
        ? `/products/${product.images[1]}`
        : `/products/${product.images[0]}`,
    [isHovered, product.images]
  );

  return (
    <Grid
      item
      xs={6}
      sm={4}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card>
        <NextLink href={`/product/${product.slug}`} passHref prefetch={false}>
          <Link>
            <CardActionArea>
              {product.inStock === 0 && (
                <Chip
                  color="primary"
                  label="No hay disponibles"
                  sx={{
                    position: "absolute",
                    zIndex: 99,
                    top: "2px",
                    left: "2px",
                    backgroundColor: "transparent",
                    border: "solid red 1px",
                    color: "red",
                    fontWeight: 600,
                  }}
                />
              )}
              <CardMedia
                component="img"
                image={productImage}
                alt={product.title}
                className="fadeIn"
                onLoad={() => setIsLoaded(true)}
              ></CardMedia>
            </CardActionArea>
          </Link>
        </NextLink>
      </Card>

      <Box
        sx={{ mt: 1, display: isLoaded ? "block" : "none" }}
        className="fadeIn"
      >
        <Typography fontWeight={700}>{product.title}</Typography>
        <Typography fontWeight={500}>{`$${product.price}`}</Typography>
      </Box>
    </Grid>
  );
};
