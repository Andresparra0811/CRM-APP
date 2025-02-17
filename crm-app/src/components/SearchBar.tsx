import type React from "react"

// Props interface for the SearchBar component
interface SearchBarProps {
  onSearch: (searchTerm: string) => void
  placeholder?: string
}
// SearchBar Component
export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, placeholder = "Search by name or email..." }) => {
    return (
        <div className="search-bar">
        <input type="text" placeholder={placeholder} onChange={(e) => onSearch(e.target.value)} />
    </div>
    )
}
