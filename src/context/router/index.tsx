import MainSkeleton from "@/components/Containers/MainSkeleton";
import AllChaptersPage from "@/pages/AllChapters";
import AllSaintsPage from "@/pages/AllSaints";
import AllTeachingsPage from "@/pages/AllTeachings";
import CreateChapterPage from "@/pages/CreateChapter";
import CreateSaintPage from "@/pages/CreateSaint";
import CreateTeachingPage from "@/pages/CreateTeaching";
import EditChapterPage from "@/pages/EditChapter";
import EditSaintPage from "@/pages/EditSaint";
import EditTeachingPage from "@/pages/EditTeaching";
import HomePage from "@/pages/Home";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainSkeleton />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/create-chapter",
        element: <CreateChapterPage />,
      },
      {
        path: "/create-saint",
        element: <CreateSaintPage />,
      },
      {
        path: "/create-teaching",
        element: <CreateTeachingPage />,
      },
      {
        path: "/saints",
        element: <AllSaintsPage />,
      },
      {
        path: "/teachings",
        element: <AllTeachingsPage />,
      },
      {
        path: "/chapters",
        element: <AllChaptersPage />,
      },
      {
        path: "/saints/:id",
        element: <EditSaintPage />,
      },
      {
        path: "/teachings/:id",
        element: <EditTeachingPage />,
      },
      {
        path: "/chapters/:id",
        element: <EditChapterPage />,
      },
    ],
  },
]);

const RouterProv = () => {
  return <RouterProvider router={router} />;
};

export default RouterProv;
