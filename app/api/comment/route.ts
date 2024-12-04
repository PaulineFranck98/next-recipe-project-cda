import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { auth } from '@clerk/nextjs/server';


export async function POST(req: NextRequest){
    try {
        console.log("receiving request...")

        const body = await req.json()
        console.log("request body:", body)

        const { sessionClaims, userId } = await auth();
        console.log("authenticated user:", sessionClaims, userId)

        if(!userId){
            console.log("unauthorized request")
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const fullName = sessionClaims?.fullName || "Anonymous";

        if(!fullName){
            console.log("unauthorized request")
            return new NextResponse("Unauthorized", { status: 401 });
        }


        const newComment = await db.articleComment.create({
            data:{
                commentText: body.commentText,
                creationDate: new Date(),
                articleId: body.articleId,
                userId: userId,
                authorName: fullName,
            },
    });

    console.log("comment : ", newComment);
    return Response.json(newComment, { status: 201 });
    } catch (error) {
        console.error('[COMMENT POST ERROR]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}