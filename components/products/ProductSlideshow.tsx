import ImageGallery from "react-image-gallery";
import "react-slideshow-image/dist/styles.css";

interface Props {
  images: string[];
}

export const ProductSlideshow = ({ images }: Props) => {
  const imagesGalleryImages = images.map((image) => ({
    original: image,
    thumbnail: image,
  }));
  return (
    <ImageGallery
      items={imagesGalleryImages}
      thumbnailPosition="left"
      showBullets={false}
      showPlayButton={false}
      showNav={false}
    />
  );
};
