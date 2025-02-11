
const eleventySass = require("@11tyrocks/eleventy-plugin-sass-lightningcss");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src/images");
  eleventyConfig.addPassthroughCopy("./src/assets");
  eleventyConfig.addPlugin(eleventySass);



  return {
    pathPrefix: "/uoa-online/", 
    dir: {
      input: "src",
      output: "docs",
      layouts: '_layouts'
    },
  };
};