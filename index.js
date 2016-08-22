/* eslint import/no-extraneous-dependencies: ['error', {'devDependencies': true}] */

const metalsmith = require('metalsmith');

// Plugins
const helpers = require('metalsmith-register-helpers');
const metadata = require('metalsmith-metadata');
const request = require('metalsmith-request');
const date = require('metalsmith-build-date');
const markdown = require('metalsmith-markdown');
const layouts = require('metalsmith-layouts');
const sass = require('metalsmith-sass');
const babel = require('metalsmith-babel');
const ignore = require('metalsmith-ignore');
const browsersync = require('metalsmith-browser-sync');

// Plugin options
const helpersOptions = {
  directory: 'helpers',
};
const metadataFiles = {};
const remoteData = {
  feed: 'https://bertha.ig.ft.com/view/publish/gss/107tkTkKou_eOjkSdelYU9WPWBtRqavnU8KG4u_Y9I_Y/data',
  agg: 'https://bertha.ig.ft.com/view/publish/gss/107tkTkKou_eOjkSdelYU9WPWBtRqavnU8KG4u_Y9I_Y/aggregates',
  collections: 'https://bertha.ig.ft.com/view/publish/gss/107tkTkKou_eOjkSdelYU9WPWBtRqavnU8KG4u_Y9I_Y/collections',
};
const gotOptions = {
  json: true,
};
const dateOptions = {
  key: 'lastUpdated',
};
const markdownOptions = {
  gfm: true,
  smartypants: true,
  tables: true,
};
const layoutsOptions = {
  engine: 'handlebars',
  partials: 'layouts/partials',
  rename: true,
};
const sassOptions = {
  outputStyle: 'expanded',
  includePaths: ['bower_components'],
};
const babelOptions = {
  presets: ['es2015'],
  ignore: [
    'src/scripts/d3.min.js',
    'src/scripts/drawFrame.js',
    'src/scripts/line.js',
    'src/scripts/styles.js',
  ],
};
const ignoreOptions = ['*.yaml', '*.json'];
const browsersyncOptions = {
  server: 'dist',
  files: ['src/**/*.md', 'src/**/*.scss', 'src/**/*.js', 'layouts/**/*.hbs'],
};

metalsmith(__dirname)
  .destination('dist')
  .clean(false)
  .use(helpers(helpersOptions))
  .use(metadata(metadataFiles))
  .use(request(remoteData, gotOptions))
  .use(date(dateOptions))
  .use(markdown(markdownOptions))
  .use(layouts(layoutsOptions))
  .use(sass(sassOptions))
  .use(babel(babelOptions))
  .use(ignore(ignoreOptions))
  .use(browsersync(browsersyncOptions))
  .build((err) => {
    if (err) {
      throw err;
    }

    console.log('Build complete.');
  });
