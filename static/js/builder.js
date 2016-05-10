function Builder(e){this.form=e.addClass("json-builder"),this.json=null,this.items=[]}Builder.prototype.init=function(e,t){this.json=e,this.html=this.buildForm(e),this.resetForm();var r=this,a=this.form;a.on("click",".add",function(e){e.preventDefault();var t=$(this),i=t.closest(".array").data("name"),n=r.items[i].clone();t.before(n),a.trigger("change")}),a.on("click",".remove",function(e){e.preventDefault();var t=$(this);t.closest(".array").children(".item:last").remove(),a.trigger("change")}),a.on("input","input, textarea",function(){a.trigger("change")}),"function"==typeof t&&t()},Builder.prototype.resetForm=function(){this.form.html(this.html);var e=this,t=this.form.find(".array").get().reverse();$(t).each(function(){var t=$(this),r=t.data("name"),a=t.children(".item");e.items[r]||(e.items[r]=a.clone()),a.remove()})},Builder.prototype.buildForm=function(e,t,r){if(e.type){t=t||"",r=r||"";var a=t.split(".").pop();switch(e.type){case"array":var i=e.items;r=Handlebars.templates.array({name:t,title:a,html:this.buildForm(i,t)});break;case"object":t&&(t+=".");var n=e.properties;for(var s in n)r+=this.buildForm(n[s],t+s);r=Handlebars.templates.object({name:t,title:a,html:r});break;case"string":r=Handlebars.templates.string({name:t,title:a})}return r}},Builder.prototype.setFormValues=function(e,t,r){t=t||this.form,r=r||"",""==r&&this.resetForm();var a=$.type(e);switch(a){case"array":var i=t.find(".array[data-name='"+r+"']"),n=i.find(".add");for(var s in e){var o=this.items[r].clone();this.setFormValues(e[s],o,r),n.before(o)}break;case"object":r&&(r+=".");for(var s in e)this.setFormValues(e[s],t,r+s);break;case"string":var l=t.find("input[name='"+r+"']");l.val(e)}if(""==r){var c=this.form;c.trigger("change"),$.fn.sortable&&c.find(".array").sortable({containment:"parent",cursor:"row-resize",items:".item",handle:".handle",placeholder:"placeholder",forcePlaceholderSize:!0,scroll:!1,update:function(){c.trigger("change")}})}},Builder.prototype.getFormValuesAsJSON=function(){var e=this.getFormValues(),t=JSON.stringify(e,null,"  ");return t},Builder.prototype.getFormValues=function(){var e=this.form,t={};return function r(e,a,i,n){if(e.type){i=i||t,n=n||"";var s=n.split(".").pop();switch(e.type){case"array":i[s]=[];var o=a.find(".item[data-name='"+n+"']"),l=0;o.each(function(){r(e.items,$(this),i[s],n),l++});break;case"object":var c=e.properties,h=$.type(i);"array"==h?i.push({}):""!==s&&(i[s]={}),n&&(n+=".");for(var l in c)r(c[l],a,"array"==h?i[i.length-1]:i[s],n+l);break;case"string":var m=a.find("input[name='"+n+"']");"array"!=$.type(i)?i[s]=m.eq(0).val():m.each(function(){i.push($(this).val())})}}}(this.json,e),t};