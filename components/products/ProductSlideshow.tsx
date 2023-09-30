import { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-slideshow-image/dist/styles.css";

interface Props {
  images: string[];
}

export const ProductSlideshow = ({ images }: Props) => {
  const [isResponsive, setIsResponsive] = useState(false);
  const imagesGalleryImages = images.map((image) => ({
    original: image,
    thumbnail: image,
  }));

  const handleResize = () => {
    if (window.innerWidth < 900) {
      setIsResponsive(true);
      return;
    }
    setIsResponsive(false);
  };

  useEffect(() => {
    if (process.browser) {
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (process.browser) {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  return (
    <ImageGallery
      items={imagesGalleryImages}
      thumbnailPosition={isResponsive ? "bottom" : "left"}
      showBullets={false}
      showPlayButton={false}
      showNav={isResponsive ? true : false}
    />
  );
};
