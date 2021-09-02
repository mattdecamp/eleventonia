module.exports = function (config) {

  // Layouts
  config.addLayoutAlias("base", "base.njk");
  config.addLayoutAlias("post", "post.njk");
  config.addLayoutAlias("page", "page.njk");
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
