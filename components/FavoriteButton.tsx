import React from 'react'
import { useState, useEffect } from 'react'
import { Heart } from 'lucide-react'

interface FavoriteButtonProps {
    recipeId: string;
}


const FavoriteButton: React.FC<FavoriteButtonProps> = ({ recipeId }) => {

    const [isFavorite, setIsFavorite ] = useState(false)

    // Je vérifie si la recettte est en favoris au chargement 
    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
        setIsFavorite(favorites.includes(recipeId))
    }, [recipeId])

    const toggleFavorite = () => {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')

        if (favorites.includes(recipeId)) {
            // Si la recette est dans les favoris, je la supprime
            const updatedFavorites = favorites.filter((id : any) => id !== recipeId)
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
            setIsFavorite(false)
        } else {
            // sinon, je l'ajoute aux favoris
            favorites.push(recipeId)
            localStorage.setItem('favorites', JSON.stringify(favorites))
            setIsFavorite(true)
        }
    }


  return (
    <button 
        onClick={toggleFavorite}
        className='flex gap-2 items-center px-4 py-2 bg-salmon rounded-lg text-white'
    >
        <Heart size={18} className={isFavorite ? 'fill-white' : ''} /> 
        Favorite
    </button>
  )
}

export default FavoriteButton
