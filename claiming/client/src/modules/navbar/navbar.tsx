
const Navbar = () => {

  return (
    <aside className="h-20 w-full bg-neutral-900 flex-shrink-0 flex items-center justify-between">
      <div className="w-20 h-20 flex items-center justify-center p-4 gap-4">
        <img src="/minecraft.svg" className="w-12 h-12 object-contain flex-shrink-0" />
      </div>
      <div className="w-20 h-20 flex items-center justify-center p-4 gap-4">
        <img src="/mojang.png" className="w-10 h-10 object-contain flex-shrink-0" />
      </div>
    </aside>
  )
}

export default Navbar