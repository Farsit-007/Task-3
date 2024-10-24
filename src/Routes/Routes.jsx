import {
  createBrowserRouter
} from "react-router-dom";
import Main from "./Layout/Main";
import Home from "../pages/Home";
import SMTP_Page from "../pages/SMTP_Page";
import Update_Page from "../pages/Update_Page";
import User_Manage from "../pages/User_Manage";
import Campaign from "../pages/Campaign";
import Campaign_User_Details from "../pages/Campaign_User_Details";
import Campaign_Update from "../pages/Campaign_Update";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        index: true,
        element: <Home></Home>
      },
      {
        path: '/set-smtp',
        element: <SMTP_Page></SMTP_Page>
      },
      {
        path: '/update-email/:id',
        element: <Update_Page></Update_Page>
      },
      {
        path: '/add-student',
        element: <User_Manage></User_Manage>
      },
      {
        path: '/campaign',
        element: <Campaign></Campaign>
      },
      {
        path: '/smtp-user-details/:id',
        element: <Campaign_User_Details></Campaign_User_Details>
      },
      {
        path: '/campaign-update/:id',
        element: <Campaign_Update></Campaign_Update>
      },
    ]
  },
]);

export default router