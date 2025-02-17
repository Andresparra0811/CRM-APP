"use client"

import { useCallback } from "react"
import { useLocalStorage } from "./useLocalStorage"
import type { Prospect } from "../types"

export function useProspects() {
  const [prospects, setProspects] = useLocalStorage<Prospect[]>("prospects", [])
  
  // Add a new function called addProspect that takes a prospect and adds it to the prospects state
  const addProspect = useCallback(
    (prospect: Prospect) => {
      setProspects((prevProspects) => [...prevProspects, prospect])
    },
    [setProspects],
  )
  // Add a new function called removeProspect that takes a prospectId and removes the prospect from the prospects state
  const removeProspect = useCallback(
    (prospectId: string) => {
      setProspects((prevProspects) => prevProspects.filter((prospect) => prospect.id !== prospectId))
    },
    [setProspects],
  )

  return { prospects, addProspect , removeProspect}
}

