import type { Lead, Prospect, ValidationStrategy } from "../types"

export class LeadValidator {
    private readonly MINIMUM_SCORE = 60

    constructor(private readonly nationalRegistryValidations: ValidationStrategy[]) {}

    private calculateScore(lead: Lead): number {
        
        const score = Math.floor(Math.random() * 101) + 70 
        return Math.min(score, 100) 
    }


    async validateLead(lead: Lead): Promise<{ prospect: Prospect | null; failureReason?: string }> {
        try {
        // Execute all the validations in parallel
        const validationResults = await Promise.all(
            this.nationalRegistryValidations.map((strategy) => strategy.validate(lead)),
        )

        // Verify if any validation failed
        const failedValidation = validationResults.find((result) => !result.success)
        if (failedValidation) {
            return { prospect: null, failureReason: failedValidation.message }
        }

        // if all validations passed, calculate the score
        const score = this.calculateScore(lead)
        if (score <= this.MINIMUM_SCORE) {
            return {
            prospect: null,
            failureReason: `The score did not pass ${this.MINIMUM_SCORE} (Score: ${score})`,
            }
        }

        return { prospect: { ...lead, score } }
        } catch (error) {
        return {
            prospect: null,
            failureReason: "An error occurred during validation",
        }
        }
    }
}