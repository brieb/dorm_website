var SignUpFormBuilder={};SignUpFormBuilder={init:function(a){SignUpFormBuilder.dialog.container=a;SignUpFormBuilder.dialog.setUp();SignUpFormBuilder.buttons.setUp();SignUpFormBuilder.form.container=$("#sign_up_form_create")},form:{container:null,submitHandler:function(){var a=[];SignUpFormBuilder.form.container.find("fieldset").each(function(c,d){d=$(d);var b={};b.id=d.find('input[name="question[id]"]').val();b.type=d.find('input[name="question[type]"]').val();b.text=d.find('input[name="question[text]"]').val();b.help=d.find('input[name="question[help]"]').val();b.required=d.find('input[name="question[required]"]').val();var e=d.find('input[name="question[choice][]"]');b.choices=[];e.each(function(g,f){f=$(f);b.choices.push(f.val())});a.push(b)});return a}},dialog:{container:null,containerButtons:null,setUp:function(){SignUpFormBuilder.dialog.container.append($("<form />").attr({id:"sign_up_form_create"}).addClass("ui-form"));SignUpFormBuilder.dialog.containerButtons=$("<div />").attr({"class":"sign_up_form_builder_buttons_container"})}},buttons:{types:["text","paragraph_text","multiple_choice","checkboxes","choose_from_a_list"],setUp:function(){SignUpFormBuilder.buttons.types.map(function(a){$("<button />").attr({name:"sign_up_form_create["+a+"]"}).text(SignUpFormBuilder.buttons.convertToPrettyText(a)).button().click(function(){var b=SignUpFormBuilder.field.genType(a);SignUpFormBuilder.form.container.append(b)}).appendTo(SignUpFormBuilder.dialog.containerButtons);$("<br />").appendTo(SignUpFormBuilder.dialog.containerButtons)});SignUpFormBuilder.dialog.container.append(SignUpFormBuilder.dialog.containerButtons)},convertToPrettyText:function(a){return a.replace(/(^|_)\w/g,function(b){return b.toUpperCase()}).replace(/_/g," ")}},field:{curId:0,genType:function(c){SignUpFormBuilder.field.curId++;var b=c.replace(/((^|\_)[a-z])/g,function(d){return d.toUpperCase().replace("_","")});var a=$("<fieldset />");a.append($("<legend />").text(SignUpFormBuilder.buttons.convertToPrettyText(c)),$("<input />").attr({type:"hidden",name:"question[id]",value:SignUpFormBuilder.field.curId}),$("<input />").attr({type:"hidden",name:"question[type]",value:c}),$("<div />").attr({"class":"label"}).text("Question Text:"),$("<input />").attr({type:"text",name:"question[text]",placeholder:"Enter question text here..."}),$("<br />"),$("<div />").attr({"class":"label"}).text("Question Help:"),$("<input />").attr({type:"text",name:"question[help]",placeholder:"Optional question help"}),$("<div />").attr({"class":"field"}).append(SignUpFormBuilder.field["genType"+b]()),$("<button />").attr({"class":"button_remove"}).button({icons:{primary:"ui-icon-trash"},text:false}).click(function(d){var e=$(d.target);e.parents("fieldset").remove()}));return a},genTypeText:function(){return null},genTypeParagraphText:function(){return null},genTypeMultipleChoice:function(){var a=SignUpFormBuilder.field.genDummyField("radio","Click here to add another choice",SignUpFormBuilder.field.genMultipleChoiceChoice);return SignUpFormBuilder.field.genMultipleChoiceChoice().after(a)},genMultipleChoiceChoice:function(){var a=$("<input />").attr({type:"radio",disabled:"disabled"}).after($("<input />").attr({type:"text",name:"question[choice][]",placeholder:"Enter Choice Text Here"})).after($("<br />"));return a},genTypeCheckboxes:function(){var a=SignUpFormBuilder.field.genDummyField("checkbox","Click here to add another checkbox",SignUpFormBuilder.field.genCheckbox);return SignUpFormBuilder.field.genCheckbox().after(a)},genCheckbox:function(){var a=$("<input />").attr({type:"checkbox",disabled:"disabled"}).after($("<input />").attr({type:"text",name:"question[choice][]",placeholder:"Enter Choice Text Here"})).after($("<br />"));return a},genTypeChooseFromAList:function(){var a=SignUpFormBuilder.field.genDummyField("none","Click here to add another choice",SignUpFormBuilder.field.genChooseFromAListChoice);return SignUpFormBuilder.field.genChooseFromAListChoice().after(a)},genChooseFromAListChoice:function(){var a=$("<input />").attr({type:"text",name:"question[choice][]",placeholder:"Enter choice text here"}).after($("<br />"));return a},newChoiceClickHandler:function(c,a){var d=$(c.target);var e=a();d.parent().before(e);for(var b=0;b<e.length;b++){console.log(e[b]);if($(e[b]).attr("type")==="text"){e[b].focus();break}}},genDummyField:function(c,d,b){var a=$("<span />").css({position:"relative"});if(c!=="none"){a.append($("<input />").attr({type:c,disabled:"disabled"}))}a.append($("<input />").attr({type:"text",disabled:"disabled",value:d}),$("<span />").css({"z-index":"100",width:"100%",height:"100%",position:"absolute",top:0,left:0}).click(function(e){SignUpFormBuilder.field.newChoiceClickHandler(e,b)}));return a}}};