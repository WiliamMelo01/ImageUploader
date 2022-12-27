import React, { useRef } from 'react';

import successImage from '../assets/success.png';

export default function Uploaded({ imageUrl }: { imageUrl: string }) {

    const linkRef = useRef<HTMLInputElement>(null);

    const copyToClipboard = () => {
        if (!linkRef.current) {
            return;
        }
        linkRef.current.select();
        linkRef.current.setSelectionRange(0, 99999);
        navigator.clipboard.writeText(linkRef.current.value)
            .then(() => {
                alert("Text copied to clipboard");
            })
            .catch((err) => {
                console.error(err);
            })
    }

    return (
        <div className="w-11/12 md:w-[402px] h-[469px] bg-white rounded-xl shadow-md flex flex-col items-center font-poppins">
            <img
                src={successImage}
                alt="Success Icon"
                className='w-10 h-10 mt-10 mb-3'
            />
            <div className="font-medium text-[#4F4F4F] text-lg text-center mb-6">
                Uploaded Successfully!
            </div>
            <div className="w-10/12 h-full flex flex-col">
                <img
                    src={imageUrl}
                    alt="Image uploaded"
                    className="rounded-xl h-56 mb-6"
                />
                <div className="w-full h-9 relative flex">
                    <input
                        type="text"
                        className="w-full h-full bg-[#F6F8FB] outline-none rounded-lg pl-2 pr-24 text-[10px] text-ellipsis"
                        readOnly
                        value={imageUrl}
                        ref={linkRef}
                    />
                    <button
                        className="absolute right-1 w-[74px] h-full bg-[#2F80ED] rounded-lg font-notosans text-xs text-white"
                        onClick={copyToClipboard}
                    >
                        Copy Link
                    </button>
                </div>
            </div>

        </div>
    )
}
