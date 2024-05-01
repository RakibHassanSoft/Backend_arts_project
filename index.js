import React, { useState } from 'react';
import Card from '../Card/Card';

const Cards = ({ data }) => {

    // console.log(data)
    const [visibleCount, setVisibleCount] = useState(6);  // Initial number of items to show
    const length = data.length;
    const nowCnt = length - 6;
    const showMoreItems = () => {
        setVisibleCount(prevCount => prevCount + nowCnt); // Increase the number of items by 6
    };

    return (
        <div>
            {
                !length &&(
                    <h1 className='text-3xl text-center text-blue-600 font-bold '>No data found </h1>
                )
            }
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-between gap-10 w-11/12 m-auto p-5'>
                {data.slice(0, visibleCount).map((d) => (
                    <Card key={d.id} d={d} /> // Ensure to use key and remove index if not needed
                ))}
            </div>
            {visibleCount < data.length && (
                <div className='w-11/12 m-auto p-4'>

                    <button onClick={showMoreItems} className=" mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                        See More
                    </button>
                </div>
            )}
        </div>
    );
};

export default Cards;
