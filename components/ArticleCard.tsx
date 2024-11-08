


import React from 'react'
import { formatDate } from '@/lib/utils'
import Theme from './Theme'
import Link from 'next/link'


interface ArticleCardProps {
    article: ArticleWithCommentsAndThemes
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <div className='flex flex-col gap-2 group bg-secondary  dark:bg-dark-secondary p-6 rounded-md hover: hover:bg-hoverBg hover:-translate-y-1 duration-300 h-[40vh]' key={ article.id }>
        <h2 className='text-xl font-bold text-white'>{ article.title }</h2>
        <p className='text-sm text-white opacity-80'>{ formatDate(article.publicationDate)}</p>
        <div className='flex fex-wrap gap-2 my-4'>
            {article.themes.map((themeArticle) => (
                <Theme key={themeArticle.theme.id} themeName={themeArticle.theme.themeName }/>
            ))}
        </div>
        {/* texte de l'article limité à 4 lignes*/}
        <p className='line-clamp-4 text-white'>{ article.content }</p>
        <Link href={`/article/${article.id}`} className='text-salmon mt-3'>
            Read more...
        </Link>
    </div>
  )
}

export default ArticleCard
