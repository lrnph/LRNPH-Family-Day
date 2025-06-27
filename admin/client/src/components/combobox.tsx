import { useState } from 'react'
import { motion } from 'motion/react'
import { ChevronIcon } from '@icons'

type ComboboxProps = {
  items: string[]
  value: string
  onChange: (value: string) => void
  placeholder: string
}

const Combobox = ({ items, onChange, value, placeholder }: ComboboxProps) => {
  const [selected, setSelected] = useState(value)
  const [isOpen, setIsOpen] = useState(false)



  const handleSelect = (item: string) => {
    console.log(item)
    setSelected(item)
    setIsOpen(false)
    onChange(item)
  }

  const cleanItem = (item: string) => {
    return item.replace(/\s*-\s*(LRN|FD)\s*/gi, '').trim()
  }

  return (
    <div className="relative w-100">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full h-10 text-left bg-neutral-900 ring-2 ring-neutral-950 border border-neutral-700 rounded-lg text-white px-4 truncate overflow-hidden whitespace-nowrap flex items-center justify-between"
      >
        <span className={selected ? '' : 'text-neutral-400'}>
          {cleanItem(selected) || placeholder}
        </span>

        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          style={{ display: 'flex' }}
          aria-hidden="true"
        >
          <ChevronIcon className="w-5 h-5 stroke-2 stroke-neutral-500" />
        </motion.div>
      </button>

      {isOpen && (
        <ul className="absolute z-50 mt-4 w-full max-h-48 overflow-auto bg-neutral-900 ring-2 ring-neutral-950 border border-neutral-700 rounded-md shadow-md">
          {items.map((item) => (
            <li
              key={item}
              onClick={() => handleSelect(item)}
              onMouseDown={(e) => e.preventDefault()} // prevent blur
              className="px-4 py-2 text-neutral-200 cursor-pointer truncate overflow-hidden whitespace-nowrap"
            >
              {cleanItem(item)}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Combobox
