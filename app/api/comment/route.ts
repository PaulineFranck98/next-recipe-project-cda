import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { auth } from '@clerk/nextjs/server';


export async function POST(req: NextRequest){

    try {
        // j'extrais les données envoyées dans le corps de la requête : je les stocke dans la variable body
        const body = await req.json()

        // je récupère les informations de l'utilisateur via Clerk
        const { sessionClaims, userId } = await auth();

        if(!userId){
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // const fullName = sessionClaims?.fullName || "Anonymous";
        const fullName = (sessionClaims?.fullName || "Anonymous") as string;

        if(!fullName){
            console.log("unauthorized request")
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // je crée le nouveau commentaire
        const newComment = await db.articleComment.create({
            data:{
                commentText: body.commentText,
                creationDate: new Date(),
                articleId: body.articleId,
                userId: userId,
                authorName: fullName,
            },
    });

    return Response.json(newComment, { status: 200 });

    } catch (error) {
        console.error('[COMMENT POST ERROR]', error);

        return new NextResponse("Internal Error", { status: 500 });
    }
}