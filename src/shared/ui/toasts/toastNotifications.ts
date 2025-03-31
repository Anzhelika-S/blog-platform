import { Slide, ToastPosition, ToastOptions } from "react-toastify";

export const toastSuccess : ToastOptions = {
  position: "top-left" as ToastPosition,
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: false,
  draggable: true,
  progress: undefined,
  theme: "light",
  transition: Slide,
};

export const toastError : ToastOptions = {
  position: "top-left",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: false,
  draggable: true,
  progress: undefined,
  theme: "light",
  transition: Slide,
};
