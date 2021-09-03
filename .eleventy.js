const { DateTime } = require('luxon');
const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function (config) {
  // Passthrough copy

  // Layouts //
  config.addLayoutAlias("base", "base.njk");
  config.addLayoutAlias("post", "post.njk");
  config.addLayoutAlias("page", "page.njk");

  // Transforms //
  // Minify HTML
  const htmlMinTransform = require("./src/transforms/html-min.js");
  const isProduction = process.env.ELEVENTY_ENV === "production";
  // html min only in production
  if (isProduction) {
    config.addTransform("htmlmin", htmlMinTransform);
  }

  // Plug-Ins //
  config.addPlugin(pluginRss);

  // Base confirguration //
  return {
    dir: {
      input: "src",
      output: "dist",
      includes: "includes",
      layouts: "layouts",
      data: "data",
    },
    templateFormats: ["html", "njk", "md", "11ty.js"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
