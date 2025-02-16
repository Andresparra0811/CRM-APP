"use client"

import { useState, useCallback,  } from "react"
import type { Lead, Prospect } from "../types"
import { LeadValidator } from "../services/validationService"
import { nationalRegistrySystem, judicialRecordsSystem } from "../services/externalSystems"

interface FailedLead {
    id: string
    reason: string
}



export function useCRM() {
    const [leads, setLeads] = useState<Lead[]>([])
    const [prospects, setProspects] = useState<Prospect[]>([])
    const [failedLeads, setFailedLeads] = useState<FailedLead[]>([])
    const [leadValidator] = useState(() => new LeadValidator([nationalRegistrySystem, judicialRecordsSystem]))



    const addLead = useCallback((lead: Lead) => {
        setLeads((prevLeads) => [...prevLeads, lead])
    }, [])

    const validateAndConvertLead = useCallback(
        async (leadId: string) => {
            const lead = leads.find((l) => l.id === leadId)
            if (!lead) return

            const { prospect, failureReason } = await leadValidator.validateLead(lead)
            if (prospect) {
                setProspects((prevProspects) => [...prevProspects, prospect])
                setLeads((prevLeads) => prevLeads.filter((l) => l.id !== leadId))
            } else if (failureReason) {
                setFailedLeads((prevFailedLeads) => [...prevFailedLeads, { id: leadId, reason: failureReason }])
            }
        },
        [leads, leadValidator],
    )

    return { leads, prospects, failedLeads, addLead, validateAndConvertLead }
}
