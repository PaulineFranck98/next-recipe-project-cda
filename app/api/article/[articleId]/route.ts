import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: {articleId: string }})
{
     const { articleId } = params;
     // = const articleId = params.articleId;
     try{
        // récupérer un article spécifique
        const article = await db.article.findUnique({
            where : {
                id: articleId
            },
            include : {
                themes:  {
                    include : {
                        theme : true
                    }
                },
                comments : { 
                    orderBy : {
                        creationDate: 'desc'
                    },
                  
                 }
            }
        })

        // Retourne une réponse au format JSON
        return NextResponse.json(article)

    } catch (error) {
        console.log("[ARTICLE]", error)
        return new NextResponse("Internal Error", { status: 500})
    }

}

export async function DELETE(req: NextRequest, { params }: { params: {articleId: string }})
{
    const { articleId } = params;
     // = const articleId = params.articleId;
     try{
        // récupérer un article spécifique
        const article = await db.article.findUnique({
            where : {
                id: articleId
            }
        })

        await db.article.delete({
            where:{id:article?.id}
        })

        // Retourne une réponse au format JSON
        return Response.json("Deleted successfully", { status:200 })

    } catch (error) {
        console.log("[ARTICLE]", error)
        return new NextResponse("Internal Error", { status: 500})
    }

}


