import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { TfiClose } from "react-icons/tfi";

const ProductModal = ({ product, closeModal, setDelete }) => {
  return (
    <div className="fixed top-0 bottom-0 w-full h-full left-0 right-0">
      <div
        className="fixed top-0 bottom-0 w-full h-full left-0 right-0 bg-gray-700 opacity-20"
        onClick={closeModal}
      ></div>
      <div className="absolute top-[49%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-white w-[90%] h-[90%] md:max-h-[440px] max-w-[700px] rounded-md p-4 overflow-y-scroll md:overflow-hidden">
        <div className="flex justify-end mb-3">
          <button
            className="bg-blue-700 hover:bg-red-600 text-white flex gap-2 items-center px-2 py-1 rounded"
            onClick={closeModal}
          >
            <TfiClose /> <span className="font-bold">Close</span>
          </button>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-3 h-full md:w-full">
          <div>
            <img
              src={product.image}
              alt="product image"
              className="w-[150px] md:w-[200px] max-h-[220px] rounded-md"
            />
          </div>
          <ul className="flex md:block overflow-x-scroll md:overflow-x-hidden">
            {product.carousel.map((c) => (
              <li key={c} className="border border-blue-700">
                <img src={c} alt="" className="w-[100px]" />
              </li>
            ))}
          </ul>
          <div className="">
            <div className="mb-3">
              <span className="font-bold">Description:</span>{" "}
              <p>{product.description}</p>
            </div>
            <div className="mb-3">
              <span className="font-bold">Dimensions:</span>{" "}
              <p>{product.dimensions}</p>
            </div>
            <div className="mb-3">
              <span className="font-bold">Price:</span> {product.price}
            </div>
            <div className="mb-3">
              <span className="font-bold">Bulk Price:</span>{" "}
              {product.bulk_price}
            </div>
            <div className="mb-3">
              <span className="font-bold">Wholesale Price:</span>{" "}
              {product.wholesale_price}
            </div>
            <div className="flex gap-3 justify-center m-5">
              <Link to={`editproduct/${product.id}`}>
                <button className="flex gap-1 justify-center items-center  bg-gray-200 hover:bg-gray-300 font-bold py-1 px-2 rounded shadow">
                  <FiEdit /> Edit
                </button>
              </Link>
              <button
                className="flex gap-1 justify-center items-center bg-red-500 hover:bg-red-600 font-bold text-white py-1 px-2 rounded shadow"
                onClick={(e) =>
                  setDelete(e, product.id, product.image, product.carousel)
                }
              >
                <MdDelete size={20} />
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
