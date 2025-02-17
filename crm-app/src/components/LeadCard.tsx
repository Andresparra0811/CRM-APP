import type React from "react";
import { Lead } from "../types";

// Props interface for the LeadCard component
interface LeadCardProps {
    lead: Lead
    onValidate: (id: string) => void
    onDelete: (id: string) => void
    failureReason?: string
}
/**
 * LeadCard Component
 * Displays information about a potential lead and provides validation/deletion functionality
 * The card shows basic information and a validation status/button
 */
export const LeadCard: React.FC<LeadCardProps> = ({ lead, onValidate, onDelete }) => {
    return (
        <div className={`card lead-card ${lead.failureReason ? "failed" : ""}`}>
            <span className="delete-icon" onClick={() => onDelete(lead.id)} role="button" aria-label="Delete lead">
                ×
            </span>
        
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
        
            {lead.failureReason && <p className="error-message">{lead.failureReason}</p>}
        
            <button
                onClick={() => onValidate(lead.id)}
                disabled={!!lead.failureReason}
                className={lead.failureReason ? "validate-button failed" : "validate-button"}
            >
                {lead.failureReason ? "Failed" : "Validate"}
            </button>
            </div>
        )
}
