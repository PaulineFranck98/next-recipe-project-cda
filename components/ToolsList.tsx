import React from 'react'
import Image from "next/image"

interface ToolsListProps {
    tools : ToolRecipeType[]
}

const ToolsList: React.FC<ToolsListProps> = ({ tools }) => {
  return (
    <div className='flex flex-wrap gap-3 p-5'>
        {tools.map((tool) => (
            <div key={tool.id} className='flex flex-col items-center w-[100px]'>
                {tool.tool.imageUrl && (
                    <Image 
                        className='rounded-md'
                        src={tool.tool.imageUrl}
                        width={100}
                        height={100}
                        alt={`Image of ${tool.tool.toolName}`}
                    />
                )}
                <p className='w-full text-center break-words font-semibold mt-2'>
                    {tool.tool.toolName}  
                </p>
            </div>
        ))}
    </div>
  )
}

export default ToolsList
