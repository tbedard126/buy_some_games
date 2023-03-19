import { Carousel } from "react-bootstrap";

function ImageCarousel({ images }) {
  return (
    <Carousel interval={2500}>
      {images.map((image, index) => (
        <Carousel.Item key={index}>
          <img
            className="d-block w-100"
            src={image.src}
            alt={image.alt}
            style={{ maxHeight: "300px", objectFit: "contain" }}
          />
          <Carousel.Caption>
            <h3>{image.caption}</h3>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default ImageCarousel;
