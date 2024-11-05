import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET () {
    try {
        // récupérer la liste des recettes 
        const recipes = await db.recipe.findMany({
            orderBy: {
                name: 'asc'
            },
        })

        return NextResponse.json(recipes)
    } catch (error) {
        console.log("[RECIPES]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}