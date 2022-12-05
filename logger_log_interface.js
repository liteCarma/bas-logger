<div class="container-fluid">
    <%= _.template($('#input_constructor').html())({
        id:"ru", 
        description:"Ru", 
        default_selector: "string", 
        disable_int:true, 
        value_string: "", 
        help: {description: tr("Languages")} }) 
    %>
    <%= _.template($('#input_constructor').html())({
        id:"en", 
        description:"En", 
        default_selector: "string",
        disable_int:true, 
        value_string: "", 
        help: {description: tr("Languages")} }) 
    %>
    <%= _.template($('#input_constructor').html())({
        id:"level", 
        description: tr("Level"), 
        default_selector: "string", 
        disable_int:true, 
        value_string: "info", 
        variants: ["info", "warn", "error"],
        help: {description: tr("Log level")} }) 
    %>
    <%= _.template($('#input_constructor').html())({
        id:"color", 
        description: tr("Color"), 
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
        help: {description: tr("Color name or HEX (#0ff574)")} }) 
    %>
</div>
<%= _.template($('#back').html())({action:"executeandadd", visible:true}) %>
