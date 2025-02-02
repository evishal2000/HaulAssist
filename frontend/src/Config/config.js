// config.js
const config = {
    development: {
      baseURL: "http://localhost:4000",
    },
    production: {
      baseURL: "https://api.example.com",
    },
  };
  
  export const getConfig = () => {
    const env = process.env.NODE_ENV || "development"; // Default to development
    return config[env];
  };
  