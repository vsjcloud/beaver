/* eslint-disable */
// package: project
// file: rpc/project/project.proto

var rpc_project_project_pb = require("../../rpc/project/project_pb");
var google_protobuf_empty_pb = require("google-protobuf/google/protobuf/empty_pb");
var rpc_common_response_pb = require("../../rpc/common/response_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var ProjectService = (function () {
  function ProjectService() {}
  ProjectService.serviceName = "project.ProjectService";
  return ProjectService;
}());

ProjectService.createEmptyProjectWithSwap = {
  methodName: "createEmptyProjectWithSwap",
  service: ProjectService,
  requestStream: false,
  responseStream: false,
  requestType: google_protobuf_empty_pb.Empty,
  responseType: rpc_project_project_pb.CreateEmptyProjectWithSwapResponse
};

ProjectService.getProject = {
  methodName: "getProject",
  service: ProjectService,
  requestStream: false,
  responseStream: false,
  requestType: rpc_project_project_pb.GetProjectRequest,
  responseType: rpc_project_project_pb.GetProjectResponse
};

ProjectService.getProjects = {
  methodName: "getProjects",
  service: ProjectService,
  requestStream: false,
  responseStream: false,
  requestType: google_protobuf_empty_pb.Empty,
  responseType: rpc_project_project_pb.GetProjectsResponse
};

ProjectService.updateProject = {
  methodName: "updateProject",
  service: ProjectService,
  requestStream: false,
  responseStream: false,
  requestType: rpc_project_project_pb.UpdateProjectRequest,
  responseType: rpc_common_response_pb.GeneralServiceResponse
};

ProjectService.updateOriginalProjectAndRemoveSwap = {
  methodName: "updateOriginalProjectAndRemoveSwap",
  service: ProjectService,
  requestStream: false,
  responseStream: false,
  requestType: rpc_project_project_pb.UpdateOriginalProjectAndRemoveSwapRequest,
  responseType: rpc_common_response_pb.GeneralServiceResponse
};

exports.ProjectService = ProjectService;

function ProjectServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

ProjectServiceClient.prototype.createEmptyProjectWithSwap = function createEmptyProjectWithSwap(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(ProjectService.createEmptyProjectWithSwap, {
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

ProjectServiceClient.prototype.getProject = function getProject(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(ProjectService.getProject, {
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

ProjectServiceClient.prototype.getProjects = function getProjects(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(ProjectService.getProjects, {
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

ProjectServiceClient.prototype.updateProject = function updateProject(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(ProjectService.updateProject, {
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

ProjectServiceClient.prototype.updateOriginalProjectAndRemoveSwap = function updateOriginalProjectAndRemoveSwap(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(ProjectService.updateOriginalProjectAndRemoveSwap, {
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

