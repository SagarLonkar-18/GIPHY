import React, { use, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { GifState } from '../context/GifContext';
import Gif from '../components/Gif';
import { HiMiniChevronUp, HiMiniHeart } from "react-icons/hi2";
import { HiMiniChevronDown } from "react-icons/hi2";
import FollowOn from '../components/FollowOn';
import { HiOutlineExternalLink } from 'react-icons/hi';
import { FaPaperPlane } from 'react-icons/fa';
import { AiOutlineLink } from "react-icons/ai";
import { IoMdDownload } from "react-icons/io";

const SingleGif = () => {

    const contentType = ["gifs","stickers","texts"];

    const {type, slug} = useParams();
    const[gif, setGif] = useState({}); 
    const[relatedGifs, setRelatedGifs] = useState([]);
    const[readMore, setReadMore] = useState(false);
    const[copyLink, setCopyLink] = useState(false);

    console.log(gif);
    
    const {gf, addToFavourites,favourites} = GifState();

    const shareGif = async() => {
        if (!gif?.url) return;
        try {
            await navigator.clipboard.writeText(gif.url);
            // alert("GIF link copied to clipboard!");
            setCopyLink(true);
            setTimeout(() => {
                setCopyLink(false);
            }, 3000);
        } catch (err) {
            alert("Failed to copy link.");
        }
    }

    const downloadGif = async () => {
        if (!gif?.images?.original?.url) return showPopup("No GIF to download.");
        try {
            const response = await fetch(gif.images.original.url);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${gif.title || "giphy"}.gif`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        } catch (err) {
            showPopup("Download failed.");
        }
    };

    const fetchGif = async () => {
        const gifId = slug.split("-");
        const {data} = await gf.gif(gifId[gifId.length-1]);
        const {data:related} = await gf.related(gifId[gifId.length-1],{
            limit:10,
        });
        setGif(data);
        setRelatedGifs(related);
    }

    useEffect(() => {
        if(!contentType.includes(type)) {
            throw new Error("Invalid Content Type");
        }
        fetchGif(); 
    }, [slug]);

    return (
        <div className='grid grid-cols-4 my-10 gap-4'>
            {/* sidebar */}
            <div className='hidden sm:block'>
                {gif?.user && (
                    <>
                        <div className='flex gap-1 '>
                            <img src={gif?.user?.avatar_url} alt={gif?.user?.display_name} className=' h-14'/>
                            <div className='px-2'>
                                <div className='font-bold'>{gif?.user?.display_name}</div>
                                <div className='faded-text'>@{gif?.user?.username}</div>
                            </div>
                        </div>
                        {
                            gif?.user?.description && (
                                <p className='py-4 whitespace-pre-line text-sm text-gray-400'>
                                    {
                                        readMore ? gif?.user?.description : gif?.user?.description.length<100 ? gif?.user?.description.slice(0,100) : gif?.user?.description.slice(0,100) + "..."
                                    }
                                    {
                                        gif?.user?.description.length>100 && (
                                            <div className='flex items-center faded-text cursor-pointer' onClick={() => setReadMore(!readMore)}>
                                                {
                                                    readMore ? (
                                                        <>
                                                            Read less <HiMiniChevronUp size={20}/>
                                                        </>
                                                    ) : (
                                                        <>
                                                            Read more <HiMiniChevronDown size={20}/>
                                                        </>
                                                    )
                                                }
                                            </div>
                                        )
                                    }
                                    
                                </p>
                            )
                        }
                    </>
                )}
                <FollowOn/>
                <div className='divider'></div>
                {
                    gif?.source && (
                        <div>
                            <span className='faded-text'>Source</span>
                            <div className='flex items-center text-sm font-bol gap-1'>
                                <HiOutlineExternalLink size={25}/>
                                <a href={gif.source} target='_blank' className='truncate'>
                                    {gif.source}
                                </a>
                            </div>
                        </div>
                    )
                }
            </div>
            <div className='col-span-4 sm:col-span-3'>
                <div className='flex gap-6'>
                    {/* gif */}
                    <div className='w-full sm:w-3/4'> 
                        <div className='faded-text truncate mb-2'>{gif.title}</div>
                        <Gif gif={gif} hover={false}/>
                        {/* for mobiles */}
                        <div className='flex sm:hidden gap-1'>
                            <img src={gif?.user?.avatar_url} alt={gif?.user?.display_name} className=' h-14'/>
                            <div className='px-2'>
                                <div className='font-bold'>{gif?.user?.display_name}</div>
                                <div className='faded-text'>@{gif?.user?.username}</div>
                            </div>
                            {/* <button className='ml-auto' onClick={shareGif}>
                                <FaPaperPlane size={25}/>
                            </button> */}
                        </div>
                    </div>
                    {/* favourites / share / embed */}
                    <div className='hidden sm:flex flex-col gap-5 mt-6'>
                        <button className='flex gap-5 items-center font-bold text-lg cursor-pointer' 
                        onClick={()=>addToFavourites(gif.id)}>
                            <HiMiniHeart size={30} className={`${favourites.includes(gif.id) ? 'text-red-500' : ''}`}/> Favourite
                        </button>
                        <button className='flex gap-6 itesm-center font-bold text-lg cursor-pointer' onClick={shareGif}>
                            <AiOutlineLink size={25}/> <span className={`${copyLink ? "text-green-500" : ""}`}>{copyLink ? "Copied !" : "Copy Link"}</span>
                        </button>
                        <button className='flex gap-6 itesm-center font-bold text-lg cursor-pointer' onClick={downloadGif}>
                            <IoMdDownload size={25}/> Download
                        </button>
                    </div>
                </div>
                <div>
                    <div className='font-extrabold text-xl mb-2'>Related GIFs</div>
                    <div className='columns-2 md:columns-3 gap-2'>
                        {
                            relatedGifs.slice(1).map((gif) => (
                                <Gif key={gif.id} gif={gif}/>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleGif