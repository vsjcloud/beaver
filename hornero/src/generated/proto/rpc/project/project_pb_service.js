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

ProjectService.createProject = {
  methodName: "createProject",
  service: ProjectService,
  requestStream: false,
  responseStream: false,
  requestType: google_protobuf_empty_pb.Empty,
  responseType: rpc_project_project_pb.CreateProjectResponse
};

ProjectService.getProjectTags = {
  methodName: "getProjectTags",
  service: ProjectService,
  requestStream: false,
  responseStream: false,
  requestType: google_protobuf_empty_pb.Empty,
  responseType: rpc_project_project_pb.GetProjectTagsResponse
};

ProjectService.createProjectTag = {
  methodName: "createProjectTag",
  service: ProjectService,
  requestStream: false,
  responseStream: false,
  requestType: rpc_project_project_pb.CreateProjectTagRequest,
  responseType: rpc_project_project_pb.CreateProjectTagResponse
};

ProjectService.updateProjectTag = {
  methodName: "updateProjectTag",
  service: ProjectService,
  requestStream: false,
  responseStream: false,
  requestType: rpc_project_project_pb.UpdateProjectTagRequest,
  responseType: rpc_common_response_pb.GeneralServiceResponse
};

ProjectService.archiveProjectTag = {
  methodName: "archiveProjectTag",
  service: ProjectService,
  requestStream: false,
  responseStream: false,
  requestType: rpc_project_project_pb.ArchiveProjectTagRequest,
  responseType: rpc_common_response_pb.GeneralServiceResponse
};

ProjectService.recoverProjectTag = {
  methodName: "recoverProjectTag",
  service: ProjectService,
  requestStream: false,
  responseStream: false,
  requestType: rpc_project_project_pb.RecoverProjectTagRequest,
  responseType: rpc_common_response_pb.GeneralServiceResponse
};

ProjectService.getProjectWithSwap = {
  methodName: "getProjectWithSwap",
  service: ProjectService,
  requestStream: false,
  responseStream: false,
  requestType: rpc_project_project_pb.GetProjectWithSwapRequest,
  responseType: rpc_project_project_pb.GetProjectWithSwapResponse
};

ProjectService.getProjectsWithSwap = {
  methodName: "getProjectsWithSwap",
  service: ProjectService,
  requestStream: false,
  responseStream: false,
  requestType: google_protobuf_empty_pb.Empty,
  responseType: rpc_project_project_pb.GetProjectsWithSwapResponse
};

ProjectService.updateProjectSwap = {
  methodName: "updateProjectSwap",
  service: ProjectService,
  requestStream: false,
  responseStream: false,
  requestType: rpc_project_project_pb.UpdateProjectSwapRequest,
  responseType: rpc_common_response_pb.GeneralServiceResponse
};

ProjectService.deleteProjectSwap = {
  methodName: "deleteProjectSwap",
  service: ProjectService,
  requestStream: false,
  responseStream: false,
  requestType: rpc_project_project_pb.DeleteProjectSwapRequest,
  responseType: rpc_common_response_pb.GeneralServiceResponse
};

ProjectService.updateProjectAndRemoveSwap = {
  methodName: "updateProjectAndRemoveSwap",
  service: ProjectService,
  requestStream: false,
  responseStream: false,
  requestType: rpc_project_project_pb.UpdateProjectAndRemoveSwapRequest,
  responseType: rpc_common_response_pb.GeneralServiceResponse
};

ProjectService.archiveProject = {
  methodName: "archiveProject",
  service: ProjectService,
  requestStream: false,
  responseStream: false,
  requestType: rpc_project_project_pb.ArchiveProjectRequest,
  responseType: rpc_common_response_pb.GeneralServiceResponse
};

ProjectService.recoverProject = {
  methodName: "recoverProject",
  service: ProjectService,
  requestStream: false,
  responseStream: false,
  requestType: rpc_project_project_pb.RecoverProjectRequest,
  responseType: rpc_common_response_pb.GeneralServiceResponse
};

exports.ProjectService = ProjectService;

function ProjectServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

ProjectServiceClient.prototype.createProject = function createProject(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(ProjectService.createProject, {
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

ProjectServiceClient.prototype.getProjectTags = function getProjectTags(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(ProjectService.getProjectTags, {
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

ProjectServiceClient.prototype.createProjectTag = function createProjectTag(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(ProjectService.createProjectTag, {
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

ProjectServiceClient.prototype.updateProjectTag = function updateProjectTag(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(ProjectService.updateProjectTag, {
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

ProjectServiceClient.prototype.archiveProjectTag = function archiveProjectTag(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(ProjectService.archiveProjectTag, {
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

ProjectServiceClient.prototype.recoverProjectTag = function recoverProjectTag(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(ProjectService.recoverProjectTag, {
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

ProjectServiceClient.prototype.getProjectWithSwap = function getProjectWithSwap(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(ProjectService.getProjectWithSwap, {
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

ProjectServiceClient.prototype.getProjectsWithSwap = function getProjectsWithSwap(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(ProjectService.getProjectsWithSwap, {
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

ProjectServiceClient.prototype.updateProjectSwap = function updateProjectSwap(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(ProjectService.updateProjectSwap, {
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

ProjectServiceClient.prototype.deleteProjectSwap = function deleteProjectSwap(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(ProjectService.deleteProjectSwap, {
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

ProjectServiceClient.prototype.updateProjectAndRemoveSwap = function updateProjectAndRemoveSwap(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(ProjectService.updateProjectAndRemoveSwap, {
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

ProjectServiceClient.prototype.archiveProject = function archiveProject(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(ProjectService.archiveProject, {
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

ProjectServiceClient.prototype.recoverProject = function recoverProject(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(ProjectService.recoverProject, {
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

