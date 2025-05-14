import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { GifState } from '../context/GifContext';
import Gif from '../components/Gif';
import { useNavigate } from 'react-router-dom';
import FollowOn from '../components/FollowOn';

const Categories = () => {

    const[results, setResults] = useState([]);

    const { category } = useParams();

    const {gf} = GifState();

    const fetchResults = async () => {
        const {data} = await gf.gifs(category,category);
        setResults(data);
    } 
    
    useEffect(() => {
        fetchResults();
    }, [category]);

    return (
        <div className='flex flex-col sm:flex-row gap-5 my-4'>
            <div className='w-full sm:w-72 '>
                {
                    results.length>0 && <Gif gif={results[0]} hover={false}/>
                }
                <span className='text-gray-400 text-sm pt-2'>
                    GIF it to me !
                </span>
                <FollowOn/>
                <div className='divider '/>
            </div>
            <div className=''>
                <h2 className='text-4xl font-extrabold capitalize mb-2'>
                    {category.split("-").join(" & ")} GIFs
                </h2>
                <h2 className='text-lg text-gray-400 pb-3 font-bold hover:text-gray-50 cursor-pointer capitalize'>
                    @{category} GIFs
                </h2>
                {
                    results.length>0 && (
                        <div className='columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2'>
                            {
                                results.slice(1).map((gif) => (
                                    <Gif key={gif.id} gif={gif}/>
                                ))
                            }
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Categories