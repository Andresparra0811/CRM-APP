import type { Lead, Prospect, ValidationStrategy } from "../types"

export class LeadValidator {
    private readonly MINIMUM_SCORE = 60

    constructor(private readonly nationalRegistryValidations: ValidationStrategy[]) {}

    private calculateScore(lead: Lead): number {
        // Este es un cálculo de ejemplo. Puedes ajustarlo según tus necesidades.
        const score = Math.floor(Math.random() * 101)// Score base entre 30 y 70
        return Math.min(score, 100) // Aseguramos que el score máximo sea 100
    }


    async validateLead(lead: Lead): Promise<{ prospect: Prospect | null; failureReason?: string }> {
        try {
        // Ejecutar validaciones del registro nacional en paralelo
        const validationResults = await Promise.all(
            this.nationalRegistryValidations.map((strategy) => strategy.validate(lead)),
        )

        // Verificar si alguna validación falló
        const failedValidation = validationResults.find((result) => !result.success)
        if (failedValidation) {
            return { prospect: null, failureReason: failedValidation.message }
        }

        // Si todas las validaciones pasaron, calcular el score
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