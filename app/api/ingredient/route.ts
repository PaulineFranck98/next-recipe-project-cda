import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET () {
    try {
        // récupérer la liste des ingrédients 
        const ingredients = await db.ingredient.findMany({
            orderBy: {
                ingredientName: 'asc',
            },
        })

        // retourne une réponse au format JSON
        return NextResponse.json(ingredients)
    } catch(error) {
        console.log("[INGREDIENTS]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}