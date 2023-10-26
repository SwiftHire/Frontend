import React from 'react'

const PageLoader = ({children}) => {
  return (
    // <div className="w-8/12 h-screen flex  justify-center items-center bg-red-500">
    <div className="h-[100vh] w-[80vw] grid place-items-center">
      <div className="flex flex-col items-center justify-center">
        <div className="animate-spin inline-block w-10 h-10 border-[5px] border-primary border-t-transparent text-primary rounded-full" role="status" aria-label="loading">
        </div>
        <span className="text-whiteSmoke font-bold mt-4">{children}</span>
      </div>
    </div>
//   </div>
  )
}

export default PageLoader