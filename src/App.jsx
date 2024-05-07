import { BrowserRouter, Route, Routes } from "react-router-dom";

import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import AnimatedRoutes from "./components/AnimatedRoutes/AnimatedRoutes";
function App() {
  return (
    <>
      <BrowserRouter>
        {/* for change scroll to top when navigate into another page */}
        <ScrollToTop />
        <AnimatedRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;
