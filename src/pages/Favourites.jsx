import React, { useEffect, useState } from 'react'
import { GifState } from '../context/GifContext';
import { SiPlanetscale } from 'react-icons/si';
import Gif from '../components/Gif';

const Favourites = () => {

    const {gf, favourites} = GifState();
    const[favouriteGIFs, setFavouriteGIFs] = useState([]);

    const fetchFavouriteGIFs = async () => {
        const {data:gifs} = await gf.gifs(favourites);
        setFavouriteGIFs(gifs);   
    }

    useEffect(() => {
        fetchFavouriteGIFs();
    }, [favourites]); 

    return (
        <div className='mt-2'>
            <span className='text-xl font-extrabold mb-2'>
                My Favourites
            </span>
            <div className='columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2 mt-2'>
                {
                    favouriteGIFs.map((gif) => (
                        <Gif key={gif.id} gif={gif} hover={false} />
                    ))
                }
            </div>
        </div>
    )
}

export default Favourites