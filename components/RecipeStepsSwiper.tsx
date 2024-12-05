import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

interface RecipeStepsSwiperProps {
    steps: StepType[]
}

export default function RecipeStepsSwiper ({ steps } : RecipeStepsSwiperProps) {
  return (
    <Swiper
        spaceBetween={10}
        slidesPerView={2}
        pagination={true}
        modules={[Pagination]}
    >
        {steps.map((step, index) => (
            <SwiperSlide key={step.id}>
                <div className='p-4 bg-secondary  dark:bg-dark-secondary rounded-md shadow-md h-[40vh] flex flex-col justify-center gap-3 mb-9 '>
                    <h3 className='font-semibold text-center mb-5 text-3xl text-salmon'>
                        {index + 1}
                    </h3>
                    <p className='font-light text-center text-white'>
                        {step.text}
                    </p>
                </div>
            </SwiperSlide>
        ))}
    </Swiper>
  )
}


