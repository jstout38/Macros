const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    ["/api", "/auth/google", "/auth/reg", "/auth/user", "/food/search", "/food/add", "/food/foodlist", "/journal/add"], 
    createProxyMiddleware({
      target: "http://localhost:5000",
    })
  );
};