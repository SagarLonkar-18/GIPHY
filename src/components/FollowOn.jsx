import React from 'react'
import { FaInstagram, FaTwitter, FaFacebook } from 'react-icons/fa'

const FollowOn = () => {
    return (
        <div className='faded-text pt-2'>
            <span>Follow on : </span>
            <div className='flex gap-4 pt-3'>
                <a href="https://www.facebook.com/GIPHY/" target='_blank'>
                    <FaFacebook size={20}/>
                </a>
                <a href="https://www.instagram.com/giphy" target='_blank'>
                    <FaInstagram size={20}/>
                </a>
                <a href="https://x.com/giphy" target='_blank'>
                    <FaTwitter size={20}/>
                </a>
            </div>
        </div>
    )
}

export default FollowOn