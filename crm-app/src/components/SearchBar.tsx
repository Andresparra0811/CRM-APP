import type React from "react"

interface SearchBarProps {
  onSearch: (searchTerm: string) => void
  placeholder?: string
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, placeholder = "Search by name or email..." }) => {
    return (
        <div className="search-bar">
        <input type="text" placeholder={placeholder} onChange={(e) => onSearch(e.target.value)} />
    </div>
    )
}
