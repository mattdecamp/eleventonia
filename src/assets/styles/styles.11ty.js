// Based on Max Bock's scripts on eleventastic https://github.com/maxboeck/eleventastic
// This runs the CSS file build
// Converts Sass and compiles all files defined in main file

const MAIN_FILE_NAME = "main.scss";

const path = require("path");
const sass = require("node-sass");
const CleanCSS = require("clean-css");
const isProd = process.env.ELEVENTY_ENV === "production";

module.exports = class {
  async data() {
    const entryPath = path.join(__dirname, `/${MAIN_FILE_NAME}`);
    return {
      permalink: "assets/styles/main.css",
      eleventyExcludeFromCollection: true,
      entryPath,
    };
  }

  // Compile Sass to CSS
  // Embed source map in dev
  async compile(config) {
    return new Promise((resolve, reject) => {
      if (!isProd) {
        config.sourceMap = true;
        config.sourceMapEmbed = true;
        config.outputStyle = "expanded";
      }
      return sass.render(config, (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result.css.toString());
      });
    });
  }
  // Minify/Optimize with CleanCSS in Production
  async minify(css) {
    return new Promise((resolve, reject) => {
      if (!isProd) {
        resolve(css);
      }
      const minified = new CleanCSS().minify(css);
      if (!minified.styles) {
        return reject(minified.error);
      }
      resolve(minified.styles);
    });
  }
  async render({ entryPath }) {
    try {
      const css = await this.compile({ file: entryPath });
      const result = await this.minify(css);
      return result;
    } catch (err) {
      // if things go wrong
      if (isProd) {
        // throw and abort in production
        throw new Error(err);
      } else {
        // otherwise display the error overlay
        console.error(err);
        const msg = err.formatted || err.message;
        return this.renderError(msg);
      }
    }
  }
};
