import React from 'react';

export default function Loading({ progressPercentage }: { progressPercentage: number }) {
    return (
        <div className="w-11/12 md:w-[402px] h-36 bg-white rounded-xl px-8">
            <p className="font-medium text-[#4F4F4F] text-xl mt-9 mb-7 text-left">
                Uploading...
            </p>
            <div className='h-[6px] w-full mx-auto bg-gray-300'>
                <div
                    className='h-full bg-[#2F80ED] rounded-lg'
                    style={{ width: `${progressPercentage}%` }}
                >
                </div>
            </div>
        </div>
    )
}
