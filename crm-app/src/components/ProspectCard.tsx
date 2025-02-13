import type React from "react"
import type { Prospect } from "../types"

interface ProspectCardProps {
    prospect: Prospect
}

export const ProspectCard: React.FC<ProspectCardProps> = ({ prospect }) => {
    return (
        <div className="prospect-card">
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