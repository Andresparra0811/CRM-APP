"use client"

import type React from "react"
import { useState } from "react"
import { useCRM } from "../hooks/useCRM"
import { LeadCard } from "../components/LeadCard"
import { ProspectCard } from "../components/ProspectCard"
import { LeadForm } from "../components/LeadForm"
import { SearchBar } from "../components/SearchBar"

export const CRMDashboard: React.FC = () => {
    const { leads, prospects, failedLeads, addLead, validateAndConvertLead } = useCRM()
    const [searchTerm, setSearchTerm] = useState("")

    const filterItems = (items: any[], term: string) => {
        const searchStr = term.toLowerCase().trim()
        return items.filter((item) => {
            const fullName = `${item.firstName} ${item.lastName}`.toLowerCase()
            return fullName.includes(searchStr) || item.email.toLowerCase().includes(searchStr)
        })
    }

    const filteredLeads = filterItems(leads, searchTerm)
    const filteredProspects = filterItems(prospects, searchTerm)

    return (
        <div className="crm-dashboard">
            <h1>CRM Dashboard</h1>
            <SearchBar onSearch={setSearchTerm} />
            <div className="dashboard-content">
                <div className="leads-section">
                    <h2>Leads</h2>
                    <LeadForm onSubmit={addLead} />
                    <div className="leads-list">
                        {filteredLeads.map((lead) => {
                        const failedLead = failedLeads.find((fl) => fl.id === lead.id)
                        return (
                            <LeadCard
                            key={lead.id}
                            lead={lead}
                            onValidate={validateAndConvertLead}
                            failureReason={failedLead?.reason}
                            />
                        )
                        })}
                    </div>
                </div>
                <div className="prospects-section">
                    <h2>Prospects</h2>
                    <div className="prospects-list">
                        {filteredProspects.map((prospect) => (
                        <ProspectCard key={prospect.id} prospect={prospect} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}