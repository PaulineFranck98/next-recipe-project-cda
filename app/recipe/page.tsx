'use client'

import { Recipe } from '@prisma/client'
import React, {useState, useEffect} from 'react'
import Image from "next/image"
import Link from 'next/link'


const RecipePage = () => {

 // récupération de la liste des ustensils avec hooks
 const [recipes, setRecipes] = useState<Recipe[]>([])

 useEffect(() => {
     const fetchRecipes = async () => {
         const response = await fetch('/api/recipe')
         const data = await response.json()
         setRecipes(data)
     }

     fetchRecipes()
 }, [])



  return (
    <div>
        { recipes.map((recipe) =>(
            <Link key={recipe.id } href={`/recipe/${recipe.id}`}>
                <p >{ recipe.name }</p>
            {recipe.imageUrl && (
                <Image 
                    src={recipe.imageUrl}
                    width={100}
                    height={100}
                    alt={`Image of ${recipe.name}`}
                />
            )}
            </Link>
   
    ))}

</div>

  )
}

export default RecipePage
