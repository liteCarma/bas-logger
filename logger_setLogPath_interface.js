<div class="container-fluid">
    <%= _.template($('#input_constructor').html())({
        id:"logFile",
        description: tr("Path for the log file"),
        default_selector: "string",
        value_string: "",
        disable_int: true,
        help: {description: tr('Path for the log file')} }) 
    %>
</div>
<div class="tooltipinternal">
    <div class="tr tooltip-paragraph-first-fold">Path for the log file</div>
    <div class="tr tooltip-paragraph-last-fold"><b>It is not recommended to use this action.</b>It allows you to change the logging path, if set to null the log will not be saved. This action should be used before the main threads start, e.g. in the onApplicationStart function</div>
</div>
<%= _.template($('#back').html())({action:"executeandadd", visible:true}) %>
