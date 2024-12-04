import React, {useState} from 'react'
import { useUser } from '@clerk/nextjs';

interface AddCommentProps {
    articleId: string;
}

const AddComment:React.FC<AddCommentProps> = ({articleId}) => {

    const [commentText, setCommentText] = useState('');
    const { isSignedIn } = useUser();

    // React.FormEvent : spécifique aux événements liés aux formulaires
    const handleSubmit = async (e: React.FormEvent) => {

        // j'empêche le rechargement de la page par défaut à la soumission du formulaire
        e.preventDefault();

        // si l'utilisateur n'est pas connecté, j'arrête la fonction
        if(!isSignedIn){
            return;
        }

        try {
            // je prépapare les données à envoyer
            const commentPayload = {
                commentText,
                articleId,
            };

            // j'envoie la requête à l'API
            const response = await fetch('/api/comment', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(commentPayload),
            });

            if(response.ok){
                // si la requête réussit, je vide le champ du commentaire
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
