import React from 'react'
import { useState } from "react";
import FadeLoader
from "react-spinners/BeatLoader";

function Loader() {
    
      let [loading, setLoading] = useState(true);
    
      return (
        <div className="bg-purple-300 max-w-full z-50 max-h-screen flex justify-center items-center">
          <div className='fixed top-[50%]'>
           <FadeLoader
            color="purple"
            loading={loading}
            size={30}
          /> 
          </div>  
        </div>
      )
    }

export default Loader
