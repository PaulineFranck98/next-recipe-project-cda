'use client'

import React, { useEffect, useState } from 'react'
import Theme from '@/components/Theme'
import ArticleComment from '@/components/ArticleComment'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { NotebookText, MessageSquareQuote } from 'lucide-react';
import { formatDate } from '@/lib/utils'
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
                        <h1 className='text-4xl font-semibold mb-5'>{ article.title }</h1>
                        <p className='font-semibold opacity-80 text-lg'>{ formatDate(article.publicationDate)}</p>
                    </div>
                </div>
                <div className='w-4/5 mx-auto'>
                    <h2 className='text-salmon font-semibold flex gap-2 text-xl items-center mb-4'> <NotebookText /> Introduction</h2>
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
