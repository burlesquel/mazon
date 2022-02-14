module.exports = {
  images:{
    domains:["img6a.flixcart.com", "img5a.flixcart.com", "i.ibb.co"]
  },
  reactStrictMode: true,
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, process:false };

    return config;
  },
}
