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



export async function DELETE(req: NextRequest, { params }: { params: {commentId: string }})
{
    const { commentId } = params;
     // = const commentId = params.commentId;
     try{
        // récupérer un comment spécifique
        const comment = await db.articleComment.findUnique({
            where : {
                id: commentId
            }
        })

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


