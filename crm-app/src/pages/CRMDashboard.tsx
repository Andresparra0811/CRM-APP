import type React from "react"
import { useCRM } from "../hooks/useCRM"
import { LeadCard } from "../components/LeadCard"
import { ProspectCard } from "../components/ProspectCard"
import { LeadForm } from "../components/LeadForm"

export const CRMDashboard: React.FC = () => {
    // Destructure state and functions from the custom useCRM hook
    const { leads, prospects, failedLeads, addLead, validateAndConvertLead } = useCRM()

    return (
        <div className="crm-dashboard">
            <h1>CRM Dashboard</h1>
            <div className="dashboard-content">

                {/* Section to manage and display Leads */}
                <div className="leads-section">
                    <h2>Leads</h2>
                    <LeadForm onSubmit={addLead} />
                    <div className="leads-list">
                        {/* Map through the list of leads and render LeadCard components */}
                        {leads.map((lead) => {
                            // Find the failed lead with the same ID to display the failure reason
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
                
                {/* Section to display Prospects */}
                <div className="prospects-section">
                    <h2>Prospects</h2>
                    <div className="prospects-list">

                        {/* Map through the list of prospects and render ProspectCard components */}
                        {prospects.map((prospect) => (
                        <ProspectCard key={prospect.id} prospect={prospect} /> 
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

