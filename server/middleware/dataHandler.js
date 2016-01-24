module.exports = dataHandler;

function dataHandler(options){
  console.log("register dataHandler");
  return function dataHandler(req, res, next) {
    console.log(res);
    res.end();
  }
}
