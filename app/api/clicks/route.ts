import { type NextRequest, NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"

// Path to store click data
const DATA_FILE = path.join(process.cwd(), "data", "clicks.json")

// Ensure data directory exists
async function ensureDataDirectory() {
  const dataDir = path.dirname(DATA_FILE)
  try {
    await fs.access(dataDir)
  } catch {
    await fs.mkdir(dataDir, { recursive: true })
  }
}

// Read click counts from file
async function readClickCounts(): Promise<Record<number, number>> {
  try {
    await ensureDataDirectory()
    const data = await fs.readFile(DATA_FILE, "utf-8")
    return JSON.parse(data)
  } catch (error) {
    // If file doesn't exist or is invalid, return empty object
    return {}
  }
}

// Write click counts to file
async function writeClickCounts(clickCounts: Record<number, number>): Promise<void> {
  try {
    await ensureDataDirectory()
    await fs.writeFile(DATA_FILE, JSON.stringify(clickCounts, null, 2))
  } catch (error) {
    console.error("Error writing click counts:", error)
    throw error
  }
}

export async function GET() {
  try {
    const clickCounts = await readClickCounts()
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

    // Read current click counts
    const clickCounts = await readClickCounts()

    // Increment click count for the project
    clickCounts[projectId] = (clickCounts[projectId] || 0) + 1

    // Write updated counts back to file
    await writeClickCounts(clickCounts)

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
