import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { HiEllipsisVertical, HiMiniBars3BottomRight} from "react-icons/hi2";
import { GifState } from '../context/GifContext';
import { GiFishEscape } from 'react-icons/gi';
import GifSearch from './GifSearch';

const Navbar = () => {
    const [categories, setCategories] = useState([]);
    const [showCategories, setShowCategories] = useState(false);

    const { gf , favourites } = GifState();

    const fetchGifsCategories = async () => {
        const {data} = await gf.categories();
        setCategories(data);
    }

    console.log(categories);
    

    useEffect(() => {
        fetchGifsCategories();
    }, []);

    return (
        <nav className=''>
            <div className='relative flex gap-4 justify-between items-center mb-2'>
                <Link to="/" className='flex gap-2'>
                    <img src="/logo.svg" className='w-8' alt="" />
                    <h1 className='text-5xl font-bold tracking-tight cursor-pointer'>GIPHY</h1>
                </Link>

                <div className='font-bold text-md flex gap-2 items-center'>
                    {/* rendering all categories */}
                    {categories?.slice(0, 5)?.map((category) => {
                        return <Link to={`/${category.name_encoded}`} className='px-4 py-1 hover-gradient border-b-4 hidden lg:block' key={category.name}>
                            {category.name}
                        </Link>
                    })}
                    <button onClick={()=>setShowCategories(!showCategories)}>
                        <HiEllipsisVertical size={35} className={`py-0.5 hover-gradient ${showCategories ? "gradient" : ""} border-b-4 hidden lg:block`} />
                    </button>

                    {favourites.length>0 && <div className='h-9 bg-gray-700 pt-1.5 px-6 cursor-pointer rounded'>
                        <Link to="/favourites">Favourite GIFs</Link>
                    </div>}

                    <button>
                        <HiMiniBars3BottomRight className='text-sky-400 block lg:hidden' size={30} />
                    </button>
                </div>
                {
                    showCategories && 
                    <div className='absolute top-14 right-0 px-10 pt-6 pb-9 w-full gradient z-20'>
                        <span className='text-3xl font-extrabold'>Categories</span>
                        <hr className='bg-gray-100 opacity-50 my-5'/>
                        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5  xl:grid-cols-6 gap-4'>
                            {
                                categories?.map((category)=>{
                                    return (
                                        <Link className='font-bold'
                                            to={`/${category.name_encoded}`} 
                                            key={category.name}
                                        >
                                            {category.name}
                                        </Link>
                                    )
                                })
                            }
                        </div>
                    </div>
                }
            </div>

            {/* Search */}
            <GifSearch/>

        </nav>
    )
}

export default Navbar