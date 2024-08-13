import React from 'react';
import { GrPrevious, GrNext } from "react-icons/gr";

const Pagination = ({ totalPage, paginate, currentPage }) => {
    const pageNo = [];
    for (let i = 0; i < totalPage ; i++) {
        pageNo.push(i);
    }
    return (
        <div>
                <ul className='flex gap-[3px] md:gap-3 lg:gap-3 justify-center bg-purple-700 py-3 border-b'>
                                {currentPage > 0 && (
                                    <div 
                                        className='bg-purple-300 hover:bg-purple-200 pt-[7px] px-2 rounded-full duration-200'
                                        onClick={() => paginate(currentPage - 1)}
                                    >
                                        <GrPrevious />
                                    </div>
                                )}
                                
                                {pageNo.map(number => (
                                    <li key={number} className={`bg-purple-200 hover:bg-purple-300 py-[4px] px-3 rounded-full duration-200 ${currentPage === number ? 'bg-purple-500' : ''}`}>
                                        <button onClick={() => paginate(number)}>{number+1}</button>
                                    </li>
                                ))}
                                
                                {currentPage < pageNo.length-1 && (
                                    <div 
                                        className='bg-purple-300 hover:bg-purple-200 pt-[7px] px-2 rounded-full duration-200'
                                        onClick={() => paginate(currentPage + 1)}
                                    >
                                        <GrNext />
                                    </div>
                                )}
                            </ul>
            
        </div>
    );
}

export default Pagination;
