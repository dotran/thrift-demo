module.exports = {
  isNullOrUndefined: function (object) {
    return object === null || object === undefined;
  },
  isBoolean: function (object) {
    return typeof object === 'boolean';
  }
}
