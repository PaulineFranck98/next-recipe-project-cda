'use client'

import React, {useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { Theme } from '@prisma/client'

const AddArticle: React.FC = () => {

    const { isSignedIn } = useUser()

    const [title, setTitle ] = useState('');
    const [content, setContent ] = useState('');
    const [availableThemes, setAvailableThemes ] = useState<Theme[]>([]);
    const [selectedThemes, setSelectedThemes ] = useState<string[]>([]);

    useEffect(() => {

        const fetchThemes = async () => {
            const response = await fetch('/api/theme');
            const themes = await response.json();
            setAvailableThemes(themes);
        }

        fetchThemes();
    }, []);

    // gestion des thèmes sélectionnés
    const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const themeId = e.target.value;

        if(e.target.checked){
            // si la case est cochée, je l'ajoute au tableau des selectedThemes
            setSelectedThemes([...selectedThemes, themeId]);
        } else {
            // si la case es décochée, je supprime le thème du tableau
            setSelectedThemes(selectedThemes.filter((id) => id!== themeId))
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if(!isSignedIn){
            return;
        }

        try {
            const articlePayload = {
                title,
                content,
                themeId: selectedThemes,
            };

            console.log("articlePayload : ", articlePayload)

            const response = await fetch('/api/article', {
                method:'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(articlePayload),
            });

            if(response.ok) {
                setTitle('');
                setContent('');
                setSelectedThemes([]);
            } else {
                console.error("Error submitting article:", response.statusText)
            }
        } catch (error) {
            console.error("Error submitting article:", error);
        }
    }


  return (
    <div className='max-w-2xl mx-auto'>
      <h1 className='text-2xl font-bold mb-4 text-center'>Create new article</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <div>
            <label htmlFor="title" className='block text-sm font-medium'>
                Title
            </label>
            <input
                id='title' 
                type="text"
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
                className='w-full mt-1 p-2 border border-gray-300 rounded-md'
                required
            />
        </div>
        <div>
            <label htmlFor="content" className='block text-sm font-medium'>
                Content
            </label>
            <textarea 
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={5}
                className='w-full mt-1 p-2 border border-gray-300 rounded-md'
                required
            />
        </div>
        <div>
            <h3 className='font-bold mb-2' >Select Themes</h3>
            <div className='flex flex-wrap gap-3' >
                {availableThemes.map((theme) =>(
                    <div key={theme.id} >
                    
                        <input 
                            type="checkbox"
                            value={theme.id} 
                            onChange={handleThemeChange}
                        />
                        <label htmlFor="theme.id" className='p-1'>{theme.themeName}</label>
                        
                    </div>
                ))}
            </div>
        </div>
        <button
            type="submit"
            className='bg-salmon text-white py-2 px-4 rounded-md '
        >
            Submit
        </button>
      </form>
    </div>
  )
}

export default AddArticle
