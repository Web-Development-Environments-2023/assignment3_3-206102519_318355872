import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./pages/RegisterPage"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/LoginPage"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage"),
  },
  {
    path: "/recipe/:recipeId",
    name: "recipe",
    component: () => import("./pages/RecipeViewPage"),
  },
  {
    path: "/about",
    name: "about",
    component: () => import("./pages/AboutPage"),
  },
  {
    path: "/my_recipes",
    name: "my_recipes",
    component: () => import("./pages/MyRecipePage"),
  },
  {
    path: "/my_family_recipes",
    name: "my_family_recipes",
    component: () => import("./pages/MyFamilyRecipePage"),
  },
  {
    path: "/my_favorite_recipes",
    name: "my_favorite_recipes",
    component: () => import("./pages/MyFavoritePage"),
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound,
  },
];

export default routes;
