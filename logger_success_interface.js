<div class="container-fluid">
    <%= _.template($('#input_constructor').html())({
        id:"ru", 
        description: tr("Ru"), 
        default_selector: "string", 
        disable_int:true, 
        value_string: "",
        help: {description: tr('The message about success')} }) 
    %>
    <%= _.template($('#input_constructor').html())({
        id:"en", 
        description:  tr("En"), 
        default_selector: "string", 
        disable_int:true, 
        value_string: "",  
        help: {description: tr('The message about success')} }) 
    %>
</div>
<div class="tooltipinternal">
    <div class="tr tooltip-paragraph-first-fold">Complete the thread with a successful result.</div>  
</div>
<%= _.template($('#back').html())({action:"executeandadd", visible:true}) %>
