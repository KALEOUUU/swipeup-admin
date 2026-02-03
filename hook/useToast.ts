import toast from "react-hot-toast";


export const showSuccess = (message: string) => {
    toast.success(message);
};

export const showError = (message: string) => {
    toast.error(message);
};

export const showLoading = (message: string) => {
    const toastId = toast.loading(message);
    return toastId;
};

export const dismissToast = (toastId: string) => {
    toast.dismiss(toastId);
};

export const toastUpdate = (toastId: string, message: string, type: "success" | "error") => {
    if (type === "success") {
        toast.success(message, { id: toastId });
    } else if (type === "error") {
        toast.error(message, { id: toastId });
    } else {
        toast.loading(message, { id: toastId });
    }
}