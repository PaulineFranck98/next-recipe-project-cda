'use client'

import React, {useState, useEffect} from 'react'
import RecipeCard from '@/components/RecipeCard'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow } from 'swiper/modules';


const RecipePage = () => {

 // récupération de la liste des ustensils avec hooks
 const [recipes, setRecipes] = useState<RecipeWithCategoryAndDetails[]>([])

 useEffect(() => {
     const fetchRecipes = async () => {
         const response = await fetch('/api/recipe')
         const data: RecipeWithCategoryAndDetails[] = await response.json()
         setRecipes(data)
     }

     fetchRecipes()
 }, [])



  return (
    <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={5}
        spaceBetween={10}
        coverflowEffect={{
        rotate: 20,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
        }}
        modules={[EffectCoverflow]}  
    >
        { recipes.map((recipe) =>(
            <SwiperSlide key={recipe.id }>
                <RecipeCard recipe={recipe} />
            </SwiperSlide>
   
    ))}

    </Swiper>

  )
}

export default RecipePage
