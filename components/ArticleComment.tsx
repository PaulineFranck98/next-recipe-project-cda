import React, {useState} from 'react'
import { formatDate } from '@/lib/utils'
import { CircleUserRound, Trash2, Pencil } from 'lucide-react';
import { useUser } from '@clerk/nextjs'


interface ArticleCommentProps {
    comment: ArticleCommentType;
}

const ArticleComment:React.FC<ArticleCommentProps> = ( {comment }) => {
  const { user } = useUser();

  // je vérifie si l'utilisateur est bien l'auteur du commentaire
  const isAuthor = user?.id === comment.userId;

  // gestion du mode d'édition du commentaire
  const [ isEditing, setIsEditing ] = useState(false);
  const [ editedText, setEditedText ] = useState(comment.commentText)


  // suppression du commentaire
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

  // modication du commentaire
  const handleUpdate = async () => {
    try {
      const response = await fetch(`/api/comment/${comment.id}`, {
        method:'PUT',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({commentText: editedText}),
      });

      if(response.ok){
        // j'enlève le mode d'édition après la mise à jour du commentaire
        setIsEditing(false);
      } else {
        console.error("Failed to update comment", response.statusText);
      } 
    } catch (error) {
      console.error("Failed to update comment", error);
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
                <div className='flex flex-col gap-2'>
                  <button onClick={() => setIsEditing(!isEditing)} className='hover:text-gray-400 duration-200'>
                    <Pencil size={17} />
                  </button>
                  <button onClick={handleDelete} className='hover:text-gray-400 duration-200'>
                    <Trash2 size={17} />
                  </button>
                </div>
              )}
            </div>
            {isEditing ? (
              <div className='flex flex-col gap-2'>
                <textarea 
                  value={editedText} 
                  onChange={(e) => setEditedText(e.target.value)}
                  className='w-full p-2 rounded-md border border-gray-300'
                />
                <button onClick={handleUpdate} className='bg-green-500 px-4 py-2 text-white rounded-md'>
                    Save
                </button>
                <button onClick={() => {setEditedText(comment.commentText); setIsEditing(false);}} className='bg-gray-500 px-4 py-2 text-white rounded-md'>
                    Cancel
                </button>
              </div>
            ) : (
              <p className='text-white'>{comment.commentText}</p>
            )}
            
          </div>    
     </div>
    
  )
}

export default ArticleComment