var error =       GetInputConstructorValue("error", loader);
var info =        GetInputConstructorValue("info", loader);
var warn =        GetInputConstructorValue("warn", loader);
var icon =        GetInputConstructorValue("icon", loader);
var basInfoOn =     GetInputConstructorValue("basInfoOn", loader);
var lang =        GetInputConstructorValue("lang", loader);
var webEvent =    GetInputConstructorValue("webEvent", loader);
var thread_name = GetInputConstructorValue("thread_name", loader);
try{
    var code = loader.GetAdditionalData() + _.template($("#logger_settings_code").html())({
        "error":        error["updated"],
        "info":         info["updated"],
        "warn":         warn["updated"],
        "lang":         lang["updated"],
        "icon":         icon["updated"],
        "webEvent":     webEvent["updated"],
        "thread_name":  thread_name["updated"],
        "basInfoOn":      basInfoOn["updated"],
      });
    code = Normalize(code,0);
    BrowserAutomationStudio_Append("", BrowserAutomationStudio_SaveControls() + code, action, DisableIfAdd);
  }catch(e)
  {}
