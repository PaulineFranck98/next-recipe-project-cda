import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest, { params }: { params: {commentId: string }})
{
     const { commentId } = params;
     // = const commentId = params.commentId;
     try{
        // récupérer un commentaire spécifique
        const comment = await db.articleComment.findUnique({
            where : {
                id: commentId
            },   
        })

        // Retourne une réponse au format JSON
        return NextResponse.json(comment)

    } catch (error) {
        console.log("[COMMENT]", error)
        return new NextResponse("Internal Error", { status: 500})
    }

}

export async function PUT(req: NextRequest, { params }: { params: {commentId: string }})
{
    try{

        const body = await req.json();
        const {commentText} = body;

        const { commentId } = params;
        // = const commentId = params.commentId;
   
        // récupérer un comment spécifique
        const comment = await db.articleComment.findUnique({
            where : {
                id: commentId
            }
        })

        // je mets à jour mon commentaire avec update 
         await db.articleComment.update({
            where:{id:comment?.id},
            data: { commentText }
        })

        // Retourne une réponse au format JSON
        return Response.json("Updated successfuly", { status:200 })

    } catch (error) {
        console.log("[COMMENT]", error)
        return new NextResponse("Internal Error", { status: 500})
    }
}


export async function DELETE(req: NextRequest, { params }: { params: {commentId: string }})
{
    try{
        const { commentId } = params;
     
        // récupérer un comment spécifique
        const comment = await db.articleComment.findUnique({
            where : {
                id: commentId
            }
        })

        // je supprime mon commentaire avec 'delete'
        await db.articleComment.delete({
            where:{id:comment?.id}
        })

        // Retourne une réponse au format JSON
        return Response.json("Deleted successfully", { status:200 })

    } catch (error) {
        console.log("[COMMENT]", error)
        return new NextResponse("Internal Error", { status: 500})
    }

}


