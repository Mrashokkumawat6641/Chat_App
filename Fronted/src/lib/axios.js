import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api/auth/',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },

})



// import axios from 'axios';

// export const signup = async (userData) => {
//     try {
//         const axiosInstance = await axios.post(
//           'http://localhost:8080/auth/signup',
//           userData,
//           { withCredentials: true }
//         );
//         console.log('Signup successful:', axiosInstance.data);
//       } catch (error) {
//         if (error.response) {
//           console.error('Error Response:', error.axiosInstance.data);
//         } else if (error.request) {
//           console.error('No Response from Server:', error.request);
//         } else {
//           console.error('Error:', error.message);
//         }
//       }
// };
