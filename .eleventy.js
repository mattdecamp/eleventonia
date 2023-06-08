// const { DateTime } = require("luxon");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const svgSprite = require("eleventy-plugin-svg-sprite");
const dateFilter = require("./src/filters/dateFilter.js");
const cleanCSS = require("clean-css");

module.exports = function (config) {
  config.setServerOptions({
    // Whether the live reload snippet is used
    liveReload: true,
    port: 3456,
    watch: ["dist/**/*.css"],
    showAllHosts: true,
  });
  // PASSTHROUGHS
  config.addPassthroughCopy("src/assets/images/");

  // LAYOUTS //
  config.addLayoutAlias("base", "layouts/base.njk");
  config.addLayoutAlias("post", "layouts/post.njk");

  // FILTERS //
  // date filter
  config.addFilter("dateFilter", dateFilter);
  // clean and inline CSS
  config.addFilter("cssmin", function (code) {
    return new cleanCSS({}).minify(code).styles;
  });

  // TRANSFORMS //
  // minify HTML
  const htmlMinTransform = require("./src/transforms/html-min.js");
  const isProduction = process.env.ELEVENTY_ENV === "production";
  // html min only in production
  if (isProduction) {
    config.addTransform("htmlmin", htmlMinTransform);
  }

  // PLUG-INS //
  config.addPlugin(pluginRss);
  config.addPlugin(svgSprite, {
    path: "./src/assets/icons",
    svgShortcode: "icon",
    globalClasses: "icon",
  });

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
