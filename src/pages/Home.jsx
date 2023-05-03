import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { db, storage } from "../firebase/config";
import { FaFilter } from "react-icons/fa";
import { TfiClose } from "react-icons/tfi";
import { Oval } from "react-loader-spinner";
import { toast } from "react-toastify";
import ProductModal from "../components/ProductModal";

import { error } from "../components/utils";
import FilteredProducts from "../components/FilteredProducts";
import Pagination from "./../components/Pagination";
const defaultFilterValues = {
  name: "",
  category: "",
  price: "",
};
const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filterValues, setFilterValues] = useState(defaultFilterValues);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [itemsShown, setItemsShown] = useState([]);
  const [filter, setFilter] = useState(false);
  const [modal, setModal] = useState(false);
  const length = filteredProducts.length;
  const [productModal, setProductModal] = useState({
    name: "",
    category: "",
    image: "",
    carousel: [],
    price: 0,
    bulk_price: 0,
    wholesale_price: 0,
    description: 0,
  });
  const [loading, setLoading] = useState(false);
  function handleModal() {
    setModal(false);
  }
  const getProducts = async () => {
    const data = await getDocs(productsCollectionRef);
    setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setFilteredProducts(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );
    setLoading(false);
  };
  const productsCollectionRef = collection(db, "products");
  useEffect(() => {
    setLoading(true);
    try {
      getProducts();
    } catch (err) {
      error();
    }
  }, []);

  function handleFilter(e) {
    e.preventDefault();
    setCurrentPage(1);
    let dummyProducts = products;
    if (filterValues == defaultFilterValues) {
      return setFilteredProducts(products);
    }
    if (filterValues.name.length) {
      dummyProducts = dummyProducts.filter((product) =>
        product.name.toLowerCase().includes(filterValues.name.toLowerCase())
      );
    }
    if (filterValues.category.length) {
      dummyProducts = dummyProducts.filter((product) =>
        product.category
          .toLowerCase()
          .includes(filterValues.category.toLowerCase())
      );
    }

    if (filterValues.price.length) {
      console.log(filterValues.price);
      dummyProducts = dummyProducts.filter(
        (product) => product.price <= +filterValues.price
      );
    }
    console.log(dummyProducts);
    setFilteredProducts(dummyProducts);
    setFilter(false);
  }
  function handleReset(e) {
    e.preventDefault();
    setFilterValues(defaultFilterValues);
    setFilteredProducts(products);
    setFilter(false);
  }
  console.log(modal);
  function handleShowProduct(id) {
    setModal(true);
    const temp = products.find((product) => product.id === id);
    setProductModal(temp);
  }
  function handleFilterForm(e) {
    const { name, value } = e.target;
    setFilterValues({ ...filterValues, [name]: value });
  }
  async function handleDelete(e, id, image, carousel) {
    e.stopPropagation();
    try {
      await deleteDoc(doc(db, "products", id));
      const storageRef = ref(storage, image);
      await deleteObject(storageRef);
      carousel.forEach(async (image) => {
        const storageRef = ref(storage, image);
        await deleteObject(storageRef);
      });
      getProducts();
      setModal(false);
    } catch (err) {
      console.log(err);
      error();
    }
  }
  console.log("c", currentPage);
  return (
    <main className="p-3">
      {loading ? (
        <div className="flex flex-col h-[100vh] justify-center items-center">
          <Oval
            ariaLabel="loading-indicator"
            height={100}
            width={100}
            strokeWidth={1}
            strokeWidthSecondary={2000}
            color="rgb(29 78 216)"
            secondaryColor="red"
          />
        </div>
      ) : (
        <div className="max-w-[1000px] mx-auto mt-24 p-3 text-gray-600">
          <div className="flex justify-between items-center mb-3">
            <h1 className="mb-3 text-2xl font-bold">All Products</h1>
            <div>
              <button
                onClick={() => setFilter(true)}
                className="flex gap-2 text-blue-700  items-center border border-blue-700 hover:bg-blue-700 hover:text-white px-2 py-1 rounded"
              >
                <FaFilter />
                <span className="font-bold text-lg">Filter</span>
              </button>
            </div>
          </div>
          {/* PRODUCTS LIST */}
          <table className="w-full border-l border-l-gray-400 border-r border-r-gray-400 border-b-2 border-blue-700">
            <thead>
              <tr className="border-t-2 border-b-2 border-b-blue-700 border-t-blue-700">
                <th className="p-2">s/n</th>
                <th className="p-2">Image</th>
                <th className="p-2">Name</th>
                <th className="p-2">Category</th>
                <th className="p-2 hidden md:table-cell">Pricse</th>
                <th className="hidden md:table-cell">Actions</th>
              </tr>
            </thead>
            <tbody>
              {itemsShown.map((product, index) => {
                return (
                  <FilteredProducts
                    key={product.id}
                    showProduct={(id) => handleShowProduct(id)}
                    product={product}
                    index={index + currentPage * 2 - 1}
                    setDelete={(e, id, image, carousel) =>
                      handleDelete(e, id, image, carousel)
                    }
                  />
                );
              })}
            </tbody>
          </table>
          <Pagination
            currentPage={currentPage}
            setCurrentPage={(val) => setCurrentPage(val)}
            itemsPerPage={itemsPerPage}
            totalPages={length}
            data={filteredProducts}
            setItemsShown={(val) => setItemsShown(val)}
          />
          {/* PRODUCT MODAL  */}

          {modal && (
            <ProductModal
              product={productModal}
              setDelete={(e, id, image, carousel) =>
                handleDelete(e, id, image, carousel)
              }
              closeModal={handleModal}
            />
          )}
        </div>
      )}

      {/* FILTER MODAL */}
      {filter && (
        <div>
          <div
            onClick={() => setFilter(false)}
            className="fixed top-0 left-0 w-screen h-screen bg-gray-500 opacity-20"
          ></div>
          <div className="fixed bottom-0 h-8/12 min-w-[250px] w-3/12 bg-white z-50 p-3 rounded">
            <div className="flex justify-end">
              <button
                className="bg-blue-700 text-white flex gap-2 items-center px-2 py-1 rounded"
                onClick={() => setFilter(false)}
              >
                <TfiClose /> <span className="font-bold">Close</span>
              </button>
            </div>

            <form className="flex flex-col justify-between">
              <div>
                <label htmlFor="name" className="mt-3 block">
                  Product Name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={filterValues.name}
                  onChange={(e) => handleFilterForm(e)}
                  className="block border border-gray-800 w-full rounded p-2 focus:outline-blue-700"
                />
                <label htmlFor="category" className="mt-3 block">
                  Product Category:
                </label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={filterValues.category}
                  onChange={(e) => handleFilterForm(e)}
                  className="block border border-gray-800 w-full rounded p-2 focus:outline-blue-700"
                />
                <label htmlFor="price" className="mt-3 block">
                  Price: (NGN 0 - NGN {filterValues.price})
                </label>
                <input
                  type="range"
                  min="0"
                  max="50000"
                  value={filterValues.price}
                  onChange={(e) => handleFilterForm(e)}
                  name="price"
                  id="price"
                  className="block border border-gray-800 w-full rounded p-2 focus:outline-blue-700"
                />
              </div>
              <div className="flex gap-3">
                <button
                  className="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white font-bold mt-8 w-10/12 block mx-auto py-2 px-2 rounded"
                  onClick={(e) => handleReset(e)}
                >
                  Reset
                </button>
                <button
                  className="bg-blue-700 text-white hover:bg-white hover:text-blue-700 hover:border hover:border-blue-700 mt-8 font-bold w-10/12 block mx-auto py-2 px-2 rounded"
                  onClick={(e) => handleFilter(e)}
                >
                  Filter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default Home;
