var EventCreateSignUpWizard={};EventCreateSignUpWizard={container:null,init:function(){EventCreateSignUpWizard.container=$("<div/>"),EventCreateSignUpWizard.container.dialog({modal:!0,autoOpen:!0,draggable:!1,minWidth:700,minHeight:600,maxHeight:700,dialogClass:"event_create_sign_up_wizard"}),EventCreateSignUpWizard.loadNextPane()},reset:function(){this.curPane=0,this.container.remove()},curPane:0,panes:[{name:"Questions",title:"Add Questions to Sign Up",help:"These questions will show up as someone signs up."}],loadNextPane:function(){if(EventCreateSignUpWizard.curPane>=EventCreateSignUpWizard.panes.length)EventCreateSignUpWizard.container.dialog("close");else{var a=EventCreateSignUpWizard.panes[EventCreateSignUpWizard.curPane];EventCreateSignUpWizard.container.empty(),EventCreateSignUpWizard.container.dialog("option","title",a.title),EventCreateSignUpWizard["loadPane"+a.name](),EventCreateSignUpWizard.curPane++}},genPrompt:function(a,b){var c=EventCreateSignUpWizard.panes[EventCreateSignUpWizard.curPane];EventCreateSignUpWizard.container.empty(),EventCreateSignUpWizard.container.dialog("option","title",c.title),EventCreateSignUpWizard.container.dialog("option","buttons",[{text:"Yes",click:EventCreateSignUpWizard["loadPane"+c.name]},{text:"No",click:EventCreateSignUpWizard.loadNextPane}]),EventCreateSignUpWizard.container.append($("<div/>").text(c.prompt))},loadPaneQuestions:function(){EventCreateSignUpWizard.container.dialog("option","buttons",[{text:"Create Sign Up Form",click:function(){EventCreate.signUpEnabled=!0;var a=SignUpFormBuilder.form.submitHandler();EventCreate.setSignUpForm(a),EventCreateSignUpWizard.loadNextPane()}},{text:"Clear",click:function(){$("#sign_up_form_create").empty()}},{text:"Skip",click:EventCreateSignUpWizard.loadNextPane}]),SignUpFormBuilder.init(EventCreateSignUpWizard.container)}}