import { FC } from 'react';
import { Slide } from 'react-slideshow-image';

import 'react-slideshow-image/dist/styles.css';
import styles from './ProductSlideshow.module.css';

interface Props {
    images: string[]
}

export const ProductSlideshow: FC<Props> = ({ images }) => {
  return (
<<<<<<< HEAD
    <Slide
        easing="ease"
        duration={ 7000 }
        indicators
    >
        {
            images.map( image =>  {
                const url = `/products/${ image }`;
                return (
                    <div className={ styles['each-slide'] } key={ image }>
                        <div style={{
                            backgroundImage: `url(${ url })`,
                            backgroundSize: 'cover'
                        }}>
                        </div>
                    </div>
                )

            })
        }

    </Slide>
  )
}
=======
    <Slide easing="ease" duration={7000} indicators>
      {images.map((image) => {
        const url = `/products/${image}`;
        return (
          <div className={styles["each-slide"]} key={image}>
            <div
              style={{
                backgroundImage: `url(${url})`,
                backgroundSize: "cover",
              }}
            ></div>
          </div>
        );
      })}
    </Slide>
  );
};

// import { FC } from "react";
// import { Slide } from "react-slideshow-image";

// import "react-slideshow-image/dist/styles.css";
// import styles from "./ProductSlideshow.module.css";

// interface Props {
//   images: string[];
// }

// export const ProductSlideshow: FC<Props> = ({ images }) => {
//   return (
//     <Slide easing="ease" duration={7000} indicators>
//       {images.map((image) => {
//         const url = `/products/${image}`;
//         return (
//           <div className={styles["each-slide"]} key={image}>
//             <div
//               style={{
//                 backgroundImage: `url(${url})`,
//                 backgroundSize: "cover",
//               }}
//             ></div>
//           </div>
//         );
//       })}
//     </Slide>
//   );
// };
>>>>>>> 5751549a0b794882a1142dcf0b5aa7d3dbdbed0a
