import type React from "react";
import { Lead } from "../types";

interface LeadCardProps {
    lead: Lead

}
export const LeadCard: React.FC<LeadCardProps> = ({ lead }) => {
    return (
        <div>
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

        </div>
    )
  }