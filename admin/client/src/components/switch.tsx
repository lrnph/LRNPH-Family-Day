import { useState } from 'react';

const Switch = () => {
  const [isOn, setIsOn] = useState(false);

  const handleToggle = () => {
    setIsOn(!isOn);
  };

  return (
    <div
      role="switch"
      aria-checked={isOn}
      tabIndex={0}
      onClick={handleToggle}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleToggle();
        }
      }}
      className={`
        relative flex items-center cursor-pointer select-none
        w-8 h-5
        border-2 border-neutral-900
        ${isOn ? 'bg-green-500' : 'bg-neutral-600'}
        rounded-sm
      `}
    >
      {/* Toggle knob */}
      <div
        className={`
          absolute top-0.5
          w-3 h-3
          bg-white border-4 border-white
          rounded-none
          transition-left duration-200
          ${isOn ? 'left-3.5' : 'left-0.5'}
        `}
      />
    </div>
  );
};

export default Switch;
