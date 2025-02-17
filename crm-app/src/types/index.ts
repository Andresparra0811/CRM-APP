export interface Lead {
    id: string
    nationalId: string
    birthdate: string
    firstName: string
    lastName: string
    email: string
    failureReason?: string
}

export interface Prospect extends Lead {
    score: number
}

export interface ValidationResult {
    success: boolean
    message: string
}

export interface ExternalSystem {
    validate: (lead: Lead) => Promise<ValidationResult>
}

export interface ScoringSystem {
    getScore: (lead: Lead) => Promise<number>
}
export interface ValidationStrategy {
    validate: (lead: Lead) => Promise<ValidationResult>
}