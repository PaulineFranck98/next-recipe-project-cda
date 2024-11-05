import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET () {
    try {
        // récupérer la liste des ustensiles 
        const tools = await db.tool.findMany({
            orderBy: {
                toolName: 'asc',
            },
        })

        // retourne une réponse au format JSON
        return NextResponse.json(tools)
    } catch(error) {
        console.log("[TOOLS]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}