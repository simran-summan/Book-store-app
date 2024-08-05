import React, { Component } from "react";
import Slider from "react-slick";

function PauseOnHover({images}) {
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
      {images.map((data, index) => (
          <div key={data.id} className="!flex justify-center items-center m-9">
            <img src={data.image.url} alt={`Slide ${index}`} className="w-[60%] " />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default PauseOnHover;
