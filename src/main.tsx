import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Layout from "./Layout";
import SelectStarPage from "./pages/SelectStarPage";
import SandBoxPage from "./pages/SandBoxPage";
import CreatePage from "./pages/CreatePage";
import CreatePlanetPage from "./pages/CreatePlanetPage";
import ExploreOrbitPage from "./pages/ExploreOrbitPage";
import ExplorePage from "./pages/ExplorePage";
import ExploreSelectPage from "./pages/ExploreSelectPage";
import ExplorePlanetPage from "./pages/ExplorePlanetPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/select",
        element: <SelectStarPage />,
      },
      {
        path: "/create",
        element: <CreatePage />,
      },
      {
        path: "/create/new",
        element: <CreatePlanetPage />,
      },
      {
        path: "/explore",
        element: <ExplorePage />,
      },
      {
        path: "/explore/select",
        element: <ExploreSelectPage />,
      },
      {
        path: "/explore/orbit",
        element: <ExploreOrbitPage />,
      },
      {
        path: "/explore/planet",
        element: <ExplorePlanetPage />,
      },
      {
        path: "/sandbox",
        element: <SandBoxPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
