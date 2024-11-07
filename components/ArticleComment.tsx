import React from 'react'
import { formatDate } from '@/lib/utils'
import { CircleUserRound } from 'lucide-react';


interface ArticleCommentProps {
    comment: ArticleCommentType;
}

const ArticleComment:React.FC<ArticleCommentProps> = ( {comment }) => {


  return (
    
      <div className='border border-slate-700 p-6 rounded-md flex justify-between bg-slate-700 '>
          <div className='flex flex-col gap-2'>
            <p className='flex items-center gap-2'><span className='text-salmon'><CircleUserRound size={24} /></span> {comment.user.username}</p>
            <p className='text-xs text-slate-300 flex items-baseline gap-1'>{ formatDate(comment.creationDate)}</p>
            <p>{comment.commentText}</p>
          </div>
          
     </div>
    
  )
}

export default ArticleComment