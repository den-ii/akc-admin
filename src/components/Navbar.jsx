import { useContext, useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { CgMenuRight } from "react-icons/cg";
import { TfiClose } from "react-icons/tfi";
import { UserContext } from "../context/UserContext";
const Navbar = () => {
  const [nav, setNav] = useState(false);
  const { user, handleUser } = useContext(UserContext);

  const navigate = useNavigate();
  const location = useLocation();
  console.log("location: ", location);
  const pathname = location.pathname;
  useEffect(() => {
    if (!user) {
      navigate("/signin");
    }
  }, [user, pathname]);

  return (
    <>
      <header className="bg-white nav px-3 fixed top-0 left-0 right-0 w-full">
        <nav className="flex  h-16 items-center justify-between text-gray-600">
          <img src="/logo.png" className="w-12" onClick={() => navigate("/")} />
          {user && (
            <div
              className="block md:hidden text-blue-700 font-bold"
              onClick={() => setNav(true)}
            >
              <CgMenuRight size={40} />
            </div>
          )}
          {user && (
            <div className="hidden md:flex gap-3">
              <NavLink to="/" className="p-2 rounded-md">
                All Products
              </NavLink>
              <NavLink to="/addproduct" className="p-2 rounded-md">
                Add Products
              </NavLink>
              <p
                className="p-2 rounded-md hover:text-red-500 cursor-pointer"
                onClick={() => handleUser(false)}
              >
                LogOut
              </p>
            </div>
          )}
        </nav>
        {nav && user && (
          <div className="block md:hidden">
            <div className="fixed top-0 bottom-0 h-[100vh] left-0 w-full bg-gray-500 opacity-20"></div>
            <div className="fixed flex flex-col px-5 py-5 top-0 bottom-0 right-0 w-9/12 h-[100vh] bg-white">
              <div className="mb-5 flex justify-end">
                <div
                  className="bg-blue-700 text-white p-2 rounded-full"
                  onClick={() => setNav(false)}
                >
                  <TfiClose size={20} />
                </div>
              </div>
              <NavLink to="/" className="my-3 text-xl">
                All Products
              </NavLink>
              <NavLink to="/addProduct" className="my-3 text-xl">
                Add Products
              </NavLink>
              <p
                className="my-3 text-xl hover:text-red-500 cursor-pointer"
                onClick={() => handleUser(false)}
              >
                Log Out
              </p>
            </div>
          </div>
        )}
      </header>
      <Outlet />
    </>
  );
};

export default Navbar;
