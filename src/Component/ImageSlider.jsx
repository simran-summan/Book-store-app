import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../index.css';
import { Link } from 'react-router-dom';

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-arrow next-arrow`}
      style={{right: '20px',
        background: '#7520a8'
      }}
      onClick={onClick}
    >
    </div>
  );
};

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-arrow prev-arrow`}
      style={{left: '20px',
        background: '#7520a8'
      }}
      onClick={onClick}
    >
    </div>
  );
};

const ImageSlider = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="min-h-screen">
      <Slider {...settings}>
        {images.map((data, index) => (
          <div key={data.id} >
            <Link to={`/details/${data.id}`} className='!flex flex-col justify-center items-center mt-32'>
            <img src={data.image.url} alt={`Slide ${index}`} className="w-[17%] shadow-lg shadow-black transform transition-transform duration-500 hover:scale-110" />
            <h1 className='text-2xl mt-9 text-center font-light'>{data.title}</h1>
           </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;
