/* eslint-disable */
// package: project
// file: rpc/project/project.proto

var rpc_project_project_pb = require("../../rpc/project/project_pb");
var rpc_common_response_pb = require("../../rpc/common/response_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var ProjectService = (function () {
  function ProjectService() {}
  ProjectService.serviceName = "project.ProjectService";
  return ProjectService;
}());

ProjectService.create = {
  methodName: "create",
  service: ProjectService,
  requestStream: false,
  responseStream: false,
  requestType: rpc_project_project_pb.CreateProjectRequest,
  responseType: rpc_common_response_pb.GeneralServiceResponse
};

exports.ProjectService = ProjectService;

function ProjectServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

ProjectServiceClient.prototype.create = function create(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(ProjectService.create, {
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

exports.ProjectServiceClient = ProjectServiceClient;

