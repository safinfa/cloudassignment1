import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ✅ CREATE NEW ESCAPE RESULT (POST) — WITH INSTRUMENTATION
export async function POST(request: Request) {
  console.log("📥 POST /api/escape — Request received at:", new Date().toISOString());

  try {
    const body = await request.json();
    const { result, timeTaken } = body;

    console.log("🧾 Incoming Data:", { result, timeTaken });

    const newResult = await prisma.escapeResult.create({
      data: {
        result,
        timeTaken,
      },
    });

    console.log("✅ Result saved to database:", newResult);

    return NextResponse.json(newResult, { status: 201 });

  } catch (error) {
    console.error("❌ POST /api/escape error:", error);

    return NextResponse.json(
      { error: "Failed to save escape result" },
      { status: 500 }
    );
  }
}

// ✅ FETCH ESCAPE HISTORY (GET) — WITH INSTRUMENTATION
export async function GET() {
  console.log("📤 GET /api/escape — Request received at:", new Date().toISOString());

  try {
    const results = await prisma.escapeResult.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    console.log("✅ Escape history fetched:", results.length, "records");

    return NextResponse.json(results);

  } catch (error) {
    console.error("❌ GET /api/escape error:", error);

    return NextResponse.json(
      { error: "Failed to fetch escape history" },
      { status: 500 }
    );
  }
}
