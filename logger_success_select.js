var ru = GetInputConstructorValue("ru", loader);
var en = GetInputConstructorValue("en", loader);
try{
  var code = loader.GetAdditionalData() + _.template($("#logger_success_code").html())({
    "ru": ru["updated"],
    "en": en["updated"]
  });
  code = Normalize(code,0);
  BrowserAutomationStudio_Append("", BrowserAutomationStudio_SaveControls() + code, action, DisableIfAdd);
}catch(e)
{}
