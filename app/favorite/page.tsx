'use client'

import React from 'react'
import { useState, useEffect } from 'react'
import RecipeCard from '@/components/RecipeCard'
import { BookHeart } from 'lucide-react';


const FavoritesPage = () => {

    const[favoriteRecipes, setFavoriteRecipes] = useState<RecipeWithCategoryAndDetails[]>([])

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')

        const fetchFavoriteRecipes = async () => {
            const recipes: RecipeWithCategoryAndDetails[] = await Promise.all(
                favorites.map(async (id : string) => {
                    const response = await fetch(`/api/recipe/${id}`)
                    return response.json();
                })
            )

            setFavoriteRecipes(recipes)
        }

        fetchFavoriteRecipes()
    }, [])




  return (
    <div>
      <h1 className='text-3xl mb-10 flex gap-2 justify-center items-center dark:text-dark-foreground'>Your Favorite Recipes <BookHeart className='text-lime-500' size={26} /></h1>
    {favoriteRecipes.length > 0 ? ( 
        <div className='grid grid-cols1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-screen-xl mx-auto'>
        {favoriteRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
        ))}

      </div>
    ) : (
        <p>No favorites yet! Feel free to add some :)</p>
    )}

      
    </div>
  )
}

export default FavoritesPage
