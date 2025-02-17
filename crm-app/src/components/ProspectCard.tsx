import type React from "react"
import type { Prospect } from "../types"

// Props interface for the ProspectCard component
interface ProspectCardProps {
    prospect: Prospect
    onDelete: (id: string) => void
}

/**
 * ProspectCard Component
 * Displays information about a validated prospect including their score
 * Used to show leads that have passed validation and scoring
 */
export const ProspectCard: React.FC<ProspectCardProps> = ({ prospect, onDelete }) => {
    return (
        <div className="prospect-card">
            {/* Delete button - Consistent styling with LeadCard */}
            <span className="delete-icon" onClick={() => onDelete(prospect.id)} role="button" aria-label="Delete prospect">
                ×
            </span>
            <h3>
                {prospect.firstName} {prospect.lastName}
            </h3>
            <p>
                <strong>National ID:</strong> {prospect.nationalId}
            </p>
            <p>
                <strong>Email:</strong> {prospect.email}
            </p>
            <p>
                <strong>Birthdate:</strong> {prospect.birthdate}
            </p>
            <p>
                <strong>Score:</strong> {prospect.score}
            </p>
        </div>
        
    )
}