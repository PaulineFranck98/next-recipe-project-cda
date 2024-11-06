import React from 'react'
import Image from "next/image"
import CategoryTag  from '@/components/CategoryTag'
import PreparationTimeGauge from '@/components/PreparationTimeGauge'
import Link from 'next/link'
import { Clock10, ChevronRight } from 'lucide-react';

interface RecipeCardProps {
    recipe: RecipeWithCategoryAndDetails
}


const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <div className='w-[270px] h-[450px] bg-slate-800 rounded-lg'>
        <div className='w-full h-[200px] relative'>
            {recipe.imageUrl && (
                <Image 
                    className='object-cover rounded-t-lg'
                    src={recipe.imageUrl}
                    fill={true}
                    alt={`Image of ${recipe.name}`}
                />
            )}
        </div>
        <div className=' flex flex-col gap-3 items-start p-3'>
            <h1 className='break-words text-xl'>
                { recipe.name }
            </h1>
            <CategoryTag category={recipe.category.categoryName} />
            <span className='inline-flex items-center gap-2'><Clock10 size={20}/>{ recipe.preparationTime } min</span>
            <PreparationTimeGauge preparationTime={recipe.preparationTime}/>
            <Link 
                key={recipe.id} 
                href={`/recipe/${recipe.id}`}
                className='border border-gray-400 py-1 px-2 rounded-md flex gap-2 items-center hover:bg-slate-700 duration-300'  
            >
                View Recipe <ChevronRight size={15} />
            </Link>
        </div>
    </div>
  )
}

export default RecipeCard
