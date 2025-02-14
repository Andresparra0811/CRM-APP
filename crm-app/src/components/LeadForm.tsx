import type React from "react"
import type { Lead } from "../types"
import { useLeadForm } from "../hooks/useLeadForm"

// Define the props interface for the LeadForm component
interface LeadFormProps {
  onSubmit: (lead: Lead) => void // Callback function triggered when the form is submitted
}

// LeadForm component for creating or editing a lead
export const LeadForm: React.FC<LeadFormProps> = ({ onSubmit }) => {
    // Destructure necessary values and functions from the custom hook
    const { formData, errors, handleChange, validateForm, resetForm } = useLeadForm()

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault() // Prevent default form submission behavior
        if (validateForm()) {
            // If the form is valid, submit the data and reset the form
            onSubmit({ ...formData, id: Date.now().toString() }) // Add a unique ID
            resetForm() // Reset form fields
        }
    }

    return (
        <form onSubmit={handleSubmit} className="lead-form" noValidate>
            {/* National ID input field */}
            <div className="form-group">
                <input
                type="text"
                name="nationalId"
                value={formData.nationalId}
                onChange={handleChange} // Update state on input change
                placeholder="National ID"
                required // HTML5 validation attribute
                />
                {errors.nationalId && <span className="error">{errors.nationalId}</span>} {/* Show error if validation fails */}
            </div>

            {/* Birthdate input field */}
            <div className="form-group">
                <input
                type="text"
                name="birthdate"
                value={formData.birthdate}
                onChange={handleChange}
                placeholder="Birthdate (MM/DD/YYYY)"
                required
                />
                {errors.birthdate && <span className="error">{errors.birthdate}</span>}
            </div>

            {/* First Name input field */}
            <div className="form-group">
                <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                required
                />
                {errors.firstName && <span className="error">{errors.firstName}</span>}
            </div>

            {/* Last Name input field */}
            <div className="form-group">
                <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                required
                />
                {errors.lastName && <span className="error">{errors.lastName}</span>}
            </div>

            {/* Email input field */}
            <div className="form-group">
                <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
                />
                {errors.email && <span className="error">{errors.email}</span>}
            </div>

            {/* Submit button */}
            <button type="submit">Add Lead</button>
        </form>
    )
}