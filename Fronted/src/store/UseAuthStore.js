import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import toast from 'react-hot-toast';
// import { signup } from '../../../Backend/src/controllers/auth.controller.js'
export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIng: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,

    
    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            set({ authUser: res.data });
        } catch (error) {
            // console.log("Error in checkAuth", error)
            set({ authUser: null })
        } finally {
            set({ isCheckingAuth: false })
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post("signup", data);
            set({ authUser: res.data });
            // console.log(data,"asfdasjlkfdjasklfjklsjfk")
            toast.success("Account created successfully");
        } catch (error) {
            toast.error(error.response.data.message);
            toast.error(error.response?.data?.message || "An unexpected error occurred.");
        } finally {
            set({ isSigningUp: false });
        }
    },
}));        


