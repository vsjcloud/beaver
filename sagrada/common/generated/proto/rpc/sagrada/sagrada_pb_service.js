/* eslint-disable */
// package: sagrada
// file: rpc/sagrada/sagrada.proto

var rpc_sagrada_sagrada_pb = require("../../rpc/sagrada/sagrada_pb");
var google_protobuf_empty_pb = require("google-protobuf/google/protobuf/empty_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var SagradaService = (function () {
  function SagradaService() {}
  SagradaService.serviceName = "sagrada.SagradaService";
  return SagradaService;
}());

SagradaService.getProjectDirectoryPageProps = {
  methodName: "getProjectDirectoryPageProps",
  service: SagradaService,
  requestStream: false,
  responseStream: false,
  requestType: google_protobuf_empty_pb.Empty,
  responseType: rpc_sagrada_sagrada_pb.GetProjectDirectoryPagePropsResponse
};

SagradaService.getProjectPageProps = {
  methodName: "getProjectPageProps",
  service: SagradaService,
  requestStream: false,
  responseStream: false,
  requestType: rpc_sagrada_sagrada_pb.GetProjectPagePropsRequest,
  responseType: rpc_sagrada_sagrada_pb.GetProjectPagePropsResponse
};

exports.SagradaService = SagradaService;

function SagradaServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

SagradaServiceClient.prototype.getProjectDirectoryPageProps = function getProjectDirectoryPageProps(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(SagradaService.getProjectDirectoryPageProps, {
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

SagradaServiceClient.prototype.getProjectPageProps = function getProjectPageProps(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(SagradaService.getProjectPageProps, {
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

exports.SagradaServiceClient = SagradaServiceClient;

