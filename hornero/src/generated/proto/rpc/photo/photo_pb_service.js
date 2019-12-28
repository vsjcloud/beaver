/* eslint-disable */
// package: photo
// file: rpc/photo/photo.proto

var rpc_photo_photo_pb = require("../../rpc/photo/photo_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var PhotoService = (function () {
  function PhotoService() {}
  PhotoService.serviceName = "photo.PhotoService";
  return PhotoService;
}());

PhotoService.getPhoto = {
  methodName: "getPhoto",
  service: PhotoService,
  requestStream: false,
  responseStream: false,
  requestType: rpc_photo_photo_pb.GetPhotoRequest,
  responseType: rpc_photo_photo_pb.GetPhotoResponse
};

PhotoService.bulkGetPhotos = {
  methodName: "bulkGetPhotos",
  service: PhotoService,
  requestStream: false,
  responseStream: false,
  requestType: rpc_photo_photo_pb.BulkGetPhotosRequest,
  responseType: rpc_photo_photo_pb.BulkGetPhotosResponse
};

exports.PhotoService = PhotoService;

function PhotoServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

PhotoServiceClient.prototype.getPhoto = function getPhoto(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(PhotoService.getPhoto, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

PhotoServiceClient.prototype.bulkGetPhotos = function bulkGetPhotos(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(PhotoService.bulkGetPhotos, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

exports.PhotoServiceClient = PhotoServiceClient;

