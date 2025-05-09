import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { HiEllipsisVertical, HiMiniBars3BottomRight} from "react-icons/hi2";

const Navbar = () => {
    const [categories, setCategories] = useState([]);
    const [showCategories, setShowCategories] = useState(false);

    return (
        <nav>
            <div className='relative flex gap-4 justify-between items-center mb-2'>
                <Link to="/" className='flex gap-2'>
                    <img src="/logo.svg" className='w-8' alt="" />
                    <h1 className='text-5xl font-bold tracking-tight cursor-pointer'>GIPHY</h1>
                </Link>
                {/* rendering all categories */}
                <Link className='px-4 py-1 hover-gradient border-b-4 hidden lg:block'>
                    Reactions
                </Link>
                <button onClick={()=>setShowCategories(!showCategories)}>
                    <HiEllipsisVertical size={35} className={`py-0.5 hover-gradient ${showCategories ? "gradient" : ""} border-b-4 hidden lg:block`} />
                </button>
                <div className='h-9 bg-gray-700 pt-1.5 px-6 cursor-pointer rounded'>
                    <Link to="/favourites">Favourite GIFs</Link>
                </div>
                <button>
                    <HiMiniBars3BottomRight className='text-sky-400 block lg:hidden' size={30} />
                </button>
                {
                    showCategories && 
                    <div className='absolute top-14 right-0 px-10 pt-6 pb-9 w-full gradient z-20'>
                        <span>Categories</span>
                        <hr />
                        <div>
                            <Link className='font-bold'>Reactions</Link>
                        </div>
                    </div>
                }
            </div>
        </nav>
    )
}

export default Navbar