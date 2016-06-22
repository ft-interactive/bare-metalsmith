const Metalsmith = require('metalsmith');

// Plugins
const markdown = require('metalsmith-markdown');
const layouts = require('metalsmith-layouts');
const metadata = require('metalsmith-metadata');
const sass = require('metalsmith-sass');
const babel = require('metalsmith-babel');
const ignore = require('metalsmith-ignore');
const browsersync = require('metalsmith-browser-sync');

// Plugin options
const metadataFiles = {
  site: 'site.yaml',
  page: 'page.yaml',
  items: 'list.json'
};
const babelOptions = {
  presets: ['es2015']
};
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
  outputStyle: 'expanded'
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
