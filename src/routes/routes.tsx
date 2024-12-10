import { createBrowserRouter } from "react-router-dom";
import App from "../App";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    // children : [
    //   {
    //     path : '/dashboard',
    //     element : <div>this is dashboard</div>
    //   }
    // ]
  },
]);
