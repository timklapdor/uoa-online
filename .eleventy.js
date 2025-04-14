
const eleventySass = require("@11tyrocks/eleventy-plugin-sass-lightningcss");
const markdownItDeflist = require("markdown-it-deflist");


module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src/images");
  eleventyConfig.addPassthroughCopy("./src/assets");
  eleventyConfig.addPlugin(eleventySass);

  eleventyConfig.amendLibrary("md", (mdLib) => mdLib.use(markdownItDeflist));

  return {
    pathPrefix: "/uoa-online/", 
    dir: {
      input: "src",
      output: "docs",
      layouts: '_layouts'
    },
  };
};