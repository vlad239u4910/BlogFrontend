import Swal from "sweetalert2";

window.alert = function (message) {
  Swal.fire({
    text: message,
    icon: "info",
    confirmButtonText: "OK",
    confirmButtonColor: "#3b82f6",
  });
};

window.confirm = async function (message) {
  const result = await Swal.fire({
    text: message,
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
    confirmButtonColor: "#10b981",
    cancelButtonColor: "#ef4444",
  });
  return result.isConfirmed;
};
