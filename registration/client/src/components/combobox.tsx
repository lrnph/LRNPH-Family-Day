import { useState } from 'react'
import type { Booth } from '../schemas'

type ComboBoxProps = {
  data: Booth[]
  placeholder?: string
  onChange: (item: Booth) => void
}

const ComboBox = ({ data, placeholder = "Select a booth", onChange }: ComboBoxProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<Booth | null>(null)

  const handleSelect = (item: Booth) => {
    setSelectedItem(item)
    setIsOpen(false)
    onChange(item)
  }

  return (
    <div className="relative w-full">
      <button
        type="button"
        className="w-full px-4 py-2 font-minecraft-3 bg-neutral-900 text-white border border-neutral-500 placeholder-neutral-500 focus:outline-none focus:ring-2 ring-green-500 transition duration-200 shadow-inner text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedItem ? selectedItem.booth_name : placeholder}
      </button>

      {isOpen && (
        <ul className="absolute z-50 bg-stone-500 border w-full mt-1 max-h-60 overflow-y-auto shadow-md rounded">
          {data.length === 0 ? (
            <li className="p-2 text-white">No options available</li>
          ) : (
            data.map((item) => (
              <li
                key={item.id}
                className="px-4 py-2 hover:bg-stone-600 cursor-pointer text-white border-t-2 border-r border-stone-400 ring-2 ring-stone-600"
                onClick={() => handleSelect(item)}
              >
                {item.booth_name}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  )
}

export default ComboBox
