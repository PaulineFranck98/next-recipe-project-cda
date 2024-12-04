import React, {useState} from 'react'
import { useUser } from '@clerk/nextjs';

interface AddCommentProps {
    articleId: string;
}

const AddComment:React.FC<AddCommentProps> = ({articleId}) => {

    const [commentText, setCommentText] = useState('');
    const { isSignedIn } = useUser();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if(!isSignedIn){
            return;
        }

        try {
            const commentPayload = {
                commentText,
                articleId,
            };

            console.log("Payload sent :", commentPayload);
            const response = await fetch(`/api/comment`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(commentPayload),
            });
            if(response.ok){
                setCommentText('');
            }else{
                console.error("error submitting : ", response.statusText)
            }
        } catch (error) {
            console.error('Error submitting comment', error)
        }
    };


  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-5">
        <textarea 
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder='Add a comment...'
            className='w-full p-2 rounded-md border border-gray-300'
        />
        <button
            type="submit"
            className='bg-salmon text-white py-2 px-4 rounded-md '
        >
            Submit
        </button>
    </form>
  )
}

export default AddComment
