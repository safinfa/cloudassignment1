import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ✅ CREATE NEW ESCAPE RESULT (POST)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { result, timeTaken } = body;

    const newResult = await prisma.escapeResult.create({
      data: {
        result,
        timeTaken,
      },
    });

    return NextResponse.json(newResult, { status: 201 });
  } catch (error) {
    console.error("POST /api/escape error:", error);
    return NextResponse.json(
      { error: "Failed to save escape result" },
      { status: 500 }
    );
  }
}

// ✅ FETCH ESCAPE HISTORY (GET)
export async function GET() {
  try {
    const results = await prisma.escapeResult.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(results);
  } catch (error) {
    console.error("GET /api/escape error:", error);
    return NextResponse.json(
      { error: "Failed to fetch escape history" },
      { status: 500 }
    );
  }
}
