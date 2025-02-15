"use client"

import { useState, useCallback } from "react"
import type { Lead, Prospect } from "../types"
import { LeadValidator } from "../services/validationService"
import { nationalRegistrySystem, judicialRecordsSystem } from "../services/externalSystems"

// Interface to represent failed leads with their reason for failure
interface FailedLead {
    id: string
    reason: string
}

// Custom hook to manage CRM operations for leads and prospects
export function useCRM() {
    // State to manage the list of leads
    const [leads, setLeads] = useState<Lead[]>([])

    // State to manage the list of successfully converted prospects
    const [prospects, setProspects] = useState<Prospect[]>([])

    // State to manage the list of failed leads with their reasons
    const [failedLeads, setFailedLeads] = useState<FailedLead[]>([])

    // Initialize a LeadValidator instance with external validation systems
    const leadValidator = new LeadValidator([nationalRegistrySystem, judicialRecordsSystem])

     // Function to add a new lead to the leads state
    const addLead = useCallback((lead: Lead) => {
        setLeads((prevLeads) => [...prevLeads, lead])
    }, [])

    // Function to validate a lead and convert it to a prospect if valid
    const validateAndConvertLead = useCallback(
        async (leadId: string) => {
            const lead = leads.find((l) => l.id === leadId)
            if (!lead) return // Exit if lead is not found

            // Validate the lead and get either a prospect or a failure reason
            const { prospect, failureReason } = await leadValidator.validateLead(lead)
            
            if (prospect) {
                // If validation succeeds, add the prospect to the prospects list
                setProspects((prevProspects) => [...prevProspects, prospect])

                // Remove the lead from the leads list
                setLeads((prevLeads) => prevLeads.filter((l) => l.id !== leadId))
                 // If validation fails, add the failure reason to the failedLeads list
            } else if (failureReason) {
                setFailedLeads((prevFailedLeads) => [...prevFailedLeads, { id: leadId, reason: failureReason }])
            }
        },
        [leads, leadValidator],
    )
    
    // Return the state and functions to manage leads and prospects
    return { leads, prospects, failedLeads, addLead, validateAndConvertLead }
}