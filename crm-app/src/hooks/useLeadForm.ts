import { useState } from "react"
import type { Lead } from "../types"

type LeadFormData = Omit<Lead, "id">


interface LeadFormErrors {
    nationalId?: string
    birthdate?: string
    firstName?: string
    lastName?: string
    email?: string
}

// Custom hook to manage lead form state, validation, and behavior
export const useLeadForm = () => {
    // State for form data
    const [formData, setFormData] = useState<LeadFormData>({
        nationalId: "",
        birthdate: "",
        firstName: "",
        lastName: "",
        email: "",
    })
    
    // State for validation errors
    const [errors, setErrors] = useState<LeadFormErrors>({})
    
    // Handle changes in form inputs
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prevData) => ({ ...prevData, [name]: value })) // Update the corresponding field
        
        // Clear specific error message when the user starts typing
        if (errors[name as keyof LeadFormErrors]) {
            setErrors((prevErrors) => ({ ...prevErrors, [name]: undefined }))
        }
    }
    
        // Validate the form and return a boolean indicating validity
    const validateForm = (): boolean => {
        const newErrors: LeadFormErrors = {}
        // Validate National ID - must be numeric
        if (!/^\d+$/.test(formData.nationalId)) {
            newErrors.nationalId = "National ID must be a number"
        }
    
        // Validate First Name - required field
        if (!formData.firstName.trim()) {
            newErrors.firstName = "First name is required"
        }
    
        // Validate Last Name - required field
        if (!formData.lastName.trim()) {
            newErrors.lastName = "Last name is required"
        }
    
        // Validate Birthdate - required and must match MM/DD/YYYY format
        if (!formData.birthdate) {
            newErrors.birthdate = "Birthdate is required"
        } else if (!/^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/.test(formData.birthdate)) {
            newErrors.birthdate = "Birthdate must be in MM/DD/YYYY format"
        }
    
        // Validate Email - required and must be in a valid email format
        if (!formData.email) {
            newErrors.email = "Email is required"
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid"
        }
    
        // Update error state with any validation errors
        setErrors(newErrors)
    
        // Return true if there are no validation errors
        return Object.keys(newErrors).length === 0
    }
    
        // Reset the form data and clear all errors
    const resetForm = () => {
        setFormData({
            nationalId: "",
            birthdate: "",
            firstName: "",
            lastName: "",
            email: "",
        })
        setErrors({})
        }
    
        // Return the form state, validation state, and helper functions
    return {
        formData,    // The current state of the form inputs
        errors,      // Validation errors for the form inputs
        handleChange, // Function to handle input changes
        validateForm, // Function to validate the form inputs
        resetForm,    // Function to reset the form state
        }
}