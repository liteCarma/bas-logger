<div class="container-fluid">
    <div class="col-xs-12">
      <span data-preserve="true" data-preserve-type="check" data-preserve-id="sendWebEvent">
        <input type="checkbox" id="sendWebEvent" checked="checked"/>
        <label for="sendWebEvent" class="tr">Send an event to the web interface</label>
      </span>
      <span data-preserve="true" data-preserve-type="check" data-preserve-id="showWarnAlerts">
        <input type="checkbox" id="showWarnAlerts" checked="checked"/>
        <label for="showWarnAlerts" class="tr">Show msg "waiting element"</label>
      </span>
    </div>
   <div class="col-xs-12">
      <span data-preserve="true" data-preserve-type="check" data-preserve-id="showThreadName">
        <input type="checkbox" id="showThreadName" checked="checked"/>
        <label for="showThreadName" class="tr">Show thread name in log</label>
      </span>
      <span data-preserve="true" data-preserve-type="check" data-preserve-id="showActionID">
        <input type="checkbox" id="showActionID" checked="checked"/>
        <label for="showActionID" class="tr">Show action id in the log</label>
      </span>
      <span data-preserve="true" data-preserve-type="check" data-preserve-id="showDate">
        <input type="checkbox" id="showDate" checked="checked"/>
        <label for="showDate" class="tr">Show date in the log</label>
      </span>
    </div>
    <%= _.template($('#input_constructor').html())({
        id: "threadName",
        description: tr("Thread name"),
        default_selector: "string",
        value_string: "",
        help: {description: tr("Thread name")} }) 
    %>
    <%= _.template($('#input_constructor').html())({
        id:"lang",
        description: tr("Languages"),
        default_selector: "string",
        disable_int: true,
        value_string: "auto",
        variants: ["auto", "ru", "en"],
        help: {description: tr("Languages")} }) 
    %>
    <%= _.template($('#input_constructor').html())({
        id:"icon",
        description: "base64 string",
        default_selector: "string",
        disable_int: true,
        value_string: "",
        help: {description: "Icon size 16px, base64 string" }})
    %>
    <%= _.template($('#input_constructor').html())({
        id:"error",
        description:  tr("Error"),
        default_selector: "string",
        disable_int: true,
        value_string: "red",
        variants: [
			'red',
			'orange',
			'yellow',
			'green',
			'cyan',
			'brown',
			'blue',
			'purple',
			'white',
			'gray',
			'black'
        ],
        help: {description: tr('The default color for this log level, in HEX format')} }) 
    %>
    <%= _.template($('#input_constructor').html())({
        id:"info",
        description: tr("Info"),
        default_selector: "string",
        disable_int:true,
        value_string: "",
        variants: [
			'red',
			'orange',
			'yellow',
			'green',
			'cyan',
			'brown',
			'blue',
			'purple',
			'white',
			'gray',
			'black'
        ],
        help: {description: tr('The default color for this log level, in HEX format')} }) 
    %>
    <%= _.template($('#input_constructor').html())({
        id:"warn",
        description: tr("Warn"),
        default_selector: "string",
        disable_int:true,
        value_string: "gray",
        variants: [
			'red',
			'orange',
			'yellow',
			'green',
			'cyan',
			'brown',
			'blue',
			'purple',
			'white',
			'gray',
			'black'
        ],
        help: {description: tr('The default color for this log level, in HEX format')} }) 
    %>
</div>
<div class="tooltipinternal">
    <div class="tr tooltip-paragraph-first-fold">Setup the logger by default</div>
    <div class="tr tooltip-paragraph-fold">Language selection mode "auto" - language depends on the BAS interface language</div>
    <div class="tr tooltip-paragraph-fold">For each log level you can choose the default color, you can also specify your color in HEX format.</div>
    <div class="tr tooltip-paragraph-fold">Recommended icon size 16x16</div>
    <div class="tooltip-paragraph-last-fold">
        <span class="tr">If you enable sending events to the web interface, then the </span>
        <b>"custom-log"</b>
        <span class="tr"> event will be generated in the format:</span>
        <pre>
            { 
              thread_name: 'Thread #1',
              action_id: 146904492,
              date: "2019-10-30T18:46:41.327Z",
              text: "message",
              lang: "en",
              ru: "сообщение",
              en: "message",
              level: 'info',    // info, warn, success, error, fail, die, result
              color: "#ffffff",
              icon: 'base64'
              showThreadName: true,
              showDate: true,
              showActionID: true,
            }
        </pre>
    </div>
</div>
<%= _.template($('#back').html())({action:"executeandadd", visible:true}) %>
