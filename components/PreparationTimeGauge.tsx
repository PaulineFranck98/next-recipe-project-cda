import React from 'react'
import { Gauge } from 'lucide-react';

interface PreparationTimeGaugeProps  {
    preparationTime: number
}

const PreparationTimeGauge: React.FC<PreparationTimeGaugeProps> = ({ preparationTime}) => {

   let coloredGauges = 0
   let color = 'text-white'
   
   if (preparationTime <= 10){
        coloredGauges = 1
        color = 'text-lime-600'
   } else if (preparationTime <= 20){
        coloredGauges = 2
        color = 'text-yellow-500'
   } else if (preparationTime <= 30) {
        coloredGauges = 3
        color = 'text-orange-500'
   } else if (preparationTime <= 40) {
        coloredGauges = 4
        color = 'text-orange-600'
   } else {
        coloredGauges = 5
        color = 'text-red-500'
   }

   // je déclare un tableau de 5 éléments, initialisés à null
   const gauges = Array(5).fill(null)

  return (
    <div className='flex gap-1'>
     {/* je n'ai pas besoin de la valeur, mais seulement de l'index, j'utilise donc "_" par convention */}
      {gauges.map((_, index) => (
        <Gauge 
            key={index}
            className={index < coloredGauges ? color : 'text-white'}
        />
      ))}
    </div>
  )
}

export default PreparationTimeGauge
