const { DateTime } = require("luxon");
const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function (config) {
  // PASSTHROUGHS

  // LAYOUTS //
  config.addLayoutAlias("base", "layouts/base.njk");
  config.addLayoutAlias("post", "layouts/post.njk");

  // TRANSFORMS //
  // Minify HTML
  const htmlMinTransform = require("./src/transforms/html-min.js");
  const isProduction = process.env.ELEVENTY_ENV === "production";
  // html min only in production
  if (isProduction) {
    config.addTransform("htmlmin", htmlMinTransform);
  }

  // PLUG-INS //
  config.addPlugin(pluginRss);
  
  // EXTRAS //
  // Post List Excerpts
  config.setFrontMatterParsingOptions({
    excerpt: true,
    excerpt_separator: "<!-- excerpt -->",
  });

  // BASE CONFIGURATION //
  return {
    dir: {
      input: "src",
      output: "dist",
      includes: "includes",
      data: "data",
    },
    templateFormats: ["html", "njk", "md", "11ty.js"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
