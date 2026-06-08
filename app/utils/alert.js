import Swal from "sweetalert2";

export const toast = {
  success: (title) => {
    Swal.fire({
      icon: "success",
      title,
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
  },
  error: (title) => {
    Swal.fire({
      icon: "error",
      title,
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
  },
};

export const showAlert = (options) => {
  return Swal.fire(options);
};
