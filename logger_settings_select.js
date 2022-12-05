var sendWebEvent = $('#sendWebEvent').is(':checked');
var showWarnAlerts = $('#showWarnAlerts').is(':checked');
var showThreadName = $('#showThreadName').is(':checked');
var showActionID = $('#showActionID').is(':checked');
var showDate = $('#showDate').is(':checked');

var threadName = GetInputConstructorValue('threadName', loader);
var lang = GetInputConstructorValue('lang', loader);
var info = GetInputConstructorValue('info', loader);
var error = GetInputConstructorValue('error', loader);
var warn = GetInputConstructorValue('warn', loader);
var icon = GetInputConstructorValue('icon', loader);

try {
  var code =
    loader.GetAdditionalData() +
    _.template($('#logger_settings_code').html())({
      options: JSON.stringify({
        error: error['original'],
        info: info['original'],
        warn: warn['original'],
        lang: lang['original'],
        icon: icon['original'],
        threadName: threadName['original'],
        sendWebEvent: sendWebEvent,
        showWarnAlerts: showWarnAlerts,
        showThreadName: showThreadName,
        showActionID: showActionID,
        showDate: showDate,
      }),
    });
  code = Normalize(code, 0);
  BrowserAutomationStudio_Append(
    '',
    BrowserAutomationStudio_SaveControls() + code,
    action,
    DisableIfAdd
  );
} catch (e) {}
