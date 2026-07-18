import Swal from 'sweetalert2';

const toast = {
  success: (title) => {
    Swal.fire({
      icon: "success",
      title,
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3e3,
      timerProgressBar: true
    });
  },
  error: (title) => {
    Swal.fire({
      icon: "error",
      title,
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3e3,
      timerProgressBar: true
    });
  }
};

export { toast as t };
//# sourceMappingURL=alert-D7s0TqQ8.mjs.map
