const pluginRss = require("@11ty/eleventy-plugin-rss");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

module.exports = function (config) {
  // Plug-ins
  config.addPlugin(pluginRss);
  config.addPlugin(eleventyNavigationPlugin);
  // Layouts
  config.addLayoutAlias("base", "base.njk");
  config.addLayoutAlias("post", "post.njk");
  // Base confirguration
  return {
    dir: {
      input: "src",
      output: "dist",
      includes: "includes",
      layouts: "layouts",
      data: "data",
    },
    templateFormats: ["njk", "md", "11ty.js"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
