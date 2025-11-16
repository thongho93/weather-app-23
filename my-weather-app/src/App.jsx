import "./App.css";
import { Routes, Route, Outlet } from "react-router-dom";
import Header from "./components/header";
import HomePage from "./routes/HomePage";

function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
