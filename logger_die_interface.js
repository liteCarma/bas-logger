<div class="container-fluid">
    <%= _.template($('#input_constructor').html())({
        id: "ru", 
        description: tr("Ru"), 
        default_selector: "string", 
        disable_int:true, 
        value_string: "",
        help: {description: tr('Message')} }) 
    %>
    <%= _.template($('#input_constructor').html())({
        id: "en", 
        description:  tr("En"), 
        default_selector: "string", 
        disable_int:true, 
        value_string: "",  
        help: {description: tr('Message')} }) 
    %>
    <span data-preserve="true" data-preserve-type="check" data-preserve-id="Check">
        <input type="checkbox" id="Check"> <label for="Check" class="tr">Finish script instantly.</label>
    </span>
</div>
<div class="tooltipinternal">
    <div class="tr tooltip-paragraph-first-fold">This action finishes whole script, not just single thread.</div>  
</div>
<%= _.template($('#back').html())({action:"executeandadd", visible:true}) %>
