logger = {
  lang: _K,
  icon: '',
  levelColor: {
    info: '',
    error: '#FF0000',
    warn: '#909399',
  },
  webEvent: false,
  basInfoOn: true,
  threadName: (_K === 'ru' ? ' Поток №' : ' Thread #') + thread_number(),
  lastId: null,
  _SuccessOrig: ScriptWorker.Success,
  _FaillOrig: ScriptWorker.Fail,
  _FailInternalOrig: ScriptWorker.FailInternal,
  _FailUserOrig: ScriptWorker.FailUser,
  _DieOrig: ScriptWorker.Die,
  _DieInternalOrig: ScriptWorker.DieInternal,
  _SetFailMessageOrig: ScriptWorker.SetFailMessage,
  _InfoOrig: ScriptWorker.Info,

  setDefaultSettings: function (obj) {
    var lang = obj['lang'].toLowerCase();

    if (lang !== 'auto') {
      this.lang = lang;
    }

    this.icon = obj['icon'];
    this.setLevelColor(obj['color']);
    this.webEvent = obj['webEvent'] === 'true';
    this.basInfoOn = obj['basInfoOn'] === 'true';
    this.output = obj.output;

    if (obj.logFile !== 'default') {
      Logger.SetFileName(this.logFile);
    }

    if (obj.output == 'only display') {
      Logger.SetFileName(null);
    }

    this.eventInterceptor();
    this.threadName =
      obj['thread_name'] !== ''
        ? obj['thread_name']
        : (lang === 'ru' ? ' Поток №' : ' Thread#') + thread_number();
  },

  log: function (obj) {
    var logData = new this.CreateLogData(obj, {
      level: obj['level'],
      color:
        obj['color'] !== ''
          ? this.getColorCode(obj['color'])
          : this.levelColor[obj['level']],
    });

    if (this.webEvent) {
      this.emit(logData);
    }

    switch (this.output) {
      case 'only display': {
        log_html(this.getHTML(logData));
        break;
      }
      case 'only file': {
        log_html('', this.getText(logData));
        break;
      }
      case 'none': {
        log_html('', '');
        break;
      }
      default: {
        log_html(this.getHTML(logData), this.getText(logData));
      }
    }
  },

  result: function (obj) {
    var logData = new this.CreateLogData(obj, {
      level: 'result',
      color: this.getColorCode(obj['color']),
      tab: obj['number'] || 1,
    });

    if (this.webEvent) {
      this.emit(logData);
    }

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
      level: 'fail',
      color: '#d90000',
    });

    die(logData.text, obj['instantly'], logData);
  },

  fail: function (obj) {
    var logData = new this.CreateLogData(obj, {
      level: 'fail',
      color: '#d90000',
    });

    fail(logData.text, obj['stop'], logData);
  },

  success: function (obj) {
    var logData = new this.CreateLogData(obj, {
      level: 'success',
      color: '#00dd2d',
    });

    success(logData.text, logData);
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

        if (!self.basInfoOn && method === '_InfoOrig') {
          return;
        }

        if (self.webEvent) {
          self.emit(logData);
        }

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

    for (key in options) {
      if (options.hasOwnProperty(key)) {
        this[key] = options[key];
      }
    }
  },

  getHTML: function (data) {
    var html = '';
    html +=
      '<a style="color:#808080;" href="action://action' +
      data.action_id +
      '">' +
      this.formatId(data.action_id) +
      '</a>';

    html += '<span style="color:' + data.color + ';">';

    html += ' ' + this.getFormattedTime(data.date);

    html += ' ' + data.thread_name + ' : ';

    if (this.icon) {
      html +=
        ' <img style="vertical-align: middle;" src="data:image/png;base64,' +
        this.icon +
        '"/> ';
    }

    html += data.text;
    html += '</span>';
    return html;
  },

  getText: function (data) {
    var text = '';
    text += this.formatId(data.action_id);
    text += this.getFormattedTime(data.date);
    return text + data.thread_name + ': ' + data.text;
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

logger_settings = logger.setDefaultSettings.bind(logger);
logger_result = logger.result.bind(logger);
logger_log = logger.log.bind(logger);
logger_fail = logger.fail.bind(logger);
logger_die = logger.die.bind(logger);
logger_success = logger.success.bind(logger);
