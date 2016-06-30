const utils = require('../node_modules/handlebars-helpers/lib/utils');

module.exports = function(arr/*, prop*/) {
  if (utils.isUndefined(arr)) return '';
  var args = [].slice.call(arguments);
  args.pop(); // remove hbs options object

  if (typeof args[0] === 'string' && /[[]/.test(args[0])) {
    args[0] = utils.tryParse(args[0]) || [];
  }
  if (utils.isUndefined(args[1])) {
    return args[0].sort();
  }
  return utils.sortBy.apply(null, args).reverse();
};
