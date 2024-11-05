import React from 'react'

type CategoryTagProps = {
    category: string
}


const CategoryTag:React.FC<CategoryTagProps> = ({ category }) => {

    let backgroundColor = ''

    switch(category) {
        case 'Starter' : 
        backgroundColor = 'bg-green-500'
            break
        case 'Main' : 
            backgroundColor = 'bg-blue-500'
            break
        case 'Dessert':
            backgroundColor = 'bg-red-500'
            break  
    }

  return (
    <div>
      <p className={`px-2 py-1 rounded-md text-white ${backgroundColor}`}>
        { category}
      </p>
    </div>
  )
}

export default CategoryTag
