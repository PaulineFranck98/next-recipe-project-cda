'use client'

import { Tool } from '@prisma/client'
import React, {useState, useEffect} from 'react'
import Image from "next/image"


const ToolPage = () => {

    // récupération de la liste des ustensils avec hooks
    const [tools, setTools] = useState<Tool[]>([])

    useEffect(() => {
        const fetchTools = async () => {
            const response = await fetch('/api/tool')
            const data = await response.json()
            setTools(data)
        }

        fetchTools()
    }, [])




  return (
    <div>
        { tools.map((tool) =>(
            <div key={tool.id }>
                <p >{ tool.toolName }</p>
        {tool.imageUrl && (
            <Image 
                src={tool.imageUrl}
                width={100}
                height={100}
                alt={`Image of ${tool.toolName}`}
            />
        )}
    </div>
       
    ))}

    </div>
  )
}

export default ToolPage
