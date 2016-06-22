const Metalsmith = require('metalsmith');

// Plugins
const markdown = require('metalsmith-markdown');
const layouts = require('metalsmith-layouts');
const metadata = require('metalsmith-metadata');
const sass = require('metalsmith-sass');
const babel = require('metalsmith-babel');

// Plugin options
const babelOptions = {
  presets: ['es2015']
};

Metalsmith(__dirname)
  .source('./src')
  .destination('./dist')
  .clean(false)
  .metadata({})
  .use(metadata({
    site: 'site.yaml',
    page: 'page.yaml',
    items: 'list.json'
  }))
  .use(markdown({
    smartypants: true,
    gfm: true,
    tables: true
  }))
  .use(layouts({
    engine: 'handlebars',
    partials: 'layouts/partials',
    rename: true
  }))
  .use(sass({
    outputStyle: 'expanded'
  }))
  .use(babel(babelOptions))
  .build((err, files) => {
    if (err) {
      throw err;
    }

    console.log('Completed.');
  });
