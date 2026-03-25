
'use client' // Error boundaries must be Client Components


import { useEffect, useState } from 'react'

type errorType = {
    error: Error & { digest?: string }
    reset?: () => void;
}
 
export default function Error({
  error,
  reset,
}: errorType ){
    const [message, setMessage] =  useState<string>() 
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMessage(error.message || "An unexpected error occurred");
    }, [error]);

    return (
      <div className='justify-center items-center flex flex-col h-screen'>
        <h2 className='text-[24px] font-bold'>Something went wrong!</h2>
        <h2 className='text-lg mb-4 text-rose-500'>{message}</h2>
        <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
            onClick={
            () => reset?.()
          }
        >
          Try again !
        </button>
      </div>
    );
}