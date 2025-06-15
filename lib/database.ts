import { openDB, type DBSchema, type IDBPDatabase } from "idb"

interface ClicksDB extends DBSchema {
  clicks: {
    key: number
    value: {
      projectId: number
      projectName: string
      clicks: number
      lastClicked: Date
    }
  }
}

let db: IDBPDatabase<ClicksDB> | null = null

export async function initDB() {
  if (db) return db

  db = await openDB<ClicksDB>("hyperevm-clicks", 1, {
    upgrade(db) {
      const store = db.createObjectStore("clicks", {
        keyPath: "projectId",
      })
      store.createIndex("clicks", "clicks")
    },
  })

  return db
}

export async function incrementClick(projectId: number, projectName: string) {
  const database = await initDB()

  const existing = await database.get("clicks", projectId)

  if (existing) {
    await database.put("clicks", {
      ...existing,
      clicks: existing.clicks + 1,
      lastClicked: new Date(),
    })
  } else {
    await database.put("clicks", {
      projectId,
      projectName,
      clicks: 1,
      lastClicked: new Date(),
    })
  }
}

export async function getClickCounts(): Promise<Record<number, number>> {
  const database = await initDB()
  const allClicks = await database.getAll("clicks")

  const clickCounts: Record<number, number> = {}
  allClicks.forEach((record) => {
    clickCounts[record.projectId] = record.clicks
  })

  return clickCounts
}

export async function getTopProjects(limit = 10) {
  const database = await initDB()
  const allClicks = await database.getAll("clicks")

  return allClicks.sort((a, b) => b.clicks - a.clicks).slice(0, limit)
}
