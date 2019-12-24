/* eslint-disable */
/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js');
goog.object.extend(proto, google_protobuf_empty_pb);
var model_project_pb = require('../../model/project_pb.js');
goog.object.extend(proto, model_project_pb);
var rpc_common_response_pb = require('../../rpc/common/response_pb.js');
goog.object.extend(proto, rpc_common_response_pb);
goog.exportSymbol('proto.project.CreateEmptyProjectWithSwapResponse', null, global);
goog.exportSymbol('proto.project.GetProjectWithSwapRequest', null, global);
goog.exportSymbol('proto.project.GetProjectWithSwapResponse', null, global);
goog.exportSymbol('proto.project.GetProjectsWithSwapResponse', null, global);
goog.exportSymbol('proto.project.UpdateOriginalProjectAndRemoveSwapRequest', null, global);
goog.exportSymbol('proto.project.UpdateProjectRequest', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.project.CreateEmptyProjectWithSwapResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.project.CreateEmptyProjectWithSwapResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.project.CreateEmptyProjectWithSwapResponse.displayName = 'proto.project.CreateEmptyProjectWithSwapResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.project.GetProjectWithSwapRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.project.GetProjectWithSwapRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.project.GetProjectWithSwapRequest.displayName = 'proto.project.GetProjectWithSwapRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.project.GetProjectWithSwapResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.project.GetProjectWithSwapResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.project.GetProjectWithSwapResponse.displayName = 'proto.project.GetProjectWithSwapResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.project.GetProjectsWithSwapResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.project.GetProjectsWithSwapResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.project.GetProjectsWithSwapResponse.displayName = 'proto.project.GetProjectsWithSwapResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.project.UpdateProjectRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.project.UpdateProjectRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.project.UpdateProjectRequest.displayName = 'proto.project.UpdateProjectRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.project.UpdateOriginalProjectAndRemoveSwapRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.project.UpdateOriginalProjectAndRemoveSwapRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.project.UpdateOriginalProjectAndRemoveSwapRequest.displayName = 'proto.project.UpdateOriginalProjectAndRemoveSwapRequest';
}



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * FormField names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.project.CreateEmptyProjectWithSwapResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.project.CreateEmptyProjectWithSwapResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.project.CreateEmptyProjectWithSwapResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.project.CreateEmptyProjectWithSwapResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    projectid: jspb.Message.getFieldWithDefault(msg, 1, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.project.CreateEmptyProjectWithSwapResponse}
 */
proto.project.CreateEmptyProjectWithSwapResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.project.CreateEmptyProjectWithSwapResponse;
  return proto.project.CreateEmptyProjectWithSwapResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.project.CreateEmptyProjectWithSwapResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.project.CreateEmptyProjectWithSwapResponse}
 */
proto.project.CreateEmptyProjectWithSwapResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setProjectid(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.project.CreateEmptyProjectWithSwapResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.project.CreateEmptyProjectWithSwapResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.project.CreateEmptyProjectWithSwapResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.project.CreateEmptyProjectWithSwapResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getProjectid();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string projectID = 1;
 * @return {string}
 */
proto.project.CreateEmptyProjectWithSwapResponse.prototype.getProjectid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/** @param {string} value */
proto.project.CreateEmptyProjectWithSwapResponse.prototype.setProjectid = function(value) {
  jspb.Message.setProto3StringField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * FormField names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.project.GetProjectWithSwapRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.project.GetProjectWithSwapRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.project.GetProjectWithSwapRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.project.GetProjectWithSwapRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    projectid: jspb.Message.getFieldWithDefault(msg, 1, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.project.GetProjectWithSwapRequest}
 */
proto.project.GetProjectWithSwapRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.project.GetProjectWithSwapRequest;
  return proto.project.GetProjectWithSwapRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.project.GetProjectWithSwapRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.project.GetProjectWithSwapRequest}
 */
proto.project.GetProjectWithSwapRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setProjectid(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.project.GetProjectWithSwapRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.project.GetProjectWithSwapRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.project.GetProjectWithSwapRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.project.GetProjectWithSwapRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getProjectid();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string projectID = 1;
 * @return {string}
 */
proto.project.GetProjectWithSwapRequest.prototype.getProjectid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/** @param {string} value */
proto.project.GetProjectWithSwapRequest.prototype.setProjectid = function(value) {
  jspb.Message.setProto3StringField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * FormField names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.project.GetProjectWithSwapResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.project.GetProjectWithSwapResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.project.GetProjectWithSwapResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.project.GetProjectWithSwapResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    project: (f = msg.getProject()) && model_project_pb.Project.toObject(includeInstance, f),
    swap: (f = msg.getSwap()) && model_project_pb.Project.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.project.GetProjectWithSwapResponse}
 */
proto.project.GetProjectWithSwapResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.project.GetProjectWithSwapResponse;
  return proto.project.GetProjectWithSwapResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.project.GetProjectWithSwapResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.project.GetProjectWithSwapResponse}
 */
proto.project.GetProjectWithSwapResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new model_project_pb.Project;
      reader.readMessage(value,model_project_pb.Project.deserializeBinaryFromReader);
      msg.setProject(value);
      break;
    case 2:
      var value = new model_project_pb.Project;
      reader.readMessage(value,model_project_pb.Project.deserializeBinaryFromReader);
      msg.setSwap(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.project.GetProjectWithSwapResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.project.GetProjectWithSwapResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.project.GetProjectWithSwapResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.project.GetProjectWithSwapResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getProject();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      model_project_pb.Project.serializeBinaryToWriter
    );
  }
  f = message.getSwap();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      model_project_pb.Project.serializeBinaryToWriter
    );
  }
};


/**
 * optional model.Project project = 1;
 * @return {?proto.model.Project}
 */
proto.project.GetProjectWithSwapResponse.prototype.getProject = function() {
  return /** @type{?proto.model.Project} */ (
    jspb.Message.getWrapperField(this, model_project_pb.Project, 1));
};


/** @param {?proto.model.Project|undefined} value */
proto.project.GetProjectWithSwapResponse.prototype.setProject = function(value) {
  jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 */
proto.project.GetProjectWithSwapResponse.prototype.clearProject = function() {
  this.setProject(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.project.GetProjectWithSwapResponse.prototype.hasProject = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional model.Project swap = 2;
 * @return {?proto.model.Project}
 */
proto.project.GetProjectWithSwapResponse.prototype.getSwap = function() {
  return /** @type{?proto.model.Project} */ (
    jspb.Message.getWrapperField(this, model_project_pb.Project, 2));
};


/** @param {?proto.model.Project|undefined} value */
proto.project.GetProjectWithSwapResponse.prototype.setSwap = function(value) {
  jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 */
proto.project.GetProjectWithSwapResponse.prototype.clearSwap = function() {
  this.setSwap(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.project.GetProjectWithSwapResponse.prototype.hasSwap = function() {
  return jspb.Message.getField(this, 2) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * FormField names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.project.GetProjectsWithSwapResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.project.GetProjectsWithSwapResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.project.GetProjectsWithSwapResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.project.GetProjectsWithSwapResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    projectsMap: (f = msg.getProjectsMap()) ? f.toObject(includeInstance, proto.model.Project.toObject) : [],
    swapsMap: (f = msg.getSwapsMap()) ? f.toObject(includeInstance, proto.model.Project.toObject) : []
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.project.GetProjectsWithSwapResponse}
 */
proto.project.GetProjectsWithSwapResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.project.GetProjectsWithSwapResponse;
  return proto.project.GetProjectsWithSwapResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.project.GetProjectsWithSwapResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.project.GetProjectsWithSwapResponse}
 */
proto.project.GetProjectsWithSwapResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = msg.getProjectsMap();
      reader.readMessage(value, function(message, reader) {
        jspb.Map.deserializeBinary(message, reader, jspb.BinaryReader.prototype.readString, jspb.BinaryReader.prototype.readMessage, proto.model.Project.deserializeBinaryFromReader, "");
         });
      break;
    case 2:
      var value = msg.getSwapsMap();
      reader.readMessage(value, function(message, reader) {
        jspb.Map.deserializeBinary(message, reader, jspb.BinaryReader.prototype.readString, jspb.BinaryReader.prototype.readMessage, proto.model.Project.deserializeBinaryFromReader, "");
         });
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.project.GetProjectsWithSwapResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.project.GetProjectsWithSwapResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.project.GetProjectsWithSwapResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.project.GetProjectsWithSwapResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getProjectsMap(true);
  if (f && f.getLength() > 0) {
    f.serializeBinary(1, writer, jspb.BinaryWriter.prototype.writeString, jspb.BinaryWriter.prototype.writeMessage, proto.model.Project.serializeBinaryToWriter);
  }
  f = message.getSwapsMap(true);
  if (f && f.getLength() > 0) {
    f.serializeBinary(2, writer, jspb.BinaryWriter.prototype.writeString, jspb.BinaryWriter.prototype.writeMessage, proto.model.Project.serializeBinaryToWriter);
  }
};


/**
 * map<string, model.Project> projects = 1;
 * @param {boolean=} opt_noLazyCreate Do not create the map if
 * empty, instead returning `undefined`
 * @return {!jspb.Map<string,!proto.model.Project>}
 */
proto.project.GetProjectsWithSwapResponse.prototype.getProjectsMap = function(opt_noLazyCreate) {
  return /** @type {!jspb.Map<string,!proto.model.Project>} */ (
      jspb.Message.getMapField(this, 1, opt_noLazyCreate,
      proto.model.Project));
};


/**
 * Clears values from the map. The map will be non-null.
 */
proto.project.GetProjectsWithSwapResponse.prototype.clearProjectsMap = function() {
  this.getProjectsMap().clear();
};


/**
 * map<string, model.Project> swaps = 2;
 * @param {boolean=} opt_noLazyCreate Do not create the map if
 * empty, instead returning `undefined`
 * @return {!jspb.Map<string,!proto.model.Project>}
 */
proto.project.GetProjectsWithSwapResponse.prototype.getSwapsMap = function(opt_noLazyCreate) {
  return /** @type {!jspb.Map<string,!proto.model.Project>} */ (
      jspb.Message.getMapField(this, 2, opt_noLazyCreate,
      proto.model.Project));
};


/**
 * Clears values from the map. The map will be non-null.
 */
proto.project.GetProjectsWithSwapResponse.prototype.clearSwapsMap = function() {
  this.getSwapsMap().clear();
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * FormField names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.project.UpdateProjectRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.project.UpdateProjectRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.project.UpdateProjectRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.project.UpdateProjectRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    projectid: jspb.Message.getFieldWithDefault(msg, 1, ""),
    project: (f = msg.getProject()) && model_project_pb.Project.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.project.UpdateProjectRequest}
 */
proto.project.UpdateProjectRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.project.UpdateProjectRequest;
  return proto.project.UpdateProjectRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.project.UpdateProjectRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.project.UpdateProjectRequest}
 */
proto.project.UpdateProjectRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setProjectid(value);
      break;
    case 2:
      var value = new model_project_pb.Project;
      reader.readMessage(value,model_project_pb.Project.deserializeBinaryFromReader);
      msg.setProject(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.project.UpdateProjectRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.project.UpdateProjectRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.project.UpdateProjectRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.project.UpdateProjectRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getProjectid();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getProject();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      model_project_pb.Project.serializeBinaryToWriter
    );
  }
};


/**
 * optional string projectID = 1;
 * @return {string}
 */
proto.project.UpdateProjectRequest.prototype.getProjectid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/** @param {string} value */
proto.project.UpdateProjectRequest.prototype.setProjectid = function(value) {
  jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional model.Project project = 2;
 * @return {?proto.model.Project}
 */
proto.project.UpdateProjectRequest.prototype.getProject = function() {
  return /** @type{?proto.model.Project} */ (
    jspb.Message.getWrapperField(this, model_project_pb.Project, 2));
};


/** @param {?proto.model.Project|undefined} value */
proto.project.UpdateProjectRequest.prototype.setProject = function(value) {
  jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 */
proto.project.UpdateProjectRequest.prototype.clearProject = function() {
  this.setProject(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.project.UpdateProjectRequest.prototype.hasProject = function() {
  return jspb.Message.getField(this, 2) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * FormField names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.project.UpdateOriginalProjectAndRemoveSwapRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.project.UpdateOriginalProjectAndRemoveSwapRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.project.UpdateOriginalProjectAndRemoveSwapRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.project.UpdateOriginalProjectAndRemoveSwapRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    projectid: jspb.Message.getFieldWithDefault(msg, 1, ""),
    project: (f = msg.getProject()) && model_project_pb.Project.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.project.UpdateOriginalProjectAndRemoveSwapRequest}
 */
proto.project.UpdateOriginalProjectAndRemoveSwapRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.project.UpdateOriginalProjectAndRemoveSwapRequest;
  return proto.project.UpdateOriginalProjectAndRemoveSwapRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.project.UpdateOriginalProjectAndRemoveSwapRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.project.UpdateOriginalProjectAndRemoveSwapRequest}
 */
proto.project.UpdateOriginalProjectAndRemoveSwapRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setProjectid(value);
      break;
    case 2:
      var value = new model_project_pb.Project;
      reader.readMessage(value,model_project_pb.Project.deserializeBinaryFromReader);
      msg.setProject(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.project.UpdateOriginalProjectAndRemoveSwapRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.project.UpdateOriginalProjectAndRemoveSwapRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.project.UpdateOriginalProjectAndRemoveSwapRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.project.UpdateOriginalProjectAndRemoveSwapRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getProjectid();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getProject();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      model_project_pb.Project.serializeBinaryToWriter
    );
  }
};


/**
 * optional string projectID = 1;
 * @return {string}
 */
proto.project.UpdateOriginalProjectAndRemoveSwapRequest.prototype.getProjectid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/** @param {string} value */
proto.project.UpdateOriginalProjectAndRemoveSwapRequest.prototype.setProjectid = function(value) {
  jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional model.Project project = 2;
 * @return {?proto.model.Project}
 */
proto.project.UpdateOriginalProjectAndRemoveSwapRequest.prototype.getProject = function() {
  return /** @type{?proto.model.Project} */ (
    jspb.Message.getWrapperField(this, model_project_pb.Project, 2));
};


/** @param {?proto.model.Project|undefined} value */
proto.project.UpdateOriginalProjectAndRemoveSwapRequest.prototype.setProject = function(value) {
  jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 */
proto.project.UpdateOriginalProjectAndRemoveSwapRequest.prototype.clearProject = function() {
  this.setProject(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.project.UpdateOriginalProjectAndRemoveSwapRequest.prototype.hasProject = function() {
  return jspb.Message.getField(this, 2) != null;
};


goog.object.extend(exports, proto.project);
