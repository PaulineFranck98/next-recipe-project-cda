'use client'

import React, {useState, useEffect} from 'react'
import RecipeCard from '@/components/RecipeCard'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow } from 'swiper/modules';
import { Salad } from 'lucide-react';



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
    <div className='max-w-screen-xl mx-auto'>
        <h1 className='text-3xl mb-10 flex gap-2 justify-center items-center dark:text-dark-foreground'>Latest Recipes <Salad className='text-lime-500' size={26} /></h1>
        <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={5}
            spaceBetween={10}
            loop={true}
            coverflowEffect={{
                rotate: 30,
                stretch: 0,
                depth: 100,
                modifier: 0.5,
                slideShadows: true,
            }}
            breakpoints={{
                0:{
                    slidesPerView:1,
                    spaceBetween: 2,
                    centeredSlides:true
                },
                480:{
                    slidesPerView:3,
                    spaceBetween: 10,
                    centeredSlides:true
                },
                768:{
                    slidesPerView:5,
                    spaceBetween: 10,
                    centeredSlides:true
                },
            }}
            modules={[EffectCoverflow]}  
        >
            { recipes.map((recipe) =>(
                <SwiperSlide key={recipe.id }>
                    <RecipeCard recipe={recipe} />
                </SwiperSlide>
    
        ))}

        </Swiper>
    </div>
  )
}

export default RecipePage
