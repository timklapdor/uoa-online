
const eleventySass = require("@11tyrocks/eleventy-plugin-sass-lightningcss");
const Image = require("@11ty/eleventy-img");
const path = require("path");
const markdownItDeflist = require("markdown-it-deflist");
const embedYouTube = require("eleventy-plugin-youtube-embed");


module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src/images");
  eleventyConfig.addPassthroughCopy("./src/assets");
  eleventyConfig.addPassthroughCopy("./src/media/h5p");
  eleventyConfig.ignores.add("./src/media/h5p/**");
  eleventyConfig.setServerOptions({showAllHosts: true,}); // Add support for serving HTML files without extensions
  eleventyConfig.addPlugin(eleventySass);
  eleventyConfig.addPlugin(embedYouTube);

  eleventyConfig.amendLibrary("md", (mdLib) => mdLib.use(markdownItDeflist));

  //Adding find filter for people image matching
  eleventyConfig.addFilter("find", function(array, key, value) {
  return array.find(item => item[key] === value);
  });

  // To identify any image type:
  eleventyConfig.addFilter("isImage", function(value) {
  if (!value) return false;
  const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg'];
  return imageExtensions.some(ext => value.toLowerCase().endsWith(ext));
  });

  // To render stuff as markdown
  eleventyConfig.addFilter("markdown", function(value) {
  if (!value) return '';
  const md = require("markdown-it")({
    html: true,
    breaks: true,
    linkify: true
  });
  return md.render(value);
});

  // Create a filter to limit number of characters
  eleventyConfig.addFilter("limit", function(value, length) {
  if (!value) return '';
  return value.substring(0, length);
  });

   // Create a collection that aggregates all team members
  eleventyConfig.addCollection("teamMembers", function(collectionApi) {
    const courses = collectionApi.getFilteredByTag("courses"); // Adjust tag as needed
    const teamMap = new Map();
    
    courses.forEach(course => {
      const team = course.data.Team || [];
      
      team.forEach(member => {
        const name = member.Name;
        const role = member.Role;
        
        if (!name) return; // Skip if no name
        
        // Create a unique key for each person-role combination
        const key = `${name}|${role}`;
        
        if (teamMap.has(key)) {
          const existing = teamMap.get(key);
          existing.courseCount++;
          existing.courses.push({
            title: course.data.title,
            url: course.url,
            involvement: member.Involvement
          });
        } else {
          teamMap.set(key, {
            name: name,
            role: role,
            courseCount: 1,
            courses: [{
              title: course.data.title,
              url: course.url,
              involvement: member.Involvement
            }]
          });
        }
      });
    });
    
    // Convert Map to array and sort by course count (descending)
    return Array.from(teamMap.values())
      .sort((a, b) => b.courseCount - a.courseCount);
  });
  
  // Optional: Create a filter to get team members by role
  eleventyConfig.addFilter("teamByRole", function(teamMembers, role) {
    return teamMembers.filter(member => member.role === role);
  });
  
  // Optional: Create a filter to get all unique roles
  eleventyConfig.addFilter("uniqueRoles", function(teamMembers) {
    const roles = new Set(teamMembers.map(m => m.role));
    return Array.from(roles).sort();
  });

  // Shortcode for background images
  eleventyConfig.addNunjucksAsyncShortcode("bgImage", async function(src, alt = "") {
    // Construct the full path to the source image
    const fullSrc = path.join("./images/banners/", src);
    
    let metadata = await Image(fullSrc, {
      widths: [500, 800, 1200],
      formats: ["webp", "jpeg"],
      outputDir: "./_site/images/banners/optimized/",
      urlPath: "/images/banners/optimized/",
      filenameFormat: function (id, src, width, format) {
        const extension = path.extname(src);
        const name = path.basename(src, extension);
        return `${name}-${width}w.${format}`;
      }
    });

    // Get the largest JPEG for fallback
    let fallbackImage = metadata.jpeg[metadata.jpeg.length - 1];
    
    // Generate srcset for different sizes
    let webpSrcset = metadata.webp.map(img => `${img.url} ${img.width}w`).join(", ");
    let jpegSrcset = metadata.jpeg.map(img => `${img.url} ${img.width}w`).join(", ");
    
    return JSON.stringify({
      fallback: fallbackImage.url,
      webpSrcset: webpSrcset,
      jpegSrcset: jpegSrcset,
      webp: metadata.webp,
      jpeg: metadata.jpeg
    });
  });

  // Simple shortcode that returns the optimized URL for a specific size
  eleventyConfig.addAsyncShortcode("bgImageUrl", async function(src, width = 1200) {
    const fs = require("fs");
    const fullSrc = path.resolve(__dirname, "./src/images/banners/", src);
    
    // Check if file exists before processing
    if (!fs.existsSync(fullSrc)) {
      console.warn(`Warning: Banner image not found: ${fullSrc}`);
      // Return fallback path
      return `../../images/banners/${src}`;
    }
    
    try {
      let metadata = await Image(fullSrc, {
        widths: [width],
        formats: ["jpeg"],
        outputDir: "./docs/images/banners/optimized/",
        urlPath: "../../images/banners/optimized/",
        filenameFormat: function (id, src, width, format) {
          const extension = path.extname(src);
          const name = path.basename(src, extension);
          return `${name}-${width}w.${format}`;
        }
      });

      return metadata.jpeg[0].url;
    } catch (error) {
      console.error(`Error processing image ${src}:`, error.message);
      // Return fallback path on error
      return `../../images/banners/${src}`;
    }
  });

  // Alternative version with single ../ path
  eleventyConfig.addAsyncShortcode("bgImageUrlShort", async function(src, width = 1200) {
    const fs = require("fs");
    const fullSrc = path.resolve(__dirname, "./src/images/banners/", src);
    
    // Check if file exists before processing
    if (!fs.existsSync(fullSrc)) {
      console.warn(`Warning: Banner image not found: ${fullSrc}`);
      return `../images/banners/${src}`;
    }
    
    try {
      let metadata = await Image(fullSrc, {
        widths: [width],
        formats: ["jpeg"],
        outputDir: "./docs/images/banners/optimized/",
        urlPath: "../images/banners/optimized/",
        filenameFormat: function (id, src, width, format) {
          const extension = path.extname(src);
          const name = path.basename(src, extension);
          return `${name}-${width}w.${format}`;
        }
      });

      return metadata.jpeg[0].url;
    } catch (error) {
      console.error(`Error processing image ${src}:`, error.message);
      return `../images/banners/${src}`;
    }
  });

  return {
    pathPrefix: "/uoa-online/", 
    dir: {
      input: "src",
      output: "docs",
      layouts: '_layouts'
    },
  };
};