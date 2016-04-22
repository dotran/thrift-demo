//
// Autogenerated by Thrift Compiler (0.9.3)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
var thrift = require('thrift');
var Thrift = thrift.Thrift;
var Q = thrift.Q;


var ttypes = require('./report_types');
//HELPER FUNCTIONS AND STRUCTURES

Report_tasksPdf_args = function(args) {
  this.userId = null;
  if (args) {
    if (args.userId !== undefined && args.userId !== null) {
      this.userId = args.userId;
    }
  }
};
Report_tasksPdf_args.prototype = {};
Report_tasksPdf_args.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.STRING) {
        this.userId = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 0:
        input.skip(ftype);
        break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

Report_tasksPdf_args.prototype.write = function(output) {
  output.writeStructBegin('Report_tasksPdf_args');
  if (this.userId !== null && this.userId !== undefined) {
    output.writeFieldBegin('userId', Thrift.Type.STRING, 1);
    output.writeString(this.userId);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

Report_tasksPdf_result = function(args) {
  this.success = null;
  if (args) {
    if (args.success !== undefined && args.success !== null) {
      this.success = args.success;
    }
  }
};
Report_tasksPdf_result.prototype = {};
Report_tasksPdf_result.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 0:
      if (ftype == Thrift.Type.STRING) {
        this.success = input.readBinary();
      } else {
        input.skip(ftype);
      }
      break;
      case 0:
        input.skip(ftype);
        break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

Report_tasksPdf_result.prototype.write = function(output) {
  output.writeStructBegin('Report_tasksPdf_result');
  if (this.success !== null && this.success !== undefined) {
    output.writeFieldBegin('success', Thrift.Type.STRING, 0);
    output.writeBinary(this.success);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

ReportClient = exports.Client = function(output, pClass) {
    this.output = output;
    this.pClass = pClass;
    this._seqid = 0;
    this._reqs = {};
};
ReportClient.prototype = {};
ReportClient.prototype.seqid = function() { return this._seqid; }
ReportClient.prototype.new_seqid = function() { return this._seqid += 1; }
ReportClient.prototype.tasksPdf = function(userId, callback) {
  this._seqid = this.new_seqid();
  if (callback === undefined) {
    var _defer = Q.defer();
    this._reqs[this.seqid()] = function(error, result) {
      if (error) {
        _defer.reject(error);
      } else {
        _defer.resolve(result);
      }
    };
    this.send_tasksPdf(userId);
    return _defer.promise;
  } else {
    this._reqs[this.seqid()] = callback;
    this.send_tasksPdf(userId);
  }
};

ReportClient.prototype.send_tasksPdf = function(userId) {
  var output = new this.pClass(this.output);
  output.writeMessageBegin('tasksPdf', Thrift.MessageType.CALL, this.seqid());
  var args = new Report_tasksPdf_args();
  args.userId = userId;
  args.write(output);
  output.writeMessageEnd();
  return this.output.flush();
};

ReportClient.prototype.recv_tasksPdf = function(input,mtype,rseqid) {
  var callback = this._reqs[rseqid] || function() {};
  delete this._reqs[rseqid];
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(input);
    input.readMessageEnd();
    return callback(x);
  }
  var result = new Report_tasksPdf_result();
  result.read(input);
  input.readMessageEnd();

  if (null !== result.success) {
    return callback(null, result.success);
  }
  return callback('tasksPdf failed: unknown result');
};
ReportProcessor = exports.Processor = function(handler) {
  this._handler = handler
}
ReportProcessor.prototype.process = function(input, output) {
  var r = input.readMessageBegin();
  if (this['process_' + r.fname]) {
    return this['process_' + r.fname].call(this, r.rseqid, input, output);
  } else {
    input.skip(Thrift.Type.STRUCT);
    input.readMessageEnd();
    var x = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN_METHOD, 'Unknown function ' + r.fname);
    output.writeMessageBegin(r.fname, Thrift.MessageType.EXCEPTION, r.rseqid);
    x.write(output);
    output.writeMessageEnd();
    output.flush();
  }
}

ReportProcessor.prototype.process_tasksPdf = function(seqid, input, output) {
  var args = new Report_tasksPdf_args();
  args.read(input);
  input.readMessageEnd();
  if (this._handler.tasksPdf.length === 1) {
    Q.fcall(this._handler.tasksPdf, args.userId)
      .then(function(result) {
        var result = new Report_tasksPdf_result({success: result});
        output.writeMessageBegin("tasksPdf", Thrift.MessageType.REPLY, seqid);
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      }, function (err) {
        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
        output.writeMessageBegin("tasksPdf", Thrift.MessageType.EXCEPTION, seqid);
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      });
  } else {
    this._handler.tasksPdf(args.userId, function (err, result) {
      if (err == null) {
        var result = new Report_tasksPdf_result((err != null ? err : {success: result}));
        output.writeMessageBegin("tasksPdf", Thrift.MessageType.REPLY, seqid);
      } else {
        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
        output.writeMessageBegin("tasksPdf", Thrift.MessageType.EXCEPTION, seqid);
      }
      result.write(output);
      output.writeMessageEnd();
      output.flush();
    });
  }
}

