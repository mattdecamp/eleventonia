# Eleventonia

A mildly opinionated [Eleventy](https://11ty.dev) starter project.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/mattdecamp/eleventonia)  

## Features

* HTML Minification
* CSS Pipline (SCSS > CleanCSS > Inline)
* Eleventy Dev Server
* Eleventy SVG Icon Sprites
* Eleventy RSS
* Date Formatting Filter
* Post Excerpts

## Getting Started

Navigate to the root folder of the site and run:

```
npm install
```

To run the development environment:

```
npm run dev
```

To build for production:

```
npm run build
```
For additional eleventy commands, visit the [Eleventy command line usage page](https://www.11ty.dev/docs/usage/).

## Editing Styles
Edit and amend as needed. The main Sass files are under the `/assets` folder.
### Sass Folder Structure
```
src
  /assets
    /styles
      /scss
        /base
        /components
        /utility
        main.scss
```
The development environment watches for changes to the Sass files and pushes changes to `main.css` in the `/includes` folder. Eleventy then pushes the styles inline in the `<head>` of the base page template.

## Prodution Build
At build time, all the html files are minified.


## Thanks To

* [Andy Bell](https://github.com/hankchizljaw/hylia)
* [Max Böck](https://github.com/maxboeck/eleventastic)
* [Phil Hawksworth](https://github.com/philhawksworth/eleventyone)
* [Zach Leatherman](https://11ty.dev)
* [Thomas Semmler](https://helloyes.dev)
