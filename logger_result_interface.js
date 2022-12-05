<div class="container-fluid">
<%= _.template($('#input_constructor').html())({
    id:"number", 
    description: tr("Number"), 
    default_selector: "int", 
    disable_expression:true, 
    disable_string:true, 
    value_number: 1, 
    min_number:1, 
    max_number:8, 
    help: {description: tr("The number of the result")} }) 
%>   
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
<%= _.template($('#input_constructor').html())({
    id:"formatAsLog", 
    description: tr("Format as Log"), 
	default_selector: "string",
	disable_int: true,
	value_string: 'false',
	variants: ['true', 'false'],
    help: {description: tr("The output format is the same as the log")} }) 
%>
</div>
<%= _.template($('#back').html())({action:"executeandadd", visible:true}) %>
