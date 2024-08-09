import { RouterProvider } from "react-router-dom"
import { HelmetProvider, Helmet } from "react-helmet-async"
import { router } from "./routes"
import { Toaster } from "sonner"

import "./global.css"
import { ThemeProvider } from "./components/theme/theme-provider"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "./lib/react-query"

export function App() {

  return (
    <HelmetProvider>
      <ThemeProvider storageKey="pizzashop-theme" defaultTheme="dark"> {/* themeProvider é do próprio shadcnUI */}
        <Helmet titleTemplate="%s | pizza.shop" /> 
        <Toaster richColors closeButton/>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router}/>
        </QueryClientProvider>
      </ThemeProvider>
    </HelmetProvider>
  )
}