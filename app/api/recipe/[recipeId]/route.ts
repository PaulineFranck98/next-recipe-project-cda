import { db } from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: {recipeId: string}})
{
    const { recipeId } = params;

    try {
        // récupérer une recette spécifique
        const recipe = await db.recipe.findUnique({
            where : {
                id: recipeId
            },
            include : {
                ingredients: {
                    include : {
                        ingredient : true
                    }
                },
                tools: {
                    include : {
                        tool : true
                    }
                },
                steps: {
                    orderBy : {
                        stepNumber: 'asc'
                    }
                },
                category: true

            }
        })

        return NextResponse.json(recipe)
    } catch (error) {
        console.log("[RECIPE]", error)
        return new NextResponse("Internal Error", { status : 500 })
    }
}