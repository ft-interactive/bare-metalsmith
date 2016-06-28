const Metalsmith = require('metalsmith');

// Plugins
const metadata = require('metalsmith-metadata');
const request = require('metalsmith-request');
const markdown = require('metalsmith-markdown');
const layouts = require('metalsmith-layouts');
const sass = require('metalsmith-sass');
const babel = require('metalsmith-babel');
const browsersync = require('metalsmith-browser-sync');
const ignore = require('metalsmith-ignore');

// Plugin options
const metadataFiles = {};
const remoteData = {
  feed: 'https://bertha.ig.ft.com/view/publish/gss/107tkTkKou_eOjkSdelYU9WPWBtRqavnU8KG4u_Y9I_Y/data',
  agg: 'https://bertha.ig.ft.com/view/publish/gss/107tkTkKou_eOjkSdelYU9WPWBtRqavnU8KG4u_Y9I_Y/aggregates'
};
const gotOptions = {
  json: true
}
const markdownOptions = {
  smartypants: true,
  gfm: true,
  tables: true
};
const layoutsOptions = {
  engine: 'handlebars',
  partials: 'layouts/partials',
  rename: true
};
const sassOptions = {
  outputStyle: 'expanded',
  includePaths: ['bower_components']
};
const babelOptions = {
  presets: ['es2015']
};
const browsersyncOptions = {
  server: "dist",
  files: ["src/**/*.md", "layouts/**/*.hbs"]
};
const ignoreOptions = ['*.yaml', '*.json']

Metalsmith(__dirname)
  .destination('dist')
  .clean(false)
  .use(metadata(metadataFiles))
  .use(request(remoteData, gotOptions))
  .use(markdown(markdownOptions))
  .use(layouts(layoutsOptions))
  .use(sass(sassOptions))
  .use(babel(babelOptions))
  .use(browsersync(browsersyncOptions))
  .use(ignore(ignoreOptions))
  .build((err, files) => {
    if (err) {
      throw err;
    }

    console.log('Completed.');
  });
