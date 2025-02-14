// Import necessary types for the external systems, leads, and validation results
import type { ExternalSystem, Lead, ValidationResult } from "../types"
// Import mock data from a JSON file for validation purposes
import nationalRegistryData from "../data/nationalRegistry.json"

// Utility function to simulate delay in asynchronous operations
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Define the validation errors that can occur when validating a lead against the National Registry
interface ValidationErrors {
    firstName?: boolean
    lastName?: boolean
    birthdate?: boolean
    email?: boolean
}

// Define the external systems that will be used to validate leads
export const nationalRegistrySystem: ExternalSystem = {
    async validate(lead: Lead): Promise<ValidationResult> {
        await delay(200)

        // Search for a person in the national registry data based on the provided National ID
        const person = nationalRegistryData.people.find((p) => p.nationalId === lead.nationalId)

        // If no person is found in the national registry, return an error message
        if (!person) {
            return {
                success: false,
                message: "Person not found in the national registry",
            }
        }
        // Compare the lead data with the data from the national registry to check for discrepancies
        const errors: ValidationErrors = {
            firstName: person.firstName.toLowerCase() !== lead.firstName.toLowerCase(),
            lastName: person.lastName.toLowerCase() !== lead.lastName.toLowerCase(),
            birthdate: person.birthdate !== lead.birthdate,
            email: person.email.toLowerCase() !== lead.email.toLowerCase(),
        }

        // Check if there are any errors in the validation
        const hasErrors = Object.values(errors).some((error) => error)

        // If there are errors, construct an error message with the fields that do not match
        if (hasErrors) {
            const errorMessages = []
            if (errors.firstName) errorMessages.push("First Name")
            if (errors.lastName) errorMessages.push("Last Name")
            if (errors.birthdate) errorMessages.push("Birthdate")
            if (errors.email) errorMessages.push("Email")

            return {
                success: false,
                message: `The following information does not match the National Registry: ${errorMessages.join(", ")}`,
            }
        }

        // Return success if all fields match
        return {
            success: true,
            message: "Validated successfully",
        }
    },
}
// Define the external system that will be used to check for judicial records
export const judicialRecordsSystem: ExternalSystem = {
    async validate(lead: Lead): Promise<ValidationResult> {
        await delay(200)
        // Search for a person in the national registry data based on the provided National ID
        const person = nationalRegistryData.people.find((p) => p.nationalId === lead.nationalId)

        if (!person) {
            return {
                success: false,
                message: "Person not found in the National Registry",
            }
        }

        // Return success or failure based on whether judicial records are found
        return {
        success: !person.hasJudicialRecords,
        message: person.hasJudicialRecords ? "Judicial records found" : "No judicial records found",
        }
    },
}


