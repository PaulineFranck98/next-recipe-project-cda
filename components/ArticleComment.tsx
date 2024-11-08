import React from 'react'
import { formatDate } from '@/lib/utils'
import { CircleUserRound } from 'lucide-react';


interface ArticleCommentProps {
    comment: ArticleCommentType;
}

const ArticleComment:React.FC<ArticleCommentProps> = ( {comment }) => {


  return (
    
      <div className=' p-6 rounded-md flex justify-between bg-secondary dark:bg-dark-secondary'>
          <div className='flex flex-col gap-2'>
            <p className='flex items-center gap-2 text-white'><span className='text-salmon'><CircleUserRound size={24} /></span> {comment.user.username}</p>
            <p className='text-xs text-white flex items-baseline gap-1 opacity-80'>{ formatDate(comment.creationDate)}</p>
            <p className='text-white'>{comment.commentText}</p>
          </div>
          
     </div>
    
  )
}

export default ArticleComment