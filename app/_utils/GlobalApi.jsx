const { default: axios } = require("axios");

const axiosClient=axios.create({baseURL:'http://localhost:1337/api'})

const getCategory=()=>axiosClient.get('/categories?populate=*');

console.log(getCategory);
const getSliders=()=>axiosClient.get('/sliders?populate=*').then(resp=>{
    return resp.data.data
})
const getCategoryList=()=>axiosClient.get('/categories?populate=*').then(resp=>{
    return resp.data.data
});

const getAllProducts=()=>axiosClient.get('/products?populate=*').then(resp=>{
    return resp.data.data;
})

const getProductsByCategory = (category) =>
    axiosClient.get('/products?filters[categories][name][$in]=' + category + "&populate=*").then((resp) => {
      return resp.data.data;  
});

const registerUser=(username,email,password)=>axiosClient.post('/auth/local/register',{
        username:username,
        email:email,
        password:password
});

const SignIn=(email,password)=>axiosClient.post('/auth/local',{
    identifier:email,
    password:password
})

const addToCart = (data, jwt) =>
    axiosClient.post('/user-carts', data, {
        headers: {
            Authorization: 'Bearer ' + jwt
        }
});

const getCartItems = (userid, jwt) => {
    return axiosClient.get(`/user-carts?filters[userid][$eq]=${userid}&populate=products.images`, {
        headers: {
            Authorization: `Bearer ${jwt}`
        }
    }).then(resp => {
        const data = resp.data.data;
        return data.map(item => {
            const product = item?.products?.[0]; // Extract first product safely
            return {
                id: item?.id,
                name: product?.name || '',
                quantity: item?.quantity || 0,
                amount: item?.amount || 0,
                image:product?.images?.[0]?.url 
                ? `http://localhost:1337${product.images[0].url}` // ✅ Ensure full URL
                : '',
                actualPrice: product?.mrp || 0
            };
        });
    });
};

const searchProducts = (query) =>
    axiosClient.get(`/products?filters[name][$containsi]=${query}&populate=*`).then((resp) => {
        // Ensure returning the 'data' array from the response
        return resp.data.data;
    });


    const getUserProfile = (jwt) =>
        axiosClient.get('/users/me', {
          headers: {
            Authorization: `Bearer ${jwt}`
          }
        }).then(resp => {
          // Check if response has data
          if (!resp.data) {
            throw new Error("Empty response from server");
          }
          console.log("User profile API response:", resp.data);
          return resp.data;
        }).catch(err => {
          console.error("Failed to get user profile:", {
            status: err.response?.status,
            statusText: err.response?.statusText,
            data: err.response?.data,
            message: err.message
          });
          throw err;
        });
      
      // Add the missing updateUserProfile method
      const updateUserProfile = (userId, userData, jwt) =>
        axiosClient.put(`/users/${userId}`, userData, {
          headers: {
            Authorization: `Bearer ${jwt}`
          }
        }).then(resp => {
          console.log("Update profile response:", resp.data);
          return resp.data;
        }).catch(err => {
          console.error("Failed to update profile:", err.response?.data || err.message);
          throw err;
        });

export default{
    getCategory,
    getSliders,
    getCategoryList,
    getAllProducts,
    getProductsByCategory,
    registerUser,
    SignIn,
    addToCart,
    getCartItems,
    searchProducts,
    getUserProfile,
    updateUserProfile 
}
