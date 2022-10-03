<div class="container-fluid">
    <%= _.template($('#input_constructor').html())({
        id: "thread_name",
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
        description: "Icon",
        default_selector: "string",
        disable_int: true,
        value_string: "",
        help: {description: "Icon base64 string" }})
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
        help: {description: tr('The default color for this log level, in hexadecimal format')} }) 
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
        help: {description: tr('The default color for this log level, in hexadecimal format')} }) 
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
        help: {description: tr('The default color for this log level, in hexadecimal format')} }) 
    %>
    <%= _.template($('#input_constructor').html())({
        id:"basInfoOn",
        description: tr('Show bas informational messages'),
        default_selector: "string",
        disable_int: true,
        value_string: 'true',
        variants: ['true', 'false'],
        help: {description: tr('Show bas informational messages (waiting for element)')} }) 
    %>
    <%= _.template($('#input_constructor').html())({
        id:"webEvent",
        description: tr("Send an event to the web interface"),
        default_selector: "string",
        disable_int: true,
        value_string: 'true',
        variants: ['true', 'false'],
        help: {description: tr('Send an event to the web interface')} }) 
    %>
    <%= _.template($('#input_constructor').html())({
        id:"output",
        description: tr("Destination for logs output"),
        default_selector: "string",
        disable_int: true,
        value_string: 'display + file',
        variants: ['display + file', 'only display', 'only file', 'none'],
        help: {description: tr('Send an event to the web interface')} }) 
    %>
    <%= _.template($('#input_constructor').html())({
        id:"logFile",
        description: tr("Path for the log file"),
        default_selector: "string",
        disable_int: true,
        value_string: 'default',
        variants: ['default', 'null'],
        help: {description: tr('Path for the log file')} }) 
    %>
</div>
<div class="tooltipinternal">
    <div class="tr tooltip-paragraph-first-fold">Setup the logger by default</div>  
    <div class="tr tooltip-paragraph-fold">Language selection mode "auto" - language depends on the BAS interface language</div>
    <div class="tr tooltip-paragraph-fold">For each log level you can choose the default color, you can also specify your color in hexadecimal format.</div>
    <div class="tooltip-paragraph-last-fold">
        <span class="tr">If you enable sending events to the web interface, then the </span>
        <b>"custom-log"</b>
        <span class="tr"> event will be generated in the format:</span>
        <p><b>Type log:</b></p>
        <pre>
            { 
              thread_name: 1,   // thread name, the default thread number
              level: 'info',    // info, warn, success, error, fail, result
              color: "#ffffff"
              action_id: 162681501,
              date: "2019-10-30T18:46:41.327Z",
              text:  "message"
            }
        </pre>
    </div>
</div>
<%= _.template($('#back').html())({action:"executeandadd", visible:true}) %>
