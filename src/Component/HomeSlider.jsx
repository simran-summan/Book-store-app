import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import '../index.css'

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

function PauseOnHover({images}) {
  var settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  return (
    <div className="slider-container py-10" >
      <Slider {...settings}>
      {images.map((data, index) => (
        <Link to={`/details/${data.id}`} key={data.id}>
          <div  className=" justify-center items-center m-9">
            <img src={data.image.url} alt={`Slide ${index}`} className="w-[80%] h-[18rem] transform transition-transform duration-500 hover:scale-110" />
            <h1 className='text-md my-4 text-center w-40 font-light'>{data.title}</h1>
          </div>
        </Link>
        ))}
      </Slider>
        <Link to={`/getAllBook`} className=" underline text-red-500 relative float-end bottom-1 mr-9 my-5 hover:text-red-400">See all books</Link>
        </div>
  );
}

export default PauseOnHover;
