logger = {
  _SuccessOrig: ScriptWorker.Success,
  _FaillOrig: ScriptWorker.Fail,
  _FailInternalOrig: ScriptWorker.FailInternal,
  _FailUserOrig: ScriptWorker.FailUser,
  _DieOrig: ScriptWorker.Die,
  _DieInternalOrig: ScriptWorker.DieInternal,
  _SetFailMessageOrig: ScriptWorker.SetFailMessage,
  _InfoOrig: ScriptWorker.Info,
  setDefaultSettings: function () {
    this.lang = _K;
    this.icon = '';
    (this.levelColor = {
      info: '',
      error: '#FF0000',
      warn: '#909399',
    }),
      (this.threadName =
        (_K === 'ru' ? 'Поток №' : 'Thread #') + thread_number());
    this.sendWebEvent = false;
    this.showWarnAlerts = true;
    this.showThreadName = true;
    this.showDate = true;
    this.showActionID = true;
    this.lastId = null;
  },
  setSettings: function (options) {
    this.setDefaultSettings();
    var lang = options.lang.toLowerCase();

    if (lang !== 'auto') {
      this.lang = lang;
    }

    this.icon = options.icon;
    this.sendWebEvent = options.sendWebEvent;
    this.showWarnAlerts = options.showWarnAlerts;
    this.showThreadName = options.showThreadName;
    this.showActionID = options.showActionID;
    this.showDate = options.showDate;

    if (options.threadName !== '') {
      this.threadName = options.threadName;
    }

    this.setLevelColor(options.color);
    this.eventInterceptor();
  },

  log: function (obj) {
    var logData = new this.CreateLogData(obj, {
      level: obj['level'],
      color:
        obj['color'] !== ''
          ? this.getColorCode(obj['color'])
          : this.levelColor[obj['level']],
    });

    this.emit(logData);

    log_html(this.getHTML(logData), this.getText(logData));
  },

  result: function (obj) {
    var logData = new this.CreateLogData(obj, {
      level: 'result',
      color: this.getColorCode(obj['color']),
      tab: obj['number'] || 1,
    });

    this.emit(logData);

    if (obj['formatAsLog'] === 'true') {
      result_html(
        this.getHTML(logData),
        this.getText(logData),
        logData.tab - 1
      );
    } else {
      result(logData.text, logData.tab - 1);
    }
  },

  die: function (obj) {
    var logData = new this.CreateLogData(obj, {
      level: 'die',
      color: '#d90000',
    });

    ScriptWorker.Die(logData.text, obj['instantly'], logData);
  },

  fail: function (obj) {
    var logData = new this.CreateLogData(obj, {
      level: 'fail',
      color: '#d90000',
    });

    ScriptWorker.FailUser(logData.text, obj['stop'], logData);
  },

  success: function (obj) {
    var logData = new this.CreateLogData(obj, {
      level: 'success',
      color: '#00dd2d',
    });
    ScriptWorker.Success(logData.text, logData);
  },
  setLogPath: function (obj) {
    if (obj.logFile === '') return;
    var path = obj.logFile === 'null' ? null : obj.logFile;
    Logger.SetFileName(path);
  },
  eventInterceptor: function () {
    var self = this;
    var wrapper = function (context, method, level) {
      return function () {
        var message = arguments[0];
        var logData = arguments[arguments.length - 1];
        if (!(logData instanceof self.CreateLogData)) {
          logData = new self.CreateLogData(
            {
              ru: message,
              en: message,
            },
            {
              level: level,
            }
          );
        }

        if (!self.showWarnAlerts && method === '_InfoOrig') {
          return;
        }

        self.emit(logData);
        self[method].apply(context, arguments);
      };
    };

    ScriptWorker.Success = wrapper(ScriptWorker, '_SuccessOrig', 'success');
    ScriptWorker.Fail = wrapper(ScriptWorker, '_FaillOrig', 'fail');
    ScriptWorker.FailInternal = wrapper(
      ScriptWorker,
      '_FailInternalOrig',
      'fail'
    );
    ScriptWorker.FailUser = wrapper(ScriptWorker, '_FailUserOrig', 'fail');
    ScriptWorker.Die = wrapper(ScriptWorker, '_DieOrig', 'fail');
    ScriptWorker.DieInternal = wrapper(
      ScriptWorker,
      '_DieInternalOrig',
      'fail'
    );
    ScriptWorker.SetFailMessage = wrapper(
      ScriptWorker,
      '_SetFailMessageOrig',
      'fail'
    );
    ScriptWorker.Info = wrapper(ScriptWorker, '_InfoOrig', 'bas_warn');
  },

  CreateLogData: function (data, options) {
    this.thread_name = logger.threadName;
    this.action_id = ScriptWorker.GetCurrentAction();
    this.date = new Date();
    this.text = data[logger.lang];
    this.lang = logger.lang;
    this.ru = data.ru;
    this.en = data.en;
    this.icon = logger.icon;
    this.showWarnAlerts = logger.showWarnAlerts;
    this.showThreadName = logger.showThreadName;
    this.showDate = logger.showDate;
    this.showActionID = logger.showActionID;

    for (key in options) {
      if (options.hasOwnProperty(key)) {
        this[key] = options[key];
      }
    }
  },

  getHTML: function (data) {
    var html = '<div>';

    if (this.showActionID) {
      html +=
        '<a style="color:#808080;" href="action://action' +
        data.action_id +
        '">' +
        this.formatId(data.action_id) +
        '</a>';
    }

    html += '<span style="color:' + data.color + '";>';
    if (this.showDate) {
      html += ' ' + this.getFormattedTime(data.date);
    }
    if (this.showThreadName) {
      html += ' ' + data.thread_name + '</span>';
    }

    if (this.icon) {
      html +=
        '<span> </span><img src="data:image/png;base64,' + this.icon + '"/>';
    }

    var msg =
      this.showActionID || this.showDate || this.showThreadName || this.icon
        ? ': ' + data.text
        : data.text;
    html += '<span style="color:' + data.color + '";>' + msg + '</span>';

    html += '</div>';
    return html;
  },

  getText: function (data) {
    var text = '';
    text += this.formatId(data.action_id);
    text += this.getFormattedTime(data.date);
    return text + ' ' + data.thread_name + ': ' + data.text;
  },

  setLevelColor: function (colors) {
    for (key in colors) {
      this.levelColor[key] = this.getColorCode(colors[key].toLowerCase());
    }
  },

  getColorCode: function (colorName) {
    var value = colorName;
    switch (colorName) {
      case 'red': {
        value = '#FF0000';
        break;
      }
      case 'orange': {
        value = '#ffa500';
        break;
      }
      case 'yellow': {
        value = '#FFFF00';
        break;
      }
      case 'green': {
        value = '#7CFC00';
        break;
      }
      case 'cyan': {
        value = '#00FFFF';
        break;
      }
      case 'blue': {
        value = '#1E90FF';
        break;
      }
      case 'white': {
        value = '#FFF';
        break;
      }
      case 'gray': {
        value = '#909399';
        break;
      }
      case 'black': {
        value = '#000';
        break;
      }
    }

    return value;
  },

  formatId: function (id) {
    var s = '';
    var needS = 9 - id.toString().length;

    for (i = 0; i < needS; i++) {
      s += '_';
    }
    return s + '[' + id + ']';
  },

  emit: function (event) {
    if (!this.sendWebEvent) return;
    _web_interface_eval(
      "Api.Callback('custom-log', " + JSON.stringify(event) + ');'
    );
  },

  getFormattedTime: function (date) {
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    if (h < 10) h = '0' + h;
    if (m < 10) m = '0' + m;
    if (s < 10) s = '0' + s;
    return '[' + h + ':' + m + ':' + s + ']';
  },
};

if (!Function.prototype.bind) {
  Function.prototype.bind = function (context) {
    var savfn = this;
    var savArg = Array.prototype.slice.call(arguments, 1);
    return function () {
      var arg = Array.prototype.slice.call(arguments);
      return savfn.apply(context, savArg.concat(arg));
    };
  };
}
logger.setDefaultSettings();
logger_settings = logger.setSettings.bind(logger);
logger_result = logger.result.bind(logger);
logger_log = logger.log.bind(logger);
logger_fail = logger.fail.bind(logger);
logger_die = logger.die.bind(logger);
logger_success = logger.success.bind(logger);
logger_setLogPath = logger.setLogPath.bind(logger);
