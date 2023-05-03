import React from "react";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

const FilteredProducts = ({ product, index, showProduct, setDelete }) => {
  return (
    <tr
      onClick={() => showProduct(product.id)}
      className="text-center h-18 md:h-24 hover:bg-slate-100 cursor-pointer"
    >
      <td>{index}</td>
      <td className="">
        <div>
          <img
            src={product.image}
            className="mx-auto w-[80px] h-[80px] md:w-[100px] md:h-[100px]"
          />
        </div>
      </td>
      <td className="">{product.name}</td>
      <td className="">{product.category}</td>
      <td className="hidden md:table-cell">NGN {product.price}</td>
      <td className="hidden md:table-cell">
        <div className="flex gap-3 justify-center">
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
      </td>
    </tr>
  );
};

export default FilteredProducts;
