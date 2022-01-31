var ru = GetInputConstructorValue("ru", loader);
var en = GetInputConstructorValue("en", loader);
var stop = $("#Check").is(':checked')

try{
  var code = loader.GetAdditionalData() + _.template($("#logger_fail_code").html())({
    "ru": ru["updated"],
    "en": en["updated"],
    "stop": stop
  });
  code = Normalize(code,0);
  BrowserAutomationStudio_Append("", BrowserAutomationStudio_SaveControls() + code, action, DisableIfAdd);
}catch(e)
{}
