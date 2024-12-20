'use client'

import React, { useEffect, useState } from 'react'
import Theme from '@/components/Theme'
import ArticleComment from '@/components/ArticleComment'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { NotebookText, MessageSquareQuote, Trash2, Pencil } from 'lucide-react';
import { formatDate } from '@/lib/utils'
import { useUser } from  '@clerk/nextjs'
import Link from 'next/link';

import AddComment from '@/components/AddComment'

const ArticleDetailPage = () => {

    const params = useParams()
    

    const [article, setArticle] = useState<ArticleWithCommentsAndThemes | null>(null)
    
    useEffect(() => {
        const fetchArticle = async () => {
            const response  = await fetch(`/api/article/${params.articleId}`) 
            const data: ArticleWithCommentsAndThemes = await response.json()
            setArticle(data)
        }
        fetchArticle()
      }, [params.articleId])

      const { user } = useUser();

      const isAuthor = user?.id ===article?.userId;

      const handleDelete = async () => {
        const confirmed = window.confirm('Are you sure you want to delete this?')
          if(!confirmed){
              return;
          }
        try {
            await fetch(`/api/article/${params.articleId}`, {
            method: 'DELETE',
          });
    
        } catch (error) {
          console.error('Failed to delete article', error);
        }
       }
    
  return (
    <div>
      {article && (
            <div >
                 <div className='w-full h-80 relative'>
                        
                    <Image 
                        className='rounded-md object-cover opacity-60' 
                        src={'https://res.cloudinary.com/dgydgrbim/image/upload/v1731000390/background-detail_k9qoma.png'}
                        alt={'background image'}
                        fill={true}
                    />
                    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center'>
                        <div className='my-5 flex flex-wrap gap-3 justify-center'>
                            { article.themes.map((themeArticle: ThemeArticleType) => (
                                <Theme key={themeArticle.theme.id} themeName={themeArticle.theme.themeName} />
                            ))}
                        </div>
                        <h1 className='text-xl md:text-4xl font-semibold mb-5'>{ article.title }</h1>
                        <p className='font-semibold opacity-80 text-sm md:text-lg'>{ formatDate(article.publicationDate)}</p>
                    </div>
                </div>
                <div className='w-4/5 mx-auto'>
                    <div className='flex justify-between'>
                    <h2 className='text-salmon font-semibold flex gap-2 text-xl items-center mb-4'> <NotebookText /> Introduction</h2>
                    {isAuthor && (
                        <div className='flex items-center'>
                            <button onClick={handleDelete} className='px-2 rounded-md '>
                                <Trash2 size={18} className='hover:text-red-400 duration-200'/>
                            </button>
                            <Link 
                                href={`/article/${params.articleId}/updatearticle`}
                                 className='hover:text-gray-400 duration-200'
                            >
                                <Pencil size={18}/>
                            </Link>
                        </div>
                    )}
                    </div>
                    <p className='text-justify'>{ article.content }</p>

                    <h2 className='text-salmon font-semibold flex gap-2 text-xl items-center mb-4 mt-6'> <MessageSquareQuote />
                        Comments ({article.comments.length})
                    </h2>
                    {article.comments && article.comments.length > 0 ? (
                        <div className='flex flex-col gap-5'>
                            { article.comments.map((comment: ArticleCommentType) => (
                                <ArticleComment key={comment.id} comment={comment} />
                            ))}
                        </div>
                    ) : (
                        <p>No comments</p>
                    )}
                    <AddComment articleId={params.articleId as string} />
                </div>
            </div>
            )}
    </div>
  )
}

export default ArticleDetailPage
