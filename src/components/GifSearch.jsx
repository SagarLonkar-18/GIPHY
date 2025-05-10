import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { HiMiniXMark } from "react-icons/hi2";

const GifSearch = () => {

    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const searchGifs = async () => {
        if(query.trim() === "") return;
        navigate(`/search/${query}`);
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            searchGifs();
        }
    }

    return (
        <div className="flex relative">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full pl-4 pr-14 py-5 text-xl text-black rounded-tl rounded-bl border border-gray-300 outline-none bg-white"
                placeholder="Search for gifs and stickers"
            />
            {
                query && (
                    <button
                        className="absolute bg-gray-300 opacity-90 rounded-full right-20 mr-2 top-6 cursor-pointer"
                        onClick={() => setQuery("")}
                    >
                        <HiMiniXMark size={22}/> 
                    </button>
                )
            }
            <button
                className="bg-gradient-to-r from-pink-600 to-pink-400 text-white px-4 py-2 rounded-br"
                onClick={searchGifs}
            >
                <HiOutlineMagnifyingGlass
                    className="-scale-x-100"
                    size={35}
                />
            </button>
        </div>
    )
}

export default GifSearch