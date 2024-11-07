'use client'

import React, { useEffect, useState } from 'react'
import ArticleCard from '@/components/ArticleCard'

const ArticlePage = () => {

    const[articles, setArticles] = useState<ArticleWithCommentsAndThemes[]>([])

    useEffect(() => {
        const fetchArticles = async () => {
            const response = await fetch('/api/article')
            const data: ArticleWithCommentsAndThemes[] = await response.json()
            setArticles(data)
        }

        fetchArticles()
    }, [])

  return (
    <>
    <h1 className='text-3xl mb-3 font-bold'>Blog</h1> 

    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {/* Liste des articles */}
        {articles.map((article) => (
            <div key={article.id}>
                <ArticleCard article={ article }/>
            </div>
        ))}
    </div>
</>
  )
}

export default ArticlePage

