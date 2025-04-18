import { BrowserRouter } from "react-router-dom"
import { AppRoutes } from "./AppRoutes"
import { Toaster } from "sonner"


function App() {
  return (
    <BrowserRouter>
      <Toaster></Toaster>
        <AppRoutes></AppRoutes>
    </BrowserRouter>
  )
}

export default App
