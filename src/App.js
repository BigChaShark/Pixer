import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/HomePage/Home";
import Cut from "./Pages/PhotoEditPage/cut";
import Filltering from "./Pages/fillter/filterring";
import Search from "./Pages/search/search";
import Slice from "./Pages/PhotoEditPage/slice";
import Collection from "./Pages/collection/collection";
import PhotoEditPage from "./Pages/PhotoEditPage/photoEditPage";
import MyProject from "./Pages/MyProject/myProject";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/cut",
    element: <Cut />,
  },
  {
    path: "/fillter",
    element: <Filltering />,
  },
  {
    path: "/search",
    element: <Search />,
  },
  {
    path: "/slice",
    element: <Slice />,
  },
  {
    path: "/collection",
    element: <Collection />,
  },
  {
    path: "/photoedit",
    element: <PhotoEditPage />,
  },
  {
    path: "/myProject",
    element: <MyProject />,
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
