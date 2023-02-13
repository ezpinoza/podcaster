import { Routes, Route } from "react-router-dom";

import { NavBar } from "./components/NavBar";
import { PodcastList } from "./components/PodcastList";
import { PodcastDetail } from "./components/PodcastDetail";

import "./styles/app.scss";

export function App() {
  return (
    <div className="content-page">
      <NavBar />
      <Routes>
        <Route path="/" element={<PodcastList />} />
        <Route path="/podcast/:id" element={<PodcastDetail />} />
      </Routes>
    </div>
  );
}
