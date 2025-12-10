import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const results = await prisma.escapeResult.findMany({
      where: { result: "WIN" },
      orderBy: { timeTaken: "asc" },
      take: 10,
    });

    const rows = results
      .map(
        (r, i) => `
        <tr>
          <td>#${i + 1}</td>
          <td>${r.timeTaken}s</td>
          <td>${new Date(r.createdAt).toLocaleString()}</td>
        </tr>`
      )
      .join("");

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Escape Room Leaderboard</title>
        <style>
          body { font-family: Arial; background: #111; color: white; padding: 40px; }
          table { border-collapse: collapse; width: 100%; margin-top: 20px; }
          th, td { border: 1px solid #555; padding: 12px; text-align: center; }
          th { background: #222; }
        </style>
      </head>
      <body>
        <h1>🏆 Escape Room Leaderboard</h1>
        <p>Generated dynamically by a Lambda function</p>

        <table>
          <tr>
            <th>Rank</th>
            <th>Time (seconds)</th>
            <th>Date</th>
          </tr>
          ${rows}
        </table>
      </body>
      </html>
    `;

    return new Response(html, {
      headers: { "Content-Type": "text/html" },
    });
  } catch (err) {
    return new Response("Failed to generate leaderboard HTML", { status: 500 });
  }
}
