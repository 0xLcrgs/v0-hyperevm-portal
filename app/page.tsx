import { Suspense } from "react"
import EcosystemPage from "../ecosystem-page"

function EcosystemPageWrapper() {
  return <EcosystemPage />
}

export default function Page() {
  return (
    <Suspense
      fallback={<div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>}
    >
      <EcosystemPageWrapper />
    </Suspense>
  )
}
