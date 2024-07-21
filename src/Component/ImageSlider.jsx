import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../index.css'

const ImageSlider = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="m-7 min-h-screen">
      <Slider {...settings}>
        {images.map((data, index) => (
          <div key={data.id} className='!flex'>
            <div className='w-[40%] mx-24 relative'>
            <h1 className='text-6xl bodoni-moda bottom-24 absolute'>{data.title}</h1>
            <p className='baskervville-regular text-xl bottom-7 absolute'>{data.summary}</p>
            </div>
            <img src={data.image.url} alt={`Slide ${index}`} className="w-[25%] h-auto" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;
