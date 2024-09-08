import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Weather from "./components/Weather";
import NotFound from "./components/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/city/:city" element={<Weather />} />
        <Route path="/notFound" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/notFound" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
