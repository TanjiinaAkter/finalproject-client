import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home/Home";
import Menu from "../pages/Menu/Menu";
import Order from "../pages/Order/Order";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "menu",
        element: <Menu></Menu>,
      },
      {
        // order er dynamic name ta icche moto dibo ja mon chay ..just metter korbe dynamic route er moddhe btn er link e ki diye dicchi seta...ar ber korte amra order component e useparam use kore category k destructuring kore ber kore tar por jei element lage oita show korai dibo
        path: "order/:category",
        element: <Order></Order>,
      },
    ],
  },
]);
