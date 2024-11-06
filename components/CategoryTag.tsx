import React from 'react'

interface CategoryTagProps {
  category: string
}


const CategoryTag:React.FC<CategoryTagProps> = ({ category }) => {
  let backgroundColor = ''

  switch(category) {
    case 'Starter' : 
      backgroundColor = 'bg-lime-600'
      break
    case 'Main' : 
      backgroundColor = 'bg-indigo-700'
      break
    case 'Dessert':
      backgroundColor = 'bg-red-500'
      break  
  }

  return (
      <p className={`px-2 py-1 rounded-md text-white ${backgroundColor}`}>
        { category }
      </p>
  )
}

export default CategoryTag
