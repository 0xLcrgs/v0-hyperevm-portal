import { type NextRequest, NextResponse } from "next/server"

// In a real application, you would use Vercel KV, Upstash Redis, or a database
// For demo purposes, we'll use in-memory storage
// Note: This will reset when the server restarts
const clickCounts: Record<number, number> = {}

export async function GET() {
  try {
    return NextResponse.json({ clickCounts }, { status: 200 })
  } catch (error) {
    console.error("Error fetching click counts:", error)
    return NextResponse.json({ error: "Failed to fetch click counts" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { projectId } = body

    if (!projectId || typeof projectId !== "number") {
      return NextResponse.json({ error: "Invalid project ID" }, { status: 400 })
    }

    // Increment click count for the project
    clickCounts[projectId] = (clickCounts[projectId] || 0) + 1

    return NextResponse.json(
      {
        success: true,
        clickCount: clickCounts[projectId],
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error updating click count:", error)
    return NextResponse.json({ error: "Failed to update click count" }, { status: 500 })
  }
}
