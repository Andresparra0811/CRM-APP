"use client"

import { useCallback } from "react"
import { useLeads } from "./useLeads"
import { useProspects } from "./useProspects"
import { LeadValidator } from "../services/validationService"
import { nationalRegistrySystem, judicialRecordsSystem } from "../services/externalSystems"

// Create a new hook called useCRM that uses the useLeads and useProspects hooks
export function useCRM() {
  const { leads, addLead, removeLead } = useLeads()
  const { prospects, addProspect, removeProspect } = useProspects()
  const leadValidator = new LeadValidator([nationalRegistrySystem, judicialRecordsSystem])

  // Add a new function called validateAndConvertLead that takes a leadId and validates the lead
  const validateAndConvertLead = useCallback(
    async (leadId: string) => {
      const lead = leads.find((l) => l.id === leadId)
      if (!lead) return

      const { prospect, failureReason } = await leadValidator.validateLead(lead)
      if (prospect) {
        addProspect(prospect)
        removeLead(leadId)
      } else if (failureReason) {
        removeLead(leadId)
        addLead({ ...lead, failureReason })
      }
    },
    [leads, addProspect, removeLead, addLead, leadValidator],
  )

  return { leads, prospects, addLead, validateAndConvertLead, removeLead, removeProspect }
}

