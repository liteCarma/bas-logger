var logFile = GetInputConstructorValue('logFile', loader);

try {
  var code =
    loader.GetAdditionalData() +
    _.template($('#logger_setLogPath_code').html())({
      logFile: logFile['updated'],
    });
  code = Normalize(code, 0);
  BrowserAutomationStudio_Append(
    '',
    BrowserAutomationStudio_SaveControls() + code,
    action,
    DisableIfAdd
  );
} catch (e) {}
