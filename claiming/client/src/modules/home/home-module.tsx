import type { Booth } from "../../schemas"
import { useState } from "react"
import { activeBoothAtom } from "../../stores"
import { useSetAtom } from "jotai"
import Button from "../../components/button"
import ComboBox from "../../components/combobox"
import Footer from "../../components/footer"

type HomeModuleProps = {
  data: Booth[]
}

const HomeModule = ({ data }: HomeModuleProps ) => {

  const setActiveBooth = useSetAtom(activeBoothAtom)
  const [ selectedBooth, setSelectedBooth ] = useState<Booth | null>()

  const handleSelect = () =>{
    if (!selectedBooth) return
    setActiveBooth(selectedBooth)
  }
  
  return (
    <article className="w-full h-full flex flex-col items-center justify-center bg-neutral-800">
      <div className="py-8 max-w-[400px] mx-auto w-full h-full flex flex-col items-center justify-center gap-4 p-8">
        <img src="/title.png" className="w-full h-fit object-contain mb-8" />
    
        <label className="font-medium uppercase text-sm text-gray-300 text-start w-full">
          Select your designated Booth
        </label>
        <ComboBox onChange={setSelectedBooth} data={data}/>
        <Button className="mt-4" onClick={handleSelect} disabled={!selectedBooth}>
          Enter Booth
        </Button>
      </div>
      <Footer />      
    </article>
  )
}

export default HomeModule