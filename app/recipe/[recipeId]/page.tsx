'use client'

import React from 'react'
import{ useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from "next/image"
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { CookingPot, ListChecks, Clock10, Route } from 'lucide-react';
import CategoryTag  from '@/components/CategoryTag'
import PreparationTimeGauge from '@/components/PreparationTimeGauge'
import RecipeStepsSwiper from '@/components/RecipeStepsSwiper'
import IngredientsList from '@/components/IngredientsList'
import ToolsList from '@/components/ToolsList'
import RecipePDFGenerator from '@/components/RecipePDFGenerator'
import FavoriteButton from '@/components/FavoriteButton'

const RecipeDetailPage = () => {

    const params = useParams()

    const [ recipe, setRecipe ] = useState<RecipeWithCategoryAndDetails | null>(null)

    useEffect(() => {
        const fetchRecipe = async() => {
            const response = await fetch(`/api/recipe/${params.recipeId}`)
            const data: RecipeWithCategoryAndDetails = await response.json()
            setRecipe(data)
        }

        if(params.recipeId)
        {
            fetchRecipe()
        }

    }, [ params.recipeId])

  return (
    <div>
        {recipe && (
            <div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-3 bg-secondary dark:bg-dark-secondary rounded-md'>
                    <div className='flex flex-col items-center justify-center gap-4 p-5'>
                        <h1 className='text-4xl text-center text-white'>{ recipe.name }</h1>
                        <div  className='flex gap-4'>
                            <CategoryTag category={ recipe.category.categoryName} />
                            <span className='inline-flex items-center gap-2 text-white'><Clock10 size={20}/>{ recipe.preparationTime } min</span>
                            <PreparationTimeGauge preparationTime={recipe.preparationTime}/>
                        </div>
                        <div className='flex gap-4 mt-4'>
                            <RecipePDFGenerator recipe={recipe} />
                            <FavoriteButton recipeId={recipe.id}/>
                        </div>
                    </div>
                    <div className='w-full h-72 relative'>
                        {recipe.imageUrl && (
                            <Image 
                                className='rounded-md object-cover' 
                                src={recipe.imageUrl}
                                alt={`Image of ${recipe.name}`}
                                fill={true}
                            />
                        )}
                    </div>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-3 mt-16'> 
                    <div>
                        <h2 className='font-semibold text-salmon mb-6 text-xl inline-flex items-center gap-4'><ListChecks size={20}/>Description</h2>
                        <p>
                            { recipe.description }
                        </p>
                    </div>
                    <div>
                        <h2 className='font-semibold text-salmon mb-6 text-xl inline-flex items-center gap-4'><CookingPot size={20} /> Ingredients and Tools</h2>
                        <TabGroup className="border border-secondary dark:border-dark-secondary rounded-md">
                            <TabList className="bg-secondary  dark:bg-dark-secondary rounded-md p-3 flex gap-3 text-white ">
                                <Tab className={({ selected }) => `rounded-lg px-4 py-2 font-semibold focus:outline-none ${selected ? 'bg-salmon' : 'bg-secondary dark:bg-dark-secondary' }`}>Ingredients</Tab>
                                <Tab  className={({ selected }) => `rounded-lg px-4 py-2 font-semibold  focus:outline-none ${selected ? 'bg-salmon' : 'bg-secondary  dark:bg-dark-secondary' }`}>Tools</Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel>
                                    <IngredientsList ingredients={ recipe.ingredients }/>
                                </TabPanel>
                                <TabPanel>
                                    <ToolsList tools={ recipe.tools }/>                            
                                </TabPanel>
                            </TabPanels>
                        </TabGroup>
                    </div>
                </div>
                <div className='mt-16'>
                    <h2 className='font-semibold text-salmon mb-6 text-xl inline-flex items-center gap-4'><Route size={20}/> 
                        Steps ({recipe.steps.length})
                    </h2>
                    <RecipeStepsSwiper steps={recipe.steps} />
                </div>
            </div> 
        )}  
    </div>
  )
}

export default RecipeDetailPage
