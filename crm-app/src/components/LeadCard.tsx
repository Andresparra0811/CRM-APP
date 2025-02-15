import type React from "react";
import { Lead } from "../types";

// Props interface for the LeadCard component
interface LeadCardProps {
    lead: Lead
    onValidate: (id: string) => void
    failureReason?: string
}
// LeadCard component to display lead details and handle validation
export const LeadCard: React.FC<LeadCardProps> = ({ lead, onValidate, failureReason }) => {
    return (
        <div className={`lead-card ${failureReason ? "failed" : ""}`}>
            <h3>
            {lead.firstName} {lead.lastName}
            </h3>
            <p>
            <strong>National ID:</strong> {lead.nationalId}
            </p>
            <p>
            <strong>Email:</strong> {lead.email}
            </p>
            <p>
            <strong>Birthdate:</strong> {lead.birthdate}
            </p>
            {/* Button to trigger the onValidate function */}
            <button onClick={() => onValidate(lead.id)} disabled={!!failureReason} className={failureReason ? "failed" : ""}>
                {failureReason ? "Failed" : "Validate"}
            </button>
            {/* Display the failure reason if it exists */}
            {failureReason && <p className="failure-reason">{failureReason}</p>}

        </div>
    )
}

