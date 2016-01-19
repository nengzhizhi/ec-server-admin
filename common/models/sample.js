module.exports = function(Sample){
  //Sample.disableRemoteMethod("create", true);
	Sample.disableRemoteMethod("upsert", true);
	Sample.disableRemoteMethod("updateAll", true);
	Sample.disableRemoteMethod("updateAttributes", true);
	//Sample.disableRemoteMethod("find", true);
	Sample.disableRemoteMethod("findById", true);
	Sample.disableRemoteMethod("findOne", true);
	Sample.disableRemoteMethod("deleteById", true);
	Sample.disableRemoteMethod("exists", true);
	Sample.disableRemoteMethod("count", true);
	Sample.disableRemoteMethod("createChangeStream", true);
}
