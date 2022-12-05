var ru = GetInputConstructorValue('ru', loader);
var en = GetInputConstructorValue('en', loader);
var level = GetInputConstructorValue('level', loader);
var color = GetInputConstructorValue('color', loader);

try {
  var code =
    loader.GetAdditionalData() +
    _.template($('#logger_log_code').html())({
      ru: ru['updated'],
      en: en['updated'],
      level: level['updated'],
      color: color['updated'],
    });
  code = Normalize(code, 0);
  BrowserAutomationStudio_Append(
    '',
    BrowserAutomationStudio_SaveControls() + code,
    action,
    DisableIfAdd
  );
} catch (e) {}
