import { db } from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";
import { auth } from '@clerk/nextjs/server';

export async function GET () {
    try {
        // récupérer la liste des articles
        const articles = await db.article.findMany({
            orderBy: {
                publicationDate: 'desc'
            },
            include : {
                themes : {
                    include : {
                        theme : true
                    }
                }
            }
        })

        return NextResponse.json(articles)
    } catch (error) {
        console.log("[ARTICLES]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function POST(req: NextRequest){

    try {
        // j'extrais les données envoyées dans le corps de la requête : je les stocke dans la variable body
        const body = await req.json()
        console.log("contenu body", body)

        // je récupère les informations de l'utilisateur via Clerk
        const { sessionClaims, userId } = await auth();

        
        if(!userId){
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const fullName = sessionClaims?.fullName || "Anonymous";

        if(!fullName){
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // je récupère les thèmes envoyés dans le corps de la requête
        const themeIds = body.themeId || [];
   
        
        const themeConnect = themeIds.map((themeId : string) => ({
           themeId,
        }))

        // je crée l'article et j'inclus les thèmes associés
        const newArticle = await db.article.create({
            data:{
                title: body.title,
                content: body.content,
                userId: userId,
                authorName: fullName,
                publicationDate: new Date(),
                themes: {
                    create: themeConnect // je crée les entrées dans la table intermédiaire
                },
            },
    });

    return Response.json(newArticle, { status: 200 });

    } catch (error) {
        console.error('[ARTICLE POST ERROR]', error);

        return new NextResponse("Internal Error", { status: 500 });
    }
}