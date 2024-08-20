import Main from "../pages/main.tsx";
import Profiles from "../pages/profiles.tsx";
import Projects from "../pages/projects.tsx";
import Skills from "../pages/skills.tsx";
import Skills_Category from "../pages/skills-category.tsx";
import Auth from "../pages/auth.tsx";

interface RouteConfig {
  path: string;
  element: React.ReactElement;
  children?: RouteConfig[];
}

const COMMON_ROUTES: RouteConfig[] = [];

const PUBLIC_ROUTES: RouteConfig[] = [
  {
    path: "/",
    element: <Auth />,
    children: [...COMMON_ROUTES, { path: "*", element: <Auth /> }],
  },
];

const PRIVATE_ROUTES: RouteConfig[] = [
  { path: "/", element: <Main /> },
  { path: "profiles", element: <Profiles /> },
  { path: "projects", element: <Projects /> },
  { path: "skills-category", element: <Skills_Category /> },
  { path: "skills", element: <Skills /> },
  ...COMMON_ROUTES,
];

export { PUBLIC_ROUTES, PRIVATE_ROUTES };
