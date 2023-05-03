import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import AddProduct from "./components/AddProduct";
import EditProduct from "./pages/EditProduct";
import SignIn from "./pages/SignIn";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Navbar />}>
      <Route index element={<Home />} />
      <Route path="signin" element={<SignIn />} />
      <Route path="addproduct" element={<AddProduct />} />
      <Route path="editproduct/:id" element={<EditProduct />} />
    </Route>
  )
);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
