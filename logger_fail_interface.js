<div class="container-fluid">
    <%= _.template($('#input_constructor').html())({
        id: "ru", 
        description: tr("Ru"), 
        default_selector: "string", 
        disable_int:true, 
        value_string: "",
        help: {description: tr('Error message')} }) 
    %>
    <%= _.template($('#input_constructor').html())({
        id: "en", 
        description:  tr("En"), 
        default_selector: "string", 
        disable_int:true, 
        value_string: "",  
        help: {description: tr('Error message')} }) 
    %>
    <span data-preserve="true" data-preserve-type="check" data-preserve-id="Check">
        <input type="checkbox" id="Check"> <label for="Check" class="tr">Do not restart the thread.</label>
    </span>
</div>
<div class="tooltipinternal">
    <div class="tr tooltip-paragraph-first-fold">Terminate the thread with an unsuccessful result.</div>  
</div>
<%= _.template($('#back').html())({action:"executeandadd", visible:true}) %>
