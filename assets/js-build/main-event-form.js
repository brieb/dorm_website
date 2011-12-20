
(function(a,b){function d(b){return!a(b).parents().andSelf().filter(function(){return a.curCSS(this,"visibility")==="hidden"||a.expr.filters.hidden(this)}).length}function c(b,c){var e=b.nodeName.toLowerCase();if("area"===e){c=b.parentNode,e=c.name;if(!b.href||!e||c.nodeName.toLowerCase()!=="map")return!1;b=a("img[usemap=#"+e+"]")[0];return!!b&&d(b)}return(/input|select|textarea|button|object/.test(e)?!b.disabled:"a"==e?b.href||c:c)&&d(b)}a.ui=a.ui||{},a.ui.version||(a.extend(a.ui,{version:"1.8.16",keyCode:{ALT:18,BACKSPACE:8,CAPS_LOCK:20,COMMA:188,COMMAND:91,COMMAND_LEFT:91,COMMAND_RIGHT:93,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,MENU:93,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38,WINDOWS:91}}),a.fn.extend({propAttr:a.fn.prop||a.fn.attr,_focus:a.fn.focus,focus:function(b,c){return typeof b=="number"?this.each(function(){var d=this;setTimeout(function(){a(d).focus(),c&&c.call(d)},b)}):this._focus.apply(this,arguments)},scrollParent:function(){var b;b=a.browser.msie&&/(static|relative)/.test(this.css("position"))||/absolute/.test(this.css("position"))?this.parents().filter(function(){return/(relative|absolute|fixed)/.test(a.curCSS(this,"position",1))&&/(auto|scroll)/.test(a.curCSS(this,"overflow",1)+a.curCSS(this,"overflow-y",1)+a.curCSS(this,"overflow-x",1))}).eq(0):this.parents().filter(function(){return/(auto|scroll)/.test(a.curCSS(this,"overflow",1)+a.curCSS(this,"overflow-y",1)+a.curCSS(this,"overflow-x",1))}).eq(0);return/fixed/.test(this.css("position"))||!b.length?a(document):b},zIndex:function(c){if(c!==b)return this.css("zIndex",c);if(this.length){c=a(this[0]);for(var d;c.length&&c[0]!==document;){d=c.css("position");if(d==="absolute"||d==="relative"||d==="fixed"){d=parseInt(c.css("zIndex"),10);if(!isNaN(d)&&d!==0)return d}c=c.parent()}}return 0},disableSelection:function(){return this.bind((a.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",function(a){a.preventDefault()})},enableSelection:function(){return this.unbind(".ui-disableSelection")}}),a.each(["Width","Height"],function(c,d){function e(b,c,d,e){a.each(f,function(){c-=parseFloat(a.curCSS(b,"padding"+this,!0))||0,d&&(c-=parseFloat(a.curCSS(b,"border"+this+"Width",!0))||0),e&&(c-=parseFloat(a.curCSS(b,"margin"+this,!0))||0)});return c}var f=d==="Width"?["Left","Right"]:["Top","Bottom"],g=d.toLowerCase(),h={innerWidth:a.fn.innerWidth,innerHeight:a.fn.innerHeight,outerWidth:a.fn.outerWidth,outerHeight:a.fn.outerHeight};a.fn["inner"+d]=function(c){return c===b?h["inner"+d].call(this):this.each(function(){a(this).css(g,e(this,c)+"px")})},a.fn["outer"+d]=function(b,c){return typeof b!="number"?h["outer"+d].call(this,b):this.each(function(){a(this).css(g,e(this,b,!0,c)+"px")})}}),a.extend(a.expr[":"],{data:function(b,c,d){return!!a.data(b,d[3])},focusable:function(b){return c(b,!isNaN(a.attr(b,"tabindex")))},tabbable:function(b){var d=a.attr(b,"tabindex"),e=isNaN(d);return(e||d>=0)&&c(b,!e)}}),a(function(){var b=document.body,c=b.appendChild(c=document.createElement("div"));a.extend(c.style,{minHeight:"100px",height:"auto",padding:0,borderWidth:0}),a.support.minHeight=c.offsetHeight===100,a.support.selectstart="onselectstart"in c,b.removeChild(c).style.display="none"}),a.extend(a.ui,{plugin:{add:function(b,c,d){b=a.ui[b].prototype;for(var e in d)b.plugins[e]=b.plugins[e]||[],b.plugins[e].push([c,d[e]])},call:function(a,b,c){if((b=a.plugins[b])&&a.element[0].parentNode)for(var d=0;d<b.length;d++)a.options[b[d][0]]&&b[d][1].apply(a.element,c)}},contains:function(a,b){return document.compareDocumentPosition?a.compareDocumentPosition(b)&16:a!==b&&a.contains(b)},hasScroll:function(b,c){if(a(b).css("overflow")==="hidden")return!1;c=c&&c==="left"?"scrollLeft":"scrollTop";var d=!1;if(b[c]>0)return!0;b[c]=1,d=b[c]>0,b[c]=0;return d},isOverAxis:function(a,b,c){return a>b&&a<b+c},isOver:function(b,c,d,e,f,g){return a.ui.isOverAxis(b,d,f)&&a.ui.isOverAxis(c,e,g)}}))})(jQuery),function(a,b){if(a.cleanData){var c=a.cleanData;a.cleanData=function(b){for(var d=0,e;(e=b[d])!=null;d++)try{a(e).triggerHandler("remove")}catch(f){}c(b)}}else{var d=a.fn.remove;a.fn.remove=function(b,c){return this.each(function(){c||(!b||a.filter(b,[this]).length)&&a("*",this).add([this]).each(function(){try{a(this).triggerHandler("remove")}catch(b){}});return d.call(a(this),b,c)})}}a.widget=function(b,c,d){var e=b.split(".")[0],f;b=b.split(".")[1],f=e+"-"+b,d||(d=c,c=a.Widget),a.expr[":"][f]=function(c){return!!a.data(c,b)},a[e]=a[e]||{},a[e][b]=function(a,b){arguments.length&&this._createWidget(a,b)},c=new c,c.options=a.extend(!0,{},c.options),a[e][b].prototype=a.extend(!0,c,{namespace:e,widgetName:b,widgetEventPrefix:a[e][b].prototype.widgetEventPrefix||b,widgetBaseClass:f},d),a.widget.bridge(b,a[e][b])},a.widget.bridge=function(c,d){a.fn[c]=function(e){var f=typeof e=="string",g=Array.prototype.slice.call(arguments,1),h=this;e=!f&&g.length?a.extend.apply(null,[!0,e].concat(g)):e;if(f&&e.charAt(0)==="_")return h;f?this.each(function(){var d=a.data(this,c),f=d&&a.isFunction(d[e])?d[e].apply(d,g):d;if(f!==d&&f!==b){h=f;return!1}}):this.each(function(){var b=a.data(this,c);b?b.option(e||{})._init():a.data(this,c,new d(e,this))});return h}},a.Widget=function(a,b){arguments.length&&this._createWidget(a,b)},a.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",options:{disabled:!1},_createWidget:function(b,c){a.data(c,this.widgetName,this),this.element=a(c),this.options=a.extend(!0,{},this.options,this._getCreateOptions(),b);var d=this;this.element.bind("remove."+this.widgetName,function(){d.destroy()}),this._create(),this._trigger("create"),this._init()},_getCreateOptions:function(){return a.metadata&&a.metadata.get(this.element[0])[this.widgetName]},_create:function(){},_init:function(){},destroy:function(){this.element.unbind("."+this.widgetName).removeData(this.widgetName),this.widget().unbind("."+this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass+"-disabled ui-state-disabled")},widget:function(){return this.element},option:function(c,d){var e=c;if(arguments.length===0)return a.extend({},this.options);if(typeof c=="string"){if(d===b)return this.options[c];e={},e[c]=d}this._setOptions(e);return this},_setOptions:function(b){var c=this;a.each(b,function(a,b){c._setOption(a,b)});return this},_setOption:function(a,b){this.options[a]=b,a==="disabled"&&this.widget()[b?"addClass":"removeClass"](this.widgetBaseClass+"-disabled ui-state-disabled").attr("aria-disabled",b);return this},enable:function(){return this._setOption("disabled",!1)},disable:function(){return this._setOption("disabled",!0)},_trigger:function(b,c,d){var e=this.options[b];c=a.Event(c),c.type=(b===this.widgetEventPrefix?b:this.widgetEventPrefix+b).toLowerCase(),d=d||{};if(c.originalEvent){b=a.event.props.length;for(var f;b;)f=a.event.props[--b],c[f]=c.originalEvent[f]}this.element.trigger(c,d);return!(a.isFunction(e)&&e.call(this.element[0],c,d)===!1||c.isDefaultPrevented())}}}(jQuery),function(a){var b=!1;a(document).mouseup(function(){b=!1}),a.widget("ui.mouse",{options:{cancel:":input,option",distance:1,delay:0},_mouseInit:function(){var b=this;this.element.bind("mousedown."+this.widgetName,function(a){return b._mouseDown(a)}).bind("click."+this.widgetName,function(c){if(!0===a.data(c.target,b.widgetName+".preventClickEvent")){a.removeData(c.target,b.widgetName+".preventClickEvent"),c.stopImmediatePropagation();return!1}}),this.started=!1},_mouseDestroy:function(){this.element.unbind("."+this.widgetName)},_mouseDown:function(c){if(!b){this._mouseStarted&&this._mouseUp(c),this._mouseDownEvent=c;var e=this,f=c.which==1,g=typeof this.options.cancel=="string"&&c.target.nodeName?a(c.target).closest(this.options.cancel).length:!1;if(!f||g||!this._mouseCapture(c))return!0;this.mouseDelayMet=!this.options.delay,this.mouseDelayMet||(this._mouseDelayTimer=setTimeout(function(){e.mouseDelayMet=!0},this.options.delay));if(this._mouseDistanceMet(c)&&this._mouseDelayMet(c)){this._mouseStarted=this._mouseStart(c)!==!1;if(!this._mouseStarted){c.preventDefault();return!0}}!0===a.data(c.target,this.widgetName+".preventClickEvent")&&a.removeData(c.target,this.widgetName+".preventClickEvent"),this._mouseMoveDelegate=function(a){return e._mouseMove(a)},this._mouseUpDelegate=function(a){return e._mouseUp(a)},a(document).bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate),c.preventDefault();return b=!0}},_mouseMove:function(b){if(!a.browser.msie||document.documentMode>=9||!!b.button){if(this._mouseStarted){this._mouseDrag(b);return b.preventDefault()}this._mouseDistanceMet(b)&&this._mouseDelayMet(b)&&((this._mouseStarted=this._mouseStart(this._mouseDownEvent,b)!==!1)?this._mouseDrag(b):this._mouseUp(b));return!this._mouseStarted}return this._mouseUp(b)},_mouseUp:function(b){a(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate),this._mouseStarted&&(this._mouseStarted=!1,b.target==this._mouseDownEvent.target&&a.data(b.target,this.widgetName+".preventClickEvent",!0),this._mouseStop(b));return!1},_mouseDistanceMet:function(a){return Math.max(Math.abs(this._mouseDownEvent.pageX-a.pageX),Math.abs(this._mouseDownEvent.pageY-a.pageY))>=this.options.distance},_mouseDelayMet:function(){return this.mouseDelayMet},_mouseStart:function(){},_mouseDrag:function(){},_mouseStop:function(){},_mouseCapture:function(){return!0}})}(jQuery),function(a){a.ui=a.ui||{};var b=/left|center|right/,c=/top|center|bottom/,d=a.fn.position,e=a.fn.offset;a.fn.position=function(e){if(!e||!e.of)return d.apply(this,arguments);e=a.extend({},e);var f=a(e.of),g=f[0],h=(e.collision||"flip").split(" "),i=e.offset?e.offset.split(" "):[0,0],j,k,l;g.nodeType===9?(j=f.width(),k=f.height(),l={top:0,left:0}):g.setTimeout?(j=f.width(),k=f.height(),l={top:f.scrollTop(),left:f.scrollLeft()}):g.preventDefault?(e.at="left top",j=k=0,l={top:e.of.pageY,left:e.of.pageX}):(j=f.outerWidth(),k=f.outerHeight(),l=f.offset()),a.each(["my","at"],function(){var a=(e[this]||"").split(" ");a.length===1&&(a=b.test(a[0])?a.concat(["center"]):c.test(a[0])?["center"].concat(a):["center","center"]),a[0]=b.test(a[0])?a[0]:"center",a[1]=c.test(a[1])?a[1]:"center",e[this]=a}),h.length===1&&(h[1]=h[0]),i[0]=parseInt(i[0],10)||0,i.length===1&&(i[1]=i[0]),i[1]=parseInt(i[1],10)||0,e.at[0]==="right"?l.left+=j:e.at[0]==="center"&&(l.left+=j/2),e.at[1]==="bottom"?l.top+=k:e.at[1]==="center"&&(l.top+=k/2),l.left+=i[0],l.top+=i[1];return this.each(function(){var b=a(this),c=b.outerWidth(),d=b.outerHeight(),f=parseInt(a.curCSS(this,"marginLeft",!0))||0,g=parseInt(a.curCSS(this,"marginTop",!0))||0,m=c+f+(parseInt(a.curCSS(this,"marginRight",!0))||0),n=d+g+(parseInt(a.curCSS(this,"marginBottom",!0))||0),o=a.extend({},l),p;e.my[0]==="right"?o.left-=c:e.my[0]==="center"&&(o.left-=c/2),e.my[1]==="bottom"?o.top-=d:e.my[1]==="center"&&(o.top-=d/2),o.left=Math.round(o.left),o.top=Math.round(o.top),p={left:o.left-f,top:o.top-g},a.each(["left","top"],function(b,f){a.ui.position[h[b]]&&a.ui.position[h[b]][f](o,{targetWidth:j,targetHeight:k,elemWidth:c,elemHeight:d,collisionPosition:p,collisionWidth:m,collisionHeight:n,offset:i,my:e.my,at:e.at})}),a.fn.bgiframe&&b.bgiframe(),b.offset(a.extend(o,{using:e.using}))})},a.ui.position={fit:{left:function(b,c){var d=a(window);d=c.collisionPosition.left+c.collisionWidth-d.width()-d.scrollLeft(),b.left=d>0?b.left-d:Math.max(b.left-c.collisionPosition.left,b.left)},top:function(b,c){var d=a(window);d=c.collisionPosition.top+c.collisionHeight-d.height()-d.scrollTop(),b.top=d>0?b.top-d:Math.max(b.top-c.collisionPosition.top,b.top)}},flip:{left:function(b,c){if(c.at[0]!=="center"){var d=a(window);d=c.collisionPosition.left+c.collisionWidth-d.width()-d.scrollLeft();var e=c.my[0]==="left"?-c.elemWidth:c.my[0]==="right"?c.elemWidth:0,f=c.at[0]==="left"?c.targetWidth:-c.targetWidth,g=-2*c.offset[0];b.left+=c.collisionPosition.left<0?e+f+g:d>0?e+f+g:0}},top:function(b,c){if(c.at[1]!=="center"){var d=a(window);d=c.collisionPosition.top+c.collisionHeight-d.height()-d.scrollTop();var e=c.my[1]==="top"?-c.elemHeight:c.my[1]==="bottom"?c.elemHeight:0,f=c.at[1]==="top"?c.targetHeight:-c.targetHeight,g=-2*c.offset[1];b.top+=c.collisionPosition.top<0?e+f+g:d>0?e+f+g:0}}}},a.offset.setOffset||(a.offset.setOffset=function(b,c){/static/.test(a.curCSS(b,"position"))&&(b.style.position="relative");var d=a(b),e=d.offset(),f=parseInt(a.curCSS(b,"top",!0),10)||0,g=parseInt(a.curCSS(b,"left",!0),10)||0;e={top:c.top-e.top+f,left:c.left-e.left+g},"using"in c?c.using.call(b,e):d.css(e)},a.fn.offset=function(b){var c=this[0];return!c||!c.ownerDocument?null:b?this.each(function(){a.offset.setOffset(this,b)}):e.call(this)})}(jQuery),function(a){a.widget("ui.draggable",a.ui.mouse,{widgetEventPrefix:"drag",options:{addClasses:!0,appendTo:"parent",axis:!1,connectToSortable:!1,containment:!1,cursor:"auto",cursorAt:!1,grid:!1,handle:!1,helper:"original",iframeFix:!1,opacity:!1,refreshPositions:!1,revert:!1,revertDuration:500,scope:"default",scroll:!0,scrollSensitivity:20,scrollSpeed:20,snap:!1,snapMode:"both",snapTolerance:20,stack:!1,zIndex:!1},_create:function(){this.options.helper=="original"&&!/^(?:r|a|f)/.test(this.element.css("position"))&&(this.element[0].style.position="relative"),this.options.addClasses&&this.element.addClass("ui-draggable"),this.options.disabled&&this.element.addClass("ui-draggable-disabled"),this._mouseInit()},destroy:function(){if(this.element.data("draggable")){this.element.removeData("draggable").unbind(".draggable").removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"),this._mouseDestroy();return this}},_mouseCapture:function(b){var c=this.options;if(this.helper||c.disabled||a(b.target).is(".ui-resizable-handle"))return!1;this.handle=this._getHandle(b);if(!this.handle)return!1;c.iframeFix&&a(c.iframeFix===!0?"iframe":c.iframeFix).each(function(){a('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({width:this.offsetWidth+"px",height:this.offsetHeight+"px",position:"absolute",opacity:"0.001",zIndex:1e3}).css(a(this).offset()).appendTo("body")});return!0},_mouseStart:function(b){var c=this.options;this.helper=this._createHelper(b),this._cacheHelperProportions(),a.ui.ddmanager&&(a.ui.ddmanager.current=this),this._cacheMargins(),this.cssPosition=this.helper.css("position"),this.scrollParent=this.helper.scrollParent(),this.offset=this.positionAbs=this.element.offset(),this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left},a.extend(this.offset,{click:{left:b.pageX-this.offset.left,top:b.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()}),this.originalPosition=this.position=this._generatePosition(b),this.originalPageX=b.pageX,this.originalPageY=b.pageY,c.cursorAt&&this._adjustOffsetFromHelper(c.cursorAt),c.containment&&this._setContainment();if(this._trigger("start",b)===!1){this._clear();return!1}this._cacheHelperProportions(),a.ui.ddmanager&&!c.dropBehaviour&&a.ui.ddmanager.prepareOffsets(this,b),this.helper.addClass("ui-draggable-dragging"),this._mouseDrag(b,!0),a.ui.ddmanager&&a.ui.ddmanager.dragStart(this,b);return!0},_mouseDrag:function(b,c){this.position=this._generatePosition(b),this.positionAbs=this._convertPositionTo("absolute");if(!c){c=this._uiHash();if(this._trigger("drag",b,c)===!1){this._mouseUp({});return!1}this.position=c.position}if(!this.options.axis||this.options.axis!="y")this.helper[0].style.left=this.position.left+"px";if(!this.options.axis||this.options.axis!="x")this.helper[0].style.top=this.position.top+"px";a.ui.ddmanager&&a.ui.ddmanager.drag(this,b);return!1},_mouseStop:function(b){var c=!1;a.ui.ddmanager&&!this.options.dropBehaviour&&(c=a.ui.ddmanager.drop(this,b)),this.dropped&&(c=this.dropped,this.dropped=!1);if((!this.element[0]||!this.element[0].parentNode)&&this.options.helper=="original")return!1;if(this.options.revert=="invalid"&&!c||this.options.revert=="valid"&&c||this.options.revert===!0||a.isFunction(this.options.revert)&&this.options.revert.call(this.element,c)){var e=this;a(this.helper).animate(this.originalPosition,parseInt(this.options.revertDuration,10),function(){e._trigger("stop",b)!==!1&&e._clear()})}else this._trigger("stop",b)!==!1&&this._clear();return!1},_mouseUp:function(b){this.options.iframeFix===!0&&a("div.ui-draggable-iframeFix").each(function(){this.parentNode.removeChild(this)}),a.ui.ddmanager&&a.ui.ddmanager.dragStop(this,b);return a.ui.mouse.prototype._mouseUp.call(this,b)},cancel:function(){this.helper.is(".ui-draggable-dragging")?this._mouseUp({}):this._clear();return this},_getHandle:function(b){var c=!this.options.handle||!a(this.options.handle,this.element).length?!0:!1;a(this.options.handle,this.element).find("*").andSelf().each(function(){this==b.target&&(c=!0)});return c},_createHelper:function(b){var c=this.options;b=a.isFunction(c.helper)?a(c.helper.apply(this.element[0],[b])):c.helper=="clone"?this.element.clone().removeAttr("id"):this.element,b.parents("body").length||b.appendTo(c.appendTo=="parent"?this.element[0].parentNode:c.appendTo),b[0]!=this.element[0]&&!/(fixed|absolute)/.test(b.css("position"))&&b.css("position","absolute");return b},_adjustOffsetFromHelper:function(b){typeof b=="string"&&(b=b.split(" ")),a.isArray(b)&&(b={left:+b[0],top:+b[1]||0}),"left"in b&&(this.offset.click.left=b.left+this.margins.left),"right"in b&&(this.offset.click.left=this.helperProportions.width-b.right+this.margins.left),"top"in b&&(this.offset.click.top=b.top+this.margins.top),"bottom"in b&&(this.offset.click.top=this.helperProportions.height-b.bottom+this.margins.top)},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();var b=this.offsetParent.offset();this.cssPosition=="absolute"&&this.scrollParent[0]!=document&&a.ui.contains(this.scrollParent[0],this.offsetParent[0])&&(b.left+=this.scrollParent.scrollLeft(),b.top+=this.scrollParent.scrollTop());if(this.offsetParent[0]==document.body||this.offsetParent[0].tagName&&this.offsetParent[0].tagName.toLowerCase()=="html"&&a.browser.msie)b={top:0,left:0};return{top:b.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:b.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if(this.cssPosition=="relative"){var a=this.element.position();return{top:a.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:a.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}return{top:0,left:0}},_cacheMargins:function(){this.margins={left:parseInt(this.element.css("marginLeft"),10)||0,top:parseInt(this.element.css("marginTop"),10)||0,right:parseInt(this.element.css("marginRight"),10)||0,bottom:parseInt(this.element.css("marginBottom"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var b=this.options;b.containment=="parent"&&(b.containment=this.helper[0].parentNode);if(b.containment=="document"||b.containment=="window")this.containment=[b.containment=="document"?0:a(window).scrollLeft()-this.offset.relative.left-this.offset.parent.left,b.containment=="document"?0:a(window).scrollTop()-this.offset.relative.top-this.offset.parent.top,(b.containment=="document"?0:a(window).scrollLeft())+a(b.containment=="document"?document:window).width()-this.helperProportions.width-this.margins.left,(b.containment=="document"?0:a(window).scrollTop())+(a(b.containment=="document"?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top];if(!/^(document|window|parent)$/.test(b.containment)&&b.containment.constructor!=Array){b=a(b.containment);var c=b[0];if(c){b.offset();var e=a(c).css("overflow")!="hidden";this.containment=[(parseInt(a(c).css("borderLeftWidth"),10)||0)+(parseInt(a(c).css("paddingLeft"),10)||0),(parseInt(a(c).css("borderTopWidth"),10)||0)+(parseInt(a(c).css("paddingTop"),10)||0),(e?Math.max(c.scrollWidth,c.offsetWidth):c.offsetWidth)-(parseInt(a(c).css("borderLeftWidth"),10)||0)-(parseInt(a(c).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left-this.margins.right,(e?Math.max(c.scrollHeight,c.offsetHeight):c.offsetHeight)-(parseInt(a(c).css("borderTopWidth"),10)||0)-(parseInt(a(c).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top-this.margins.bottom],this.relative_container=b}}else b.containment.constructor==Array&&(this.containment=b.containment)},_convertPositionTo:function(b,c){c||(c=this.position),b=b=="absolute"?1:-1;var e=this.cssPosition=="absolute"&&(this.scrollParent[0]==document||!a.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,f=/(html|body)/i.test(e[0].tagName);return{top:c.top+this.offset.relative.top*b+this.offset.parent.top*b-(a.browser.safari&&a.browser.version<526&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():f?0:e.scrollTop())*b),left:c.left+this.offset.relative.left*b+this.offset.parent.left*b-(a.browser.safari&&a.browser.version<526&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():f?0:e.scrollLeft())*b)}},_generatePosition:function(b){var c=this.options,e=this.cssPosition=="absolute"&&(this.scrollParent[0]==document||!a.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,f=/(html|body)/i.test(e[0].tagName),g=b.pageX,h=b.pageY;if(this.originalPosition){var i;this.containment&&(this.relative_container?(i=this.relative_container.offset(),i=[this.containment[0]+i.left,this.containment[1]+i.top,this.containment[2]+i.left,this.containment[3]+i.top]):i=this.containment,b.pageX-this.offset.click.left<i[0]&&(g=i[0]+this.offset.click.left),b.pageY-this.offset.click.top<i[1]&&(h=i[1]+this.offset.click.top),b.pageX-this.offset.click.left>i[2]&&(g=i[2]+this.offset.click.left),b.pageY-this.offset.click.top>i[3]&&(h=i[3]+this.offset.click.top)),c.grid&&(h=c.grid[1]?this.originalPageY+Math.round((h-this.originalPageY)/c.grid[1])*c.grid[1]:this.originalPageY,h=i?h-this.offset.click.top<i[1]||h-this.offset.click.top>i[3]?h-this.offset.click.top<i[1]?h+c.grid[1]:h-c.grid[1]:h:h,g=c.grid[0]?this.originalPageX+Math.round((g-this.originalPageX)/c.grid[0])*c.grid[0]:this.originalPageX,g=i?g-this.offset.click.left<i[0]||g-this.offset.click.left>i[2]?g-this.offset.click.left<i[0]?g+c.grid[0]:g-c.grid[0]:g:g)}return{top:h-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+(a.browser.safari&&a.browser.version<526&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollTop():f?0:e.scrollTop()),left:g-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+(a.browser.safari&&a.browser.version<526&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():f?0:e.scrollLeft())}},_clear:function(){this.helper.removeClass("ui-draggable-dragging"),this.helper[0]!=this.element[0]&&!this.cancelHelperRemoval&&this.helper.remove(),this.helper=null,this.cancelHelperRemoval=!1},_trigger:function(b,c,e){e=e||this._uiHash(),a.ui.plugin.call(this,b,[c,e]),b=="drag"&&(this.positionAbs=this._convertPositionTo("absolute"));return a.Widget.prototype._trigger.call(this,b,c,e)},plugins:{},_uiHash:function(){return{helper:this.helper,position:this.position,originalPosition:this.originalPosition,offset:this.positionAbs}}}),a.extend(a.ui.draggable,{version:"1.8.16"}),a.ui.plugin.add("draggable","connectToSortable",{start:function(b,c){var e=a(this).data("draggable"),f=e.options,g=a.extend({},c,{item:e.element});e.sortables=[],a(f.connectToSortable).each(function(){var c=a.data(this,"sortable");c&&!c.options.disabled&&(e.sortables.push({instance:c,shouldRevert:c.options.revert}),c.refreshPositions(),c._trigger("activate",b,g))})},stop:function(b,c){var e=a(this).data("draggable"),f=a.extend({},c,{item:e.element});a.each(e.sortables,function(){this.instance.isOver?(this.instance.isOver=0,e.cancelHelperRemoval=!0,this.instance.cancelHelperRemoval=!1,this.shouldRevert&&(this.instance.options.revert=!0),this.instance._mouseStop(b),this.instance.options.helper=this.instance.options._helper,e.options.helper=="original"&&this.instance.currentItem.css({top:"auto",left:"auto"})):(this.instance.cancelHelperRemoval=!1,this.instance._trigger("deactivate",b,f))})},drag:function(b,c){var e=a(this).data("draggable"),f=this;a.each(e.sortables,function(){this.instance.positionAbs=e.positionAbs,this.instance.helperProportions=e.helperProportions,this.instance.offset.click=e.offset.click,this.instance._intersectsWith(this.instance.containerCache)?(this.instance.isOver||(this.instance.isOver=1,this.instance.currentItem=a(f).clone().removeAttr("id").appendTo(this.instance.element).data("sortable-item",!0),this.instance.options._helper=this.instance.options.helper,this.instance.options.helper=function(){return c.helper[0]},b.target=this.instance.currentItem[0],this.instance._mouseCapture(b,!0),this.instance._mouseStart(b,!0,!0),this.instance.offset.click.top=e.offset.click.top,this.instance.offset.click.left=e.offset.click.left,this.instance.offset.parent.left-=e.offset.parent.left-this.instance.offset.parent.left,this.instance.offset.parent.top-=e.offset.parent.top-this.instance.offset.parent.top,e._trigger("toSortable",b),e.dropped=this.instance.element,e.currentItem=e.element,this.instance.fromOutside=e),this.instance.currentItem&&this.instance._mouseDrag(b)):this.instance.isOver&&(this.instance.isOver=0,this.instance.cancelHelperRemoval=!0,this.instance.options.revert=!1,this.instance._trigger("out",b,this.instance._uiHash(this.instance)),this.instance._mouseStop(b,!0),this.instance.options.helper=this.instance.options._helper,this.instance.currentItem.remove(),this.instance.placeholder&&this.instance.placeholder.remove(),e._trigger("fromSortable",b),e.dropped=!1)})}}),a.ui.plugin.add("draggable","cursor",{start:function(){var b=a("body"),c=a(this).data("draggable").options;b.css("cursor")&&(c._cursor=b.css("cursor")),b.css("cursor",c.cursor)},stop:function(){var b=a(this).data("draggable").options;b._cursor&&a("body").css("cursor",b._cursor)}}),a.ui.plugin.add("draggable","opacity",{start:function(b,c){b=a(c.helper),c=a(this).data("draggable").options,b.css("opacity")&&(c._opacity=b.css("opacity")),b.css("opacity",c.opacity)},stop:function(b,c){b=a(this).data("draggable").options,b._opacity&&a(c.helper).css("opacity",b._opacity)}}),a.ui.plugin.add("draggable","scroll",{start:function(){var b=a(this).data("draggable");b.scrollParent[0]!=document&&b.scrollParent[0].tagName!="HTML"&&(b.overflowOffset=b.scrollParent.offset())},drag:function(b){var c=a(this).data("draggable"),e=c.options,f=!1;if(c.scrollParent[0]!=document&&c.scrollParent[0].tagName!="HTML"){if(!e.axis||e.axis!="x")c.overflowOffset.top+c.scrollParent[0].offsetHeight-b.pageY<e.scrollSensitivity?c.scrollParent[0].scrollTop=f=c.scrollParent[0].scrollTop+e.scrollSpeed:b.pageY-c.overflowOffset.top<e.scrollSensitivity&&(c.scrollParent[0].scrollTop=f=c.scrollParent[0].scrollTop-e.scrollSpeed);if(!e.axis||e.axis!="y")c.overflowOffset.left+c.scrollParent[0].offsetWidth-b.pageX<e.scrollSensitivity?c.scrollParent[0].scrollLeft=f=c.scrollParent[0].scrollLeft+e.scrollSpeed:b.pageX-c.overflowOffset.left<e.scrollSensitivity&&(c.scrollParent[0].scrollLeft=f=c.scrollParent[0].scrollLeft-e.scrollSpeed)}else{if(!e.axis||e.axis!="x")b.pageY-a(document).scrollTop()<e.scrollSensitivity?f=a(document).scrollTop(a(document).scrollTop()-e.scrollSpeed):a(window).height()-(b.pageY-a(document).scrollTop())<e.scrollSensitivity&&(f=a(document).scrollTop(a(document).scrollTop()+e.scrollSpeed));if(!e.axis||e.axis!="y")b.pageX-a(document).scrollLeft()<e.scrollSensitivity?f=a(document).scrollLeft(a(document).scrollLeft()-e.scrollSpeed):a(window).width()-(b.pageX-a(document).scrollLeft())<e.scrollSensitivity&&(f=a(document).scrollLeft(a(document).scrollLeft()+e.scrollSpeed))}f!==!1&&a.ui.ddmanager&&!e.dropBehaviour&&a.ui.ddmanager.prepareOffsets(c,b)}}),a.ui.plugin.add("draggable","snap",{start:function(){var b=a(this).data("draggable"),c=b.options;b.snapElements=[],a(c.snap.constructor!=String?c.snap.items||":data(draggable)":c.snap).each(function(){var c=a(this),e=c.offset();this!=b.element[0]&&b.snapElements.push({item:this,width:c.outerWidth(),height:c.outerHeight(),top:e.top,left:e.left})})},drag:function(b,c){for(var e=a(this).data("draggable"),f=e.options,g=f.snapTolerance,h=c.offset.left,i=h+e.helperProportions.width,j=c.offset.top,k=j+e.helperProportions.height,l=e.snapElements.length-1;l>=0;l--){var m=e.snapElements[l].left,n=m+e.snapElements[l].width,o=e.snapElements[l].top,p=o+e.snapElements[l].height;if(m-g<h&&h<n+g&&o-g<j&&j<p+g||m-g<h&&h<n+g&&o-g<k&&k<p+g||m-g<i&&i<n+g&&o-g<j&&j<p+g||m-g<i&&i<n+g&&o-g<k&&k<p+g){if(f.snapMode!="inner"){var q=Math.abs(o-k)<=g,r=Math.abs(p-j)<=g,s=Math.abs(m-i)<=g,t=Math.abs(n-h)<=g;q&&(c.position.top=e._convertPositionTo("relative",{top:o-e.helperProportions.height,left:0}).top-e.margins.top),r&&(c.position.top=e._convertPositionTo("relative",{top:p,left:0}).top-e.margins.top),s&&(c.position.left=e._convertPositionTo("relative",{top:0,left:m-e.helperProportions.width}).left-e.margins.left),t&&(c.position.left=e._convertPositionTo("relative",{top:0,left:n}).left-e.margins.left)}var u=q||r||s||t;f.snapMode!="outer"&&(q=Math.abs(o-j)<=g,r=Math.abs(p-k)<=g,s=Math.abs(m-h)<=g,t=Math.abs(n-i)<=g,q&&(c.position.top=e._convertPositionTo("relative",{top:o,left:0}).top-e.margins.top),r&&(c.position.top=e._convertPositionTo("relative",{top:p-e.helperProportions.height,left:0}).top-e.margins.top),s&&(c.position.left=e._convertPositionTo("relative",{top:0,left:m}).left-e.margins.left),t&&(c.position.left=e._convertPositionTo("relative",{top:0,left:n-e.helperProportions.width}).left-e.margins.left)),!e.snapElements[l].snapping&&(q||r||s||t||u)&&e.options.snap.snap&&e.options.snap.snap.call(e.element,b,a.extend(e._uiHash(),{snapItem:e.snapElements[l].item})),e.snapElements[l].snapping=q||r||s||t||u}else e.snapElements[l].snapping&&e.options.snap.release&&e.options.snap.release.call(e.element,b,a.extend(e._uiHash(),{snapItem:e.snapElements[l].item})),e.snapElements[l].snapping=!1}}}),a.ui.plugin.add("draggable","stack",{start:function(){var b=a(this).data("draggable").options;b=a.makeArray(a(b.stack)).sort(function(b,c){return(parseInt(a(b).css("zIndex"),10)||0)-(parseInt(a(c).css("zIndex"),10)||0)});if(b.length){var c=parseInt(b[0].style.zIndex)||0;a(b).each(function(a){this.style.zIndex=c+a}),this[0].style.zIndex=c+b.length}}}),a.ui.plugin.add("draggable","zIndex",{start:function(b,c){b=a(c.helper),c=a(this).data("draggable").options,b.css("zIndex")&&(c._zIndex=b.css("zIndex")),b.css("zIndex",c.zIndex)},stop:function(b,c){b=a(this).data("draggable").options,b._zIndex&&a(c.helper).css("zIndex",b._zIndex)}})}(jQuery),function(a){a.widget("ui.droppable",{widgetEventPrefix:"drop",options:{accept:"*",activeClass:!1,addClasses:!0,greedy:!1,hoverClass:!1,scope:"default",tolerance:"intersect"},_create:function(){var b=this.options,c=b.accept;this.isover=0,this.isout=1,this.accept=a.isFunction(c)?c:function(a){return a.is(c)},this.proportions={width:this.element[0].offsetWidth,height:this.element[0].offsetHeight},a.ui.ddmanager.droppables[b.scope]=a.ui.ddmanager.droppables[b.scope]||[],a.ui.ddmanager.droppables[b.scope].push(this),b.addClasses&&this.element.addClass("ui-droppable")},destroy:function(){for(var b=a.ui.ddmanager.droppables[this.options.scope],c=0;c<b.length;c++)b[c]==this&&b.splice(c,1);this.element.removeClass("ui-droppable ui-droppable-disabled").removeData("droppable").unbind(".droppable");return this},_setOption:function(b,c){b=="accept"&&(this.accept=a.isFunction(c)?c:function(a){return a.is(c)}),a.Widget.prototype._setOption.apply(this,arguments)},_activate:function(b){var c=a.ui.ddmanager.current;this.options.activeClass&&this.element.addClass(this.options.activeClass),c&&this._trigger("activate",b,this.ui(c))},_deactivate:function(b){var c=a.ui.ddmanager.current;this.options.activeClass&&this.element.removeClass(this.options.activeClass),c&&this._trigger("deactivate",b,this.ui(c))},_over:function(b){var c=a.ui.ddmanager.current;!!c&&(c.currentItem||c.element)[0]!=this.element[0]&&this.accept.call(this.element[0],c.currentItem||c.element)&&(this.options.hoverClass&&this.element.addClass(this.options.hoverClass),this._trigger("over",b,this.ui(c)))},_out:function(b){var c=a.ui.ddmanager.current;!!c&&(c.currentItem||c.element)[0]!=this.element[0]&&this.accept.call(this.element[0],c.currentItem||c.element)&&(this.options.hoverClass&&this.element.removeClass(this.options.hoverClass),this._trigger("out",b,this.ui(c)))},_drop:function(b,c){var e=c||a.ui.ddmanager.current;if(!e||(e.currentItem||e.element)[0]==this.element[0])return!1;var f=!1;this.element.find(":data(droppable)").not(".ui-draggable-dragging").each(function(){var b=a.data(this,"droppable");if(b.options.greedy&&!b.options.disabled&&b.options.scope==e.options.scope&&b.accept.call(b.element[0],e.currentItem||e.element)&&a.ui.intersect(e,a.extend(b,{offset:b.element.offset()}),b.options.tolerance)){f=!0;return!1}});if(f)return!1;if(this.accept.call(this.element[0],e.currentItem||e.element)){this.options.activeClass&&this.element.removeClass(this.options.activeClass),this.options.hoverClass&&this.element.removeClass(this.options.hoverClass),this._trigger("drop",b,this.ui(e));return this.element}return!1},ui:function(a){return{draggable:a.currentItem||a.element,helper:a.helper,position:a.position,offset:a.positionAbs}}}),a.extend(a.ui.droppable,{version:"1.8.16"}),a.ui.intersect=function(b,c,e){if(!c.offset)return!1;var f=(b.positionAbs||b.position.absolute).left,g=f+b.helperProportions.width,h=(b.positionAbs||b.position.absolute).top,i=h+b.helperProportions.height,j=c.offset.left,k=j+c.proportions.width,l=c.offset.top,m=l+c.proportions.height;switch(e){case"fit":return j<=f&&g<=k&&l<=h&&i<=m;case"intersect":return j<f+b.helperProportions.width/2&&g-b.helperProportions.width/2<k&&l<h+b.helperProportions.height/2&&i-b.helperProportions.height/2<m;case"pointer":return a.ui.isOver((b.positionAbs||b.position.absolute).top+(b.clickOffset||b.offset.click).top,(b.positionAbs||b.position.absolute).left+(b.clickOffset||b.offset.click).left,l,j,c.proportions.height,c.proportions.width);case"touch":return(h>=l&&h<=m||i>=l&&i<=m||h<l&&i>m)&&(f>=j&&f<=k||g>=j&&g<=k||f<j&&g>k);default:return!1}},a.ui.ddmanager={current:null,droppables:{"default":[]},prepareOffsets:function(b,c){var e=a.ui.ddmanager.droppables[b.options.scope]||[],f=c?c.type:null,g=(b.currentItem||b.element).find(":data(droppable)").andSelf(),h=0;a:for(;h<e.length;h++)if(!(e[h].options.disabled||b&&!e[h].accept.call(e[h].element[0],b.currentItem||b.element))){for(var i=0;i<g.length;i++)if(g[i]==e[h].element[0]){e[h].proportions.height=0;continue a}e[h].visible=e[h].element.css("display")!="none",e[h].visible&&(f=="mousedown"&&e[h]._activate.call(e[h],c),e[h].offset=e[h].element.offset(),e[h].proportions={width:e[h].element[0].offsetWidth,height:e[h].element[0].offsetHeight})}},drop:function(b,c){var e=!1;a.each(a.ui.ddmanager.droppables[b.options.scope]||[],function(){this.options&&(!this.options.disabled&&this.visible&&a.ui.intersect(b,this,this.options.tolerance)&&(e=e||this._drop.call(this,c)),!this.options.disabled&&this.visible&&this.accept.call(this.element[0],b.currentItem||b.element)&&(this.isout=1,this.isover=0,this._deactivate.call(this,c)))});return e},dragStart:function(b,c){b.element.parents(":not(body,html)").bind("scroll.droppable",function(){b.options.refreshPositions||a.ui.ddmanager.prepareOffsets(b,c)})},drag:function(b,c){b.options.refreshPositions&&a.ui.ddmanager.prepareOffsets(b,c),a.each(a.ui.ddmanager.droppables[b.options.scope]||[],function(){if(!(this.options.disabled||this.greedyChild||!this.visible)){var e=a.ui.intersect(b,this,this.options.tolerance);if(e=!e&&this.isover==1?"isout":e&&this.isover==0?"isover":null){var f;if(this.options.greedy){var g=this.element.parents(":data(droppable):eq(0)");g.length&&(f=a.data(g[0],"droppable"),f.greedyChild=e=="isover"?1:0)}f&&e=="isover"&&(f.isover=0,f.isout=1,f._out.call(f,c)),this[e]=1,this[e=="isout"?"isover":"isout"]=0,this[e=="isover"?"_over":"_out"].call(this,c),f&&e=="isout"&&(f.isout=0,f.isover=1,f._over.call(f,c))}}})},dragStop:function(b,c){b.element.parents(":not(body,html)").unbind("scroll.droppable"),b.options.refreshPositions||a.ui.ddmanager.prepareOffsets(b,c)}}}(jQuery),function(a){a.widget("ui.resizable",a.ui.mouse,{widgetEventPrefix:"resize",options:{alsoResize:!1,animate:!1,animateDuration:"slow",animateEasing:"swing",aspectRatio:!1,autoHide:!1,containment:!1,ghost:!1,grid:!1,handles:"e,s,se",helper:!1,maxHeight:null,maxWidth:null,minHeight:10,minWidth:10,zIndex:1e3},_create:function(){var b=this,c=this.options;this.element.addClass("ui-resizable"),a.extend(this,{_aspectRatio:!!c.aspectRatio,aspectRatio:c.aspectRatio,originalElement:this.element,_proportionallyResizeElements:[],_helper:c.helper||c.ghost||c.animate?c.helper||"ui-resizable-helper":null}),this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i)&&(/relative/.test(this.element.css("position"))&&a.browser.opera&&this.element.css({position:"relative",top:"auto",left:"auto"}),this.element.wrap(a('<div class="ui-wrapper" style="overflow: hidden;"></div>').css({position:this.element.css("position"),width:this.element.outerWidth(),height:this.element.outerHeight(),top:this.element.css("top"),left:this.element.css("left")})),this.element=this.element.parent().data("resizable",this.element.data("resizable")),this.elementIsWrapper=!0,this.element.css({marginLeft:this.originalElement.css("marginLeft"),marginTop:this.originalElement.css("marginTop"),marginRight:this.originalElement.css("marginRight"),marginBottom:this.originalElement.css("marginBottom")}),this.originalElement.css({marginLeft:0,marginTop:0,marginRight:0,marginBottom:0}),this.originalResizeStyle=this.originalElement.css("resize"),this.originalElement.css("resize","none"),this._proportionallyResizeElements.push(this.originalElement.css({position:"static",zoom:1,display:"block"})),this.originalElement.css({margin:this.originalElement.css("margin")}),this._proportionallyResize()),this.handles=c.handles||(a(".ui-resizable-handle",this.element).length?{n:".ui-resizable-n",e:".ui-resizable-e",s:".ui-resizable-s",w:".ui-resizable-w",se:".ui-resizable-se",sw:".ui-resizable-sw",ne:".ui-resizable-ne",nw:".ui-resizable-nw"}:"e,s,se");if(this.handles.constructor==String){this.handles=="all"&&(this.handles="n,e,s,w,se,sw,ne,nw");var d=this.handles.split(",");this.handles={};for(var f=0;f<d.length;f++){var g=a.trim(d[f]),h=a('<div class="ui-resizable-handle '+("ui-resizable-"+g)+'"></div>');/sw|se|ne|nw/.test(g)&&h.css({zIndex:++c.zIndex}),"se"==g&&h.addClass("ui-icon ui-icon-gripsmall-diagonal-se"),this.handles[g]=".ui-resizable-"+g,this.element.append(h)}}this._renderAxis=function(b){b=b||this.element;for(var c in this.handles){this.handles[c].constructor==String&&(this.handles[c]=a(this.handles[c],this.element).show());if(this.elementIsWrapper&&this.originalElement[0].nodeName.match(/textarea|input|select|button/i)){var d=a(this.handles[c],this.element),f=0;f=/sw|ne|nw|se|n|s/.test(c)?d.outerHeight():d.outerWidth(),d=["padding",/ne|nw|n/.test(c)?"Top":/se|sw|s/.test(c)?"Bottom":/^e$/.test(c)?"Right":"Left"].join(""),b.css(d,f),this._proportionallyResize()}a(this.handles[c])}},this._renderAxis(this.element),this._handles=a(".ui-resizable-handle",this.element).disableSelection(),this._handles.mouseover(function(){if(!b.resizing){if(this.className)var a=this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i);b.axis=a&&a[1]?a[1]:"se"}}),c.autoHide&&(this._handles.hide(),a(this.element).addClass("ui-resizable-autohide").hover(function(){c.disabled||(a(this).removeClass("ui-resizable-autohide"),b._handles.show())},function(){c.disabled||b.resizing||(a(this).addClass("ui-resizable-autohide"),b._handles.hide())})),this._mouseInit()},destroy:function(){this._mouseDestroy();var b=function(b){a(b).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").unbind(".resizable").find(".ui-resizable-handle").remove()};if(this.elementIsWrapper){b(this.element);var c=this.element;c.after(this.originalElement.css({position:c.css("position"),width:c.outerWidth(),height:c.outerHeight(),top:c.css("top"),left:c.css("left")})).remove()}this.originalElement.css("resize",this.originalResizeStyle),b(this.originalElement);return this},_mouseCapture:function(b){var c=!1;for(var d in this.handles)a(this.handles[d])[0]==b.target&&(c=!0);return!this.options.disabled&&c},_mouseStart:function(c){var d=this.options,f=this.element.position(),g=this.element;this.resizing=!0,this.documentScroll={top:a(document).scrollTop(),left:a(document).scrollLeft()},(g.is(".ui-draggable")||/absolute/.test(g.css("position")))&&g.css({position:"absolute",top:f.top,left:f.left}),a.browser.opera&&/relative/.test(g.css("position"))&&g.css({position:"relative",top:"auto",left:"auto"}),this._renderProxy(),f=b(this.helper.css("left"));var h=b(this.helper.css("top"));d.containment&&(f+=a(d.containment).scrollLeft()||0,h+=a(d.containment).scrollTop()||0),this.offset=this.helper.offset(),this.position={left:f,top:h},this.size=this._helper?{width:g.outerWidth(),height:g.outerHeight()}:{width:g.width(),height:g.height()},this.originalSize=this._helper?{width:g.outerWidth(),height:g.outerHeight()}:{width:g.width(),height:g.height()},this.originalPosition={left:f,top:h},this.sizeDiff={width:g.outerWidth()-g.width(),height:g.outerHeight()-g.height()},this.originalMousePosition={left:c.pageX,top:c.pageY},this.aspectRatio=typeof d.aspectRatio=="number"?d.aspectRatio:this.originalSize.width/this.originalSize.height||1,d=a(".ui-resizable-"+this.axis).css("cursor"),a("body").css("cursor",d=="auto"?this.axis+"-resize":d),g.addClass("ui-resizable-resizing"),this._propagate("start",c);return!0},_mouseDrag:function(a){var b=this.helper,c=this.originalMousePosition,d=this._change[this.axis];if(!d)return!1;c=d.apply(this,[a,a.pageX-c.left||0,a.pageY-c.top||0]),this._updateVirtualBoundaries(a.shiftKey);if(this._aspectRatio||a.shiftKey)c=this._updateRatio(c,a);c=this._respectSize(c,a),this._propagate("resize",a),b.css({top:this.position.top+"px",left:this.position.left+"px",width:this.size.width+"px",height:this.size.height+"px"}),!this._helper&&this._proportionallyResizeElements.length&&this._proportionallyResize(),this._updateCache(c),this._trigger("resize",a,this.ui());return!1},_mouseStop:function(b){this.resizing=!1;var c=this.options,d=this;if(this._helper){var f=this._proportionallyResizeElements,g=f.length&&/textarea/i.test(f[0].nodeName);f=g&&a.ui.hasScroll(f[0],"left")?0:d.sizeDiff.height,g=g?0:d.sizeDiff.width,g={width:d.helper.width()-g,height:d.helper.height()-f},f=parseInt(d.element.css("left"),10)+(d.position.left-d.originalPosition.left)||null;var h=parseInt(d.element.css("top"),10)+(d.position.top-d.originalPosition.top)||null;c.animate||this.element.css(a.extend(g,{top:h,left:f})),d.helper.height(d.size.height),d.helper.width(d.size.width),this._helper&&!c.animate&&this._proportionallyResize()}a("body").css("cursor","auto"),this.element.removeClass("ui-resizable-resizing"),this._propagate("stop",b),this._helper&&this.helper.remove();return!1},_updateVirtualBoundaries:function(a){var b=this.options,d,e,f;b={minWidth:c(b.minWidth)?b.minWidth:0,maxWidth:c(b.maxWidth)?b.maxWidth:Infinity,minHeight:c(b.minHeight)?b.minHeight:0,maxHeight:c(b.maxHeight)?b.maxHeight:Infinity};if(this._aspectRatio||a)a=b.minHeight*this.aspectRatio,e=b.minWidth/this.aspectRatio,d=b.maxHeight*this.aspectRatio,f=b.maxWidth/this.aspectRatio,a>b.minWidth&&(b.minWidth=a),e>b.minHeight&&(b.minHeight=e),d<b.maxWidth&&(b.maxWidth=d),f<b.maxHeight&&(b.maxHeight=f);this._vBoundaries=b},_updateCache:function(a){this.offset=this.helper.offset(),c(a.left)&&(this.position.left=a.left),c(a.top)&&(this.position.top=a.top),c(a.height)&&(this.size.height=a.height),c(a.width)&&(this.size.width=a.width)},_updateRatio:function(a){var b=this.position,d=this.size,e=this.axis;c(a.height)?a.width=a.height*this.aspectRatio:c(a.width)&&(a.height=a.width/this.aspectRatio),e=="sw"&&(a.left=b.left+(d.width-a.width),a.top=null),e=="nw"&&(a.top=b.top+(d.height-a.height),a.left=b.left+(d.width-a.width));return a},_respectSize:function(a){var b=this._vBoundaries,d=this.axis,e=c(a.width)&&b.maxWidth&&b.maxWidth<a.width,f=c(a.height)&&b.maxHeight&&b.maxHeight<a.height,g=c(a.width)&&b.minWidth&&b.minWidth>a.width,h=c(a.height)&&b.minHeight&&b.minHeight>a.height;g&&(a.width=b.minWidth),h&&(a.height=b.minHeight),e&&(a.width=b.maxWidth),f&&(a.height=b.maxHeight);var i=this.originalPosition.left+this.originalSize.width,j=this.position.top+this.size.height,l=/sw|nw|w/.test(d);d=/nw|ne|n/.test(d),g&&l&&(a.left=i-b.minWidth),e&&l&&(a.left=i-b.maxWidth),h&&d&&(a.top=j-b.minHeight),f&&d&&(a.top=j-b.maxHeight),(b=!a.width&&!a.height)&&!a.left&&a.top?a.top=null:b&&!a.top&&a.left&&(a.left=null);return a},_proportionallyResize:function(){if(this._proportionallyResizeElements.length)for(var b=this.helper||this.element,c=0;c<this._proportionallyResizeElements.length;c++){var d=this._proportionallyResizeElements[c];if(!this.borderDif){var f=[d.css("borderTopWidth"),d.css("borderRightWidth"),d.css("borderBottomWidth"),d.css("borderLeftWidth")],g=[d.css("paddingTop"),d.css("paddingRight"),d.css("paddingBottom"),d.css("paddingLeft")];this.borderDif=a.map(f,function(a,b){a=parseInt(a,10)||0,b=parseInt(g[b],10)||0;return a+b})}a.browser.msie&&(a(b).is(":hidden")||a(b).parents(":hidden").length)||d.css({height:b.height()-this.borderDif[0]-this.borderDif[2]||0,width:b.width()-this.borderDif[1]-this.borderDif[3]||0})}},_renderProxy:function(){var b=this.options;this.elementOffset=this.element.offset();if(this._helper){this.helper=this.helper||a('<div style="overflow:hidden;"></div>');var c=a.browser.msie&&a.browser.version<7,d=c?1:0;c=c?2:-1,this.helper.addClass(this._helper).css({width:this.element.outerWidth()+c,height:this.element.outerHeight()+c,position:"absolute",left:this.elementOffset.left-d+"px",top:this.elementOffset.top-d+"px",zIndex:++b.zIndex}),this.helper.appendTo("body").disableSelection()}else this.helper=this.element},_change:{e:function(a,b){return{width:this.originalSize.width+b}},w:function(a,b){return{left:this.originalPosition.left+b,width:this.originalSize.width-b}},n:function(a,b,c){return{top:this.originalPosition.top+c,height:this.originalSize.height-c}},s:function(a,b,c){return{height:this.originalSize.height+c}},se:function(b,c,d){return a.extend(this._change.s.apply(this,arguments),this._change.e.apply(this,[b,c,d]))},sw:function(b,c,d){return a.extend(this._change.s.apply(this,arguments),this._change.w.apply(this,[b,c,d]))},ne:function(b,c,d){return a.extend(this._change.n.apply(this,arguments),this._change.e.apply(this,[b,c,d]))},nw:function(b,c,d){return a.extend(this._change.n.apply(this,arguments),this._change.w.apply(this,[b,c,d]))}},_propagate:function(b,c){a.ui.plugin.call(this,b,[c,this.ui()]),b!="resize"&&this._trigger(b,c,this.ui())},plugins:{},ui:function(){return{originalElement:this.originalElement,element:this.element,helper:this.helper,position:this.position,size:this.size,originalSize:this.originalSize,originalPosition:this.originalPosition}}}),a.extend(a.ui.resizable,{version:"1.8.16"}),a.ui.plugin.add("resizable","alsoResize",{start:function(){var b=a(this).data("resizable").options,c=function(b){a(b).each(function(){var b=a(this);b.data("resizable-alsoresize",{width:parseInt(b.width(),10),height:parseInt(b.height(),10),left:parseInt(b.css("left"),10),top:parseInt(b.css("top"),10),position:b.css("position")})})};typeof b.alsoResize=="object"&&!b.alsoResize.parentNode?b.alsoResize.length?(b.alsoResize=b.alsoResize[0],c(b.alsoResize)):a.each(b.alsoResize,function(a){c(a)}):c(b.alsoResize)},resize:function(b,c){var d=a(this).data("resizable");b=d.options;var f=d.originalSize,g=d.originalPosition,h={height:d.size.height-f.height||0,width:d.size.width-f.width||0,top:d.position.top-g.top||0,left:d.position.left-g.left||0},i=function(b,f){a(b).each(function(){var b=a(this),g=a(this).data("resizable-alsoresize"),i={},k=f&&f.length?f:b.parents(c.originalElement[0]).length?["width","height"]:["width","height","top","left"];a.each(k,function(a,b){(a=(g[b]||0)+(h[b]||0))&&a>=0&&(i[b]=a||null)}),a.browser.opera&&/relative/.test(b.css("position"))&&(d._revertToRelativePosition=!0,b.css({position:"absolute",top:"auto",left:"auto"})),b.css(i)})};typeof b.alsoResize=="object"&&!b.alsoResize.nodeType?a.each(b.alsoResize,function(a,b){i(a,b)}):i(b.alsoResize)},stop:function(){var b=a(this).data("resizable"),c=b.options,d=function(b){a(b).each(function(){var b=a(this);b.css({position:b.data("resizable-alsoresize").position})})};b._revertToRelativePosition&&(b._revertToRelativePosition=!1,typeof c.alsoResize=="object"&&!c.alsoResize.nodeType?a.each(c.alsoResize,function(a){d(a)}):d(c.alsoResize)),a(this).removeData("resizable-alsoresize")}}),a.ui.plugin.add("resizable","animate",{stop:function(b){var c=a(this).data("resizable"),d=c.options,f=c._proportionallyResizeElements,g=f.length&&/textarea/i.test(f[0].nodeName),h=g&&a.ui.hasScroll(f[0],"left")?0:c.sizeDiff.height;g={width:c.size.width-(g?0:c.sizeDiff.width),height:c.size.height-h},h=parseInt(c.element.css("left"),10)+(c.position.left-c.originalPosition.left)||null;var i=parseInt(c.element.css("top"),10)+(c.position.top-c.originalPosition.top)||null;c.element.animate(a.extend(g,i&&h?{top:i,left:h}:{}),{duration:d.animateDuration,easing:d.animateEasing,step:function(){var d={width:parseInt(c.element.css("width"),10),height:parseInt(c.element.css("height"),10),top:parseInt(c.element.css("top"),10),left:parseInt(c.element.css("left"),10)};f&&f.length&&a(f[0]).css({width:d.width,height:d.height}),c._updateCache(d),c._propagate("resize",b)}})}}),a.ui.plugin.add("resizable","containment",{start:function(){var c=a(this).data("resizable"),d=c.element,f=c.options.containment;if(d=f instanceof a?f.get(0):/parent/.test(f)?d.parent().get(0):f){c.containerElement=a(d);if(/document/.test(f)||f==document)c.containerOffset={left:0,top:0},c.containerPosition={left:0,top:0},c.parentData={element:a(document),left:0,top:0,width:a(document).width(),height:a(document).height()||document.body.parentNode.scrollHeight};else{var g=a(d),h=[];a(["Top","Right","Left","Bottom"]).each(function(a,c){h[a]=b(g.css("padding"+c))}),c.containerOffset=g.offset(),c.containerPosition=g.position(),c.containerSize={height:g.innerHeight()-h[3],width:g.innerWidth()-h[1]},f=c.containerOffset;var i=c.containerSize.height,j=c.containerSize.width;j=a.ui.hasScroll(d,"left")?d.scrollWidth:j,i=a.ui.hasScroll(d)?d.scrollHeight:i,c.parentData={element:d,left:f.left,top:f.top,width:j,height:i}}}},resize:function(b){var c=a(this).data("resizable"),d=c.options,f=c.containerOffset,g=c.position;b=c._aspectRatio||b.shiftKey;var h={top:0,left:0},i=c.containerElement;i[0]!=document&&/static/.test(i.css("position"))&&(h=f),g.left<(c._helper?f.left:0)&&(c.size.width+=c._helper?c.position.left-f.left:c.position.left-h.left,b&&(c.size.height=c.size.width/d.aspectRatio),c.position.left=d.helper?f.left:0),g.top<(c._helper?f.top:0)&&(c.size.height+=c._helper?c.position.top-f.top:c.position.top,b&&(c.size.width=c.size.height*d.aspectRatio),c.position.top=c._helper?f.top:0),c.offset.left=c.parentData.left+c.position.left,c.offset.top=c.parentData.top+c.position.top,d=Math.abs((c._helper?c.offset.left-h.left:c.offset.left-h.left)+c.sizeDiff.width),f=Math.abs((c._helper?c.offset.top-h.top:c.offset.top-f.top)+c.sizeDiff.height),g=c.containerElement.get(0)==c.element.parent().get(0),h=/relative|absolute/.test(c.containerElement.css("position")),g&&h&&(d-=c.parentData.left),d+c.size.width>=c.parentData.width&&(c.size.width=c.parentData.width-d,b&&(c.size.height=c.size.width/c.aspectRatio)),f+c.size.height>=c.parentData.height&&(c.size.height=c.parentData.height-f,b&&(c.size.width=c.size.height*c.aspectRatio))},stop:function(){var b=a(this).data("resizable"),c=b.options,d=b.containerOffset,f=b.containerPosition,g=b.containerElement,h=a(b.helper),i=h.offset(),j=h.outerWidth()-b.sizeDiff.width;h=h.outerHeight()-b.sizeDiff.height,b._helper&&!c.animate&&/relative/.test(g.css("position"))&&a(this).css({left:i.left-f.left-d.left,width:j,height:h}),b._helper&&!c.animate&&/static/.test(g.css("position"))&&a(this).css({left:i.left-f.left-d.left,width:j,height:h})}}),a.ui.plugin.add("resizable","ghost",{start:function(){var b=a(this).data("resizable"),c=b.options,d=b.size;b.ghost=b.originalElement.clone(),b.ghost.css({opacity:.25,display:"block",position:"relative",height:d.height,width:d.width,margin:0,left:0,top:0}).addClass("ui-resizable-ghost").addClass(typeof c.ghost=="string"?c.ghost:""),b.ghost.appendTo(b.helper)},resize:function(){var b=a(this).data("resizable");b.ghost&&b.ghost.css({position:"relative",height:b.size.height,width:b.size.width})},stop:function(){var b=a(this).data("resizable");b.ghost&&b.helper&&b.helper.get(0).removeChild(b.ghost.get(0))}}),a.ui.plugin.add("resizable","grid",{resize:function(){var b=a(this).data("resizable"),c=b.options,d=b.size,f=b.originalSize,g=b.originalPosition,h=b.axis;c.grid=typeof c.grid=="number"?[c.grid,c.grid]:c.grid;var i=Math.round((d.width-f.width)/(c.grid[0]||1))*(c.grid[0]||1);c=Math.round((d.height-f.height)/(c.grid[1]||1))*(c.grid[1]||1),/^(se|s|e)$/.test(h)?(b.size.width=f.width+i,b.size.height=f.height+c):/^(ne)$/.test(h)?(b.size.width=f.width+i,b.size.height=f.height+c,b.position.top=g.top-c):(/^(sw)$/.test(h)?(b.size.width=f.width+i,b.size.height=f.height+c):(b.size.width=f.width+i,b.size.height=f.height+c,b.position.top=g.top-c),b.position.left=g.left-i)}});var b=function(a){return parseInt(a,10)||0},c=function(a){return!isNaN(parseInt(a,10))}}(jQuery),function(a){a.widget("ui.selectable",a.ui.mouse,{options:{appendTo:"body",autoRefresh:!0,distance:0,filter:"*",tolerance:"touch"},_create:function(){var b=this;this.element.addClass("ui-selectable"),this.dragged=!1;var c;this.refresh=function(){c=a(b.options.filter,b.element[0]),c.each(function(){var b=a(this),c=b.offset();a.data(this,"selectable-item",{element:this,$element:b,left:c.left,top:c.top,right:c.left+b.outerWidth(),bottom:c.top+b.outerHeight(),startselected:!1,selected:b.hasClass("ui-selected"),selecting:b.hasClass("ui-selecting"),unselecting:b.hasClass("ui-unselecting")})})},this.refresh(),this.selectees=c.addClass("ui-selectee"),this._mouseInit(),this.helper=a("<div class='ui-selectable-helper'></div>")},destroy:function(){this.selectees.removeClass("ui-selectee").removeData("selectable-item"),this.element.removeClass("ui-selectable ui-selectable-disabled").removeData("selectable").unbind(".selectable"),this._mouseDestroy();return this},_mouseStart:function(b){var c=this;this.opos=[b.pageX,b.pageY];if(!this.options.disabled){var d=this.options;this.selectees=a(d.filter,this.element[0]),this._trigger("start",b),a(d.appendTo).append(this.helper),this.helper.css({left:b.clientX,top:b.clientY,width:0,height:0}),d.autoRefresh&&this.refresh(),this.selectees.filter(".ui-selected").each(function(){var d=a.data(this,"selectable-item");d.startselected=!0,b.metaKey||(d.$element.removeClass("ui-selected"),d.selected=!1,d.$element.addClass("ui-unselecting"),d.unselecting=!0,c._trigger("unselecting",b,{unselecting:d.element}))}),a(b.target).parents().andSelf().each(function(){var d=a.data(this,"selectable-item");if(d){var g=!b.metaKey||!d.$element.hasClass("ui-selected");d.$element.removeClass(g?"ui-unselecting":"ui-selected").addClass(g?"ui-selecting":"ui-unselecting"),d.unselecting=!g,d.selecting=g,(d.selected=g)?c._trigger("selecting",b,{selecting:d.element}):c._trigger("unselecting",b,{unselecting:d.element});return!1}})}},_mouseDrag:function(b){var c=this;this.dragged=!0;if(!this.options.disabled){var d=this.options,f=this.opos[0],g=this.opos[1],h=b.pageX,i=b.pageY;if(f>h){var j=h;h=f,f=j}g>i&&(j=i,i=g,g=j),this.helper.css({left:f,top:g,width:h-f,height:i-g}),this.selectees.each(function(){var j=a.data(this,"selectable-item");if(!!j&&j.element!=c.element[0]){var k=!1;d.tolerance=="touch"?k=!(j.left>h||j.right<f||j.top>i||j.bottom<g):d.tolerance=="fit"&&(k=j.left>f&&j.right<h&&j.top>g&&j.bottom<i),k?(j.selected&&(j.$element.removeClass("ui-selected"),j.selected=!1),j.unselecting&&(j.$element.removeClass("ui-unselecting"),j.unselecting=!1),j.selecting||(j.$element.addClass("ui-selecting"),j.selecting=!0,c._trigger("selecting",b,{selecting:j.element}))):(j.selecting&&(b.metaKey&&j.startselected?(j.$element.removeClass("ui-selecting"),j.selecting=!1,j.$element.addClass("ui-selected"),j.selected=!0):(j.$element.removeClass("ui-selecting"),j.selecting=!1,j.startselected&&(j.$element.addClass("ui-unselecting"),j.unselecting=!0),c._trigger("unselecting",b,{unselecting:j.element}))),j.selected&&!b.metaKey&&!j.startselected&&(j.$element.removeClass("ui-selected"),j.selected=!1,j.$element.addClass("ui-unselecting"),j.unselecting=!0,c._trigger("unselecting",b,{unselecting:j.element})))}});return!1}},_mouseStop:function(b){var c=this;this.dragged=!1,a(".ui-unselecting",this.element[0]).each(function(){var d=a.data(this,"selectable-item");d.$element.removeClass("ui-unselecting"),d.unselecting=!1,d.startselected=!1,c._trigger("unselected",b,{unselected:d.element})}),a(".ui-selecting",this.element[0]).each(function(){var d=a.data(this,"selectable-item");d.$element.removeClass("ui-selecting").addClass("ui-selected"),d.selecting=!1,d.selected=!0,d.startselected=!0,c._trigger("selected",b,{selected:d.element})}),this._trigger("stop",b),this.helper.remove();return!1}}),a.extend(a.ui.selectable,{version:"1.8.16"})}(jQuery),function(a){a.widget("ui.sortable",a.ui.mouse,{widgetEventPrefix:"sort",options:{appendTo:"parent",axis:!1,connectWith:!1,containment:!1,cursor:"auto",cursorAt:!1,dropOnEmpty:!0,forcePlaceholderSize:!1,forceHelperSize:!1,grid:!1,handle:!1,helper:"original",items:"> *",opacity:!1,placeholder:!1,revert:!1,scroll:!0,scrollSensitivity:20,scrollSpeed:20,scope:"default",tolerance:"intersect",zIndex:1e3},_create:function(){var a=this.options;this.containerCache={},this.element.addClass("ui-sortable"),this.refresh(),this.floating=this.items.length?a.axis==="x"||/left|right/.test(this.items[0].item.css("float"))||/inline|table-cell/.test(this.items[0].item.css("display")):!1,this.offset=this.element.offset(),this._mouseInit()},destroy:function(){this.element.removeClass("ui-sortable ui-sortable-disabled").removeData("sortable").unbind(".sortable"),this._mouseDestroy();for(var a=this.items.length-1;a>=0;a--)this.items[a].item.removeData("sortable-item");return this},_setOption:function(b,c){b==="disabled"?(this.options[b]=c,this.widget()[c?"addClass":"removeClass"]("ui-sortable-disabled")):a.Widget.prototype._setOption.apply(this,arguments)},_mouseCapture:function(b,c){if(this.reverting)return!1;if(this.options.disabled||this.options.type=="static")return!1;this._refreshItems(b);var e=null,f=this;a(b.target).parents().each(function(){if(a.data(this,"sortable-item")==f){e=a(this);return!1}}),a.data(b.target,"sortable-item")==f&&(e=a(b.target));if(!e)return!1;if(this.options.handle&&!c){var g=!1;a(this.options.handle,e).find("*").andSelf().each(function(){this==b.target&&(g=!0)});if(!g)return!1}this.currentItem=e,this._removeCurrentsFromItems();return!0},_mouseStart:function(b,c,e){c=this.options;var f=this;this.currentContainer=this,this.refreshPositions(),this.helper=this._createHelper(b),this._cacheHelperProportions(),this._cacheMargins(),this.scrollParent=this.helper.scrollParent(),this.offset=this.currentItem.offset(),this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left},this.helper.css("position","absolute"),this.cssPosition=this.helper.css("position"),a.extend(this.offset,{click:{left:b.pageX-this.offset.left,top:b.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()}),this.originalPosition=this._generatePosition(b),this.originalPageX=b.pageX,this.originalPageY=b.pageY,c.cursorAt&&this._adjustOffsetFromHelper(c.cursorAt),this.domPosition={prev:this.currentItem.prev()[0],parent:this.currentItem.parent()[0]},this.helper[0]!=this.currentItem[0]&&this.currentItem.hide(),this._createPlaceholder(),c.containment&&this._setContainment(),c.cursor&&(a("body").css("cursor")&&(this._storedCursor=a("body").css("cursor")),a("body").css("cursor",c.cursor)),c.opacity&&(this.helper.css("opacity")&&(this._storedOpacity=this.helper.css("opacity")),this.helper.css("opacity",c.opacity)),c.zIndex&&(this.helper.css("zIndex")&&(this._storedZIndex=this.helper.css("zIndex")),this.helper.css("zIndex",c.zIndex)),this.scrollParent[0]!=document&&this.scrollParent[0].tagName!="HTML"&&(this.overflowOffset=this.scrollParent.offset()),this._trigger("start",b,this._uiHash()),this._preserveHelperProportions||this._cacheHelperProportions();if(!e)for(e=this.containers.length-1;e>=0;e--)this.containers[e]._trigger("activate",b,f._uiHash(this));a.ui.ddmanager&&(a.ui.ddmanager.current=this),a.ui.ddmanager&&!c.dropBehaviour&&a.ui.ddmanager.prepareOffsets(this,b),this.dragging=!0,this.helper.addClass("ui-sortable-helper"),this._mouseDrag(b);return!0},_mouseDrag:function(b){this.position=this._generatePosition(b),this.positionAbs=this._convertPositionTo("absolute"),this.lastPositionAbs||(this.lastPositionAbs=this.positionAbs);if(this.options.scroll){var c=this.options,e=!1;this.scrollParent[0]!=document&&this.scrollParent[0].tagName!="HTML"?(this.overflowOffset.top+this.scrollParent[0].offsetHeight-b.pageY<c.scrollSensitivity?this.scrollParent[0].scrollTop=e=this.scrollParent[0].scrollTop+c.scrollSpeed:b.pageY-this.overflowOffset.top<c.scrollSensitivity&&(this.scrollParent[0].scrollTop=e=this.scrollParent[0].scrollTop-c.scrollSpeed),this.overflowOffset.left+this.scrollParent[0].offsetWidth-b.pageX<c.scrollSensitivity?this.scrollParent[0].scrollLeft=e=this.scrollParent[0].scrollLeft+c.scrollSpeed:b.pageX-this.overflowOffset.left<c.scrollSensitivity&&(this.scrollParent[0].scrollLeft=e=this.scrollParent[0].scrollLeft-c.scrollSpeed)):(b.pageY-a(document).scrollTop()<c.scrollSensitivity?e=a(document).scrollTop(a(document).scrollTop()-c.scrollSpeed):a(window).height()-(b.pageY-a(document).scrollTop())<c.scrollSensitivity&&(e=a(document).scrollTop(a(document).scrollTop()+c.scrollSpeed)),b.pageX-a(document).scrollLeft()<c.scrollSensitivity?e=a(document).scrollLeft(a(document).scrollLeft()-c.scrollSpeed):a(window).width()-(b.pageX-a(document).scrollLeft())<c.scrollSensitivity&&(e=a(document).scrollLeft(a(document).scrollLeft()+c.scrollSpeed))),e!==!1&&a.ui.ddmanager&&!c.dropBehaviour&&a.ui.ddmanager.prepareOffsets(this,b)}this.positionAbs=this._convertPositionTo("absolute");if(!this.options.axis||this.options.axis!="y")this.helper[0].style.left=this.position.left+"px";if(!this.options.axis||this.options.axis!="x")this.helper[0].style.top=this.position.top+"px";for(c=this.items.length-1;c>=0;c--){e=this.items[c];var f=e.item[0],g=this._intersectsWithPointer(e);if(g&&f!=this.currentItem[0]&&this.placeholder[g==1?"next":"prev"]()[0]!=f&&!a.ui.contains(this.placeholder[0],f)&&(this.options.type=="semi-dynamic"?!a.ui.contains(this.element[0],f):!0)){this.direction=g==1?"down":"up";if(this.options.tolerance=="pointer"||this._intersectsWithSides(e))this._rearrange(b,e);else break;this._trigger("change",b,this._uiHash());break}}this._contactContainers(b),a.ui.ddmanager&&a.ui.ddmanager.drag(this,b),this._trigger("sort",b,this._uiHash()),this.lastPositionAbs=this.positionAbs;return!1},_mouseStop:function(b,c){if(b){a.ui.ddmanager&&!this.options.dropBehaviour&&a.ui.ddmanager.drop(this,b);if(this.options.revert){var e=this;c=e.placeholder.offset(),e.reverting=!0,a(this.helper).animate({left:c.left-this.offset.parent.left-e.margins.left+(this.offsetParent[0]==document.body?0:this.offsetParent[0].scrollLeft),top:c.top-this.offset.parent.top-e.margins.top+(this.offsetParent[0]==document.body?0:this.offsetParent[0].scrollTop)},parseInt(this.options.revert,10)||500,function(){e._clear(b)})}else this._clear(b,c);return!1}},cancel:function(){var b=this;if(this.dragging){this._mouseUp({target:null}),this.options.helper=="original"?this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper"):this.currentItem.show();for(var c=this.containers.length-1;c>=0;c--)this.containers[c]._trigger("deactivate",null,b._uiHash(this)),this.containers[c].containerCache.over&&(this.containers[c]._trigger("out",null,b._uiHash(this)),this.containers[c].containerCache.over=0)}this.placeholder&&(this.placeholder[0].parentNode&&this.placeholder[0].parentNode.removeChild(this.placeholder[0]),this.options.helper!="original"&&this.helper&&this.helper[0].parentNode&&this.helper.remove(),a.extend(this,{helper:null,dragging:!1,reverting:!1,_noFinalSort:null}),this.domPosition.prev?a(this.domPosition.prev).after(this.currentItem):a(this.domPosition.parent).prepend(this.currentItem));return this},serialize:function(b){var c=this._getItemsAsjQuery(b&&b.connected),e=[];b=b||{},a(c).each(function(){var c=(a(b.item||this).attr(b.attribute||"id")||"").match(b.expression||/(.+)[-=_](.+)/);c&&e.push((b.key||c[1]+"[]")+"="+(b.key&&b.expression?c[1]:c[2]))}),!e.length&&b.key&&e.push(b.key+"=");return e.join("&")},toArray:function(b){var c=this._getItemsAsjQuery(b&&b.connected),e=[];b=b||{},c.each(function(){e.push(a(b.item||this).attr(b.attribute||"id")||"")});return e},_intersectsWith:function(a){var b=this.positionAbs.left,c=b+this.helperProportions.width,d=this.positionAbs.top,e=d+this.helperProportions.height,f=a.left,g=f+a.width,h=a.top,i=h+a.height,j=this.offset.click.top,k=this.offset.click.left;j=d+j>h&&d+j<i&&b+k>f&&b+k<g;return this.options.tolerance=="pointer"||this.options.forcePointerForContainers||this.options.tolerance!="pointer"&&this.helperProportions[this.floating?"width":"height"]>a[this.floating?"width":"height"]?j:f<b+this.helperProportions.width/2&&c-this.helperProportions.width/2<g&&h<d+this.helperProportions.height/2&&e-this.helperProportions.height/2<i},_intersectsWithPointer:function(b){var c=a.ui.isOverAxis(this.positionAbs.top+this.offset.click.top,b.top,b.height);b=a.ui.isOverAxis(this.positionAbs.left+this.offset.click.left,b.left,b.width),c=c&&b,b=this._getDragVerticalDirection();var e=this._getDragHorizontalDirection();return c?this.floating?e&&e=="right"||b=="down"?2:1:b&&(b=="down"?2:1):!1},_intersectsWithSides:function(b){var c=a.ui.isOverAxis(this.positionAbs.top+this.offset.click.top,b.top+b.height/2,b.height);b=a.ui.isOverAxis(this.positionAbs.left+this.offset.click.left,b.left+b.width/2,b.width);var e=this._getDragVerticalDirection(),f=this._getDragHorizontalDirection();return this.floating&&f?f=="right"&&b||f=="left"&&!b:e&&(e=="down"&&c||e=="up"&&!c)},_getDragVerticalDirection:function(){var a=this.positionAbs.top-this.lastPositionAbs.top;return a!=0&&(a>0?"down":"up")},_getDragHorizontalDirection:function(){var a=this.positionAbs.left-this.lastPositionAbs.left;return a!=0&&(a>0?"right":"left")},refresh:function(a){this._refreshItems(a),this.refreshPositions();return this},_connectWith:function(){var a=this.options;return a.connectWith.constructor==String?[a.connectWith]:a.connectWith},_getItemsAsjQuery:function(b){var c=[],e=[],f=this._connectWith();if(f&&b)for(b=f.length-1;b>=0;b--)for(var g=a(f[b]),h=g.length-1;h>=0;h--){var i=a.data(g[h],"sortable");i&&i!=this&&!i.options.disabled&&e.push([a.isFunction(i.options.items)?i.options.items.call(i.element):a(i.options.items,i.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),i])}e.push([a.isFunction(this.options.items)?this.options.items.call(this.element,null,{options:this.options,item:this.currentItem}):a(this.options.items,this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),this]);for(b=e.length-1;b>=0;b--)e[b][0].each(function(){c.push(this)});return a(c)},_removeCurrentsFromItems:function(){for(var a=this.currentItem.find(":data(sortable-item)"),b=0;b<this.items.length;b++)for(var c=0;c<a.length;c++)a[c]==this.items[b].item[0]&&this.items.splice(b,1)},_refreshItems:function(b){this.items=[],this.containers=[this];var c=this.items,e=[[a.isFunction(this.options.items)?this.options.items.call(this.element[0],b,{item:this.currentItem}):a(this.options.items,this.element),this]],f=this._connectWith();if(f)for(var g=f.length-1;g>=0;g--)for(var h=a(f[g]),i=h.length-1;i>=0;i--){var j=a.data(h[i],"sortable");j&&j!=this&&!j.options.disabled&&(e.push([a.isFunction(j.options.items)?j.options.items.call(j.element[0],b,{item:this.currentItem}):a(j.options.items,j.element),j]),this.containers.push(j))}for(g=e.length-1;g>=0;g--){b=e[g][1],f=e[g][0],i=0;for(h=f.length;i<h;i++)j=a(f[i]),j.data("sortable-item",b),c.push({item:j,instance:b,width:0,height:0,left:0,top:0})}},refreshPositions:function(b){this.offsetParent&&this.helper&&(this.offset.parent=this._getParentOffset());for(var c=this.items.length-1;c>=0;c--){var e=this.items[c];if(e.instance==this.currentContainer||!this.currentContainer||e.item[0]==this.currentItem[0]){var f=this.options.toleranceElement?a(this.options.toleranceElement,e.item):e.item;b||(e.width=f.outerWidth(),e.height=f.outerHeight()),f=f.offset(),e.left=f.left,e.top=f.top}}if(this.options.custom&&this.options.custom.refreshContainers)this.options.custom.refreshContainers.call(this);else for(c=this.containers.length-1;c>=0;c--)f=this.containers[c].element.offset(),this.containers[c].containerCache.left=f.left,this.containers[c].containerCache.top=f.top,this.containers[c].containerCache.width=this.containers[c].element.outerWidth(),this.containers[c].containerCache.height=this.containers[c].element.outerHeight();return this},_createPlaceholder:function(b){var c=b||this,e=c.options;if(!e.placeholder||e.placeholder.constructor==String){var f=e.placeholder;e.placeholder={element:function(){var b=a(document.createElement(c.currentItem[0].nodeName)).addClass(f||c.currentItem[0].className+" ui-sortable-placeholder").removeClass("ui-sortable-helper")[0];f||(b.style.visibility="hidden");return b},update:function(a,b){if(!f||!!e.forcePlaceholderSize)b.height()||b.height(c.currentItem.innerHeight()-parseInt(c.currentItem.css("paddingTop")||0,10)-parseInt(c.currentItem.css("paddingBottom")||0,10)),b.width()||b.width(c.currentItem.innerWidth()-parseInt(c.currentItem.css("paddingLeft")||0,10)-parseInt(c.currentItem.css("paddingRight")||0,10))}}}c.placeholder=a(e.placeholder.element.call(c.element,c.currentItem)),c.currentItem.after(c.placeholder),e.placeholder.update(c,c.placeholder)},_contactContainers:function(b){for(var c=null,e=null,f=this.containers.length-1;f>=0;f--)if(!a.ui.contains(this.currentItem[0],this.containers[f].element[0]))if(this._intersectsWith(this.containers[f].containerCache)){if(!c||!a.ui.contains(this.containers[f].element[0],c.element[0]))c=this.containers[f],e=f}else this.containers[f].containerCache.over&&(this.containers[f]._trigger("out",b,this._uiHash(this)),this.containers[f].containerCache.over=0);if(c)if(this.containers.length===1)this.containers[e]._trigger("over",b,this._uiHash(this)),this.containers[e].containerCache.over=1;else if(this.currentContainer!=this.containers[e]){c=1e4,f=null;for(var g=this.positionAbs[this.containers[e].floating?"left":"top"],h=this.items.length-1;h>=0;h--)if(a.ui.contains(this.containers[e].element[0],this.items[h].item[0])){var i=this.items[h][this.containers[e].floating?"left":"top"];Math.abs(i-g)<c&&(c=Math.abs(i-g),f=this.items[h])}if(f||this.options.dropOnEmpty)this.currentContainer=this.containers[e],f?this._rearrange(b,f,null,!0):this._rearrange(b,null,this.containers[e].element,!0),this._trigger("change",b,this._uiHash()),this.containers[e]._trigger("change",b,this._uiHash(this)),this.options.placeholder.update(this.currentContainer,this.placeholder),this.containers[e]._trigger("over",b,this._uiHash(this)),this.containers[e].containerCache.over=1}},_createHelper:function(b){var c=this.options;b=a.isFunction(c.helper)?a(c.helper.apply(this.element[0],[b,this.currentItem])):c.helper=="clone"?this.currentItem.clone():this.currentItem,b.parents("body").length||a(c.appendTo!="parent"?c.appendTo:this.currentItem[0].parentNode)[0].appendChild(b[0]),b[0]==this.currentItem[0]&&(this._storedCSS={width:this.currentItem[0].style.width,height:this.currentItem[0].style.height,position:this.currentItem.css("position"),top:this.currentItem.css("top"),left:this.currentItem.css("left")}),(b[0].style.width==""||c.forceHelperSize)&&b.width(this.currentItem.width()),(b[0].style.height==""||c.forceHelperSize)&&b.height(this.currentItem.height());return b},_adjustOffsetFromHelper:function(b){typeof b=="string"&&(b=b.split(" ")),a.isArray(b)&&(b={left:+b[0],top:+b[1]||0}),"left"in b&&(this.offset.click.left=b.left+this.margins.left),"right"in b&&(this.offset.click.left=this.helperProportions.width-b.right+this.margins.left),"top"in b&&(this.offset.click.top=b.top+this.margins.top),"bottom"in b&&(this.offset.click.top=this.helperProportions.height-b.bottom+this.margins.top)},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();var b=this.offsetParent.offset();this.cssPosition=="absolute"&&this.scrollParent[0]!=document&&a.ui.contains(this.scrollParent[0],this.offsetParent[0])&&(b.left+=this.scrollParent.scrollLeft(),b.top+=this.scrollParent.scrollTop());if(this.offsetParent[0]==document.body||this.offsetParent[0].tagName&&this.offsetParent[0].tagName.toLowerCase()=="html"&&a.browser.msie)b={top:0,left:0};return{top:b.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:b.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if(this.cssPosition=="relative"){var a=this.currentItem.position();return{top:a.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:a.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}return{top:0,left:0}},_cacheMargins:function(){this.margins={left:parseInt(this.currentItem.css("marginLeft"),10)||0,top:parseInt(this.currentItem.css("marginTop"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var b=this.options;b.containment=="parent"&&(b.containment=this.helper[0].parentNode);if(b.containment=="document"||b.containment=="window")this.containment=[0-this.offset.relative.left-this.offset.parent.left,0-this.offset.relative.top-this.offset.parent.top,a(b.containment=="document"?document:window).width()-this.helperProportions.width-this.margins.left,(a(b.containment=="document"?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top];if(!/^(document|window|parent)$/.test(b.containment)){var c=a(b.containment)[0];b=a(b.containment).offset();var e=a(c).css("overflow")!="hidden";this.containment=[b.left+(parseInt(a(c).css("borderLeftWidth"),10)||0)+(parseInt(a(c).css("paddingLeft"),10)||0)-this.margins.left,b.top+(parseInt(a(c).css("borderTopWidth"),10)||0)+(parseInt(a(c).css("paddingTop"),10)||0)-this.margins.top,b.left+(e?Math.max(c.scrollWidth,c.offsetWidth):c.offsetWidth)-(parseInt(a(c).css("borderLeftWidth"),10)||0)-(parseInt(a(c).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left,b.top+(e?Math.max(c.scrollHeight,c.offsetHeight):c.offsetHeight)-(parseInt(a(c).css("borderTopWidth"),10)||0)-(parseInt(a(c).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top]}},_convertPositionTo:function(b,c){c||(c=this.position),b=b=="absolute"?1:-1;var e=this.cssPosition=="absolute"&&(this.scrollParent[0]==document||!a.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,f=/(html|body)/i.test(e[0].tagName);return{top:c.top+this.offset.relative.top*b+this.offset.parent.top*b-(a.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():f?0:e.scrollTop())*b),left:c.left+this.offset.relative.left*b+this.offset.parent.left*b-(a.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():f?0:e.scrollLeft())*b)}},_generatePosition:function(b){var c=this.options,e=this.cssPosition=="absolute"&&(this.scrollParent[0]==document||!a.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,f=/(html|body)/i.test(e[0].tagName);this.cssPosition=="relative"&&(this.scrollParent[0]==document||this.scrollParent[0]==this.offsetParent[0])&&(this.offset.relative=this._getRelativeOffset());var g=b.pageX,h=b.pageY;this.originalPosition&&(this.containment&&(b.pageX-this.offset.click.left<this.containment[0]&&(g=this.containment[0]+this.offset.click.left),b.pageY-this.offset.click.top<this.containment[1]&&(h=this.containment[1]+this.offset.click.top),b.pageX-this.offset.click.left>this.containment[2]&&(g=this.containment[2]+this.offset.click.left),b.pageY-this.offset.click.top>this.containment[3]&&(h=this.containment[3]+this.offset.click.top)),c.grid&&(h=this.originalPageY+Math.round((h-this.originalPageY)/c.grid[1])*c.grid[1],h=this.containment?h-this.offset.click.top<this.containment[1]||h-this.offset.click.top>this.containment[3]?h-this.offset.click.top<this.containment[1]?h+c.grid[1]:h-c.grid[1]:h:h,g=this.originalPageX+Math.round((g-this.originalPageX)/c.grid[0])*c.grid[0],g=this.containment?g-this.offset.click.left<this.containment[0]||g-this.offset.click.left>this.containment[2]?g-this.offset.click.left<this.containment[0]?g+c.grid[0]:g-c.grid[0]:g:g));return{top:h-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+(a.browser.safari&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollTop():f?0:e.scrollTop()),left:g-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+(a.browser.safari&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():f?0:e.scrollLeft())}},_rearrange:function(a,b,c,d){c?c[0].appendChild(this.placeholder[0]):b.item[0].parentNode.insertBefore(this.placeholder[0],this.direction=="down"?b.item[0]:b.item[0].nextSibling),this.counter=this.counter?++this.counter:1;var e=this,f=this.counter;window.setTimeout(function(){f==e.counter&&e.refreshPositions(!d)},0)},_clear:function(b,c){this.reverting=!1;var e=[];!this._noFinalSort&&this.currentItem.parent().length&&this.placeholder.before(this.currentItem),this._noFinalSort=null;if(this.helper[0]==this.currentItem[0]){for(var f in this._storedCSS)if(this._storedCSS[f]=="auto"||this._storedCSS[f]=="static")this._storedCSS[f]="";this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")}else this.currentItem.show();this.fromOutside&&!c&&e.push(function(a){this._trigger("receive",a,this._uiHash(this.fromOutside))}),(this.fromOutside||this.domPosition.prev!=this.currentItem.prev().not(".ui-sortable-helper")[0]||this.domPosition.parent!=this.currentItem.parent()[0])&&!c&&e.push(function(a){this._trigger("update",a,this._uiHash())});if(!a.ui.contains(this.element[0],this.currentItem[0])){c||e.push(function(a){this._trigger("remove",a,this._uiHash())});for(f=this.containers.length-1;f>=0;f--)a.ui.contains(this.containers[f].element[0],this.currentItem[0])&&!c&&(e.push(function(a){return function(b){a._trigger("receive",b,this._uiHash(this))}}.call(this,this.containers[f])),e.push(function(a){return function(b){a._trigger("update",b,this._uiHash(this))}}.call(this,this.containers[f])))}for(f=this.containers.length-1;f>=0;f--)c||e.push(function(a){return function(b){a._trigger("deactivate",b,this._uiHash(this))}}.call(this,this.containers[f])),this.containers[f].containerCache.over&&(e.push(function(a){return function(b){a._trigger("out",b,this._uiHash(this))}}.call(this,this.containers[f])),this.containers[f].containerCache.over=0);this._storedCursor&&a("body").css("cursor",this._storedCursor),this._storedOpacity&&this.helper.css("opacity",this._storedOpacity),this._storedZIndex&&this.helper.css("zIndex",this._storedZIndex=="auto"?"":this._storedZIndex),this.dragging=!1;if(this.cancelHelperRemoval){if(!c){this._trigger("beforeStop",b,this._uiHash());for(f=0;f<e.length;f++)e[f].call(this,b);this._trigger("stop",b,this._uiHash())}return!1}c||this._trigger("beforeStop",b,this._uiHash()),this.placeholder[0].parentNode.removeChild(this.placeholder[0]),this.helper[0]!=this.currentItem[0]&&this.helper.remove(),this.helper=null;if(!c){for(f=0;f<e.length;f++)e[f].call(this,b);this._trigger("stop",b,this._uiHash())}this.fromOutside=!1;return!0},_trigger:function(){a.Widget.prototype._trigger.apply(this,arguments)===!1&&this.cancel()},_uiHash:function(b){var c=b||this;return{helper:c.helper,placeholder:c.placeholder||a([]),position:c.position,originalPosition:c.originalPosition,offset:c.positionAbs,item:c.currentItem,sender:b?b.element:null}}}),a.extend(a.ui.sortable,{version:"1.8.16"})}(jQuery),function(a){a.widget("ui.accordion",{options:{active:0,animated:"slide",autoHeight:!0,clearStyle:!1,collapsible:!1,event:"click",fillSpace:!1,header:"> li > :first-child,> :not(li):even",icons:{header:"ui-icon-triangle-1-e",headerSelected:"ui-icon-triangle-1-s"},navigation:!1,navigationFilter:function(){return this.href.toLowerCase()===location.href.toLowerCase()}},_create:function(){var b=this,d=b.options;b.running=0,b.element.addClass("ui-accordion ui-widget ui-helper-reset").children("li").addClass("ui-accordion-li-fix"),b.headers=b.element.find(d.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all").bind("mouseenter.accordion",function(){d.disabled||a(this).addClass("ui-state-hover")}).bind("mouseleave.accordion",function(){d.disabled||a(this).removeClass("ui-state-hover")}).bind("focus.accordion",function(){d.disabled||a(this).addClass("ui-state-focus")}).bind("blur.accordion",function(){d.disabled||a(this).removeClass("ui-state-focus")}),b.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom");if(d.navigation){var e=b.element.find("a").filter(d.navigationFilter).eq(0);if(e.length){var f=e.closest(".ui-accordion-header");b.active=f.length?f:e.closest(".ui-accordion-content").prev()}}b.active=b._findActive(b.active||d.active).addClass("ui-state-default ui-state-active").toggleClass("ui-corner-all").toggleClass("ui-corner-top"),b.active.next().addClass("ui-accordion-content-active"),b._createIcons(),b.resize(),b.element.attr("role","tablist"),b.headers.attr("role","tab").bind("keydown.accordion",function(a){return b._keydown(a)}).next().attr("role","tabpanel"),b.headers.not(b.active||"").attr({"aria-expanded":"false","aria-selected":"false",tabIndex:-1}).next().hide(),b.active.length?b.active.attr({"aria-expanded":"true","aria-selected":"true",tabIndex:0}):b.headers.eq(0).attr("tabIndex",0),a.browser.safari||b.headers.find("a").attr("tabIndex",-1),d.event&&b.headers.bind(d.event.split(" ").join(".accordion ")+".accordion",function(a){b._clickHandler.call(b,a,this),a.preventDefault()})},_createIcons:function(){var b=this.options;b.icons&&(a("<span></span>").addClass("ui-icon "+b.icons.header).prependTo(this.headers),this.active.children(".ui-icon").toggleClass(b.icons.header).toggleClass(b.icons.headerSelected),this.element.addClass("ui-accordion-icons"))},_destroyIcons:function(){this.headers.children(".ui-icon").remove(),this.element.removeClass("ui-accordion-icons")},destroy:function(){var b=this.options;this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role"),this.headers.unbind(".accordion").removeClass("ui-accordion-header ui-accordion-disabled ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-selected").removeAttr("tabIndex"),this.headers.find("a").removeAttr("tabIndex"),this._destroyIcons();var d=this.headers.next().css("display","").removeAttr("role").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-accordion-disabled ui-state-disabled");(b.autoHeight||b.fillHeight)&&d.css("height","");return a.Widget.prototype.destroy.call(this)},_setOption:function(b,d){a.Widget.prototype._setOption.apply(this,arguments),b=="active"&&this.activate(d),b=="icons"&&(this._destroyIcons(),d&&this._createIcons()),b=="disabled"&&this.headers.add(this.headers.next())[d?"addClass":"removeClass"]("ui-accordion-disabled ui-state-disabled")},_keydown:function(b){if(!(this.options.disabled||b.altKey||b.ctrlKey)){var d=a.ui.keyCode,e=this.headers.length,f=this.headers.index(b.target),g=!1;switch(b.keyCode){case d.RIGHT:case d.DOWN:g=this.headers[(f+1)%e];break;case d.LEFT:case d.UP:g=this.headers[(f-1+e)%e];break;case d.SPACE:case d.ENTER:this._clickHandler({target:b.target},b.target),b.preventDefault()}if(g){a(b.target).attr("tabIndex",-1),a(g).attr("tabIndex",0),g.focus();return!1}return!0}},resize:function(){var b=this.options,d;if(b.fillSpace){if(a.browser.msie){var e=this.element.parent().css("overflow");this.element.parent().css("overflow","hidden")}d=this.element.parent().height(),a.browser.msie&&this.element.parent().css("overflow",e),this.headers.each(function(){d-=a(this).outerHeight(!0)}),this.headers.next().each(function(){a(this).height(Math.max(0,d-a(this).innerHeight()+a(this).height()))}).css("overflow","auto")}else b.autoHeight&&(d=0,this.headers.next().each(function(){d=Math.max(d,a(this).height("").height())}).height(d));return this},activate:function(a){this.options.active=a,a=this._findActive(a)[0],this._clickHandler({target:a},a);return this},_findActive:function(b){return b?typeof b=="number"?this.headers.filter(":eq("+b+")"):this.headers.not(this.headers.not(b)):b===!1?a([]):this.headers.filter(":eq(0)")},_clickHandler:function(b,d){var e=this.options;if(!e.disabled)if(b.target){b=a(b.currentTarget||d),d=b[0]===this.active[0],e.active=e.collapsible&&d?!1:this.headers.index(b);if(!(this.running||!e.collapsible&&d)){var f=this.active;j=b.next(),h=this.active.next(),i={options:e,newHeader:d&&e.collapsible?a([]):b,oldHeader:this.active,newContent:d&&e.collapsible?a([]):j,oldContent:h};var g=this.headers.index(this.active[0])>this.headers.index(b[0]);this.active=d?a([]):b,this._toggle(j,h,i,d,g),f.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(e.icons.headerSelected).addClass(e.icons.header),d||(b.removeClass("ui-state-default ui-corner-all").addClass("ui-state-active ui-corner-top").children(".ui-icon").removeClass(e.icons.header).addClass(e.icons.headerSelected),b.next().addClass("ui-accordion-content-active"))}}else if(e.collapsible){this.active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(e.icons.headerSelected).addClass(e.icons.header),this.active.next().addClass("ui-accordion-content-active");var h=this.active.next(),i={options:e,newHeader:a([]),oldHeader:e.active,newContent:a([]),oldContent:h},j=this.active=a([]);this._toggle(j,h,i)}},_toggle:function(b,d,e,f,g){var h=this,i=h.options;h.toShow=b,h.toHide=d,h.data=e;var j=function(){if(h)return h._completed.apply(h,arguments)};h._trigger("changestart",null,h.data),h.running=d.size()===0?b.size():d.size();if(i.animated){e={},e=i.collapsible&&f?{toShow:a([]),toHide:d,complete:j,down:g,autoHeight:i.autoHeight||i.fillSpace}:{toShow:b,toHide:d,complete:j,down:g,autoHeight:i.autoHeight||i.fillSpace},i.proxied||(i.proxied=i.animated),i.proxiedDuration||(i.proxiedDuration=i.duration),i.animated=a.isFunction(i.proxied)?i.proxied(e):i.proxied,i.duration=a.isFunction(i.proxiedDuration)?i.proxiedDuration(e):i.proxiedDuration,f=a.ui.accordion.animations;var k=i.duration,l=i.animated;l&&!f[l]&&!a.easing[l]&&(l="slide"),f[l]||(f[l]=function(a){this.slide(a,{easing:l,duration:k||700})}),f[l](e)}else i.collapsible&&f?b.toggle():(d.hide(),b.show()),j(!0);d.prev().attr({"aria-expanded":"false","aria-selected":"false",tabIndex:-1}).blur(),b.prev().attr({"aria-expanded":"true","aria-selected":"true",tabIndex:0}).focus()},_completed:function(a){this.running=a?0:--this.running,this.running||(this.options.clearStyle&&this.toShow.add(this.toHide).css({height:"",overflow:""}),this.toHide.removeClass("ui-accordion-content-active"),this.toHide.length&&(this.toHide.parent()[0].className=this.toHide.parent()[0].className),this._trigger("change",null,this.data))}}),a.extend(a.ui.accordion,{version:"1.8.16",animations:{slide:function(b,d){b=a.extend({easing:"swing",duration:300},b,d);if(b.toHide.size())if(b.toShow.size()){var e=b.toShow.css("overflow"),f=0,g={},h={},i;d=b.toShow,i=d[0].style.width,d.width(parseInt(d.parent().width(),10)-parseInt(d.css("paddingLeft"),10)-parseInt(d.css("paddingRight"),10)-(parseInt(d.css("borderLeftWidth"),10)||0)-(parseInt(d.css("borderRightWidth"),10)||0)),a.each(["height","paddingTop","paddingBottom"],function(d,e){h[e]="hide",d=(""+a.css(b.toShow[0],e)).match(/^([\d+-.]+)(.*)$/),g[e]={value:d[1],unit:d[2]||"px"}}),b.toShow.css({height:0,overflow:"hidden"}).show(),b.toHide.filter(":hidden").each(b.complete).end().filter(":visible").animate(h,{step:function(a,c){c.prop=="height"&&(f=c.end-c.start===0?0:(c.now-c.start)/(c.end-c.start)),b.toShow[0].style[c.prop]=f*g[c.prop].value+g[c.prop].unit},duration:b.duration,easing:b.easing,complete:function(){b.autoHeight||b.toShow.css("height",""),b.toShow.css({width:i,overflow:e}),b.complete()}})}else b.toHide.animate({height:"hide",paddingTop:"hide",paddingBottom:"hide"},b);else b.toShow.animate({height:"show",paddingTop:"show",paddingBottom:"show"},b)},bounceslide:function(a){this.slide(a,{easing:a.down?"easeOutBounce":"swing",duration:a.down?1e3:200})}}})}(jQuery),function(a){var b=0;a.widget("ui.autocomplete",{options:{appendTo:"body",autoFocus:!1,delay:300,minLength:1,position:{my:"left top",at:"left bottom",collision:"none"},source:null},pending:0,_create:function(){var b=this,c=this.element[0].ownerDocument,e;this.element.addClass("ui-autocomplete-input").attr("autocomplete","off").attr({role:"textbox","aria-autocomplete":"list","aria-haspopup":"true"}).bind("keydown.autocomplete",function(c){if(!b.options.disabled&&!b.element.propAttr("readOnly")){e=!1;var f=a.ui.keyCode;switch(c.keyCode){case f.PAGE_UP:b._move("previousPage",c);break;case f.PAGE_DOWN:b._move("nextPage",c);break;case f.UP:b._move("previous",c),c.preventDefault();break;case f.DOWN:b._move("next",c),c.preventDefault();break;case f.ENTER:case f.NUMPAD_ENTER:b.menu.active&&(e=!0,c.preventDefault());case f.TAB:if(!b.menu.active)return;b.menu.select(c);break;case f.ESCAPE:b.element.val(b.term),b.close(c);break;default:clearTimeout(b.searching),b.searching=setTimeout(function(){b.term!=b.element.val()&&(b.selectedItem=null,b.search(null,c))},b.options.delay)}}}).bind("keypress.autocomplete",function(a){e&&(e=!1,a.preventDefault())}).bind("focus.autocomplete",function(){b.options.disabled||(b.selectedItem=null,b.previous=b.element.val())}).bind("blur.autocomplete",function(a){b.options.disabled||(clearTimeout(b.searching),b.closing=setTimeout(function(){b.close(a),b._change(a)},150))}),this._initSource(),this.response=function(){return b._response.apply(b,arguments)},this.menu=a("<ul></ul>").addClass("ui-autocomplete").appendTo(a(this.options.appendTo||"body",c)[0]).mousedown(function(c){var e=b.menu.element[0];a(c.target).closest(".ui-menu-item").length||setTimeout(function(){a(document).one("mousedown",function(c){c.target!==b.element[0]&&c.target!==e&&!a.ui.contains(e,c.target)&&b.close()})},1),setTimeout(function(){clearTimeout(b.closing)},13)}).menu({focus:function(a,c){c=c.item.data("item.autocomplete"),!1!==b._trigger("focus",a,{item:c})&&/^key/.test(a.originalEvent.type)&&b.element.val(c.value)},selected:function(a,d){var e=d.item.data("item.autocomplete"),f=b.previous;b.element[0]!==c.activeElement&&(b.element.focus(),b.previous=f,setTimeout(function(){b.previous=f,b.selectedItem=e},1)),!1!==b._trigger("select",a,{item:e})&&b.element.val(e.value),b.term=b.element.val(),b.close(a),b.selectedItem=e},blur:function(){b.menu.element.is(":visible")&&b.element.val()!==b.term&&b.element.val(b.term)}}).zIndex(this.element.zIndex()+1).css({top:0,left:0}).hide().data("menu"),a.fn.bgiframe&&this.menu.element.bgiframe()},destroy:function(){this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete").removeAttr("role").removeAttr("aria-autocomplete").removeAttr("aria-haspopup"),this.menu.element.remove(),a.Widget.prototype.destroy.call(this)},_setOption:function(b,c){a.Widget.prototype._setOption.apply(this,arguments),b==="source"&&this._initSource(),b==="appendTo"&&this.menu.element.appendTo(a(c||"body",this.element[0].ownerDocument)[0]),b==="disabled"&&c&&this.xhr&&this.xhr.abort()},_initSource:function(){var c=this,f,g;a.isArray(this.options.source)?(f=this.options.source,this.source=function(b,c){c(a.ui.autocomplete.filter(f,b.term))}):typeof this.options.source=="string"?(g=this.options.source,this.source=function(f,h){c.xhr&&c.xhr.abort(),c.xhr=a.ajax({url:g,data:f,dataType:"json",autocompleteRequest:++b,success:function(a){this.autocompleteRequest===b&&h(a)},error:function(){this.autocompleteRequest===b&&h([])}})}):this.source=this.options.source},search:function(a,b){a=a!=null?a:this.element.val(),this.term=this.element.val();if(a.length<this.options.minLength)return this.close(b);clearTimeout(this.closing);if(this._trigger("search",b)!==!1)return this._search(a)},_search:function(a){this.pending++,this.element.addClass("ui-autocomplete-loading"),this.source({term:a},this.response)},_response:function(a){!this.options.disabled&&a&&a.length?(a=this._normalize(a),this._suggest(a),this._trigger("open")):this.close(),this.pending--,this.pending||this.element.removeClass("ui-autocomplete-loading")},close:function(a){clearTimeout(this.closing),this.menu.element.is(":visible")&&(this.menu.element.hide(),this.menu.deactivate(),this._trigger("close",a))},_change:function(a){this.previous!==this.element.val()&&this._trigger("change",a,{item:this.selectedItem})},_normalize:function(b){return b.length&&b[0].label&&b[0].value?b:a.map(b,function(b){return typeof b=="string"?{label:b,value:b}:a.extend({label:b.label||b.value,value:b.value||b.label},b)})},_suggest:function(b){var c=this.menu.element.empty().zIndex(this.element.zIndex()+1);this._renderMenu(c,b),this.menu.deactivate(),this.menu.refresh(),c.show(),this._resizeMenu(),c.position(a.extend({of:this.element},this.options.position)),this.options.autoFocus&&this.menu.next(new a.Event("mouseover"))},_resizeMenu:function(){var a=this.menu.element;a.outerWidth(Math.max(a.width("").outerWidth(),this.element.outerWidth()))},_renderMenu:function(b,c){var e=this;a.each(c,function(a,c){e._renderItem(b,c)})},_renderItem:function(b,c){return a("<li></li>").data("item.autocomplete",c).append(a("<a></a>").text(c.label)).appendTo(b)},_move:function(a,b){this.menu.element.is(":visible")?this.menu.first()&&/^previous/.test(a)||this.menu.last()&&/^next/.test(a)?(this.element.val(this.term),this.menu.deactivate()):this.menu[a](b):this.search(null,b)},widget:function(){return this.menu.element}}),a.extend(a.ui.autocomplete,{escapeRegex:function(a){return a.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&")},filter:function(b,c){var e=new RegExp(a.ui.autocomplete.escapeRegex(c),"i");return a.grep(b,function(a){return e.test(a.label||a.value||a)})}})}(jQuery),function(a){a.widget("ui.menu",{_create:function(){var b=this;this.element.addClass("ui-menu ui-widget ui-widget-content ui-corner-all").attr({role:"listbox","aria-activedescendant":"ui-active-menuitem"}).click(function(c){a(c.target).closest(".ui-menu-item a").length&&(c.preventDefault(),b.select(c))}),this.refresh()},refresh:function(){var b=this;this.element.children("li:not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role","menuitem").children("a").addClass("ui-corner-all").attr("tabindex",-1).mouseenter(function(c){b.activate(c,a(this).parent())}).mouseleave(function(){b.deactivate()})},activate:function(a,b){this.deactivate();if(this.hasScroll()){var c=b.offset().top-this.element.offset().top,d=this.element.scrollTop(),e=this.element.height();c<0?this.element.scrollTop(d+c):c>=e&&this.element.scrollTop(d+c-e+b.height())}this.active=b.eq(0).children("a").addClass("ui-state-hover").attr("id","ui-active-menuitem").end(),this._trigger("focus",a,{item:b})},deactivate:function(){this.active&&(this.active.children("a").removeClass("ui-state-hover").removeAttr("id"),this._trigger("blur"),this.active=null)},next:function(a){this.move("next",".ui-menu-item:first",a)},previous:function(a){this.move("prev",".ui-menu-item:last",a)},first:function(){return this.active&&!this.active.prevAll(".ui-menu-item").length},last:function(){return this.active&&!this.active.nextAll(".ui-menu-item").length},move:function(a,b,c){this.active?(a=this.active[a+"All"](".ui-menu-item").eq(0),a.length?this.activate(c,a):this.activate(c,this.element.children(b))):this.activate(c,this.element.children(b))},nextPage:function(b){if(this.hasScroll())if(!this.active||this.last())this.activate(b,this.element.children(".ui-menu-item:first"));else{var c=this.active.offset().top,e=this.element.height(),f=this.element.children(".ui-menu-item").filter(function(){var b=a(this).offset().top-c-e+a(this).height();return b<10&&b>-10});f.length||(f=this.element.children(".ui-menu-item:last")),this.activate(b,f)}else this.activate(b,this.element.children(".ui-menu-item").filter(!this.active||this.last()?":first":":last"))},previousPage:function(b){if(this.hasScroll())if(!this.active||this.first())this.activate(b,this.element.children(".ui-menu-item:last"));else{var c=this.active.offset().top,e=this.element.height();result=this.element.children(".ui-menu-item").filter(function(){var b=a(this).offset().top-c+e-a(this).height();return b<10&&b>-10}),result.length||(result=this.element.children(".ui-menu-item:first")),this.activate(b,result)}else this.activate(b,this.element.children(".ui-menu-item").filter(!this.active||this.first()?":last":":first"))},hasScroll:function(){return this.element.height()<this.element[a.fn.prop?"prop":"attr"]("scrollHeight")},select:function(a){this._trigger("selected",a,{item:this.active})}})}(jQuery),function(a){var b,c,d,e,f=function(){var b=a(this).find(":ui-button");setTimeout(function(){b.button("refresh")},1)},g=function(b){var c=b.name,d=b.form,e=a([]);c&&(e=d?a(d).find("[name='"+c+"']"):a("[name='"+c+"']",b.ownerDocument).filter(function(){return!this.form}));return e};a.widget("ui.button",{options:{disabled:null,text:!0,label:null,icons:{primary:null,secondary:null}},_create:function(){this.element.closest("form").unbind("reset.button").bind("reset.button",f),typeof this.options.disabled!="boolean"&&(this.options.disabled=this.element.propAttr("disabled")),this._determineButtonType(),this.hasTitle=!!this.buttonElement.attr("title");var m=this,n=this.options,o=this.type==="checkbox"||this.type==="radio",p="ui-state-hover"+(o?"":" ui-state-active");n.label===null&&(n.label=this.buttonElement.html()),this.element.is(":disabled")&&(n.disabled=!0),this.buttonElement.addClass("ui-button ui-widget ui-state-default ui-corner-all").attr("role","button").bind("mouseenter.button",function(){n.disabled||(a(this).addClass("ui-state-hover"),this===b&&a(this).addClass("ui-state-active"))}).bind("mouseleave.button",function(){n.disabled||a(this).removeClass(p)}).bind("click.button",function(a){n.disabled&&(a.preventDefault(),a.stopImmediatePropagation())}),this.element.bind("focus.button",function(){m.buttonElement.addClass("ui-state-focus")}).bind("blur.button",function(){m.buttonElement.removeClass("ui-state-focus")}),o&&(this.element.bind("change.button",function(){e||m.refresh()}),this.buttonElement.bind("mousedown.button",function(a){n.disabled||(e=!1,c=a.pageX,d=a.pageY)}).bind("mouseup.button",function(a){!n.disabled&&(c!==a.pageX||d!==a.pageY)&&(e=!0)})),this.type==="checkbox"?this.buttonElement.bind("click.button",function(){if(n.disabled||e)return!1;a(this).toggleClass("ui-state-active"),m.buttonElement.attr("aria-pressed",m.element[0].checked)}):this.type==="radio"?this.buttonElement.bind("click.button",function(){if(n.disabled||e)return!1;a(this).addClass("ui-state-active"),m.buttonElement.attr("aria-pressed","true");var b=m.element[0];g(b).not(b).map(function(){return a(this).button("widget")[0]}).removeClass("ui-state-active").attr("aria-pressed","false")}):(this.buttonElement.bind("mousedown.button",function(){if(n.disabled)return!1;a(this).addClass("ui-state-active"),b=this,a(document).one("mouseup",function(){b=null})}).bind("mouseup.button",function(){if(n.disabled)return!1;a(this).removeClass("ui-state-active")}).bind("keydown.button",function(b){if(n.disabled)return!1;(b.keyCode==a.ui.keyCode.SPACE||b.keyCode==a.ui.keyCode.ENTER)&&a(this).addClass("ui-state-active")}).bind("keyup.button",function(){a(this).removeClass("ui-state-active")}),this.buttonElement.is("a")&&this.buttonElement.keyup(function(b){b.keyCode===a.ui.keyCode.SPACE&&a(this).click()})),this._setOption("disabled",n.disabled),this._resetButton()},_determineButtonType:function(){this.type=this.element.is(":checkbox")?"checkbox":this.element.is(":radio")?"radio":this.element.is("input")?"input":"button";if(this.type==="checkbox"||this.type==="radio"){var a=this.element.parents().filter(":last"),b="label[for='"+this.element.attr("id")+"']";this.buttonElement=a.find(b),this.buttonElement.length||(a=a.length?a.siblings():this.element.siblings(),this.buttonElement=a.filter(b),this.buttonElement.length||(this.buttonElement=a.find(b))),this.element.addClass("ui-helper-hidden-accessible"),(a=this.element.is(":checked"))&&this.buttonElement.addClass("ui-state-active"),this.buttonElement.attr("aria-pressed",a)}else this.buttonElement=this.element},widget:function(){return this.buttonElement},destroy:function(){this.element.removeClass("ui-helper-hidden-accessible"),this.buttonElement.removeClass("ui-button ui-widget ui-state-default ui-corner-all ui-state-hover ui-state-active  ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only").removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html()),this.hasTitle||this.buttonElement.removeAttr("title"),a.Widget.prototype.destroy.call(this)},_setOption:function(b,c){a.Widget.prototype._setOption.apply(this,arguments),b==="disabled"?c?this.element.propAttr("disabled",!0):this.element.propAttr("disabled",!1):this._resetButton()},refresh:function(){var b=this.element.is(":disabled");b!==this.options.disabled&&this._setOption("disabled",b),this.type==="radio"?g(this.element[0]).each(function(){a(this).is(":checked")?a(this).button("widget").addClass("ui-state-active").attr("aria-pressed","true"):a(this).button("widget").removeClass("ui-state-active").attr("aria-pressed","false")}):this.type==="checkbox"&&(this.element.is(":checked")?this.buttonElement.addClass("ui-state-active").attr("aria-pressed","true"):this.buttonElement.removeClass("ui-state-active").attr("aria-pressed","false"))},_resetButton:function(){if(this.type==="input")this.options.label&&this.element.val(this.options.label);else{var b=this.buttonElement.removeClass("ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only"),c=a("<span></span>").addClass("ui-button-text").html(this.options.label).appendTo(b.empty()).text(),d=this.options.icons,e=d.primary&&d.secondary,f=[];d.primary||d.secondary?(this.options.text&&f.push("ui-button-text-icon"+(e?"s":d.primary?"-primary":"-secondary")),d.primary&&b.prepend("<span class='ui-button-icon-primary ui-icon "+d.primary+"'></span>"),d.secondary&&b.append("<span class='ui-button-icon-secondary ui-icon "+d.secondary+"'></span>"),this.options.text||(f.push(e?"ui-button-icons-only":"ui-button-icon-only"),this.hasTitle||b.attr("title",c))):f.push("ui-button-text-only"),b.addClass(f.join(" "))}}}),a.widget("ui.buttonset",{options:{items:":button, :submit, :reset, :checkbox, :radio, a, :data(button)"},_create:function(){this.element.addClass("ui-buttonset")},_init:function(){this.refresh()},_setOption:function(b,c){b==="disabled"&&this.buttons.button("option",b,c),a.Widget.prototype._setOption.apply(this,arguments)},refresh:function(){var b=this.element.css("direction")==="ltr";this.buttons=this.element.find(this.options.items).filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function(){return a(this).button("widget")[0]}).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(b?"ui-corner-left":"ui-corner-right").end().filter(":last").addClass(b?"ui-corner-right":"ui-corner-left").end().end()},destroy:function(){this.element.removeClass("ui-buttonset"),this.buttons.map(function(){return a(this).button("widget")[0]}).removeClass("ui-corner-left ui-corner-right").end().button("destroy"),a.Widget.prototype.destroy.call(this)}})}(jQuery),function(a,b){var c={buttons:!0,height:!0,maxHeight:!0,maxWidth:!0,minHeight:!0,minWidth:!0,width:!0},d={maxHeight:!0,maxWidth:!0,minHeight:!0,minWidth:!0},e=a.attrFn||{val:!0,css:!0,html:!0,text:!0,data:!0,width:!0,height:!0,offset:!0,click:!0};a.widget("ui.dialog",{options:{autoOpen:!0,buttons:{},closeOnEscape:!0,closeText:"close",dialogClass:"",draggable:!0,hide:null,height:"auto",maxHeight:!1,maxWidth:!1,minHeight:150,minWidth:150,modal:!1,position:{my:"center",at:"center",collision:"fit",using:function(b){var c=a(this).css(b).offset().top;c<0&&a(this).css("top",b.top-c)}},resizable:!0,show:null,stack:!0,title:"",width:300,zIndex:1e3},_create:function(){this.originalTitle=this.element.attr("title"),typeof this.originalTitle!="string"&&(this.originalTitle=""),this.options.title=this.options.title||this.originalTitle;var b=this,c=b.options,d=c.title||"&#160;",e=a.ui.dialog.getTitleId(b.element),f=(b.uiDialog=a("<div></div>")).appendTo(document.body).hide().addClass("ui-dialog ui-widget ui-widget-content ui-corner-all "+c.dialogClass).css({zIndex:c.zIndex}).attr("tabIndex",-1).css("outline",0).keydown(function(d){c.closeOnEscape&&!d.isDefaultPrevented()&&d.keyCode&&d.keyCode===a.ui.keyCode.ESCAPE&&(b.close(d),d.preventDefault())}).attr({role:"dialog","aria-labelledby":e}).mousedown(function(a){b.moveToTop(!1,a)});b.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(f);var g=(b.uiDialogTitlebar=a("<div></div>")).addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(f),h=a('<a href="#"></a>').addClass("ui-dialog-titlebar-close ui-corner-all").attr("role","button").hover(function(){h.addClass("ui-state-hover")},function(){h.removeClass("ui-state-hover")}).focus(function(){h.addClass("ui-state-focus")}).blur(function(){h.removeClass("ui-state-focus")}).click(function(a){b.close(a);return!1}).appendTo(g);(b.uiDialogTitlebarCloseText=a("<span></span>")).addClass("ui-icon ui-icon-closethick").text(c.closeText).appendTo(h),a("<span></span>").addClass("ui-dialog-title").attr("id",e).html(d).prependTo(g),a.isFunction(c.beforeclose)&&!a.isFunction(c.beforeClose)&&(c.beforeClose=c.beforeclose),g.find("*").add(g).disableSelection(),c.draggable&&a.fn.draggable&&b._makeDraggable(),c.resizable&&a.fn.resizable&&b._makeResizable(),b._createButtons(c.buttons),b._isOpen=!1,a.fn.bgiframe&&f.bgiframe()},_init:function(){this.options.autoOpen&&this.open()},destroy:function(){var a=this;a.overlay&&a.overlay.destroy(),a.uiDialog.hide(),a.element.unbind(".dialog").removeData("dialog").removeClass("ui-dialog-content ui-widget-content").hide().appendTo("body"),a.uiDialog.remove(),a.originalTitle&&a.element.attr("title",a.originalTitle);return a},widget:function(){return this.uiDialog},close:function(b){var c=this,d,e;if(!1!==c._trigger("beforeClose",b)){c.overlay&&c.overlay.destroy(),c.uiDialog.unbind("keypress.ui-dialog"),c._isOpen=!1,c.options.hide?c.uiDialog.hide(c.options.hide,function(){c._trigger("close",b)}):(c.uiDialog.hide(),c._trigger("close",b)),a.ui.dialog.overlay.resize(),c.options.modal&&(d=0,a(".ui-dialog").each(function(){this!==c.uiDialog[0]&&(e=a(this).css("z-index"),isNaN(e)||(d=Math.max(d,e)))}),a.ui.dialog.maxZ=d);return c}},isOpen:function(){return this._isOpen},moveToTop:function(b,c){var d=this,e=d.options;if(e.modal&&!b||!e.stack&&!e.modal)return d._trigger("focus",c);e.zIndex>a.ui.dialog.maxZ&&(a.ui.dialog.maxZ=e.zIndex),d.overlay&&(a.ui.dialog.maxZ+=1,d.overlay.$el.css("z-index",a.ui.dialog.overlay.maxZ=a.ui.dialog.maxZ)),b={scrollTop:d.element.scrollTop(),scrollLeft:d.element.scrollLeft()},a.ui.dialog.maxZ+=1,d.uiDialog.css("z-index",a.ui.dialog.maxZ),d.element.attr(b),d._trigger("focus",c);return d},open:function(){if(!this._isOpen){var b=this,c=b.options,d=b.uiDialog;b.overlay=c.modal?new a.ui.dialog.overlay(b):null,b._size(),b._position(c.position),d.show(c.show),b.moveToTop(!0),c.modal&&d.bind("keypress.ui-dialog",function(b){if(b.keyCode===a.ui.keyCode.TAB){var c=a(":tabbable",this),d=c.filter(":first");c=c.filter(":last");if(b.target===c[0]&&!b.shiftKey){d.focus(1);return!1}if(b.target===d[0]&&b.shiftKey){c.focus(1);return!1}}}),a(b.element.find(":tabbable").get().concat(d.find(".ui-dialog-buttonpane :tabbable").get().concat(d.get()))).eq(0).focus(),b._isOpen=!0,b._trigger("open");return b}},_createButtons:function(b){var c=this,d=!1,f=a("<div></div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"),g=a("<div></div>").addClass("ui-dialog-buttonset").appendTo(f);c.uiDialog.find(".ui-dialog-buttonpane").remove(),typeof b=="object"&&b!==null&&a.each(b,function(){return!(d=!0)}),d&&(a.each(b,function(b,d){d=a.isFunction(d)?{click:d,text:b}:d;var f=a('<button type="button"></button>').click(function(){d.click.apply(c.element[0],arguments)}).appendTo(g);a.each(d,function(a,b){a!=="click"&&(a in e?f[a](b):f.attr(a,b))}),a.fn.button&&f.button()}),f.appendTo(c.uiDialog))},_makeDraggable:function(){function b(a){return{position:a.position,offset:a.offset}}var c=this,d=c.options,e=a(document),f;c.uiDialog.draggable({cancel:".ui-dialog-content, .ui-dialog-titlebar-close",handle:".ui-dialog-titlebar",containment:"document",start:function(e,h){f=d.height==="auto"?"auto":a(this).height(),a(this).height(a(this).height()).addClass("ui-dialog-dragging"),c._trigger("dragStart",e,b(h))},drag:function(a,d){c._trigger("drag",a,b(d))},stop:function(h,i){d.position=[i.position.left-e.scrollLeft(),i.position.top-e.scrollTop()],a(this).removeClass("ui-dialog-dragging").height(f),c._trigger("dragStop",h,b(i)),a.ui.dialog.overlay.resize()}})},_makeResizable:function(c){function d(a){return{originalPosition:a.originalPosition,originalSize:a.originalSize,position:a.position,size:a.size}}c=c===b?this.options.resizable:c;var e=this,f=e.options,g=e.uiDialog.css("position");c=typeof c=="string"?c:"n,e,s,w,se,sw,ne,nw",e.uiDialog.resizable({cancel:".ui-dialog-content",containment:"document",alsoResize:e.element,maxWidth:f.maxWidth,maxHeight:f.maxHeight,minWidth:f.minWidth,minHeight:e._minHeight(),handles:c,start:function(b,c){a(this).addClass("ui-dialog-resizing"),e._trigger("resizeStart",b,d(c))},resize:function(a,b){e._trigger("resize",a,d(b))},stop:function(b,c){a(this).removeClass("ui-dialog-resizing"),f.height=a(this).height(),f.width=a(this).width(),e._trigger("resizeStop",b,d(c)),a.ui.dialog.overlay.resize()}}).css("position",g).find(".ui-resizable-se").addClass("ui-icon ui-icon-grip-diagonal-se")},_minHeight:function(){var a=this.options;return a.height==="auto"?a.minHeight:Math.min(a.minHeight,a.height)},_position:function(b){var c=[],d=[0,0],e;if(b){if(typeof b=="string"||typeof b=="object"&&"0"in b)c=b.split?b.split(" "):[b[0],b[1]],c.length===1&&(c[1]=c[0]),a.each(["left","top"],function(a,b){+c[a]===c[a]&&(d[a]=c[a],c[a]=b)}),b={my:c.join(" "),at:c.join(" "),offset:d.join(" ")};b=a.extend({},a.ui.dialog.prototype.options.position,b)}else b=a.ui.dialog.prototype.options.position;(e=this.uiDialog.is(":visible"))||this.uiDialog.show(),this.uiDialog.css({top:0,left:0}).position(a.extend({of:window},b)),e||this.uiDialog.hide()},_setOptions:function(b){var e=this,f={},g=!1;a.each(b,function(a,b){e._setOption(a,b),a in c&&(g=!0),a in d&&(f[a]=b)}),g&&this._size(),this.uiDialog.is(":data(resizable)")&&this.uiDialog.resizable("option",f)},_setOption:function(b,c){var d=this,e=d.uiDialog;switch(b){case"beforeclose":b="beforeClose";break;case"buttons":d._createButtons(c);break;case"closeText":d.uiDialogTitlebarCloseText.text(""+c);break;case"dialogClass":e.removeClass(d.options.dialogClass).addClass("ui-dialog ui-widget ui-widget-content ui-corner-all "+c);break;case"disabled":c?e.addClass("ui-dialog-disabled"):e.removeClass("ui-dialog-disabled");break;case"draggable":var f=e.is(":data(draggable)");f&&!c&&e.draggable("destroy"),!f&&c&&d._makeDraggable();break;case"position":d._position(c);break;case"resizable":(f=e.is(":data(resizable)"))&&!c&&e.resizable("destroy"),f&&typeof c=="string"&&e.resizable("option","handles",c),!f&&c!==!1&&d._makeResizable(c);break;case"title":a(".ui-dialog-title",d.uiDialogTitlebar).html(""+(c||"&#160;"))}a.Widget.prototype._setOption.apply(d,arguments)},_size:function(){var b=this.options,c,d,e=this.uiDialog.is(":visible");this.element.show().css({width:"auto",minHeight:0,height:0}),b.minWidth>b.width&&(b.width=b.minWidth),c=this.uiDialog.css({height:"auto",width:b.width}).height(),d=Math.max(0,b.minHeight-c),b.height==="auto"?a.support.minHeight?this.element.css({minHeight:d,height:"auto"}):(this.uiDialog.show(),b=this.element.css("height","auto").height(),e||this.uiDialog.hide(),this.element.height(Math.max(b,d))):this.element.height(Math.max(b.height-c,0)),this.uiDialog.is(":data(resizable)")&&this.uiDialog.resizable("option","minHeight",this._minHeight())}}),a.extend(a.ui.dialog,{version:"1.8.16",uuid:0,maxZ:0,getTitleId:function(a){a=a.attr("id"),a||(this.uuid+=1,a=this.uuid);return"ui-dialog-title-"+a},overlay:function(b){this.$el=a.ui.dialog.overlay.create(b)}}),a.extend(a.ui.dialog.overlay,{instances:[],oldInstances:[],maxZ:0,events:a.map("focus,mousedown,mouseup,keydown,keypress,click".split(","),function(a){return a+".dialog-overlay"}).join(" "),create:function(b){this.instances.length===0&&(setTimeout(function(){a.ui.dialog.overlay.instances.length&&a(document).bind(a.ui.dialog.overlay.events,function(b){if(a(b.target).zIndex()<a.ui.dialog.overlay.maxZ)return!1})},1),a(document).bind("keydown.dialog-overlay",function(c){b.options.closeOnEscape&&!c.isDefaultPrevented()&&c.keyCode&&c.keyCode===a.ui.keyCode.ESCAPE&&(b.close(c),c.preventDefault())}),a(window).bind("resize.dialog-overlay",a.ui.dialog.overlay.resize));var c=(this.oldInstances.pop()||a("<div></div>").addClass("ui-widget-overlay")).appendTo(document.body).css({width:this.width(),height:this.height()});a.fn.bgiframe&&c.bgiframe(),this.instances.push(c);return c},destroy:function(b){var c=a.inArray(b,this.instances);c!=-1&&this.oldInstances.push(this.instances.splice(c,1)[0]),this.instances.length===0&&a([document,window]).unbind(".dialog-overlay"),b.remove();var d=0;a.each(this.instances,function(){d=Math.max(d,this.css("z-index"))}),this.maxZ=d},height:function(){var b,c;if(a.browser.msie&&a.browser.version<7){b=Math.max(document.documentElement.scrollHeight,document.body.scrollHeight),c=Math.max(document.documentElement.offsetHeight,document.body.offsetHeight);return b<c?a(window).height()+"px":b+"px"}return a(document).height()+"px"},width:function(){var b,c;if(a.browser.msie){b=Math.max(document.documentElement.scrollWidth,document.body.scrollWidth),c=Math.max(document.documentElement.offsetWidth,document.body.offsetWidth);return b<c?a(window).width()+"px":b+"px"}return a(document).width()+"px"},resize:function(){var b=a([]);a.each(a.ui.dialog.overlay.instances,function(){b=b.add(this)}),b.css({width:0,height:0}).css({width:a.ui.dialog.overlay.width(),height:a.ui.dialog.overlay.height()})}}),a.extend(a.ui.dialog.overlay.prototype,{destroy:function(){a.ui.dialog.overlay.destroy(this.$el)}})}(jQuery),function(a){a.widget("ui.slider",a.ui.mouse,{widgetEventPrefix:"slide",options:{animate:!1,distance:0,max:100,min:0,orientation:"horizontal",range:!1,step:1,value:0,values:null},_create:function(){var b=this,c=this.options,e=this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),f=c.values&&c.values.length||1,g=[];this._mouseSliding=this._keySliding=!1,this._animateOff=!0,this._handleIndex=null,this._detectOrientation(),this._mouseInit(),this.element.addClass("ui-slider ui-slider-"+this.orientation+" ui-widget ui-widget-content ui-corner-all"+(c.disabled?" ui-slider-disabled ui-disabled":"")),this.range=a([]),c.range&&(c.range===!0&&(c.values||(c.values=[this._valueMin(),this._valueMin()]),c.values.length&&c.values.length!==2&&(c.values=[c.values[0],c.values[0]])),this.range=a("<div></div>").appendTo(this.element).addClass("ui-slider-range ui-widget-header"+(c.range==="min"||c.range==="max"?" ui-slider-range-"+c.range:"")));for(var h=e.length;h<f;h+=1)g.push("<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>");this.handles=e.add(a(g.join("")).appendTo(b.element)),this.handle=this.handles.eq(0),this.handles.add(this.range).filter("a").click(function(a){a.preventDefault()}).hover(function(){c.disabled||a(this).addClass("ui-state-hover")},function(){a(this).removeClass("ui-state-hover")}).focus(function(){c.disabled?a(this).blur():(a(".ui-slider .ui-state-focus").removeClass("ui-state-focus"),a(this).addClass("ui-state-focus"))}).blur(function(){a(this).removeClass("ui-state-focus")}),this.handles.each(function(b){a(this).data("index.ui-slider-handle",b)}),this.handles.keydown(function(c){var e=!0,f=a(this).data("index.ui-slider-handle"),g,h,i;if(!b.options.disabled){switch(c.keyCode){case a.ui.keyCode.HOME:case a.ui.keyCode.END:case a.ui.keyCode.PAGE_UP:case a.ui.keyCode.PAGE_DOWN:case a.ui.keyCode.UP:case a.ui.keyCode.RIGHT:case a.ui.keyCode.DOWN:case a.ui.keyCode.LEFT:e=!1;if(!b._keySliding){b._keySliding=!0,a(this).addClass("ui-state-active"),g=b._start(c,f);if(g===!1)return}}i=b.options.step,g=b.options.values&&b.options.values.length?h=b.values(f):h=b.value();switch(c.keyCode){case a.ui.keyCode.HOME:h=b._valueMin();break;case a.ui.keyCode.END:h=b._valueMax();break;case a.ui.keyCode.PAGE_UP:h=b._trimAlignValue(g+(b._valueMax()-b._valueMin())/5);break;case a.ui.keyCode.PAGE_DOWN:h=b._trimAlignValue(g-(b._valueMax()-b._valueMin())/5);break;case a.ui.keyCode.UP:case a.ui.keyCode.RIGHT:if(g===b._valueMax())return;h=b._trimAlignValue(g+i);break;case a.ui.keyCode.DOWN:case a.ui.keyCode.LEFT:if(g===b._valueMin())return;h=b._trimAlignValue(g-i)}b._slide(c,f,h);return e}}).keyup(function(c){var e=a(this).data("index.ui-slider-handle");b._keySliding&&(b._keySliding=!1,b._stop(c,e),b._change(c,e),a(this).removeClass("ui-state-active"))}),this._refreshValue(),this._animateOff=!1},destroy:function(){this.handles.remove(),this.range.remove(),this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all").removeData("slider").unbind(".slider"),this._mouseDestroy();return this},_mouseCapture:function(b){var c=this.options,e,f,g,h,i;if(c.disabled)return!1;this.elementSize={width:this.element.outerWidth(),height:this.element.outerHeight()},this.elementOffset=this.element.offset(),e=this._normValueFromMouse({x:b.pageX,y:b.pageY}),f=this._valueMax()-this._valueMin()+1,h=this,this.handles.each(function(b){var c=Math.abs(e-h.values(b));f>c&&(f=c,g=a(this),i=b)}),c.range===!0&&this.values(1)===c.min&&(i+=1,g=a(this.handles[i]));if(this._start(b,i)===!1)return!1;this._mouseSliding=!0,h._handleIndex=i,g.addClass("ui-state-active").focus(),c=g.offset(),this._clickOffset=a(b.target).parents().andSelf().is(".ui-slider-handle")?{left:b.pageX-c.left-g.width()/2,top:b.pageY-c.top-g.height()/2-(parseInt(g.css("borderTopWidth"),10)||0)-(parseInt(g.css("borderBottomWidth"),10)||0)+(parseInt(g.css("marginTop"),10)||0)}:{left:0,top:0},this.handles.hasClass("ui-state-hover")||this._slide(b,i,e);return this._animateOff=!0},_mouseStart:function(){return!0},_mouseDrag:function(a){var b=this._normValueFromMouse({x:a.pageX,y:a.pageY});this._slide(a,this._handleIndex,b);return!1},_mouseStop:function(a){this.handles.removeClass("ui-state-active"),this._mouseSliding=!1,this._stop(a,this._handleIndex),this._change(a,this._handleIndex),this._clickOffset=this._handleIndex=null;return this._animateOff=!1},_detectOrientation:function(){this.orientation=this.options.orientation==="vertical"?"vertical":"horizontal"},_normValueFromMouse:function(a){var b;this.orientation==="horizontal"?(b=this.elementSize.width,a=a.x-this.elementOffset.left-(this._clickOffset?this._clickOffset.left:0)):(b=this.elementSize.height,a=a.y-this.elementOffset.top-(this._clickOffset?this._clickOffset.top:0)),b=a/b,b>1&&(b=1),b<0&&(b=0),this.orientation==="vertical"&&(b=1-b),a=this._valueMax()-this._valueMin();return this._trimAlignValue(this._valueMin()+b*a)},_start:function(a,b){var c={handle:this.handles[b],value:this.value()};this.options.values&&this.options.values.length&&(c.value=this.values(b),c.values=this.values());return this._trigger("start",a,c)},_slide:function(a,b,c){var d;this.options.values&&this.options.values.length?(d=this.values(b?0:1),this.options.values.length===2&&this.options.range===!0&&(b===0&&c>d||b===1&&c<d)&&(c=d),c!==this.values(b)&&(d=this.values(),d[b]=c,a=this._trigger("slide",a,{handle:this.handles[b],value:c,values:d}),this.values(b?0:1),a!==!1&&this.values(b,c,!0))):c!==this.value()&&(a=this._trigger("slide",a,{handle:this.handles[b],value:c}),a!==!1&&this.value(c))},_stop:function(a,b){var c={handle:this.handles[b],value:this.value()};this.options.values&&this.options.values.length&&(c.value=this.values(b),c.values=this.values()),this._trigger("stop",a,c)},_change:function(a,b){if(!this._keySliding&&!this._mouseSliding){var c={handle:this.handles[b],value:this.value()};this.options.values&&this.options.values.length&&(c.value=this.values(b),c.values=this.values()),this._trigger("change",a,c)}},value:function(a){if(arguments.length)this.options.value=this._trimAlignValue(a),this._refreshValue(),this._change(null,0);else return this._value()},values:function(b,c){var e,f,g;if(arguments.length>1)this.options.values[b]=this._trimAlignValue(c),this._refreshValue(),this._change(null,b);else{if(!arguments.length)return this._values();if(!a.isArray(arguments[0]))return this.options.values&&this.options.values.length?this._values(b):this.value();e=this.options.values,f=arguments[0];for(g=0;g<e.length;g+=1)e[g]=this._trimAlignValue(f[g]),this._change(null,g);this._refreshValue()}},_setOption:function(b,c){var e,f=0;a.isArray(this.options.values)&&(f=this.options.values.length),a.Widget.prototype._setOption.apply(this,arguments);switch(b){case"disabled":c?(this.handles.filter(".ui-state-focus").blur(),this.handles.removeClass("ui-state-hover"),this.handles.propAttr("disabled",!0),this.element.addClass("ui-disabled")):(this.handles.propAttr("disabled",!1),this.element.removeClass("ui-disabled"));break;case"orientation":this._detectOrientation(),this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-"+this.orientation),this._refreshValue();break;case"value":this._animateOff=!0,this._refreshValue(),this._change(null,0),this._animateOff=!1;break;case"values":this._animateOff=!0,this._refreshValue();for(e=0;e<f;e+=1)this._change(null,e);this._animateOff=!1}},_value:function(){var a=this.options.value;return a=this._trimAlignValue(a)},_values:function(a){var b,c;if(arguments.length){b=this.options.values[a];return b=this._trimAlignValue(b)}b=this.options.values.slice();for(c=0;c<b.length;c+=1)b[c]=this._trimAlignValue(b[c]);return b},_trimAlignValue:function(a){if(a<=this._valueMin())return this._valueMin();if(a>=this._valueMax())return this._valueMax();var b=this.options.step>0?this.options.step:1,c=(a-this._valueMin())%b;a=a-c,Math.abs(c)*2>=b&&(a+=c>0?b:-b);return parseFloat(a.toFixed(5))},_valueMin:function(){return this.options.min},_valueMax:function(){return this.options.max},_refreshValue:function(){var b=this.options.range,c=this.options,e=this,f=this._animateOff?!1:c.animate,g,h={},i,j,k,l;this.options.values&&this.options.values.length?this.handles.each(function(b){g=(e.values(b)-e._valueMin())/(e._valueMax()-e._valueMin())*100,h[e.orientation==="horizontal"?"left":"bottom"]=g+"%",a(this).stop(1,1)[f?"animate":"css"](h,c.animate),e.options.range===!0&&(e.orientation==="horizontal"?(b===0&&e.range.stop(1,1)[f?"animate":"css"]({left:g+"%"},c.animate),b===1&&e.range[f?"animate":"css"]({width:g-i+"%"},{queue:!1,duration:c.animate})):(b===0&&e.range.stop(1,1)[f?"animate":"css"]({bottom:g+"%"},c.animate),b===1&&e.range[f?"animate":"css"]({height:g-i+"%"},{queue:!1,duration:c.animate}))),i=g}):(j=this.value(),k=this._valueMin(),l=this._valueMax(),g=l!==k?(j-k)/(l-k)*100:0,h[e.orientation==="horizontal"?"left":"bottom"]=g+"%",this.handle.stop(1,1)[f?"animate":"css"](h,c.animate),b==="min"&&this.orientation==="horizontal"&&this.range.stop(1,1)[f?"animate":"css"]({width:g+"%"},c.animate),b==="max"&&this.orientation==="horizontal"&&this.range[f?"animate":"css"]({width:100-g+"%"},{queue:!1,duration:c.animate}),b==="min"&&this.orientation==="vertical"&&this.range.stop(1,1)[f?"animate":"css"]({height:g+"%"},c.animate),b==="max"&&this.orientation==="vertical"&&this.range[f?"animate":"css"]({height:100-g+"%"},{queue:!1,duration:c.animate}))}}),a.extend(a.ui.slider,{version:"1.8.16"})}(jQuery),function(a,b){function d(){return++f}function c(){return++e}var e=0,f=0;a.widget("ui.tabs",{options:{add:null,ajaxOptions:null,cache:!1,cookie:null,collapsible:!1,disable:null,disabled:[],enable:null,event:"click",fx:null,idPrefix:"ui-tabs-",load:null,panelTemplate:"<div></div>",remove:null,select:null,show:null,spinner:"<em>Loading&#8230;</em>",tabTemplate:"<li><a href='#{href}'><span>#{label}</span></a></li>"},_create:function(){this._tabify(!0)},_setOption:function(a,b){a=="selected"?this.options.collapsible&&b==this.options.selected||this.select(b):(this.options[a]=b,this._tabify())},_tabId:function(a){return a.title&&a.title.replace(/\s/g,"_").replace(/[^\w\u00c0-\uFFFF-]/g,"")||this.options.idPrefix+c()},_sanitizeSelector:function(a){return a.replace(/:/g,"\\:")},_cookie:function(){var b=this.cookie||(this.cookie=this.options.cookie.name||"ui-tabs-"+d());return a.cookie.apply(null,[b].concat(a.makeArray(arguments)))},_ui:function(a,b){return{tab:a,panel:b,index:this.anchors.index(a)}},_cleanup:function(){this.lis.filter(".ui-state-processing").removeClass("ui-state-processing").find("span:data(label.tabs)").each(function(){var b=a(this);b.html(b.data("label.tabs")).removeData("label.tabs")})},_tabify:function(c){function d(b,c){b.css("display",""),!a.support.opacity&&c.opacity&&b[0].style.removeAttribute("filter")}var e=this,f=this.options,g=/^#.+/;this.list=this.element.find("ol,ul").eq(0),this.lis=a(" > li:has(a[href])",this.list),this.anchors=this.lis.map(function(){return a("a",this)[0]}),this.panels=a([]),this.anchors.each(function(b,c){var d=a(c).attr("href"),h=d.split("#")[0],i;h&&(h===location.toString().split("#")[0]||(i=a("base")[0])&&h===i.href)&&(d=c.hash,c.href=d),g.test(d)?e.panels=e.panels.add(e.element.find(e._sanitizeSelector(d))):d&&d!=="#"?(a.data(c,"href.tabs",d),a.data(c,"load.tabs",d.replace(/#.*$/,"")),d=e._tabId(c),c.href="#"+d,c=e.element.find("#"+d),c.length||(c=a(f.panelTemplate).attr("id",d).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").insertAfter(e.panels[b-1]||e.list),c.data("destroy.tabs",!0)),e.panels=e.panels.add(c)):f.disabled.push(b)}),c?(this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all"),this.list.addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"),this.lis.addClass("ui-state-default ui-corner-top"),this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom"),f.selected===b?(location.hash&&this.anchors.each(function(a,b){if(b.hash==location.hash){f.selected=a;return!1}}),typeof f.selected!="number"&&f.cookie&&(f.selected=parseInt(e._cookie(),10)),typeof f.selected!="number"&&this.lis.filter(".ui-tabs-selected").length&&(f.selected=this.lis.index(this.lis.filter(".ui-tabs-selected"))),f.selected=f.selected||(this.lis.length?0:-1)):f.selected===null&&(f.selected=-1),f.selected=f.selected>=0&&this.anchors[f.selected]||f.selected<0?f.selected:0,f.disabled=a.unique(f.disabled.concat(a.map(this.lis.filter(".ui-state-disabled"),function(a){return e.lis.index(a)}))).sort(),a.inArray(f.selected,f.disabled)!=-1&&f.disabled.splice(a.inArray(f.selected,f.disabled),1),this.panels.addClass("ui-tabs-hide"),this.lis.removeClass("ui-tabs-selected ui-state-active"),f.selected>=0&&this.anchors.length&&(e.element.find(e._sanitizeSelector(e.anchors[f.selected].hash)).removeClass("ui-tabs-hide"),this.lis.eq(f.selected).addClass("ui-tabs-selected ui-state-active"),e.element.queue("tabs",function(){e._trigger("show",null,e._ui(e.anchors[f.selected],e.element.find(e._sanitizeSelector(e.anchors[f.selected].hash))[0]))}),this.load(f.selected)),a(window).bind("unload",function(){e.lis.add(e.anchors).unbind(".tabs"),e.lis=e.anchors=e.panels=null})):f.selected=this.lis.index(this.lis.filter(".ui-tabs-selected")),this.element[f.collapsible?"addClass":"removeClass"]("ui-tabs-collapsible"),f.cookie&&this._cookie(f.selected,f.cookie),c=0;for(var h;h=this.lis[c];c++)a(h)[a.inArray(c,f.disabled)!=-1&&!a(h).hasClass("ui-tabs-selected")?"addClass":"removeClass"]("ui-state-disabled");f.cache===!1&&this.anchors.removeData("cache.tabs"),this.lis.add(this.anchors).unbind(".tabs");if(f.event!=="mouseover"){var i=function(a,b){b.is(":not(.ui-state-disabled)")&&b.addClass("ui-state-"+a)},j=function(a,b){b.removeClass("ui-state-"+a)};this.lis.bind("mouseover.tabs",function(){i("hover",a(this))}),this.lis.bind("mouseout.tabs",function(){j("hover",a(this))}),this.anchors.bind("focus.tabs",function(){i("focus",a(this).closest("li"))}),this.anchors.bind("blur.tabs",function(){j("focus",a(this).closest("li"))})}var k,l;f.fx&&(a.isArray(f.fx)?(k=f.fx[0],l=f.fx[1]):k=l=f.fx);var m=l?function(b,c){a(b).closest("li").addClass("ui-tabs-selected ui-state-active"),c.hide().removeClass("ui-tabs-hide").animate(l,l.duration||"normal",function(){d(c,l),e._trigger("show",null,e._ui(b,c[0]))})}:function(b,c){a(b).closest("li").addClass("ui-tabs-selected ui-state-active"),c.removeClass("ui-tabs-hide"),e._trigger("show",null,e._ui(b,c[0]))},n=k?function(a,b){b.animate(k,k.duration||"normal",function(){e.lis.removeClass("ui-tabs-selected ui-state-active"),b.addClass("ui-tabs-hide"),d(b,k),e.element.dequeue("tabs")})}:function(a,b){e.lis.removeClass("ui-tabs-selected ui-state-active"),b.addClass("ui-tabs-hide"),e.element.dequeue("tabs")};this.anchors.bind(f.event+".tabs",function(){var b=this,c=a(b).closest("li"),d=e.panels.filter(":not(.ui-tabs-hide)"),g=e.element.find(e._sanitizeSelector(b.hash));if(c.hasClass("ui-tabs-selected")&&!f.collapsible||c.hasClass("ui-state-disabled")||c.hasClass("ui-state-processing")||e.panels.filter(":animated").length||e._trigger("select",null,e._ui(this,g[0]))===!1){this.blur();return!1}f.selected=e.anchors.index(this),e.abort();if(f.collapsible){if(c.hasClass("ui-tabs-selected")){f.selected=-1,f.cookie&&e._cookie(f.selected,f.cookie),e.element.queue("tabs",function(){n(b,d)}).dequeue("tabs"),this.blur();return!1}if(!d.length){f.cookie&&e._cookie(f.selected,f.cookie),e.element.queue("tabs",function(){m(b,g)}),e.load(e.anchors.index(this)),this.blur();return!1}}f.cookie&&e._cookie(f.selected,f.cookie);if(g.length)d.length&&e.element.queue("tabs",function(){n(b,d)}),e.element.queue("tabs",function(){m(b,g)}),e.load(e.anchors.index(this));else throw"jQuery UI Tabs: Mismatching fragment identifier.";a.browser.msie&&this.blur()}),this.anchors.bind("click.tabs",function(){return!1})},_getIndex:function(a){typeof a=="string"&&(a=this.anchors.index(this.anchors.filter("[href$="+a+"]")));return a},destroy:function(){var b=this.options;this.abort(),this.element.unbind(".tabs").removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible").removeData("tabs"),this.list.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"),this.anchors.each(function(){var b=a.data(this,"href.tabs");b&&(this.href=b);var c=a(this).unbind(".tabs");a.each(["href","load","cache"],function(a,b){c.removeData(b+".tabs")})}),this.lis.unbind(".tabs").add(this.panels).each(function(){a.data(this,"destroy.tabs")?a(this).remove():a(this).removeClass("ui-state-default ui-corner-top ui-tabs-selected ui-state-active ui-state-hover ui-state-focus ui-state-disabled ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide")}),b.cookie&&this._cookie(null,b.cookie);return this},add:function(c,d,e){e===b&&(e=this.anchors.length);var f=this,g=this.options;d=a(g.tabTemplate.replace(/#\{href\}/g,c).replace(/#\{label\}/g,d)),c=c.indexOf("#")?this._tabId(a("a",d)[0]):c.replace("#",""),d.addClass("ui-state-default ui-corner-top").data("destroy.tabs",!0);var h=f.element.find("#"+c);h.length||(h=a(g.panelTemplate).attr("id",c).data("destroy.tabs",!0)),h.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide"),e>=this.lis.length?(d.appendTo(this.list),h.appendTo(this.list[0].parentNode)):(d.insertBefore(this.lis[e]),h.insertBefore(this.panels[e])),g.disabled=a.map(g.disabled,function(a){return a>=e?++a:a}),this._tabify(),this.anchors.length==1&&(g.selected=0,d.addClass("ui-tabs-selected ui-state-active"),h.removeClass("ui-tabs-hide"),this.element.queue("tabs",function(){f._trigger("show",null,f._ui(f.anchors[0],f.panels[0]))}),this.load(0)),this._trigger("add",null,this._ui(this.anchors[e],this.panels[e]));return this},remove:function(b){b=this._getIndex(b);var c=this.options,d=this.lis.eq(b).remove(),e=this.panels.eq(b).remove();d.hasClass("ui-tabs-selected")&&this.anchors.length>1&&this.select(b+(b+1<this.anchors.length?1:-1)),c.disabled=a.map(a.grep(c.disabled,function(a){return a!=b}),function(a){return a>=b?--a:a}),this._tabify(),this._trigger("remove",null,this._ui(d.find("a")[0],e[0]));return this},enable:function(b){b=this._getIndex(b);var c=this.options;if(a.inArray(b,c.disabled)!=-1){this.lis.eq(b).removeClass("ui-state-disabled"),c.disabled=a.grep(c.disabled,function(a){return a!=b}),this._trigger("enable",null,this._ui(this.anchors[b],this.panels[b]));return this}},disable:function(a){a=this._getIndex(a);var b=this.options;a!=b.selected&&(this.lis.eq(a).addClass("ui-state-disabled"),b.disabled.push(a),b.disabled.sort(),this._trigger("disable",null,this._ui(this.anchors[a],this.panels[a])));return this},select:function(a){a=this._getIndex(a);if(a==-1)if(this.options.collapsible&&this.options.selected!=-1)a=this.options.selected;else return this;this.anchors.eq(a).trigger(this.options.event+".tabs");return this},load:function(b){b=this._getIndex(b);var c=this,d=this.options,e=this.anchors.eq(b)[0],f=a.data(e,"load.tabs");this.abort();if(!f||this.element.queue("tabs").length!==0&&a.data(e,"cache.tabs"))this.element.dequeue("tabs");else{this.lis.eq(b).addClass("ui-state-processing");if(d.spinner){var g=a("span",e);g.data("label.tabs",g.html()).html(d.spinner)}this.xhr=a.ajax(a.extend({},d.ajaxOptions,{url:f,success:function(f,g){c.element.find(c._sanitizeSelector(e.hash)).html(f),c._cleanup(),d.cache&&a.data(e,"cache.tabs",!0),c._trigger("load",null,c._ui(c.anchors[b],c.panels[b]));try{d.ajaxOptions.success(f,g)}catch(h){}},error:function(a,f){c._cleanup(),c._trigger("load",null,c._ui(c.anchors[b],c.panels[b]));try{d.ajaxOptions.error(a,f,b,e)}catch(g){}}})),c.element.dequeue("tabs");return this}},abort:function(){this.element.queue([]),this.panels.stop(!1,!0),this.element.queue("tabs",this.element.queue("tabs").splice(-2,2)),this.xhr&&(this.xhr.abort(),delete this.xhr),this._cleanup();return this},url:function(a,b){this.anchors.eq(a).removeData("cache.tabs").data("load.tabs",b);return this},length:function(){return this.anchors.length}}),a.extend(a.ui.tabs,{version:"1.8.16"}),a.extend(a.ui.tabs.prototype,{rotation:null,rotate:function(a,b){var c=this,d=this.options,e=c._rotate||(c._rotate=function(b){clearTimeout(c.rotation),c.rotation=setTimeout(function(){var a=d.selected;c.select(++a<c.anchors.length?a:0)},a),b&&b.stopPropagation()});b=c._unrotate||(c._unrotate=b?function(){t=d.selected,e()}:function(a){a.clientX&&c.rotate(null)}),a?(this.element.bind("tabsshow",e),this.anchors.bind(d.event+".tabs",b),e()):(clearTimeout(c.rotation),this.element.unbind("tabsshow",e),this.anchors.unbind(d.event+".tabs",b),delete this._rotate,delete this._unrotate);return this}})}(jQuery),function(d,C){function H(a,b){d.extend(a,b);for(var c in b)if(b[c]==null||b[c]==C)a[c]=b[c];return a}function N(a){return a.bind("mouseout",function(a){a=d(a.target).closest("button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a"),a.length&&a.removeClass("ui-state-hover ui-datepicker-prev-hover ui-datepicker-next-hover")}).bind("mouseover",function(b){b=d(b.target).closest("button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a"),!d.datepicker._isDisabledDatepicker(J.inline?a.parent()[0]:J.input[0])&&!!b.length&&(b.parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"),b.addClass("ui-state-hover"),b.hasClass("ui-datepicker-prev")&&b.addClass("ui-datepicker-prev-hover"),b.hasClass("ui-datepicker-next")&&b.addClass("ui-datepicker-next-hover"))})}function M(){this.debug=!1,this._curInst=null,this._keyEvent=!1,this._disabledInputs=[],this._inDialog=this._datepickerShowing=!1,this._mainDivId="ui-datepicker-div",this._inlineClass="ui-datepicker-inline",this._appendClass="ui-datepicker-append",this._triggerClass="ui-datepicker-trigger",this._dialogClass="ui-datepicker-dialog",this._disableClass="ui-datepicker-disabled",this._unselectableClass="ui-datepicker-unselectable",this._currentClass="ui-datepicker-current-day",this._dayOverClass="ui-datepicker-days-cell-over",this.regional=[],this.regional[""]={closeText:"Done",prevText:"Prev",nextText:"Next",currentText:"Today",monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],monthNamesShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],dayNamesShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],dayNamesMin:["Su","Mo","Tu","We","Th","Fr","Sa"],weekHeader:"Wk",dateFormat:"mm/dd/yy",firstDay:0,isRTL:!1,showMonthAfterYear:!1,yearSuffix:""},this._defaults={showOn:"focus",showAnim:"fadeIn",showOptions:{},defaultDate:null,appendText:"",buttonText:"...",buttonImage:"",buttonImageOnly:!1,hideIfNoPrevNext:!1,navigationAsDateFormat:!1,gotoCurrent:!1,changeMonth:!1,changeYear:!1,yearRange:"c-10:c+10",showOtherMonths:!1,selectOtherMonths:!1,showWeek:!1,calculateWeek:this.iso8601Week,shortYearCutoff:"+10",minDate:null,maxDate:null,duration:"fast",beforeShowDay:null,beforeShow:null,onSelect:null,onChangeMonthYear:null,onClose:null,numberOfMonths:1,showCurrentAtPos:0,stepMonths:1,stepBigMonths:12,altField:"",altFormat:"",constrainInput:!0,showButtonPanel:!1,autoSize:!1,disabled:!1},d.extend(this._defaults,this.regional[""]),this.dpDiv=N(d('<div id="'+this._mainDivId+'" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'))}d.extend(d.ui,{datepicker:{version:"1.8.16"}});var B=(new Date).getTime(),J;d.extend(M.prototype,{markerClassName:"hasDatepicker",maxRows:4,log:function(){this.debug&&console.log.apply("",arguments)},_widgetDatepicker:function(){return this.dpDiv},setDefaults:function(a){H(this._defaults,a||{});return this},_attachDatepicker:function(a,b){var c=null;for(var e in this._defaults){var f=a.getAttribute("date:"+e);if(f){c=c||{};try{c[e]=eval(f)}catch(h){c[e]=f}}}e=a.nodeName.toLowerCase(),f=e=="div"||e=="span",a.id||(this.uuid+=1,a.id="dp"+this.uuid);var i=this._newInst(d(a),f);i.settings=d.extend({},b||{},c||{}),e=="input"?this._connectDatepicker(a,i):f&&this._inlineDatepicker(a,i)},_newInst:function(a,b){return{id:a[0].id.replace(/([^A-Za-z0-9_-])/g,"\\\\$1"),input:a,selectedDay:0,selectedMonth:0,selectedYear:0,drawMonth:0,drawYear:0,inline:b,dpDiv:b?N(d('<div class="'+this._inlineClass+' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>')):this.dpDiv}},_connectDatepicker:function(a,b){var c=d(a);b.append=d([]),b.trigger=d([]),c.hasClass(this.markerClassName)||(this._attachments(c,b),c.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp).bind("setData.datepicker",function(a,c,d){b.settings[c]=d}).bind("getData.datepicker",function(a,c){return this._get(b,c)}),this._autoSize(b),d.data(a,"datepicker",b),b.settings.disabled&&this._disableDatepicker(a))},_attachments:function(a,b){var c=this._get(b,"appendText"),e=this._get(b,"isRTL");b.append&&b.append.remove(),c&&(b.append=d('<span class="'+this._appendClass+'">'+c+"</span>"),a[e?"before":"after"](b.append)),a.unbind("focus",this._showDatepicker),b.trigger&&b.trigger.remove(),c=this._get(b,"showOn"),(c=="focus"||c=="both")&&a.focus(this._showDatepicker);if(c=="button"||c=="both"){c=this._get(b,"buttonText");var f=this._get(b,"buttonImage");b.trigger=d(this._get(b,"buttonImageOnly")?d("<img/>").addClass(this._triggerClass).attr({src:f,alt:c,title:c}):d('<button type="button"></button>').addClass(this._triggerClass).html(f==""?c:d("<img/>").attr({src:f,alt:c,title:c}))),a[e?"before":"after"](b.trigger),b.trigger.click(function(){d.datepicker._datepickerShowing&&d.datepicker._lastInput==a[0]?d.datepicker._hideDatepicker():d.datepicker._showDatepicker(a[0]);return!1})}},_autoSize:function(a){if(this._get(a,"autoSize")&&!a.inline){var b=new Date(2009,11,20),c=this._get(a,"dateFormat");if(c.match(/[DM]/)){var d=function(a){for(var b=0,c=0,d=0;d<a.length;d++)a[d].length>b&&(b=a[d].length,c=d);return c};b.setMonth(d(this._get(a,c.match(/MM/)?"monthNames":"monthNamesShort"))),b.setDate(d(this._get(a,c.match(/DD/)?"dayNames":"dayNamesShort"))+20-b.getDay())}a.input.attr("size",this._formatDate(a,b).length)}},_inlineDatepicker:function(a,b){var c=d(a);c.hasClass(this.markerClassName)||(c.addClass(this.markerClassName).append(b.dpDiv).bind("setData.datepicker",function(a,c,d){b.settings[c]=d}).bind("getData.datepicker",function(a,c){return this._get(b,c)}),d.data(a,"datepicker",b),this._setDate(b,this._getDefaultDate(b),!0),this._updateDatepicker(b),this._updateAlternate(b),b.settings.disabled&&this._disableDatepicker(a),b.dpDiv.css("display","block"))},_dialogDatepicker:function(a,b,c,e,f){a=this._dialogInst,a||(this.uuid+=1,this._dialogInput=d('<input type="text" id="'+("dp"+this.uuid)+'" style="position: absolute; top: -100px; width: 0px; z-index: -10;"/>'),this._dialogInput.keydown(this._doKeyDown),d("body").append(this._dialogInput),a=this._dialogInst=this._newInst(this._dialogInput,!1),a.settings={},d.data(this._dialogInput[0],"datepicker",a)),H(a.settings,e||{}),b=b&&b.constructor==Date?this._formatDate(a,b):b,this._dialogInput.val(b),this._pos=f?f.length?f:[f.pageX,f.pageY]:null,this._pos||(this._pos=[document.documentElement.clientWidth/2-100+(document.documentElement.scrollLeft||document.body.scrollLeft),document.documentElement.clientHeight/2-150+(document.documentElement.scrollTop||document.body.scrollTop)]),this._dialogInput.css("left",this._pos[0]+20+"px").css("top",this._pos[1]+"px"),a.settings.onSelect=c,this._inDialog=!0,this.dpDiv.addClass(this._dialogClass),this._showDatepicker(this._dialogInput[0]),d.blockUI&&d.blockUI(this.dpDiv),d.data(this._dialogInput[0],"datepicker",a);return this},_destroyDatepicker:function(a){var b=d(a),c=d.data(a,"datepicker");if(b.hasClass(this.markerClassName)){var e=a.nodeName.toLowerCase();d.removeData(a,"datepicker"),e=="input"?(c.append.remove(),c.trigger.remove(),b.removeClass(this.markerClassName).unbind("focus",this._showDatepicker).unbind("keydown",this._doKeyDown).unbind("keypress",this._doKeyPress).unbind("keyup",this._doKeyUp)):(e=="div"||e=="span")&&b.removeClass(this.markerClassName).empty()}},_enableDatepicker:function(a){var b=d(a),c=d.data(a,"datepicker");if(b.hasClass(this.markerClassName)){var e=a.nodeName.toLowerCase();if(e=="input")a.disabled=!1,c.trigger.filter("button").each(function(){this.disabled=!1}).end().filter("img").css({opacity:"1.0",cursor:""});else if(e=="div"||e=="span")b=b.children("."+this._inlineClass),b.children().removeClass("ui-state-disabled"),b.find("select.ui-datepicker-month, select.ui-datepicker-year").removeAttr("disabled");this._disabledInputs=d.map(this._disabledInputs,function(b){return b==a?null:b})}},_disableDatepicker:function(a){var b=d(a),c=d.data(a,"datepicker");if(b.hasClass(this.markerClassName)){var e=a.nodeName.toLowerCase();if(e=="input")a.disabled=!0,c.trigger.filter("button").each(function(){this.disabled=!0}).end().filter("img").css({opacity:"0.5",cursor:"default"});else if(e=="div"||e=="span")b=b.children("."+this._inlineClass),b.children().addClass("ui-state-disabled"),b.find("select.ui-datepicker-month, select.ui-datepicker-year").attr("disabled","disabled");this._disabledInputs=d.map(this._disabledInputs,function(b){return b==a?null:b}),this._disabledInputs[this._disabledInputs.length]=a}},_isDisabledDatepicker:function(a){if(!a)return!1;for(var b=0;b<this._disabledInputs.length;b++)if(this._disabledInputs[b]==a)return!0;return!1},_getInst:function(a){try{return d.data(a,"datepicker")}catch(b){throw"Missing instance data for this datepicker"}},_optionDatepicker:function(a,b,c){var e=this._getInst(a);if(arguments.length==2&&typeof b=="string")return b=="defaults"?d.extend({},d.datepicker._defaults):e?b=="all"?d.extend({},e.settings):this._get(e,b):null;var f=b||{};typeof b=="string"&&(f={},f[b]=c);if(e){this._curInst==e&&this._hideDatepicker();var g=this._getDateDatepicker(a,!0),h=this._getMinMaxDate(e,"min"),i=this._getMinMaxDate(e,"max");H(e.settings,f),h!==null&&f.dateFormat!==C&&f.minDate===C&&(e.settings.minDate=this._formatDate(e,h)),i!==null&&f.dateFormat!==C&&f.maxDate===C&&(e.settings.maxDate=this._formatDate(e,i)),this._attachments(d(a),e),this._autoSize(e),this._setDate(e,g),this._updateAlternate(e),this._updateDatepicker(e)}},_changeDatepicker:function(a,b,c){this._optionDatepicker(a,b,c)},_refreshDatepicker:function(a){(a=this._getInst(a))&&this._updateDatepicker(a)},_setDateDatepicker:function(a,b){if(a=this._getInst(a))this._setDate(a,b),this._updateDatepicker(a),this._updateAlternate(a)},_getDateDatepicker:function(a,b){(a=this._getInst(a))&&!a.inline&&this._setDateFromField(a,b);return a?this._getDate(a):null},_doKeyDown:function(a){var b=d.datepicker._getInst(a.target),c=!0,e=b.dpDiv.is(".ui-datepicker-rtl");b._keyEvent=!0;if(d.datepicker._datepickerShowing)switch(a.keyCode){case 9:d.datepicker._hideDatepicker(),c=!1;break;case 13:c=d("td."+d.datepicker._dayOverClass+":not(."+d.datepicker._currentClass+")",b.dpDiv),c[0]&&d.datepicker._selectDay(a.target,b.selectedMonth,b.selectedYear,c[0]),(a=d.datepicker._get(b,"onSelect"))?(c=d.datepicker._formatDate(b),a.apply(b.input?b.input[0]:null,[c,b])):d.datepicker._hideDatepicker();return!1;case 27:d.datepicker._hideDatepicker();break;case 33:d.datepicker._adjustDate(a.target,a.ctrlKey?-d.datepicker._get(b,"stepBigMonths"):-d.datepicker._get(b,"stepMonths"),"M");break;case 34:d.datepicker._adjustDate(a.target,a.ctrlKey?+d.datepicker._get(b,"stepBigMonths"):+d.datepicker._get(b,"stepMonths"),"M");break;case 35:(a.ctrlKey||a.metaKey)&&d.datepicker._clearDate(a.target),c=a.ctrlKey||a.metaKey;break;case 36:(a.ctrlKey||a.metaKey)&&d.datepicker._gotoToday(a.target),c=a.ctrlKey||a.metaKey;break;case 37:(a.ctrlKey||a.metaKey)&&d.datepicker._adjustDate(a.target,e?1:-1,"D"),c=a.ctrlKey||a.metaKey,a.originalEvent.altKey&&d.datepicker._adjustDate(a.target,a.ctrlKey?-d.datepicker._get(b,"stepBigMonths"):-d.datepicker._get(b,"stepMonths"),"M");break;case 38:(a.ctrlKey||a.metaKey)&&d.datepicker._adjustDate(a.target,-7,"D"),c=a.ctrlKey||a.metaKey;break;case 39:(a.ctrlKey||a.metaKey)&&d.datepicker._adjustDate(a.target,e?-1:1,"D"),c=a.ctrlKey||a.metaKey,a.originalEvent.altKey&&d.datepicker._adjustDate(a.target,a.ctrlKey?+d.datepicker._get(b,"stepBigMonths"):+d.datepicker._get(b,"stepMonths"),"M");break;case 40:(a.ctrlKey||a.metaKey)&&d.datepicker._adjustDate(a.target,7,"D"),c=a.ctrlKey||a.metaKey;break;default:c=!1}else a.keyCode==36&&a.ctrlKey?d.datepicker._showDatepicker(this):c=!1;c&&(a.preventDefault(),a.stopPropagation())},_doKeyPress:function(a){var b=d.datepicker._getInst(a.target);if(d.datepicker._get(b,"constrainInput")){b=d.datepicker._possibleChars(d.datepicker._get(b,"dateFormat"));var c=String.fromCharCode(a.charCode==C?a.keyCode:a.charCode);return a.ctrlKey||a.metaKey||c<" "||!b||b.indexOf(c)>-1}},_doKeyUp:function(a){a=d.datepicker._getInst(a.target);if(a.input.val()!=a.lastVal)try{d.datepicker.parseDate(d.datepicker._get(a,"dateFormat"),a.input?a.input.val():null,d.datepicker._getFormatConfig(a))&&(d.datepicker._setDateFromField(a),d.datepicker._updateAlternate(a),d.datepicker._updateDatepicker(a))}catch(b){d.datepicker.log(b)}return!0},_showDatepicker:function(a){a=a.target||a,a.nodeName.toLowerCase()!="input"&&(a=d("input",a.parentNode)[0]);if(!d.datepicker._isDisabledDatepicker(a)&&d.datepicker._lastInput!=a){var b=d.datepicker._getInst(a);d.datepicker._curInst&&d.datepicker._curInst!=b&&(d.datepicker._datepickerShowing&&d.datepicker._triggerOnClose(d.datepicker._curInst),d.datepicker._curInst.dpDiv.stop(!0,!0));var c=d.datepicker._get(b,"beforeShow");c=c?c.apply(a,[a,b]):{};if(c!==!1){H(b.settings,c),b.lastVal=null,d.datepicker._lastInput=a,d.datepicker._setDateFromField(b),d.datepicker._inDialog&&(a.value=""),d.datepicker._pos||(d.datepicker._pos=d.datepicker._findPos(a),d.datepicker._pos[1]+=a.offsetHeight);var e=!1;d(a).parents().each(function(){e|=d(this).css("position")=="fixed";return!e}),e&&d.browser.opera&&(d.datepicker._pos[0]-=document.documentElement.scrollLeft,d.datepicker._pos[1]-=document.documentElement.scrollTop),c={left:d.datepicker._pos[0],top:d.datepicker._pos[1]},d.datepicker._pos=null,b.dpDiv.empty(),b.dpDiv.css({position:"absolute",display:"block",top:"-1000px"}),d.datepicker._updateDatepicker(b),c=d.datepicker._checkOffset(b,c,e),b.dpDiv.css({position:d.datepicker._inDialog&&d.blockUI?"static":e?"fixed":"absolute",display:"none",left:c.left+"px",top:c.top+"px"});if(!b.inline){c=d.datepicker._get(b,"showAnim");var f=d.datepicker._get(b,"duration"),g=function(){var a=b.dpDiv.find("iframe.ui-datepicker-cover");if(a.length){var c=d.datepicker._getBorders(b.dpDiv);a.css({left:-c[0],top:-c[1],width:b.dpDiv.outerWidth(),height:b.dpDiv.outerHeight()})}};b.dpDiv.zIndex(d(a).zIndex()+1),d.datepicker._datepickerShowing=!0,d.effects&&d.effects[c]?b.dpDiv.show(c,d.datepicker._get(b,"showOptions"),f,g):b.dpDiv[c||"show"](c?f:null,g),(!c||!f)&&g(),b.input.is(":visible")&&!b.input.is(":disabled")&&b.input.focus(),d.datepicker._curInst=b}}}},_updateDatepicker:function(a){this.maxRows=4;var b=d.datepicker._getBorders(a.dpDiv);J=a,a.dpDiv.empty().append(this._generateHTML(a));var c=a.dpDiv.find("iframe.ui-datepicker-cover");c.length&&c.css({left:-b[0],top:-b[1],width:a.dpDiv.outerWidth(),height:a.dpDiv.outerHeight()}),a.dpDiv.find("."+this._dayOverClass+" a").mouseover(),b=this._getNumberOfMonths(a),c=b[1],a.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""),c>1&&a.dpDiv.addClass("ui-datepicker-multi-"+c).css("width",17*c+"em"),a.dpDiv[(b[0]!=1||b[1]!=1?"add":"remove")+"Class"]("ui-datepicker-multi"),a.dpDiv[(this._get(a,"isRTL")?"add":"remove")+"Class"]("ui-datepicker-rtl"),a==d.datepicker._curInst&&d.datepicker._datepickerShowing&&a.input&&a.input.is(":visible")&&!a.input.is(":disabled")&&a.input[0]!=document.activeElement&&a.input.focus();if(a.yearshtml){var e=a.yearshtml;setTimeout(function(){e===a.yearshtml&&a.yearshtml&&a.dpDiv.find("select.ui-datepicker-year:first").replaceWith(a.yearshtml),e=a.yearshtml=null},0)}},_getBorders:function(a){var b=function(a){return{thin:1,medium:2,thick:3}[a]||a};return[parseFloat(b(a.css("border-left-width"))),parseFloat(b(a.css("border-top-width")))]},_checkOffset:function(a,b,c){var e=a.dpDiv.outerWidth(),f=a.dpDiv.outerHeight(),g=a.input?a.input.outerWidth():0,h=a.input?a.input.outerHeight():0,i=document.documentElement.clientWidth+d(document).scrollLeft(),j=document.documentElement.clientHeight+d(document).scrollTop();b.left-=this._get(a,"isRTL")?e-g:0,b.left-=c&&b.left==a.input.offset().left?d(document).scrollLeft():0,b.top-=c&&b.top==a.input.offset().top+h?d(document).scrollTop():0,b.left-=Math.min(b.left,b.left+e>i&&i>e?Math.abs(b.left+e-i):0),b.top-=Math.min(b.top,b.top+f>j&&j>f?Math.abs(f+h):0);return b},_findPos:function(a){for(var b=this._get(this._getInst(a),"isRTL");a&&(a.type=="hidden"||a.nodeType!=1||d.expr.filters.hidden(a));)a=a[b?"previousSibling":"nextSibling"];a=d(a).offset();return[a.left,a.top]},_triggerOnClose:function(a){var b=this._get(a,"onClose");b&&b.apply(a.input?a.input[0]:null,[a.input?a.input.val():"",a])},_hideDatepicker:function(a){var b=this._curInst;if(!(!b||a&&b!=d.data(a,"datepicker"))&&this._datepickerShowing){a=this._get(b,"showAnim");var c=this._get(b,"duration"),e=function(){d.datepicker._tidyDialog(b),this._curInst=null};d.effects&&d.effects[a]?b.dpDiv.hide(a,d.datepicker._get(b,"showOptions"),c,e):b.dpDiv[a=="slideDown"?"slideUp":a=="fadeIn"?"fadeOut":"hide"](a?c:null,e),a||e(),d.datepicker._triggerOnClose(b),this._datepickerShowing=!1,this._lastInput=null,this._inDialog&&(this._dialogInput.css({position:"absolute",left:"0",top:"-100px"}),d.blockUI&&(d.unblockUI(),d("body").append(this.dpDiv))),this._inDialog=!1}},_tidyDialog:function(a){a.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")},_checkExternalClick:function(a){d.datepicker._curInst&&(a=d(a.target),a[0].id!=d.datepicker._mainDivId&&a.parents("#"+d.datepicker._mainDivId).length==0&&!a.hasClass(d.datepicker.markerClassName)&&!a.hasClass(d.datepicker._triggerClass)&&d.datepicker._datepickerShowing&&(!d.datepicker._inDialog||!d.blockUI)&&d.datepicker._hideDatepicker())},_adjustDate:function(a,b,c){a=d(a);var e=this._getInst(a[0]);this._isDisabledDatepicker(a[0])||(this._adjustInstDate(e,b+(c=="M"?this._get(e,"showCurrentAtPos"):0),c),this._updateDatepicker(e))},_gotoToday:function(a){a=d(a);var b=this._getInst(a[0]);if(this._get(b,"gotoCurrent")&&b.currentDay)b.selectedDay=b.currentDay,b.drawMonth=b.selectedMonth=b.currentMonth,b.drawYear=b.selectedYear=b.currentYear;else{var c=new Date;b.selectedDay=c.getDate(),b.drawMonth=b.selectedMonth=c.getMonth(),b.drawYear=b.selectedYear=c.getFullYear()}this._notifyChange(b),this._adjustDate(a)},_selectMonthYear:function(a,b,c){a=d(a);var e=this._getInst(a[0]);e["selected"+(c=="M"?"Month":"Year")]=e["draw"+(c=="M"?"Month":"Year")]=parseInt(b.options[b.selectedIndex].value,10),this._notifyChange(e),this._adjustDate(a)},_selectDay:function(a,b,c,e){var f=d(a);!d(e).hasClass(this._unselectableClass)&&!this._isDisabledDatepicker(f[0])&&(f=this._getInst(f[0]),f.selectedDay=f.currentDay=d("a",e).html(),f.selectedMonth=f.currentMonth=b,f.selectedYear=f.currentYear=c,this._selectDate(a,this._formatDate(f,f.currentDay,f.currentMonth,f.currentYear)))},_clearDate:function(a){a=d(a),this._getInst(a[0]),this._selectDate(a,"")},_selectDate:function(a,b){a=this._getInst(d(a)[0]),b=b!=null?b:this._formatDate(a),a.input&&a.input.val(b),this._updateAlternate(a);var c=this._get(a,"onSelect");c?c.apply(a.input?a.input[0]:null,[b,a]):a.input&&a.input.trigger("change"),a.inline?this._updateDatepicker(a):(this._hideDatepicker(),this._lastInput=a.input[0],typeof a.input[0]!="object"&&a.input.focus(),this._lastInput=null)},_updateAlternate:function(a){var b=this._get(a,"altField");if(b){var c=this._get(a,"altFormat")||this._get(a,"dateFormat"),e=this._getDate(a),f=this.formatDate(c,e,this._getFormatConfig(a));d(b).each(function(){d(this).val(f)})}},noWeekends:function(a){a=a.getDay();return[a>0&&a<6,""]},iso8601Week:function(a){a=new Date(a.getTime()),a.setDate(a.getDate()+4-(a.getDay()||7));var b=a.getTime();a.setMonth(0),a.setDate(1);return Math.floor(Math.round((b-a)/864e5)/7)+1},parseDate:function(a,b,c){if(a==null||b==null)throw"Invalid arguments";b=typeof b=="object"?b.toString():b+"";if(b=="")return null;var e=(c?c.shortYearCutoff:null)||this._defaults.shortYearCutoff;e=typeof e!="string"?e:(new Date).getFullYear()%100+parseInt(e,10);for(var f=(c?c.dayNamesShort:null)||this._defaults.dayNamesShort,g=(c?c.dayNames:null)||this._defaults.dayNames,h=(c?c.monthNamesShort:null)||this._defaults.monthNamesShort,i=(c?c.monthNames:null)||this._defaults.monthNames,j=c=-1,k=-1,l=-1,m=!1,n=function(b){(b=s+1<a.length&&a.charAt(s+1)==b)&&s++;return b},o=function(a){var c=n(a);a=new RegExp("^\\d{1,"+(a=="@"?14:a=="!"?20:a=="y"&&c?4:a=="o"?3:2)+"}"),a=b.substring(r).match(a);if(!a)throw"Missing number at position "+r;r+=a[0].length;return parseInt(a[0],10)},p=function(a,c,e){a=d.map(n(a)?e:c,function(a,b){return[[b,a]]}).sort(function(a,b){return-(a[1].length-b[1].length)});var f=-1;d.each(a,function(a,c){a=c[1];if(b.substr(r,a.length).toLowerCase()==a.toLowerCase()){f=c[0],r+=a.length;return!1}});if(f!=-1)return f+1;throw"Unknown name at position "+r},q=function(){if(b.charAt(r)!=a.charAt(s))throw"Unexpected literal at position "+r;r++},r=0,s=0;s<a.length;s++)if(m)a.charAt(s)=="'"&&!n("'")?m=!1:q();else switch(a.charAt(s)){case"d":k=o("d");break;case"D":p("D",f,g);break;case"o":l=o("o");break;case"m":j=o("m");break;case"M":j=p("M",h,i);break;case"y":c=o("y");break;case"@":var t=new Date(o("@"));c=t.getFullYear(),j=t.getMonth()+1,k=t.getDate();break;case"!":t=new Date((o("!")-this._ticksTo1970)/1e4),c=t.getFullYear(),j=t.getMonth()+1,k=t.getDate();break;case"'":n("'")?q():m=!0;break;default:q()}if(r<b.length)throw"Extra/unparsed characters found in date: "+b.substring(r);c==-1?c=(new Date).getFullYear():c<100&&(c+=(new Date).getFullYear()-(new Date).getFullYear()%100+(c<=e?0:-100));if(l>-1){j=1,k=l;do{e=this._getDaysInMonth(c,j-1);if(k<=e)break;j++,k-=e}while(1)}t=this._daylightSavingAdjust(new Date(c,j-1,k));if(t.getFullYear()!=c||t.getMonth()+1!=j||t.getDate()!=k)throw"Invalid date";return t},ATOM:"yy-mm-dd",COOKIE:"D, dd M yy",ISO_8601:"yy-mm-dd",RFC_822:"D, d M y",RFC_850:"DD, dd-M-y",RFC_1036:"D, d M y",RFC_1123:"D, d M yy",RFC_2822:"D, d M yy",RSS:"D, d M y",TICKS:"!",TIMESTAMP:"@",W3C:"yy-mm-dd",_ticksTo1970:(718685+Math.floor(492.5)-Math.floor(19.7)+Math.floor(4.925))*24*60*60*1e7,formatDate:function(a,b,c){if(!b)return"";var d=(c?c.dayNamesShort:null)||this._defaults.dayNamesShort,e=(c?c.dayNames:null)||this._defaults.dayNames,f=(c?c.monthNamesShort:null)||this._defaults.monthNamesShort;c=(c?c.monthNames:null)||this._defaults.monthNames;var g=function(b){(b=l+1<a.length&&a.charAt(l+1)==b)&&l++;return b},h=function(a,b,c){b=""+b;if(g(a))for(;b.length<c;)b="0"+b;return b},i=function(a,b,c,d){return g(a)?d[b]:c[b]},j="",k=!1;if(b)for(var l=0;l<a.length;l++)if(k)a.charAt(l)=="'"&&!g("'")?k=!1:j+=a.charAt(l);else switch(a.charAt(l)){case"d":j+=h("d",b.getDate(),2);break;case"D":j+=i("D",b.getDay(),d,e);break;case"o":j+=h("o",Math.round(((new Date(b.getFullYear(),b.getMonth(),b.getDate())).getTime()-(new Date(b.getFullYear(),0,0)).getTime())/864e5),3);break;case"m":j+=h("m",b.getMonth()+1,2);break;case"M":j+=i("M",b.getMonth(),f,c);break;case"y":j+=g("y")?b.getFullYear():(b.getYear()%100<10?"0":"")+b.getYear()%100;break;case"@":j+=b.getTime();break;case"!":j+=b.getTime()*1e4+this._ticksTo1970;break;case"'":g("'")?j+="'":k=!0;break;default:j+=a.charAt(l)}return j},_possibleChars:function(a){for(var b="",c=!1,d=function(b){(b=e+1<a.length&&a.charAt(e+1)==b)&&e++;return b},e=0;e<a.length;e++)if(c)a.charAt(e)=="'"&&!d("'")?c=!1:b+=a.charAt(e);else switch(a.charAt(e)){case"d":case"m":case"y":case"@":b+="0123456789";break;case"D":case"M":return null;case"'":d("'")?b+="'":c=!0;break;default:b+=a.charAt(e)}return b},_get:function(a,b){return a.settings[b]!==C?a.settings[b]:this._defaults[b]},_setDateFromField:function(a,b){if(a.input.val()!=a.lastVal){var c=this._get(a,"dateFormat"),d=a.lastVal=a.input?a.input.val():null,e,f;e=f=this._getDefaultDate(a);var g=this._getFormatConfig(a);try{e=this.parseDate(c,d,g)||f}catch(h){this.log(h),d=b?"":d}a.selectedDay=e.getDate(),a.drawMonth=a.selectedMonth=e.getMonth(),a.drawYear=a.selectedYear=e.getFullYear(),a.currentDay=d?e.getDate():0,a.currentMonth=d?e.getMonth():0,a.currentYear=d?e.getFullYear():0,this._adjustInstDate(a)}},_getDefaultDate:function(a){return this._restrictMinMax(a,this._determineDate(a,this._get(a,"defaultDate"),new Date))},_determineDate:function(a,b,c){var e=function(a){var b=new Date;b.setDate(b.getDate()+a);return b},f=function(b){try{return d.datepicker.parseDate(d.datepicker._get(a,"dateFormat"),b,d.datepicker._getFormatConfig(a))}catch(c){}var e=(b.toLowerCase().match(/^c/)?d.datepicker._getDate(a):null)||new Date,f=e.getFullYear(),g=e.getMonth();e=e.getDate();for(var h=/([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g,i=h.exec(b);i;){switch(i[2]||"d"){case"d":case"D":e+=parseInt(i[1],10);break;case"w":case"W":e+=parseInt(i[1],10)*7;break;case"m":case"M":g+=parseInt(i[1],10),e=Math.min(e,d.datepicker._getDaysInMonth(f,g));break;case"y":case"Y":f+=parseInt(i[1],10),e=Math.min(e,d.datepicker._getDaysInMonth(f,g))}i=h.exec(b)}return new Date(f,g,e)};if(b=(b=b==null||b===""?c:typeof b=="string"?f(b):typeof b=="number"?isNaN(b)?c:e(b):new Date(b.getTime()))&&b.toString()=="Invalid Date"?c:b)b.setHours(0),b.setMinutes(0),b.setSeconds(0),b.setMilliseconds(0);return this._daylightSavingAdjust(b)},_daylightSavingAdjust:function(a){if(!a)return null;a.setHours(a.getHours()>12?a.getHours()+2:0);return a},_setDate:function(a,b,c){var d=!b,e=a.selectedMonth,f=a.selectedYear;b=this._restrictMinMax(a,this._determineDate(a,b,new Date)),a.selectedDay=a.currentDay=b.getDate(),a.drawMonth=a.selectedMonth=a.currentMonth=b.getMonth(),a.drawYear=a.selectedYear=a.currentYear=b.getFullYear(),(e!=a.selectedMonth||f!=a.selectedYear)&&!c&&this._notifyChange(a),this._adjustInstDate(a),a.input&&a.input.val(d?"":this._formatDate(a))},_getDate:function(a){return!a.currentYear||a.input&&a.input.val()==""?null:this._daylightSavingAdjust(new Date(a.currentYear,a.currentMonth,a.currentDay))},_generateHTML:function(a){var b=new Date;b=this._daylightSavingAdjust(new Date(b.getFullYear(),b.getMonth(),b.getDate()));var c=this._get(a,"isRTL"),e=this._get(a,"showButtonPanel"),f=this._get(a,"hideIfNoPrevNext"),g=this._get(a,"navigationAsDateFormat"),h=this._getNumberOfMonths(a),i=this._get(a,"showCurrentAtPos"),j=this._get(a,"stepMonths"),k=h[0]!=1||h[1]!=1,l=this._daylightSavingAdjust(a.currentDay?new Date(a.currentYear,a.currentMonth,a.currentDay):new Date(9999,9,9)),m=this._getMinMaxDate(a,"min"),n=this._getMinMaxDate(a,"max");i=a.drawMonth-i;var o=a.drawYear;i<0&&(i+=12,o--);if(n){var p=this._daylightSavingAdjust(new Date(n.getFullYear(),n.getMonth()-h[0]*h[1]+1,n.getDate()));for(p=m&&p<m?m:p;this._daylightSavingAdjust(new Date(o,i,1))>p;)i--,i<0&&(i=11,o--)}a.drawMonth=i,a.drawYear=o,p=this._get(a,"prevText"),p=g?this.formatDate(p,this._daylightSavingAdjust(new Date(o,i-j,1)),this._getFormatConfig(a)):p,p=this._canAdjustMonth(a,-1,o,i)?'<a class="ui-datepicker-prev ui-corner-all" onclick="DP_jQuery_'+B+".datepicker._adjustDate('#"+a.id+"', -"+j+", 'M');\" title=\""+p+'"><span class="ui-icon ui-icon-circle-triangle-'+(c?"e":"w")+'">'+p+"</span></a>":f?"":'<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="'+p+'"><span class="ui-icon ui-icon-circle-triangle-'+(c?"e":"w")+'">'+p+"</span></a>";var q=this._get(a,"nextText");q=g?this.formatDate(q,this._daylightSavingAdjust(new Date(o,i+j,1)),this._getFormatConfig(a)):q,f=this._canAdjustMonth(a,1,o,i)?'<a class="ui-datepicker-next ui-corner-all" onclick="DP_jQuery_'+B+".datepicker._adjustDate('#"+a.id+"', +"+j+", 'M');\" title=\""+q+'"><span class="ui-icon ui-icon-circle-triangle-'+(c?"w":"e")+'">'+q+"</span></a>":f?"":'<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="'+q+'"><span class="ui-icon ui-icon-circle-triangle-'+(c?"w":"e")+'">'+q+"</span></a>",j=this._get(a,"currentText"),q=this._get(a,"gotoCurrent")&&a.currentDay?l:b,j=g?this.formatDate(j,q,this._getFormatConfig(a)):j,g=a.inline?"":'<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" onclick="DP_jQuery_'+B+'.datepicker._hideDatepicker();">'+this._get(a,"closeText")+"</button>",e=e?'<div class="ui-datepicker-buttonpane ui-widget-content">'+(c?g:"")+(this._isInRange(a,q)?'<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" onclick="DP_jQuery_'+B+".datepicker._gotoToday('#"+a.id+"');\">"+j+"</button>":"")+(c?"":g)+"</div>":"",g=parseInt(this._get(a,"firstDay"),10),g=isNaN(g)?0:g,j=this._get(a,"showWeek"),q=this._get(a,"dayNames"),this._get(a,"dayNamesShort");var r=this._get(a,"dayNamesMin"),s=this._get(a,"monthNames"),t=this._get(a,"monthNamesShort"),u=this._get(a,"beforeShowDay"),v=this._get(a,"showOtherMonths"),w=this._get(a,"selectOtherMonths");this._get(a,"calculateWeek");for(var x=this._getDefaultDate(a),y="",z=0;z<h[0];z++){var A="";this.maxRows=4;for(var C=0;C<h[1];C++){var D=this._daylightSavingAdjust(new Date(o,i,a.selectedDay)),E=" ui-corner-all",F="";if(k){F+='<div class="ui-datepicker-group';if(h[1]>1)switch(C){case 0:F+=" ui-datepicker-group-first",E=" ui-corner-"+(c?"right":"left");break;case h[1]-1:F+=" ui-datepicker-group-last",E=" ui-corner-"+(c?"left":"right");break;default:F+=" ui-datepicker-group-middle",E=""}F+='">'}F+='<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix'+E+'">'+(/all|left/.test(E)&&z==0?c?f:p:"")+(/all|right/.test(E)&&z==0?c?p:f:"")+this._generateMonthYearHeader(a,i,o,m,n,z>0||C>0,s,t)+'</div><table class="ui-datepicker-calendar"><thead><tr>';var G=j?'<th class="ui-datepicker-week-col">'+this._get(a,"weekHeader")+"</th>":"";for(E=0;E<7;E++){var H=(E+g)%7;G+="<th"+((E+g+6)%7>=5?' class="ui-datepicker-week-end"':"")+'><span title="'+q[H]+'">'+r[H]+"</span></th>"}F+=G+"</tr></thead><tbody>",G=this._getDaysInMonth(o,i),o==a.selectedYear&&i==a.selectedMonth&&(a.selectedDay=Math.min(a.selectedDay,G)),E=(this._getFirstDayOfMonth(o,i)-g+7)%7,G=Math.ceil((E+G)/7),this.maxRows=G=k?this.maxRows>G?this.maxRows:G:G,H=this._daylightSavingAdjust(new Date(o,i,1-E));for(var I=0;I<G;I++){F+="<tr>";var J=j?'<td class="ui-datepicker-week-col">'+this._get(a,"calculateWeek")(H)+"</td>":"";for(E=0;E<7;E++){var K=u?u.apply(a.input?a.input[0]:null,[H]):[!0,""],L=H.getMonth()!=i,M=L&&!w||!K[0]||m&&H<m||n&&H>n;J+='<td class="'+((E+g+6)%7>=5?" ui-datepicker-week-end":"")+(L?" ui-datepicker-other-month":"")+(H.getTime()==D.getTime()&&i==a.selectedMonth&&a._keyEvent||x.getTime()==H.getTime()&&x.getTime()==D.getTime()?" "+this._dayOverClass:"")+(M?" "+this._unselectableClass+" ui-state-disabled":"")+(L&&!v?"":" "+K[1]+(H.getTime()==l.getTime()?" "+this._currentClass:"")+(H.getTime()==b.getTime()?" ui-datepicker-today":""))+'"'+((!L||v)&&K[2]?' title="'+K[2]+'"':"")+(M?"":' onclick="DP_jQuery_'+B+".datepicker._selectDay('#"+a.id+"',"+H.getMonth()+","+H.getFullYear()+', this);return false;"')+">"+(L&&!v?"&#xa0;":M?'<span class="ui-state-default">'+H.getDate()+"</span>":'<a class="ui-state-default'+(H.getTime()==b.getTime()?" ui-state-highlight":"")+(H.getTime()==l.getTime()?" ui-state-active":"")+(L?" ui-priority-secondary":"")+'" href="#">'+H.getDate()+"</a>")+"</td>",H.setDate(H.getDate()+1),H=this._daylightSavingAdjust(H)}F+=J+"</tr>"}i++,i>11&&(i=0,o++),F+="</tbody></table>"+(k?"</div>"+(h[0]>0&&C==h[1]-1?'<div class="ui-datepicker-row-break"></div>':""):""),A+=F}y+=A}y+=e+(d.browser.msie&&parseInt(d.browser.version,10)<7&&!a.inline?'<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>':""),a._keyEvent=!1;return y},_generateMonthYearHeader:function(a,b,c,d,e,f,g,h){var i=this._get(a,"changeMonth"),j=this._get(a,"changeYear"),k=this._get(a,"showMonthAfterYear"),l='<div class="ui-datepicker-title">',m="";if(f||!i)m+='<span class="ui-datepicker-month">'+g[b]+"</span>";else{g=d&&d.getFullYear()==c;var n=e&&e.getFullYear()==c;m+='<select class="ui-datepicker-month" onchange="DP_jQuery_'+B+".datepicker._selectMonthYear('#"+a.id+"', this, 'M');\" >";for(var o=0;o<12;o++)(!g||o>=d.getMonth())&&(!n||o<=e.getMonth())&&(m+='<option value="'+o+'"'+(o==b?' selected="selected"':"")+">"+h[o]+"</option>");m+="</select>"}k||(l+=m+(f||!i||!j?"&#xa0;":""));if(!a.yearshtml){a.yearshtml="";if(f||!j)l+='<span class="ui-datepicker-year">'+c+"</span>";else{h=this._get(a,"yearRange").split(":");var p=(new Date).getFullYear();g=function(a){a=a.match(/c[+-].*/)?c+parseInt(a.substring(1),10):a.match(/[+-].*/)?p+parseInt(a,10):parseInt(a,10);return isNaN(a)?p:a},b=g(h[0]),h=Math.max(b,g(h[1]||"")),b=d?Math.max(b,d.getFullYear()):b,h=e?Math.min(h,e.getFullYear()):h;for(a.yearshtml+='<select class="ui-datepicker-year" onchange="DP_jQuery_'+B+".datepicker._selectMonthYear('#"+a.id+"', this, 'Y');\" >";b<=h;b++)a.yearshtml+='<option value="'+b+'"'+(b==c?' selected="selected"':"")+">"+b+"</option>";a.yearshtml+="</select>",l+=a.yearshtml,a.yearshtml=null}}l+=this._get(a,"yearSuffix"),k&&(l+=(f||!i||!j?"&#xa0;":"")+m),l+="</div>";return l},_adjustInstDate:function(a,b,c){var d=a.drawYear+(c=="Y"?b:0),e=a.drawMonth+(c=="M"?b:0);b=Math.min(a.selectedDay,this._getDaysInMonth(d,e))+(c=="D"?b:0),d=this._restrictMinMax(a,this._daylightSavingAdjust(new Date(d,e,b))),a.selectedDay=d.getDate(),a.drawMonth=a.selectedMonth=d.getMonth(),a.drawYear=a.selectedYear=d.getFullYear(),(c=="M"||c=="Y")&&this._notifyChange(a)},_restrictMinMax:function(a,b){var c=this._getMinMaxDate(a,"min");a=this._getMinMaxDate(a,"max"),b=c&&b<c?c:b;return b=a&&b>a?a:b},_notifyChange:function(a){var b=this._get(a,"onChangeMonthYear");b&&b.apply(a.input?a.input[0]:null,[a.selectedYear,a.selectedMonth+1,a])},_getNumberOfMonths:function(a){a=this._get(a,"numberOfMonths");return a==null?[1,1]:typeof a=="number"?[1,a]:a},_getMinMaxDate:function(a,b){return this._determineDate(a,this._get(a,b+"Date"),null)},_getDaysInMonth:function(a,b){return 32-this._daylightSavingAdjust(new Date(a,b,32)).getDate()},_getFirstDayOfMonth:function(a,b){return(new Date(a,b,1)).getDay()},_canAdjustMonth:function(a,b,c,d){var e=this._getNumberOfMonths(a);c=this._daylightSavingAdjust(new Date(c,d+(b<0?b:e[0]*e[1]),1)),b<0&&c.setDate(this._getDaysInMonth(c.getFullYear(),c.getMonth()));return this._isInRange(a,c)},_isInRange:function(a,b){var c=this._getMinMaxDate(a,"min");a=this._getMinMaxDate(a,"max");return(!c||b.getTime()>=c.getTime())&&(!a||b.getTime()<=a.getTime())},_getFormatConfig:function(a){var b=this._get(a,"shortYearCutoff");b=typeof b!="string"?b:(new Date).getFullYear()%100+parseInt(b,10);return{shortYearCutoff:b,dayNamesShort:this._get(a,"dayNamesShort"),dayNames:this._get(a,"dayNames"),monthNamesShort:this._get(a,"monthNamesShort"),monthNames:this._get(a,"monthNames")}},_formatDate:function(a,b,c,d){b||(a.currentDay=a.selectedDay,a.currentMonth=a.selectedMonth,a.currentYear=a.selectedYear),b=b?typeof b=="object"?b:this._daylightSavingAdjust(new Date(d,c,b)):this._daylightSavingAdjust(new Date(a.currentYear,a.currentMonth,a.currentDay));return this.formatDate(this._get(a,"dateFormat"),b,this._getFormatConfig(a))}}),d.fn.datepicker=function(a){if(!this.length)return this;d.datepicker.initialized||(d(document).mousedown(d.datepicker._checkExternalClick).find("body").append(d.datepicker.dpDiv),d.datepicker.initialized=!0);var b=Array.prototype.slice.call(arguments,1);return typeof a!="string"||a!="isDisabled"&&a!="getDate"&&a!="widget"?a=="option"&&arguments.length==2&&typeof arguments[1]=="string"?d.datepicker["_"+a+"Datepicker"].apply(d.datepicker,[this[0]].concat(b)):this.each(function(){typeof a=="string"?d.datepicker["_"+a+"Datepicker"].apply(d.datepicker,[this].concat(b)):d.datepicker._attachDatepicker(this,a)}):d.datepicker["_"+a+"Datepicker"].apply(d.datepicker,[this[0]].concat(b))},d.datepicker=new M,d.datepicker.initialized=!1,d.datepicker.uuid=(new Date).getTime(),d.datepicker.version="1.8.16",window["DP_jQuery_"+B]=d}(jQuery),function(a,b){a.widget("ui.progressbar",{options:{value:0,max:100},min:0,_create:function(){this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({role:"progressbar","aria-valuemin":this.min,"aria-valuemax":this.options.max,"aria-valuenow":this._value()}),this.valueDiv=a("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element),this.oldValue=this._value(),this._refreshValue()},destroy:function(){this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"),this.valueDiv.remove(),a.Widget.prototype.destroy.apply(this,arguments)},value:function(a){if(a===b)return this._value();this._setOption("value",a);return this},_setOption:function(b,c){b==="value"&&(this.options.value=c,this._refreshValue(),this._value()===this.options.max&&this._trigger("complete")),a.Widget.prototype._setOption.apply(this,arguments)},_value:function(){var a=this.options.value;typeof a!="number"&&(a=0);return Math.min(this.options.max,Math.max(this.min,a))},_percentage:function(){return 100*this._value()/this.options.max},_refreshValue:function(){var a=this.value(),b=this._percentage();this.oldValue!==a&&(this.oldValue=a,this._trigger("change")),this.valueDiv.toggle(a>this.min).toggleClass("ui-corner-right",a===this.options.max).width(b.toFixed(0)+"%"),this.element.attr("aria-valuenow",a)}}),a.extend(a.ui.progressbar,{version:"1.8.16"})}(jQuery)
define("jquery-ui", function(){});

//Safari's bind(this) doesn't seem to work
if (!Function.prototype.bind) {

  Function.prototype.bind = function (oThis) {

    if (typeof this !== "function") // closest thing possible to the ECMAScript 5 internal IsCallable function
    {
      throw new TypeError("Function.prototype.bind - what is trying to be fBound is not callable");
    }

    var aArgs = Array.prototype.slice.call(arguments, 1),
      fToBind = this,
      fNOP = function () {
      },
      fBound = function () {
        return fToBind.apply(this instanceof fNOP ? this : oThis || window, aArgs.concat(Array.prototype.slice.call(arguments)));
      };

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();

    return fBound;

  };

}


$(document).ready(function() {
  $.blockUI.defaults.css.border = 'none';
  $.blockUI.defaults.css.padding = '15px'; 
  $.blockUI.defaults.css.backgroundColor = '#000'; 
  $.blockUI.defaults.css.opacity = .8;
  $.blockUI.defaults.css.fontSize = '150%';
  $.blockUI.defaults.css.color = '#fff'; 
  $(document).ajaxStart($.blockUI).ajaxStop($.unblockUI);

//  var adjustDimensions = function() {
//    var headerHeight = $('#header').height();
//    var remaining_height = parseInt($(window).height() - headerHeight);
//
//    var sidebar = $('#sidebar');
//    var sidebarRight = $('#sidebar-right');
//    var content = $('#content');
//
//    var sidebarHeightExtra =
//      parseInt(sidebar.css("padding-top")) +
//      parseInt(sidebar.css("padding-bottom"));
//    var contentHeightExtra =
//      parseInt(content.css("padding-top")) +
//      parseInt(content.css("padding-bottom"));
//
//    sidebar.height(remaining_height - sidebarHeightExtra);
//    content.height(remaining_height - contentHeightExtra);
//
//    //var contentWidth =
//      //$(window).width() -  sidebar.width() - 170 - 50;
//    //content.width(contentWidth);
//  };

  //adjustDimensions();
  //$(window).resize(adjustDimensions);

//  var setActiveMenuItems = function() {
//    console.log(window.location.href);
//    $("#header #links a, #sidebar a").each(function() {
//      if ($(this).attr('href') === window.location.href) {
//        $(this).addClass('active');
//      }
//    });
//  };
  //setActiveMenuItems();

});

define("SetUp", function(){});

﻿/*!
 * jQuery blockUI plugin
 * Version 2.39 (23-MAY-2011)
 * @requires jQuery v1.2.3 or later
 *
 * Examples at: http://malsup.com/jquery/block/
 * Copyright (c) 2007-2010 M. Alsup
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * Thanks to Amir-Hossein Sobhi for some excellent contributions!
 */

;(function($) {

if (/1\.(0|1|2)\.(0|1|2)/.test($.fn.jquery) || /^1.1/.test($.fn.jquery)) {
	alert('blockUI requires jQuery v1.2.3 or later!  You are using v' + $.fn.jquery);
	return;
}

$.fn._fadeIn = $.fn.fadeIn;

var noOp = function() {};

// this bit is to ensure we don't call setExpression when we shouldn't (with extra muscle to handle
// retarded userAgent strings on Vista)
var mode = document.documentMode || 0;
var setExpr = $.browser.msie && (($.browser.version < 8 && !mode) || mode < 8);
var ie6 = $.browser.msie && /MSIE 6.0/.test(navigator.userAgent) && !mode;

// global $ methods for blocking/unblocking the entire page
$.blockUI   = function(opts) { install(window, opts); };
$.unblockUI = function(opts) { remove(window, opts); };

// convenience method for quick growl-like notifications  (http://www.google.com/search?q=growl)
$.growlUI = function(title, message, timeout, onClose) {
	var $m = $('<div class="growlUI"></div>');
	if (title) $m.append('<h1>'+title+'</h1>');
	if (message) $m.append('<h2>'+message+'</h2>');
	if (timeout == undefined) timeout = 3000;
	$.blockUI({
		message: $m, fadeIn: 700, fadeOut: 1000, centerY: false,
		timeout: timeout, showOverlay: false,
		onUnblock: onClose, 
		css: $.blockUI.defaults.growlCSS
	});
};

// plugin method for blocking element content
$.fn.block = function(opts) {
	return this.unblock({ fadeOut: 0 }).each(function() {
		if ($.css(this,'position') == 'static')
			this.style.position = 'relative';
		if ($.browser.msie)
			this.style.zoom = 1; // force 'hasLayout'
		install(this, opts);
	});
};

// plugin method for unblocking element content
$.fn.unblock = function(opts) {
	return this.each(function() {
		remove(this, opts);
	});
};

$.blockUI.version = 2.39; // 2nd generation blocking at no extra cost!

// override these in your code to change the default behavior and style
$.blockUI.defaults = {
	// message displayed when blocking (use null for no message)
	message:  '<h1>Please wait...</h1>',

	title: null,	  // title string; only used when theme == true
	draggable: true,  // only used when theme == true (requires jquery-ui.js to be loaded)
	
	theme: false, // set to true to use with jQuery UI themes
	
	// styles for the message when blocking; if you wish to disable
	// these and use an external stylesheet then do this in your code:
	// $.blockUI.defaults.css = {};
	css: {
		padding:	0,
		margin:		0,
		width:		'30%',
		top:		'40%',
		left:		'35%',
		textAlign:	'center',
		color:		'#000',
		border:		'3px solid #aaa',
		backgroundColor:'#fff',
		cursor:		'wait'
	},
	
	// minimal style set used when themes are used
	themedCSS: {
		width:	'30%',
		top:	'40%',
		left:	'35%'
	},

	// styles for the overlay
	overlayCSS:  {
		backgroundColor: '#000',
		opacity:	  	 0.6,
		cursor:		  	 'wait'
	},

	// styles applied when using $.growlUI
	growlCSS: {
		width:  	'350px',
		top:		'10px',
		left:   	'',
		right:  	'10px',
		border: 	'none',
		padding:	'5px',
		opacity:	0.6,
		cursor: 	'default',
		color:		'#fff',
		backgroundColor: '#000',
		'-webkit-border-radius': '10px',
		'-moz-border-radius':	 '10px',
		'border-radius': 		 '10px'
	},
	
	// IE issues: 'about:blank' fails on HTTPS and javascript:false is s-l-o-w
	// (hat tip to Jorge H. N. de Vasconcelos)
	iframeSrc: /^https/i.test(window.location.href || '') ? 'javascript:false' : 'about:blank',

	// force usage of iframe in non-IE browsers (handy for blocking applets)
	forceIframe: false,

	// z-index for the blocking overlay
	baseZ: 1000,

	// set these to true to have the message automatically centered
	centerX: true, // <-- only effects element blocking (page block controlled via css above)
	centerY: true,

	// allow body element to be stetched in ie6; this makes blocking look better
	// on "short" pages.  disable if you wish to prevent changes to the body height
	allowBodyStretch: true,

	// enable if you want key and mouse events to be disabled for content that is blocked
	bindEvents: true,

	// be default blockUI will supress tab navigation from leaving blocking content
	// (if bindEvents is true)
	constrainTabKey: true,

	// fadeIn time in millis; set to 0 to disable fadeIn on block
	fadeIn:  200,

	// fadeOut time in millis; set to 0 to disable fadeOut on unblock
	fadeOut:  400,

	// time in millis to wait before auto-unblocking; set to 0 to disable auto-unblock
	timeout: 0,

	// disable if you don't want to show the overlay
	showOverlay: true,

	// if true, focus will be placed in the first available input field when
	// page blocking
	focusInput: true,

	// suppresses the use of overlay styles on FF/Linux (due to performance issues with opacity)
	applyPlatformOpacityRules: true,
	
	// callback method invoked when fadeIn has completed and blocking message is visible
	onBlock: null,

	// callback method invoked when unblocking has completed; the callback is
	// passed the element that has been unblocked (which is the window object for page
	// blocks) and the options that were passed to the unblock call:
	//	 onUnblock(element, options)
	onUnblock: null,

	// don't ask; if you really must know: http://groups.google.com/group/jquery-en/browse_thread/thread/36640a8730503595/2f6a79a77a78e493#2f6a79a77a78e493
	quirksmodeOffsetHack: 4,

	// class name of the message block
	blockMsgClass: 'blockMsg'
};

// private data and functions follow...

var pageBlock = null;
var pageBlockEls = [];

function install(el, opts) {
	var full = (el == window);
	var msg = opts && opts.message !== undefined ? opts.message : undefined;
	opts = $.extend({}, $.blockUI.defaults, opts || {});
	opts.overlayCSS = $.extend({}, $.blockUI.defaults.overlayCSS, opts.overlayCSS || {});
	var css = $.extend({}, $.blockUI.defaults.css, opts.css || {});
	var themedCSS = $.extend({}, $.blockUI.defaults.themedCSS, opts.themedCSS || {});
	msg = msg === undefined ? opts.message : msg;

	// remove the current block (if there is one)
	if (full && pageBlock)
		remove(window, {fadeOut:0});

	// if an existing element is being used as the blocking content then we capture
	// its current place in the DOM (and current display style) so we can restore
	// it when we unblock
	if (msg && typeof msg != 'string' && (msg.parentNode || msg.jquery)) {
		var node = msg.jquery ? msg[0] : msg;
		var data = {};
		$(el).data('blockUI.history', data);
		data.el = node;
		data.parent = node.parentNode;
		data.display = node.style.display;
		data.position = node.style.position;
		if (data.parent)
			data.parent.removeChild(node);
	}

	$(el).data('blockUI.onUnblock', opts.onUnblock);
	var z = opts.baseZ;

	// blockUI uses 3 layers for blocking, for simplicity they are all used on every platform;
	// layer1 is the iframe layer which is used to supress bleed through of underlying content
	// layer2 is the overlay layer which has opacity and a wait cursor (by default)
	// layer3 is the message content that is displayed while blocking

	var lyr1 = ($.browser.msie || opts.forceIframe) 
		? $('<iframe class="blockUI" style="z-index:'+ (z++) +';display:none;border:none;margin:0;padding:0;position:absolute;width:100%;height:100%;top:0;left:0" src="'+opts.iframeSrc+'"></iframe>')
		: $('<div class="blockUI" style="display:none"></div>');
	
	var lyr2 = opts.theme 
	 	? $('<div class="blockUI blockOverlay ui-widget-overlay" style="z-index:'+ (z++) +';display:none"></div>')
	 	: $('<div class="blockUI blockOverlay" style="z-index:'+ (z++) +';display:none;border:none;margin:0;padding:0;width:100%;height:100%;top:0;left:0"></div>');

	var lyr3, s;
	if (opts.theme && full) {
		s = '<div class="blockUI ' + opts.blockMsgClass + ' blockPage ui-dialog ui-widget ui-corner-all" style="z-index:'+(z+10)+';display:none;position:fixed">' +
				'<div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">'+(opts.title || '&nbsp;')+'</div>' +
				'<div class="ui-widget-content ui-dialog-content"></div>' +
			'</div>';
	}
	else if (opts.theme) {
		s = '<div class="blockUI ' + opts.blockMsgClass + ' blockElement ui-dialog ui-widget ui-corner-all" style="z-index:'+(z+10)+';display:none;position:absolute">' +
				'<div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">'+(opts.title || '&nbsp;')+'</div>' +
				'<div class="ui-widget-content ui-dialog-content"></div>' +
			'</div>';
	}
	else if (full) {
		s = '<div class="blockUI ' + opts.blockMsgClass + ' blockPage" style="z-index:'+(z+10)+';display:none;position:fixed"></div>';
	}			 
	else {
		s = '<div class="blockUI ' + opts.blockMsgClass + ' blockElement" style="z-index:'+(z+10)+';display:none;position:absolute"></div>';
	}
	lyr3 = $(s);

	// if we have a message, style it
	if (msg) {
		if (opts.theme) {
			lyr3.css(themedCSS);
			lyr3.addClass('ui-widget-content');
		}
		else 
			lyr3.css(css);
	}

	// style the overlay
	if (!opts.theme && (!opts.applyPlatformOpacityRules || !($.browser.mozilla && /Linux/.test(navigator.platform))))
		lyr2.css(opts.overlayCSS);
	lyr2.css('position', full ? 'fixed' : 'absolute');

	// make iframe layer transparent in IE
	if ($.browser.msie || opts.forceIframe)
		lyr1.css('opacity',0.0);

	//$([lyr1[0],lyr2[0],lyr3[0]]).appendTo(full ? 'body' : el);
	var layers = [lyr1,lyr2,lyr3], $par = full ? $('body') : $(el);
	$.each(layers, function() {
		this.appendTo($par);
	});
	
	if (opts.theme && opts.draggable && $.fn.draggable) {
		lyr3.draggable({
			handle: '.ui-dialog-titlebar',
			cancel: 'li'
		});
	}

	// ie7 must use absolute positioning in quirks mode and to account for activex issues (when scrolling)
	var expr = setExpr && (!$.boxModel || $('object,embed', full ? null : el).length > 0);
	if (ie6 || expr) {
		// give body 100% height
		if (full && opts.allowBodyStretch && $.boxModel)
			$('html,body').css('height','100%');

		// fix ie6 issue when blocked element has a border width
		if ((ie6 || !$.boxModel) && !full) {
			var t = sz(el,'borderTopWidth'), l = sz(el,'borderLeftWidth');
			var fixT = t ? '(0 - '+t+')' : 0;
			var fixL = l ? '(0 - '+l+')' : 0;
		}

		// simulate fixed position
		$.each([lyr1,lyr2,lyr3], function(i,o) {
			var s = o[0].style;
			s.position = 'absolute';
			if (i < 2) {
				full ? s.setExpression('height','Math.max(document.body.scrollHeight, document.body.offsetHeight) - (jQuery.boxModel?0:'+opts.quirksmodeOffsetHack+') + "px"')
					 : s.setExpression('height','this.parentNode.offsetHeight + "px"');
				full ? s.setExpression('width','jQuery.boxModel && document.documentElement.clientWidth || document.body.clientWidth + "px"')
					 : s.setExpression('width','this.parentNode.offsetWidth + "px"');
				if (fixL) s.setExpression('left', fixL);
				if (fixT) s.setExpression('top', fixT);
			}
			else if (opts.centerY) {
				if (full) s.setExpression('top','(document.documentElement.clientHeight || document.body.clientHeight) / 2 - (this.offsetHeight / 2) + (blah = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"');
				s.marginTop = 0;
			}
			else if (!opts.centerY && full) {
				var top = (opts.css && opts.css.top) ? parseInt(opts.css.top) : 0;
				var expression = '((document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + '+top+') + "px"';
				s.setExpression('top',expression);
			}
		});
	}

	// show the message
	if (msg) {
		if (opts.theme)
			lyr3.find('.ui-widget-content').append(msg);
		else
			lyr3.append(msg);
		if (msg.jquery || msg.nodeType)
			$(msg).show();
	}

	if (($.browser.msie || opts.forceIframe) && opts.showOverlay)
		lyr1.show(); // opacity is zero
	if (opts.fadeIn) {
		var cb = opts.onBlock ? opts.onBlock : noOp;
		var cb1 = (opts.showOverlay && !msg) ? cb : noOp;
		var cb2 = msg ? cb : noOp;
		if (opts.showOverlay)
			lyr2._fadeIn(opts.fadeIn, cb1);
		if (msg)
			lyr3._fadeIn(opts.fadeIn, cb2);
	}
	else {
		if (opts.showOverlay)
			lyr2.show();
		if (msg)
			lyr3.show();
		if (opts.onBlock)
			opts.onBlock();
	}

	// bind key and mouse events
	bind(1, el, opts);

	if (full) {
		pageBlock = lyr3[0];
		pageBlockEls = $(':input:enabled:visible',pageBlock);
		if (opts.focusInput)
			setTimeout(focus, 20);
	}
	else
		center(lyr3[0], opts.centerX, opts.centerY);

	if (opts.timeout) {
		// auto-unblock
		var to = setTimeout(function() {
			full ? $.unblockUI(opts) : $(el).unblock(opts);
		}, opts.timeout);
		$(el).data('blockUI.timeout', to);
	}
};

// remove the block
function remove(el, opts) {
	var full = (el == window);
	var $el = $(el);
	var data = $el.data('blockUI.history');
	var to = $el.data('blockUI.timeout');
	if (to) {
		clearTimeout(to);
		$el.removeData('blockUI.timeout');
	}
	opts = $.extend({}, $.blockUI.defaults, opts || {});
	bind(0, el, opts); // unbind events

	if (opts.onUnblock === null) {
		opts.onUnblock = $el.data('blockUI.onUnblock');
		$el.removeData('blockUI.onUnblock');
	}

	var els;
	if (full) // crazy selector to handle odd field errors in ie6/7
		els = $('body').children().filter('.blockUI').add('body > .blockUI');
	else
		els = $('.blockUI', el);

	if (full)
		pageBlock = pageBlockEls = null;

	if (opts.fadeOut) {
		els.fadeOut(opts.fadeOut);
		setTimeout(function() { reset(els,data,opts,el); }, opts.fadeOut);
	}
	else
		reset(els, data, opts, el);
};

// move blocking element back into the DOM where it started
function reset(els,data,opts,el) {
	els.each(function(i,o) {
		// remove via DOM calls so we don't lose event handlers
		if (this.parentNode)
			this.parentNode.removeChild(this);
	});

	if (data && data.el) {
		data.el.style.display = data.display;
		data.el.style.position = data.position;
		if (data.parent)
			data.parent.appendChild(data.el);
		$(el).removeData('blockUI.history');
	}

	if (typeof opts.onUnblock == 'function')
		opts.onUnblock(el,opts);
};

// bind/unbind the handler
function bind(b, el, opts) {
	var full = el == window, $el = $(el);

	// don't bother unbinding if there is nothing to unbind
	if (!b && (full && !pageBlock || !full && !$el.data('blockUI.isBlocked')))
		return;
	if (!full)
		$el.data('blockUI.isBlocked', b);

	// don't bind events when overlay is not in use or if bindEvents is false
	if (!opts.bindEvents || (b && !opts.showOverlay)) 
		return;

	// bind anchors and inputs for mouse and key events
	var events = 'mousedown mouseup keydown keypress';
	b ? $(document).bind(events, opts, handler) : $(document).unbind(events, handler);

// former impl...
//	   var $e = $('a,:input');
//	   b ? $e.bind(events, opts, handler) : $e.unbind(events, handler);
};

// event handler to suppress keyboard/mouse events when blocking
function handler(e) {
	// allow tab navigation (conditionally)
	if (e.keyCode && e.keyCode == 9) {
		if (pageBlock && e.data.constrainTabKey) {
			var els = pageBlockEls;
			var fwd = !e.shiftKey && e.target === els[els.length-1];
			var back = e.shiftKey && e.target === els[0];
			if (fwd || back) {
				setTimeout(function(){focus(back)},10);
				return false;
			}
		}
	}
	var opts = e.data;
	// allow events within the message content
	if ($(e.target).parents('div.' + opts.blockMsgClass).length > 0)
		return true;

	// allow events for content that is not being blocked
	return $(e.target).parents().children().filter('div.blockUI').length == 0;
};

function focus(back) {
	if (!pageBlockEls)
		return;
	var e = pageBlockEls[back===true ? pageBlockEls.length-1 : 0];
	if (e)
		e.focus();
};

function center(el, x, y) {
	var p = el.parentNode, s = el.style;
	var l = ((p.offsetWidth - el.offsetWidth)/2) - sz(p,'borderLeftWidth');
	var t = ((p.offsetHeight - el.offsetHeight)/2) - sz(p,'borderTopWidth');
	if (x) s.left = l > 0 ? (l+'px') : '0';
	if (y) s.top  = t > 0 ? (t+'px') : '0';
};

function sz(el, p) {
	return parseInt($.css(el,p))||0;
};

})(jQuery);

define("jquery.blockui", function(){});

/*

Uniform v1.7.5
Copyright © 2009 Josh Pyles / Pixelmatrix Design LLC
http://pixelmatrixdesign.com

Requires jQuery 1.4 or newer

Much thanks to Thomas Reynolds and Buck Wilson for their help and advice on this

Disabling text selection is made possible by Mathias Bynens <http://mathiasbynens.be/>
and his noSelect plugin. <http://github.com/mathiasbynens/noSelect-jQuery-Plugin>

Also, thanks to David Kaneda and Eugene Bond for their contributions to the plugin

License:
MIT License - http://www.opensource.org/licenses/mit-license.php

Enjoy!

*/

(function($) {
  $.uniform = {
    options: {
      selectClass:   'selector',
      radioClass: 'radio',
      checkboxClass: 'checker',
      fileClass: 'uploader',
      filenameClass: 'filename',
      fileBtnClass: 'action',
      fileDefaultText: 'No file selected',
      fileBtnText: 'Choose File',
      checkedClass: 'checked',
      focusClass: 'focus',
      disabledClass: 'disabled',
      buttonClass: 'button',
      activeClass: 'active',
      hoverClass: 'hover',
      useID: true,
      idPrefix: 'uniform',
      resetSelector: false,
      autoHide: true
    },
    elements: []
  };

  if($.browser.msie && $.browser.version < 7){
    $.support.selectOpacity = false;
  }else{
    $.support.selectOpacity = true;
  }

  $.fn.uniform = function(options) {

    options = $.extend($.uniform.options, options);

    var el = this;
    //code for specifying a reset button
    if(options.resetSelector != false){
      $(options.resetSelector).mouseup(function(){
        function resetThis(){
          $.uniform.update(el);
        }
        setTimeout(resetThis, 10);
      });
    }
    
    function doInput(elem){
      $el = $(elem);
      $el.addClass($el.attr("type"));
      storeElement(elem);
    }
    
    function doTextarea(elem){
      $(elem).addClass("uniform");
      storeElement(elem);
    }
    
    function doButton(elem){
      var $el = $(elem);
      
      var divTag = $("<div>"),
          spanTag = $("<span>");
      
      divTag.addClass(options.buttonClass);
      
      if(options.useID && $el.attr("id") != "") divTag.attr("id", options.idPrefix+"-"+$el.attr("id"));
      
      var btnText;
      
      if($el.is("a") || $el.is("button")){
        btnText = $el.text();
      }else if($el.is(":submit") || $el.is(":reset") || $el.is("input[type=button]")){
        btnText = $el.attr("value");
      }
      
      btnText = btnText == "" ? $el.is(":reset") ? "Reset" : "Submit" : btnText;
      
      spanTag.html(btnText);
      
      $el.css("opacity", 0);
      $el.wrap(divTag);
      $el.wrap(spanTag);
      
      //redefine variables
      divTag = $el.closest("div");
      spanTag = $el.closest("span");
      
      if($el.is(":disabled")) divTag.addClass(options.disabledClass);
      
      divTag.bind({
        "mouseenter.uniform": function(){
          divTag.addClass(options.hoverClass);
        },
        "mouseleave.uniform": function(){
          divTag.removeClass(options.hoverClass);
          divTag.removeClass(options.activeClass);
        },
        "mousedown.uniform touchbegin.uniform": function(){
          divTag.addClass(options.activeClass);
        },
        "mouseup.uniform touchend.uniform": function(){
          divTag.removeClass(options.activeClass);
        },
        "click.uniform touchend.uniform": function(e){
          if($(e.target).is("span") || $(e.target).is("div")){    
            if(elem[0].dispatchEvent){
              var ev = document.createEvent('MouseEvents');
              ev.initEvent( 'click', true, true );
              elem[0].dispatchEvent(ev);
            }else{
              elem[0].click();
            }
          }
        }
      });
      
      elem.bind({
        "focus.uniform": function(){
          divTag.addClass(options.focusClass);
        },
        "blur.uniform": function(){
          divTag.removeClass(options.focusClass);
        }
      });
      
      $.uniform.noSelect(divTag);
      storeElement(elem);
      
    }

    function doSelect(elem){
      var $el = $(elem);
      
      var divTag = $('<div />'),
          spanTag = $('<span />');
      
      if(!$el.css("display") == "none" && options.autoHide){
        divTag.hide();
      }

      divTag.addClass(options.selectClass);

      if(options.useID && elem.attr("id") != ""){
        divTag.attr("id", options.idPrefix+"-"+elem.attr("id"));
      }
      
      var selected = elem.find(":selected:first");
      if(selected.length == 0){
        selected = elem.find("option:first");
      }
      spanTag.html(selected.html());
      
      elem.css('opacity', 0);
      elem.wrap(divTag);
      elem.before(spanTag);

      //redefine variables
      divTag = elem.parent("div");
      spanTag = elem.siblings("span");

      elem.bind({
        "change.uniform": function() {
          spanTag.text(elem.find(":selected").html());
          divTag.removeClass(options.activeClass);
        },
        "focus.uniform": function() {
          divTag.addClass(options.focusClass);
        },
        "blur.uniform": function() {
          divTag.removeClass(options.focusClass);
          divTag.removeClass(options.activeClass);
        },
        "mousedown.uniform touchbegin.uniform": function() {
          divTag.addClass(options.activeClass);
        },
        "mouseup.uniform touchend.uniform": function() {
          divTag.removeClass(options.activeClass);
        },
        "click.uniform touchend.uniform": function(){
          divTag.removeClass(options.activeClass);
        },
        "mouseenter.uniform": function() {
          divTag.addClass(options.hoverClass);
        },
        "mouseleave.uniform": function() {
          divTag.removeClass(options.hoverClass);
          divTag.removeClass(options.activeClass);
        },
        "keyup.uniform": function(){
          spanTag.text(elem.find(":selected").html());
        }
      });
      
      //handle disabled state
      if($(elem).attr("disabled")){
        //box is checked by default, check our box
        divTag.addClass(options.disabledClass);
      }
      $.uniform.noSelect(spanTag);
      
      storeElement(elem);

    }

    function doCheckbox(elem){
      var $el = $(elem);
      
      var divTag = $('<div />'),
          spanTag = $('<span />');
      
      if(!$el.css("display") == "none" && options.autoHide){
        divTag.hide();
      }
      
      divTag.addClass(options.checkboxClass);

      //assign the id of the element
      if(options.useID && elem.attr("id") != ""){
        divTag.attr("id", options.idPrefix+"-"+elem.attr("id"));
      }

      //wrap with the proper elements
      $(elem).wrap(divTag);
      $(elem).wrap(spanTag);

      //redefine variables
      spanTag = elem.parent();
      divTag = spanTag.parent();

      //hide normal input and add focus classes
      $(elem)
      .css("opacity", 0)
      .bind({
        "focus.uniform": function(){
          divTag.addClass(options.focusClass);
        },
        "blur.uniform": function(){
          divTag.removeClass(options.focusClass);
        },
        "click.uniform touchend.uniform": function(){
          if(!$(elem).attr("checked")){
            //box was just unchecked, uncheck span
            spanTag.removeClass(options.checkedClass);
          }else{
            //box was just checked, check span.
            spanTag.addClass(options.checkedClass);
          }
        },
        "mousedown.uniform touchbegin.uniform": function() {
          divTag.addClass(options.activeClass);
        },
        "mouseup.uniform touchend.uniform": function() {
          divTag.removeClass(options.activeClass);
        },
        "mouseenter.uniform": function() {
          divTag.addClass(options.hoverClass);
        },
        "mouseleave.uniform": function() {
          divTag.removeClass(options.hoverClass);
          divTag.removeClass(options.activeClass);
        }
      });
      
      //handle defaults
      if($(elem).attr("checked")){
        //box is checked by default, check our box
        spanTag.addClass(options.checkedClass);
      }

      //handle disabled state
      if($(elem).attr("disabled")){
        //box is checked by default, check our box
        divTag.addClass(options.disabledClass);
      }

      storeElement(elem);
    }

    function doRadio(elem){
      var $el = $(elem);
      
      var divTag = $('<div />'),
          spanTag = $('<span />');
          
      if(!$el.css("display") == "none" && options.autoHide){
        divTag.hide();
      }

      divTag.addClass(options.radioClass);

      if(options.useID && elem.attr("id") != ""){
        divTag.attr("id", options.idPrefix+"-"+elem.attr("id"));
      }

      //wrap with the proper elements
      $(elem).wrap(divTag);
      $(elem).wrap(spanTag);

      //redefine variables
      spanTag = elem.parent();
      divTag = spanTag.parent();

      //hide normal input and add focus classes
      $(elem)
      .css("opacity", 0)
      .bind({
        "focus.uniform": function(){
          divTag.addClass(options.focusClass);
        },
        "blur.uniform": function(){
          divTag.removeClass(options.focusClass);
        },
        "click.uniform touchend.uniform": function(){
          if(!$(elem).attr("checked")){
            //box was just unchecked, uncheck span
            spanTag.removeClass(options.checkedClass);
          }else{
            //box was just checked, check span
            var classes = options.radioClass.split(" ")[0];
            $("." + classes + " span." + options.checkedClass + ":has([name='" + $(elem).attr('name') + "'])").removeClass(options.checkedClass);
            spanTag.addClass(options.checkedClass);
          }
        },
        "mousedown.uniform touchend.uniform": function() {
          if(!$(elem).is(":disabled")){
            divTag.addClass(options.activeClass);
          }
        },
        "mouseup.uniform touchbegin.uniform": function() {
          divTag.removeClass(options.activeClass);
        },
        "mouseenter.uniform touchend.uniform": function() {
          divTag.addClass(options.hoverClass);
        },
        "mouseleave.uniform": function() {
          divTag.removeClass(options.hoverClass);
          divTag.removeClass(options.activeClass);
        }
      });

      //handle defaults
      if($(elem).attr("checked")){
        //box is checked by default, check span
        spanTag.addClass(options.checkedClass);
      }
      //handle disabled state
      if($(elem).attr("disabled")){
        //box is checked by default, check our box
        divTag.addClass(options.disabledClass);
      }

      storeElement(elem);

    }

    function doFile(elem){
      //sanitize input
      var $el = $(elem);

      var divTag = $('<div />'),
          filenameTag = $('<span>'+options.fileDefaultText+'</span>'),
          btnTag = $('<span>'+options.fileBtnText+'</span>');
      
      if(!$el.css("display") == "none" && options.autoHide){
        divTag.hide();
      }

      divTag.addClass(options.fileClass);
      filenameTag.addClass(options.filenameClass);
      btnTag.addClass(options.fileBtnClass);

      if(options.useID && $el.attr("id") != ""){
        divTag.attr("id", options.idPrefix+"-"+$el.attr("id"));
      }

      //wrap with the proper elements
      $el.wrap(divTag);
      $el.after(btnTag);
      $el.after(filenameTag);

      //redefine variables
      divTag = $el.closest("div");
      filenameTag = $el.siblings("."+options.filenameClass);
      btnTag = $el.siblings("."+options.fileBtnClass);

      //set the size
      if(!$el.attr("size")){
        var divWidth = divTag.width();
        //$el.css("width", divWidth);
        $el.attr("size", divWidth/10);
      }

      //actions
      var setFilename = function()
      {
        var filename = $el.val();
        if (filename === '')
        {
          filename = options.fileDefaultText;
        }
        else
        {
          filename = filename.split(/[\/\\]+/);
          filename = filename[(filename.length-1)];
        }
        filenameTag.text(filename);
      };

      // Account for input saved across refreshes
      setFilename();

      $el
      .css("opacity", 0)
      .bind({
        "focus.uniform": function(){
          divTag.addClass(options.focusClass);
        },
        "blur.uniform": function(){
          divTag.removeClass(options.focusClass);
        },
        "mousedown.uniform": function() {
          if(!$(elem).is(":disabled")){
            divTag.addClass(options.activeClass);
          }
        },
        "mouseup.uniform": function() {
          divTag.removeClass(options.activeClass);
        },
        "mouseenter.uniform": function() {
          divTag.addClass(options.hoverClass);
        },
        "mouseleave.uniform": function() {
          divTag.removeClass(options.hoverClass);
          divTag.removeClass(options.activeClass);
        }
      });

      // IE7 doesn't fire onChange until blur or second fire.
      if ($.browser.msie){
        // IE considers browser chrome blocking I/O, so it
        // suspends tiemouts until after the file has been selected.
        $el.bind('click.uniform.ie7', function() {
          setTimeout(setFilename, 0);
        });
      }else{
        // All other browsers behave properly
        $el.bind('change.uniform', setFilename);
      }

      //handle defaults
      if($el.attr("disabled")){
        //box is checked by default, check our box
        divTag.addClass(options.disabledClass);
      }
      
      $.uniform.noSelect(filenameTag);
      $.uniform.noSelect(btnTag);
      
      storeElement(elem);

    }
    
    $.uniform.restore = function(elem){
      if(elem == undefined){
        elem = $($.uniform.elements);
      }
      
      $(elem).each(function(){
        if($(this).is(":checkbox")){
          //unwrap from span and div
          $(this).unwrap().unwrap();
        }else if($(this).is("select")){
          //remove sibling span
          $(this).siblings("span").remove();
          //unwrap parent div
          $(this).unwrap();
        }else if($(this).is(":radio")){
          //unwrap from span and div
          $(this).unwrap().unwrap();
        }else if($(this).is(":file")){
          //remove sibling spans
          $(this).siblings("span").remove();
          //unwrap parent div
          $(this).unwrap();
        }else if($(this).is("button, :submit, :reset, a, input[type='button']")){
          //unwrap from span and div
          $(this).unwrap().unwrap();
        }
        
        //unbind events
        $(this).unbind(".uniform");
        
        //reset inline style
        $(this).css("opacity", "1");
        
        //remove item from list of uniformed elements
        var index = $.inArray($(elem), $.uniform.elements);
        $.uniform.elements.splice(index, 1);
      });
    };

    function storeElement(elem){
      //store this element in our global array
      elem = $(elem).get();
      if(elem.length > 1){
        $.each(elem, function(i, val){
          $.uniform.elements.push(val);
        });
      }else{
        $.uniform.elements.push(elem);
      }
    }
    
    //noSelect v1.0
    $.uniform.noSelect = function(elem) {
      function f() {
       return false;
      };
      $(elem).each(function() {
       this.onselectstart = this.ondragstart = f; // Webkit & IE
       $(this)
        .mousedown(f) // Webkit & Opera
        .css({ MozUserSelect: 'none' }); // Firefox
      });
     };

    $.uniform.update = function(elem){
      if(elem == undefined){
        elem = $($.uniform.elements);
      }
      //sanitize input
      elem = $(elem);

      elem.each(function(){
        //do to each item in the selector
        //function to reset all classes
        var $e = $(this);

        if($e.is("select")){
          //element is a select
          var spanTag = $e.siblings("span");
          var divTag = $e.parent("div");

          divTag.removeClass(options.hoverClass+" "+options.focusClass+" "+options.activeClass);

          //reset current selected text
          spanTag.html($e.find(":selected").html());

          if($e.is(":disabled")){
            divTag.addClass(options.disabledClass);
          }else{
            divTag.removeClass(options.disabledClass);
          }

        }else if($e.is(":checkbox")){
          //element is a checkbox
          var spanTag = $e.closest("span");
          var divTag = $e.closest("div");

          divTag.removeClass(options.hoverClass+" "+options.focusClass+" "+options.activeClass);
          spanTag.removeClass(options.checkedClass);

          if($e.is(":checked")){
            spanTag.addClass(options.checkedClass);
          }
          if($e.is(":disabled")){
            divTag.addClass(options.disabledClass);
          }else{
            divTag.removeClass(options.disabledClass);
          }

        }else if($e.is(":radio")){
          //element is a radio
          var spanTag = $e.closest("span");
          var divTag = $e.closest("div");

          divTag.removeClass(options.hoverClass+" "+options.focusClass+" "+options.activeClass);
          spanTag.removeClass(options.checkedClass);

          if($e.is(":checked")){
            spanTag.addClass(options.checkedClass);
          }

          if($e.is(":disabled")){
            divTag.addClass(options.disabledClass);
          }else{
            divTag.removeClass(options.disabledClass);
          }
        }else if($e.is(":file")){
          var divTag = $e.parent("div");
          var filenameTag = $e.siblings(options.filenameClass);
          btnTag = $e.siblings(options.fileBtnClass);

          divTag.removeClass(options.hoverClass+" "+options.focusClass+" "+options.activeClass);

          filenameTag.text($e.val());

          if($e.is(":disabled")){
            divTag.addClass(options.disabledClass);
          }else{
            divTag.removeClass(options.disabledClass);
          }
        }else if($e.is(":submit") || $e.is(":reset") || $e.is("button") || $e.is("a") || elem.is("input[type=button]")){
          var divTag = $e.closest("div");
          divTag.removeClass(options.hoverClass+" "+options.focusClass+" "+options.activeClass);
          
          if($e.is(":disabled")){
            divTag.addClass(options.disabledClass);
          }else{
            divTag.removeClass(options.disabledClass);
          }
          
        }
        
      });
    };

    return this.each(function() {
      if($.support.selectOpacity){
        var elem = $(this);

        if(elem.is("select")){
          //element is a select
          if(elem.attr("multiple") != true){
            //element is not a multi-select
            if(elem.attr("size") == undefined || elem.attr("size") <= 1){
              doSelect(elem);
            }
          }
        }else if(elem.is(":checkbox")){
          //element is a checkbox
          doCheckbox(elem);
        }else if(elem.is(":radio")){
          //element is a radio
          doRadio(elem);
        }else if(elem.is(":file")){
          //element is a file upload
          doFile(elem);
        }else if(elem.is(":text, :password, input[type='email']")){
          doInput(elem);
        }else if(elem.is("textarea")){
          doTextarea(elem);
        }else if(elem.is("a") || elem.is(":submit") || elem.is(":reset") || elem.is("button") || elem.is("input[type=button]")){
          doButton(elem);
        }
          
      }
    });
  };
})(jQuery);
define("jquery.uniform", function(){});

/*
	Masked Input plugin for jQuery
	Copyright (c) 2007-2011 Josh Bush (digitalbush.com)
	Licensed under the MIT license (http://digitalbush.com/projects/masked-input-plugin/#license) 
	Version: 1.3
*/
(function($) {
	var pasteEventName = ($.browser.msie ? 'paste' : 'input') + ".mask";
	var iPhone = (window.orientation != undefined);

	$.mask = {
		//Predefined character definitions
		definitions: {
			'9': "[0-9]",
			'a': "[A-Za-z]",
			'*': "[A-Za-z0-9]"
		},
		dataName:"rawMaskFn"
	};

	$.fn.extend({
		//Helper Function for Caret positioning
		caret: function(begin, end) {
			if (this.length == 0) return;
			if (typeof begin == 'number') {
				end = (typeof end == 'number') ? end : begin;
				return this.each(function() {
					if (this.setSelectionRange) {
						this.setSelectionRange(begin, end);
					} else if (this.createTextRange) {
						var range = this.createTextRange();
						range.collapse(true);
						range.moveEnd('character', end);
						range.moveStart('character', begin);
						range.select();
					}
				});
			} else {
				if (this[0].setSelectionRange) {
					begin = this[0].selectionStart;
					end = this[0].selectionEnd;
				} else if (document.selection && document.selection.createRange) {
					var range = document.selection.createRange();
					begin = 0 - range.duplicate().moveStart('character', -100000);
					end = begin + range.text.length;
				}
				return { begin: begin, end: end };
			}
		},
		unmask: function() { return this.trigger("unmask"); },
		mask: function(mask, settings) {
			if (!mask && this.length > 0) {
				var input = $(this[0]);
				return input.data($.mask.dataName)();
			}
			settings = $.extend({
				placeholder: "_",
				completed: null
			}, settings);

			var defs = $.mask.definitions;
			var tests = [];
			var partialPosition = mask.length;
			var firstNonMaskPos = null;
			var len = mask.length;

			$.each(mask.split(""), function(i, c) {
				if (c == '?') {
					len--;
					partialPosition = i;
				} else if (defs[c]) {
					tests.push(new RegExp(defs[c]));
					if(firstNonMaskPos==null)
						firstNonMaskPos =  tests.length - 1;
				} else {
					tests.push(null);
				}
			});

			return this.trigger("unmask").each(function() {
				var input = $(this);
				var buffer = $.map(mask.split(""), function(c, i) { if (c != '?') return defs[c] ? settings.placeholder : c });
				var focusText = input.val();

				function seekNext(pos) {
					while (++pos <= len && !tests[pos]);
					return pos;
				};
				function seekPrev(pos) {
					while (--pos >= 0 && !tests[pos]);
					return pos;
				};

				function shiftL(begin,end) {
					if(begin<0)
					   return;
					for (var i = begin,j = seekNext(end); i < len; i++) {
						if (tests[i]) {
							if (j < len && tests[i].test(buffer[j])) {
								buffer[i] = buffer[j];
								buffer[j] = settings.placeholder;
							} else
								break;
							j = seekNext(j);
						}
					}
					writeBuffer();
					input.caret(Math.max(firstNonMaskPos, begin));
				};

				function shiftR(pos) {
					for (var i = pos, c = settings.placeholder; i < len; i++) {
						if (tests[i]) {
							var j = seekNext(i);
							var t = buffer[i];
							buffer[i] = c;
							if (j < len && tests[j].test(t))
								c = t;
							else
								break;
						}
					}
				};

				function keydownEvent(e) {
					var k=e.which;

					//backspace, delete, and escape get special treatment
					if(k == 8 || k == 46 || (iPhone && k == 127)){
						var pos = input.caret(),
							begin = pos.begin,
							end = pos.end;
						
						if(end-begin==0){
							begin=k!=46?seekPrev(begin):(end=seekNext(begin-1));
							end=k==46?seekNext(end):end;
						}
						clearBuffer(begin, end);
						shiftL(begin,end-1);

						return false;
					} else if (k == 27) {//escape
						input.val(focusText);
						input.caret(0, checkVal());
						return false;
					}
				};

				function keypressEvent(e) {
					var k = e.which,
						pos = input.caret();
					if (e.ctrlKey || e.altKey || e.metaKey || k<32) {//Ignore
						return true;
					} else if (k) {
						if(pos.end-pos.begin!=0){
							clearBuffer(pos.begin, pos.end);
							shiftL(pos.begin, pos.end-1);
						}

						var p = seekNext(pos.begin - 1);
						if (p < len) {
							var c = String.fromCharCode(k);
							if (tests[p].test(c)) {
								shiftR(p);
								buffer[p] = c;
								writeBuffer();
								var next = seekNext(p);
								input.caret(next);
								if (settings.completed && next >= len)
									settings.completed.call(input);
							}
						}
						return false;
					}
				};

				function clearBuffer(start, end) {
					for (var i = start; i < end && i < len; i++) {
						if (tests[i])
							buffer[i] = settings.placeholder;
					}
				};

				function writeBuffer() { return input.val(buffer.join('')).val(); };

				function checkVal(allow) {
					//try to place characters where they belong
					var test = input.val();
					var lastMatch = -1;
					for (var i = 0, pos = 0; i < len; i++) {
						if (tests[i]) {
							buffer[i] = settings.placeholder;
							while (pos++ < test.length) {
								var c = test.charAt(pos - 1);
								if (tests[i].test(c)) {
									buffer[i] = c;
									lastMatch = i;
									break;
								}
							}
							if (pos > test.length)
								break;
						} else if (buffer[i] == test.charAt(pos) && i!=partialPosition) {
							pos++;
							lastMatch = i;
						}
					}
					if (!allow && lastMatch + 1 < partialPosition) {
						input.val("");
						clearBuffer(0, len);
					} else if (allow || lastMatch + 1 >= partialPosition) {
						writeBuffer();
						if (!allow) input.val(input.val().substring(0, lastMatch + 1));
					}
					return (partialPosition ? i : firstNonMaskPos);
				};

				input.data($.mask.dataName,function(){
					return $.map(buffer, function(c, i) {
						return tests[i]&&c!=settings.placeholder ? c : null;
					}).join('');
				})

				if (!input.attr("readonly"))
					input
					.one("unmask", function() {
						input
							.unbind(".mask")
							.removeData($.mask.dataName);
					})
					.bind("focus.mask", function() {
						focusText = input.val();
						var pos = checkVal();
						writeBuffer();
						var moveCaret=function(){
							if (pos == mask.length)
								input.caret(0, pos);
							else
								input.caret(pos);
						};
						($.browser.msie ? moveCaret:function(){setTimeout(moveCaret,0)})();
					})
					.bind("blur.mask", function() {
						checkVal();
						if (input.val() != focusText)
							input.change();
					})
					.bind("keydown.mask", keydownEvent)
					.bind("keypress.mask", keypressEvent)
					.bind(pasteEventName, function() {
						setTimeout(function() { input.caret(checkVal(true)); }, 0);
					});

				checkVal(); //Perform initial check for existing values
			});
		}
	});
})(jQuery);

define("jquery.maskedinput", function(){});

var EventForm = {
  signUpId: null,
  eventId: null,
  eventSignUp: null,
  signUpToggler: null,
  signUpRemoveButton: null,

  init: function() {
    this.signUpToggler = $('#event_sign_up_toggle');
    this.signUpRemoveButton = $('#event_sign_up_remove');

    this.setUpDateFields();

    $('.buttonset').buttonset();
    $('button').button();

    this.setUpSignUpForm();
    this.setUpSignUpRemove();
  },
  setUpDateFields: function() {
    $.mask.definitions['~'] = '[ap]';
    $.mask.definitions['H'] = '[ 01]';
    $.mask.definitions['M'] = '[012345]';
    $('.time').mask("H9:M9 ~m");

    $.mask.definitions['D'] = '[ 01]';
    $.mask.definitions['M'] = '[ 0123]';
    $('.date').mask("D9/M9/2019");

    $('.date').datepicker();

    var start_date = $('#start_date');
    var end_date = $('#end_date');
    start_date.change(function() {
      var start_date_val = start_date.datepicker("getDate");
      var end_date_val = end_date.datepicker("getDate");

      if (start_date_val > end_date_val) {
        end_date_val = new Date(start_date_val);
        end_date.datepicker("setDate", end_date_val);
      }
    });
  },
  setUpSignUpForm: function() {
    var self = this;

    $('#event_sign_up_specific').hide();
    $('#sign_up_enabled').change(function(e) {
      //TODO
      var val = $(e.target).val();
      if (val === "1") {
        self.eventSignUp = new EventSignUp.Form('event_sign_up_form');
        $('#sign_up_capacity').val('').focus();
        $('#event_sign_up_specific').show();
      }
      else {
        //TODO Are you sure...?
        $('#event_sign_up_specific').hide();
        $('#sign_up_capacity').val('');
        $('#event_sign_up_form').empty();
      }
    });

    $("#event_create_fields").submit(function() {
      var data = $(this).serialize();
      if (self.eventSignUp !== null) {
        data += "&" +
          $.param({ 'sign_up_questions': self.eventSignUp.serialize() });
      }

      $.post('', data, function(r) {
        window.location = SITE_URL + '/event/view/' + self.eventId
      });

      return false;
    });
  },
  setSignUpId: function(signUpId) {
    this.signUpId = signUpId;
  },
  setEventId: function(eventId) {
    this.eventId = eventId;
  },
  setUpSignUpRemove: function() {
    var self = this;
    this.signUpRemoveButton.click(function() {
      $('<div/>')
      .html(
        '<p>\
        <span class="ui-icon ui-icon-alert" \
        style="float:left; margin:0 7px 20px 0;"></span>\
        The sign up and all results will be\
        permanently deleted and cannot be recovered.\
        Are you sure?\
        </p>\
        ')
        .dialog({
          title: 'Delete Sign Up',
          resizable: false,
          modal: true,
          width: 350,
          draggable: false,
          buttons: {

            'Cancel': function(){
              $(this).dialog('close');
            },

            'Delete Sign Up': function() {
              var dialog = $(this);
              $.post(
                SITE_URL+'/sign_up/delete',
                { id: self.signUpId },
                function(r) {
                  if (r === "1") {
                    $('#event_sign_up_remove_container').remove();
                    this.signUpRemoveButton = null;

                    self.signUpToggler.show();

                    dialog.dialog('close');
                  }
                });
            }
          }
        });
    });
  }
};

define("EventForm", function(){});

var EventSignUp = {};

EventSignUp.Form = function(id_container) {
  this.container = $('#' + id_container);

  this.cur_field_content = null;

  this.container_tabs = $('<div/>')
    .attr({
            id: 'event_sign_up_tabs'
          });

  this.container_content = $('<div/>')
    .attr({
            id: 'event_sign_up_content'
          });

  this.container.append(this.container_tabs, this.container_content);

  var self = this;
  this.button_add = $('<button/>')
    .attr({
            type: 'button'
          })
    .button({
              label: 'Add Question'
            })
    .addClass('button_add')
    .click(function() {
             var field = new EventSignUp.Field();
             self.addField(field, true, false);
           });
  this.container_tabs.append(this.button_add);

  this.fields_fixed = [
    new EventSignUp.FieldFixed(
      'Name & Email Address',
      'Names and email addresses are automatically collected.'
    )
  ];

  for (var i = 0; i < this.fields_fixed.length; i++) {
    this.addField(this.fields_fixed[i], i === 0, true);
  }

  this.fields = [];

};

$.extend(EventSignUp.Form.prototype, {

  addField: function(field, is_active, is_fixed) {
    var content = field.getContent();
    this.container_content.append(content);
    content.hide();

    var tab_text = $('<div/>').html(field.getTab());
    var tab_content = $('<div/>').append(tab_text);

    if (!is_fixed) {
      this.fields.push(field);

      var button_remove = $('<button/>')
        .attr({
                type: 'button'
              })
        .button({
                  icons: {
                    primary: "ui-icon-close"
                  },
                  text: false
                })
        .click(function() {
                 self.removeField(field, tab);
               });

      tab_content.prepend(button_remove);

      field.getQuestionTextInput().keyup(function() {
        tab_text.html(field.getTab());
      });
    }

    var self = this;
    var tab = $('<div/>')
      .addClass('tab')
      .html(tab_content)
      .click(function() {
               if (self.cur_field_content !== null) {
                 self.cur_field_content.hide();
               }
               self.cur_field_content = content;
               self.cur_field_content.show();

               if (!is_fixed) {
                 field.getQuestionTextInput().focus();
               }

               $('.tab').removeClass('active');
               $(this).addClass('active');
             });
    this.button_add.before(tab);

    if (is_active) {
      tab.click();
    }
  },
  removeField: function(field, tab) {
    tab.remove();
    field.getContent().remove();
    this.fields = $.grep(this.fields, function(e) {
      return e !== field;
    });
  },
  serialize: function() {
    var data = [];
    for (var i = 0; i < this.fields.length; i++) {
      var field = this.fields[i];
      data.push(field.serialize());
    }
    return data;
  }

});


EventSignUp.FieldFixed = function(label, content) {
  this.label = label;
  this.content = content;
};
$.extend(EventSignUp.FieldFixed.prototype, {
  getTab: function() {
    return $('<div/>')
      .text(this.label);
  },
  getContent: function() {
    return $('<div/>')
      .text(this.content);
  }
});


EventSignUp.Field = function() {
  this.content = "";
  this.content_sub_field = $('<div/>');
  this.sub_field = null;
  this.type = "";

  this.question_text_input = $('<input/>')
    .attr({
            'type': 'text',
            'class': 'width_full'
          });
  this.type_selector = $('<select/>');

  var self = this;
  var sub_field_type_map = {
    'multiple_choice': 'radio',
    'checkboxes': 'checkbox',
    'choose_from_a_list': 'list'
  };
  this.type_selector.change(function() {
    var type = $(this).val();

    self.type = type;
    self.sub_field = null;
    self.content_sub_field.empty();

    if (typeof sub_field_type_map[type] !== "undefined") {
      self.sub_field = new EventSignUp.SubFieldChoices(sub_field_type_map[type]);
      self.content_sub_field.html(self.sub_field.getContent());
    }
  });

  //TODO move to prototype
  this.types = [
    {
      'type' : 'text',
      'label' : 'Text'
    },
    {
      'type' : 'paragraph_text',
      'label' : 'Paragraph'
    },
    {
      'type' : 'multiple_choice',
      'label' : 'Multiple Choice'
    },
    {
      'type' : 'checkboxes',
      'label' : 'Checkboxes'
    },
    {
      'type' : 'choose_from_a_list',
      'label' : 'Choose from a List'
    }
  ];

  //this.type_selector.append(
    //$('<option/>')
      //.attr({
              //value: "",
              //disabled: "disabled"
            //})
      //.text("Choose a question type...")
  //);

  for (var i = 0; i < this.types.length; i++) {
    var type = this.types[i];

    this.type_selector.append(
      $('<option/>')
        .attr({
                value: type.type
              })
        .text(type.label)
    );
  }

  this.content = $('<div/>')
    .append($('<div/>')
              .attr({
                      'class': 'label'
                    })
              .text('Question: '),
            this.question_text_input,
            $('<div/>')
              .attr({
                      'class': 'label'
                    })
              .text('Type: '),
            this.type_selector,
            this.content_sub_field
  );

};

$.extend(EventSignUp.Field.prototype, {

  getTab: function() {
    var qtext = this.question_text_input.val();
    return qtext === "" ? "(untitled)" : qtext;
  },
  getContent: function() {
    this.type_selector.uniform();
    return this.content;
  },
  getQuestionTextInput: function() {
    return this.question_text_input;
  },
  serialize: function() {
    var data = {
      'text': this.question_text_input.val(),
      'type': this.type,
      'choices': ''
    };

    if (this.sub_field !== null) {
      data.choices = this.sub_field.serialize();
    }

    return data;
  }

});


EventSignUp.SubFieldChoices = function(type) {
  this.type = type;
  this.container_choices = $('<div/>');

  this.container_choices.append(
    this.genChoice()
  );
};

$.extend(EventSignUp.SubFieldChoices.prototype, {

  getContent: function() {
    return $('<div/>')
      .addClass('subfield')
      .append(this.container_choices, this.genDummy());
  },
  serialize: function() {
    var data = [];
    var choices = this.container_choices.find('input[type="text"]');
    for (var i = 0; i < choices.length; i++) {
      var choice = $(choices[i]);
      data.push(choice.val());
    }
    return data;
  },
  genDummy: function() {
    var self = this;
    return $('<button/>')
      .attr({
              type: 'button'
            })
      .addClass('sign_up_field_button')
      .button({
                label: 'Add Another Choice'
              })
      .click(function() {
               var choice = self.genChoice();
               self.container_choices.append(choice);
               choice.find('input[type="text"]').focus();
             });
  },
  genChoice: function () {
    var choice = $('<div/>')
      .addClass('width_full');

    var button_remove = $('<div/>')
      .addClass('sign_up_remove_choice')
      .append($('<button/>')
                .attr({
                        type: 'button'
                      })
                .button({
                          icons: {
                            primary: "ui-icon-close"
                          },
                          text: false
                        })
                .click(function() {
                         choice.remove();
                       }));
    choice.append(button_remove);

    var input = $('<div/>');

    if (this.type !== null && this.type !== "list") {
      input.addClass('has_input_placeholder');
      input.append(
        $('<input />')
          .attr({
                  type: this.type,
                  disabled: 'disabled'
                }));
    } else {
      input.addClass('no_input_placeholder');
    }

    input.append(
      $('<input />')
        .attr({
                type: 'text',
                placeholder: 'Enter Choice Text Here'
              })
    );
    choice.append(input);

    return choice;
  }
});

define("EventSignUp", function(){});

require(
  [
    "jquery", "jquery-ui", "SetUp",
    "jquery.blockui",
    "jquery.uniform",
    "jquery.maskedinput",
    "EventForm",
    "EventSignUp"
],
function($) {
  EventForm.init();
});

define("main-event-form", function(){});
