// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "./index.css";
// import App from "./App.jsx";
// import { ClerkProvider } from "@clerk/clerk-react";
// import { AppContextProvider } from "./context/AppContext"; // ✅ Add this

// const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// if (!PUBLISHABLE_KEY) {
//   throw new Error("Missing Publishable Key");
// }

// createRoot(document.getElementById("root")).render(
//   <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
//     <StrictMode>
//       <AppContextProvider> {/* ✅ Wrap App with context provider */}
//         <App />
//       </AppContextProvider>
//     </StrictMode>
//   </ClerkProvider>
// );
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter } from "react-router-dom"; 
import { AppContextProvider } from "./context/AppContext";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
    <BrowserRouter> 
      <StrictMode>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </StrictMode>
    </BrowserRouter>
  </ClerkProvider>
);