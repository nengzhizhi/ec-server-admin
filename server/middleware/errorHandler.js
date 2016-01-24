module.exports = errorHandler;

function errorHandler(options){
  return function errorHandler(err, req, res, next){
    if (!!options && options.includeStack === false) {
      delete err.stack;
    }
    res.send(err);
    res.end();
  }
}
