import React from 'react'

interface ThemeProps {
    themeName: string;
}

const Theme: React.FC<ThemeProps> = ({ themeName }) => {
  return (
    <div>
       <span className='text-xs rounded-full bg-salmon px-3 py-2 font-sans font-semibold'>
            {themeName}  
        </span>
    </div>
  )
}

export default Theme
