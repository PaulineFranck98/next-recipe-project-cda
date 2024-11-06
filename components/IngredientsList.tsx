import React from 'react'
import Image from "next/image"


interface IngredientsListProps {
    ingredients: IngredientRecipeType[]
}

const IngredientsList: React.FC<IngredientsListProps> = ({ ingredients }) => {
  return (
    <div className='flex flex-wrap gap-3 p-5 '>
        {ingredients.map((ingredient) => (
        <div key={ingredient.id} className='flex flex-col items-center w-[100px]'>
            {ingredient.ingredient.imageUrl && (
            <Image
                className='rounded-md' 
                src={ingredient.ingredient.imageUrl}
                width={100}
                height={100}
                alt={`Image of ${ingredient.ingredient.ingredientName}`}
            />
            )}
            <p className='w-full text-center break-words font-semibold mt-2'>
                {ingredient.ingredient.ingredientName}  
            </p>
            <p className='text-sm font-light'>
                {ingredient.quantity} {ingredient.unit}
            </p>
        </div>

        ))}
    </div>
  )
}

export default IngredientsList
