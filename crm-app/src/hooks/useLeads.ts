"use client"

import { useCallback } from "react"
import { useLocalStorage } from "./useLocalStorage"
import type { Lead } from "../types"

// Create a new hook called useLeads that uses the useLocalStorage hook
export function useLeads() {
  const [leads, setLeads] = useLocalStorage<Lead[]>("leads", [])
  
  // Add a new function called addLead that takes a lead and adds it to the leads state
  const addLead = useCallback(
    (lead: Lead) => {
      setLeads((prevLeads) => [...prevLeads, lead])
    },
    [setLeads],
  )

  // Add a new function called removeLead that takes a leadId and removes the lead from the leads state
  const removeLead = useCallback(
    (leadId: string) => {
      setLeads((prevLeads) => prevLeads.filter((lead) => lead.id !== leadId))
    },
    [setLeads],
  )

  return { leads, addLead, removeLead }
}

