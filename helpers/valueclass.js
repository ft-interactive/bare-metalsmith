module.exports = function (value) {
  var posneg = value.substring(0,1)
  if (posneg === "-") {
    return 'negative';
  } else {
    return 'positive';
  }
}