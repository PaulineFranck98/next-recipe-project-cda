'use client'

import { Ingredient } from '@prisma/client'
import React, {useState, useEffect} from 'react'
import Image from "next/image"


const IngredientPage = () => {

 // récupération de la liste des ustensils avec hooks
 const [ingredients, setIngredients] = useState<Ingredient[]>([])

 useEffect(() => {
     const fetchIngredients = async () => {
         const response = await fetch('/api/ingredient')
         const data = await response.json()
         setIngredients(data)
     }

     fetchIngredients()
 }, [])



  return (
    <div>
        { ingredients.map((ingredient) =>(
            <div key={ingredient.id }>
                <p >{ ingredient.ingredientName }</p>
        {ingredient.imageUrl && (
            <Image 
                src={ingredient.imageUrl}
                width={100}
                height={100}
                alt={`Image of ${ingredient.ingredientName}`}
            />
        )}
    </div>
   
    ))}

</div>

  )
}

export default IngredientPage
