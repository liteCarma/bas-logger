var number = GetInputConstructorValue("number", loader);
var ru = GetInputConstructorValue("ru", loader);
var en = GetInputConstructorValue("en", loader);
var color = GetInputConstructorValue("color", loader);
var formatAsLog = GetInputConstructorValue("formatAsLog", loader);
try{
  var code = loader.GetAdditionalData() + _.template($("#logger_result_code").html())({
    "number": number["updated"],
    "ru": ru["updated"],
    "en": en["updated"],
	"color": color["updated"],
    "formatAsLog": formatAsLog["updated"]
  });
  code = Normalize(code,0);
  BrowserAutomationStudio_Append("", BrowserAutomationStudio_SaveControls() + code, action, DisableIfAdd);
}catch(e)
{}
