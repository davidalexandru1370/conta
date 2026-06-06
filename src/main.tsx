import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import EmployeePage from "./presentation/pages/Employee/EmployeePage.tsx";
import MicroSrlPage from "./presentation/pages/Company/MicroSrlPage.tsx";
import SrlPage from "./presentation/pages/Company/SrlPage.tsx";
import SelfEmployedPage from "./presentation/pages/Company/SelfEmployedPage.tsx";
import ComparisonPage from "./presentation/pages/Comparison/ComparisonPage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EmployeePage />} />
        <Route path="/employee" element={<EmployeePage />} />
        <Route path="/micro-srl" element={<MicroSrlPage />} />
        <Route path="/srl" element={<SrlPage />} />
        <Route path="/self-employed" element={<SelfEmployedPage />} />
        <Route path="/comparison" element={<ComparisonPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
