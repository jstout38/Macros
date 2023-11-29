const { createProxyMiddleware } = require("http-proxy-middleware");
//Proxy server for dev environment

module.exports = function (app) {
  app.use(
    [
      "/api", 
      "/auth/google", 
      "/auth/reg", 
      "/auth/user", 
      "/food/search", 
      "/food/add", 
      "/food/foodlist", 
      "/journal/add",
      "/journal/update",
      "/journal/entries",
      "/journal/delete",
      "/food/delete",
      "/food/update",
    ], 
    createProxyMiddleware({
      target: "http://localhost:5000",
    })
  );
};