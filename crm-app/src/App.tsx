import { CRMDashboard } from "./pages/CRMDashboard"
import "./styles/App.css"

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1>CRM System</h1>
      </header>
      <main>
        <CRMDashboard />
      </main>
      <footer className="app-footer">
        <p>&copy; 2025 CRM System. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App

