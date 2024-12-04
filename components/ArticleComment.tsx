import React from 'react'
import { formatDate } from '@/lib/utils'
import { CircleUserRound, Trash2 } from 'lucide-react';
import { useUser } from '@clerk/nextjs'


interface ArticleCommentProps {
    comment: ArticleCommentType;
}

const ArticleComment:React.FC<ArticleCommentProps> = ( {comment }) => {
  const { user } = useUser();

  const isAuthor = user?.id === comment.userId;


   const handleDelete = async () => {
    const confirmed = window.confirm('Are you sure you want to delete this?')
      if(!confirmed){
          return;
      }
    try {
        await fetch(`/api/comment/${comment.id}`, {
        method: 'DELETE',
      });

    } catch (error) {
      console.error('Failed to delete comment', error);
    }
   }

  return (
    
      <div className=' p-6 rounded-md flex justify-between bg-secondary dark:bg-dark-secondary'>
          <div className='flex flex-col gap-2 w-full'>
            <div className='flex justify-between'>
              <div>
                <p className='flex items-center gap-2 text-white'>
                  <span className='text-salmon'><CircleUserRound size={24} /></span> 
                  {comment.authorName}
                </p>
                <p className='text-xs text-white flex items-baseline gap-1 opacity-80'>{ formatDate(comment.creationDate)}</p>
              </div>
              {isAuthor && (
                <button onClick={handleDelete} className='bg-red-500 px-2  rounded-md '>
                  <Trash2 size={17} />
                </button>
              )}
              
            </div>
            <p className='text-white'>{comment.commentText}</p>
          </div>
          
     </div>
    
  )
}

export default ArticleComment