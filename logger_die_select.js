var ru = GetInputConstructorValue("ru", loader);
var en = GetInputConstructorValue("en", loader);
var instantly = $("#Check").is(':checked')

try{
  var code = loader.GetAdditionalData() + _.template($("#logger_die_code").html())({
    "ru": ru["updated"],
    "en": en["updated"],
    "instantly": instantly
  });
  code = Normalize(code,0);
  BrowserAutomationStudio_Append("", BrowserAutomationStudio_SaveControls() + code, action, DisableIfAdd);
}catch(e)
{}
