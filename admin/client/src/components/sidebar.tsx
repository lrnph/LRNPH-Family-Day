import { activeTabAtom } from "@stores"
import { useAtom } from "jotai"
import { menus } from "@constants"
import clsx from "clsx"



const Sidebar = () => {

  const [ activeTab, setActiveTab ]= useAtom(activeTabAtom)

  return (
    <aside className="flex flex-col h-full w-32 items-center justify-center gap-8">
      {menus.map((menu, index) => {
        const isActive = menu.name === activeTab
        
        return(
          <button 
            key={index}
            onClick={() => setActiveTab(menu.name)}
            className={clsx("w-12 h-12 aspect-square rounded-xl flex items-center justify-center cursor-pointer transition-colors duration-300 ease-in-out", {
              "bg-lime-500 shadow-2xl shadow-lime-500 ": isActive,
              "bg-transparent hover:bg-neutral-700": !isActive
            })}
          >
            <menu.icon className="stroke-2 stroke-white" />
          </button>

        )
      })}
    </aside>
  )
}

export default Sidebar