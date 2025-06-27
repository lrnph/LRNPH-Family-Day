import type { Booth } from "../../schemas"

type BoothBannerProps = {
  booth: Booth | undefined
}

const BoothBanner = ({ booth } :BoothBannerProps ) => {
  
  return (
  <div className="w-full flex items-center justify-center h-10 flex-shrink-0 sticky top-0 bg-green-600 z-50 ring-2 ring-neutral-950">
    <h1 className='font-minecraft-3 text-white text-center text-xl'>
      Active Booth: 
      <span className="ml-2 uppercase underline text-white">
        {booth ? booth.booth_name : "Unknown Booth"}
      </span>
    </h1>
    <span className="w-full h-full absolute border-x-4 border-green-700 ring-4 ring-black" />
    <span className="w-full h-full absolute border-b-4 border-green-900" />
    <span className="w-full h-full absolute border-t-4 border-green-400" />
  </div>
  )
}

export default BoothBanner