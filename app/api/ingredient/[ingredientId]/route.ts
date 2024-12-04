import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: {ingredientId: string }})
{
     const { ingredientId } = params;
     // = const ingredientId = params.ingredientId;
     try{
        // récupérer un article spécifique
        const ingredient = await db.ingredient.findUnique({
            where : {
                id: ingredientId
            }    
        })

        // Retourne une réponse au format JSON
        return NextResponse.json(ingredient)

    } catch (error) {
        console.log("[INGREDIENT]", error)
        return new NextResponse("Internal Error", { status: 500})
    }

}

export async function DELETE(req: NextRequest, { params }: { params: {ingredientId: string }})
{
    const { ingredientId } = params;
     // = const ingredientId = params.ingredientId;
     try{
        // récupérer un ingredient spécifique
        const ingredient = await db.ingredient.findUnique({
            where : {
                id: ingredientId
            }
        })

        await db.ingredient.delete({
            where:{id:ingredient?.id}
        })

        // Retourne une réponse au format JSON
        return Response.json("Deleted successfully", { status:200 })

    } catch (error) {
        console.log("[INGREDIENT]", error)
        return new NextResponse("Internal Error", { status: 500})
    }

}