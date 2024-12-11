/* eslint-disable  @typescript-eslint/no-explicit-any */

import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// export async function GET(req: NextRequest, { params }: { params: {articleId: string}})
export async function GET(req: NextRequest, { params }: { params: Record<string, string> }) 
{
    try{ 
     const { articleId } = params;
     // = const articleId = params.articleId;
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

export async function PUT(req: NextRequest, { params }: { params: {articleId: string }}){
    
    try{
        const body = await req.json();
        const { title, content, themeId:themeIds} = body;

        const { articleId } = params;
        // = const articleId = params.articleId;
   
        // récupérer un article spécifique
        const article = await db.article.findUnique({
            where : {
                id: articleId
            }
        })

        const themeConnect = themeIds?.map((themeId:string) => ({themeId})) || [];

        // je mets à jour mon article avec update 
        await db.article.update({
            where:{id:article?.id},
            data: { 
                title,
                content,
                themes: {
                    deleteMany: {},
                    create: themeConnect
                } 
            }
        })

        // Retourne une réponse au format JSON
        return Response.json("Updated successfully", { status:200 })

    } catch (error) {
        console.log("[article]", error)
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


