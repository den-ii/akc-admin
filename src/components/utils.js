import { toast } from "react-toastify";

const settings = {
  autoClose: 3000,
  pauseOnHover: false,
  theme: "colored",
};
export const error = (val = "Error Occured") => toast.error(val, settings);
export const success = (val = "Product Added") => toast.success(val, settings);
export const info = (val) => toast.info(val, settings);
