function categorySelect(){return $("#categoryOptions .form-group").map(function(){return"#"+$(this).attr("id")}).get()}jQuery(document).ready(function(){$(document).trigger("readyAndAjax")}),jQuery(document).ajaxComplete(function(){$(document).trigger("readyAndAjax")}),jQuery(document).on("readyAndAjax",function(){$("form").find("input, select").keypress(function(t){if(13==t.which)return t.preventDefault(),!1})}),jQuery(window).on("readyAndAjax",function(){-1!=navigator.userAgent.indexOf("Firefox")&&$('[spellcheck="true"]:first').focusWithoutScrolling()}),jQuery(document).on("click","button.storeBanModel",function(t){t.preventDefault();let e=$(this).closest("form");e.btn=e.find(".btn"),e.input=e.find(".form-control, .custom-control-input");let a={};a.body=e.closest(".modal-body"),jQuery.ajax({url:e.attr("data-route"),headers:{"X-CSRF-TOKEN":$('meta[name="csrf-token"]').attr("content")},method:"post",data:e.serialize(),dataType:"json",beforeSend:function(){e.btn.prop("disabled",!0),a.body.append($.getLoader("spinner-border")),$(".invalid-feedback").remove(),e.input.removeClass("is-valid"),e.input.removeClass("is-invalid")},complete:function(){e.btn.prop("disabled",!1),a.body.find("div.loader-absolute").remove(),e.input.addClass("is-valid")},success:function(t){a.body.html($.getAlert(t.success,"success"))},error:function(t){var a=t.responseJSON;$.each(a.errors,function(t,a){e.find('[id="'+t+'"]').addClass("is-invalid"),e.find('[id="'+t+'"]').closest(".form-group").append($.getError(t,a))})}})}),jQuery(document).on("click","a.destroyCategory",function(t){t.preventDefault();let e=$(this),a=$("#row"+e.attr("data-id"));jQuery.ajax({url:e.attr("data-route"),headers:{"X-CSRF-TOKEN":$('meta[name="csrf-token"]').attr("content")},method:"delete",beforeSend:function(){a.find(".responsive-btn-group").addClass("disabled"),a.append($.getLoader("spinner-border"))},complete:function(){a.find("div.loader-absolute").remove()},success:function(t){a.fadeOut("slow"),$.each(t.descendants,function(t,e){let a=$("#row"+e);a.length&&a.fadeOut("slow")})}})}),jQuery(document).on("click","#searchCategory .btn",function(t){t.preventDefault();let e=$("#searchCategory");e.url=e.attr("data-route"),e.btn=e.find(".btn"),e.input=e.find("input"),$.ajax({url:e.url+"?name="+e.input.val(),method:"get",dataType:"json",beforeSend:function(){e.btn.prop("disabled",!0),$("#searchCategoryOptions").empty(),e.append($.getLoader("spinner-border")),e.find(".invalid-feedback").remove(),e.input.removeClass("is-valid"),e.input.removeClass("is-invalid")},complete:function(){e.btn.prop("disabled",!1),e.find("div.loader-absolute").remove()},success:function(t){let a=$(t.view).find(categorySelect().join(",")).remove().end();e.find("#searchCategoryOptions").html($.sanitize(a.html()))},error:function(t){var a=t.responseJSON;$.each(a.errors,function(t,a){e.input.addClass("is-invalid"),e.input.parent().after($.getError(t,a))})}})}),jQuery(document).on("change",".categoryOption",function(){let t=$("#searchCategory");t.max=t.attr("data-max");let e=$(this).closest(".form-group");1==$(this).prop("checked")?e.appendTo("#categoryOptions"):e.remove(),$.isNumeric(t.max)&&(t.is(":visible")&&categorySelect().length>=t.max&&t.fadeOut(),!t.is(":visible")&&categorySelect().length<t.max&&t.fadeIn())}),jQuery(document).on("readyAndAjax",function(){$("#searchCategory input").keypress(function(t){if(13==t.which)return $("#searchCategory .btn").trigger("click"),!1})}),jQuery(document).on("click","button.statusCategory",function(t){t.preventDefault();let e=$(this),a=e.closest("[id^=row]");a.btnGroup=a.find(".responsive-btn-group"),a.btn0=a.find('button[data-status="0"]'),a.btn1=a.find('button[data-status="1"]'),jQuery.ajax({url:e.attr("data-route"),headers:{"X-CSRF-TOKEN":$('meta[name="csrf-token"]').attr("content")},method:"patch",data:{status:e.attr("data-status")},beforeSend:function(){a.btnGroup.addClass("disabled"),a.append($.getLoader("spinner-border"))},complete:function(){a.find("div.loader-absolute").remove()},success:function(t){1==t.status&&(a.btnGroup.removeClass("disabled"),a.btn1.prop("disabled",!0),a.btn0.attr("disabled",!1),a.addClass("alert-success"),setTimeout(function(){a.removeClassStartingWith("alert-")},5e3),$.each(t.ancestors,function(t,e){let a=$("#row"+e);a.length&&(a.find('button[data-status="1"]').prop("disabled",!0),a.find('button[data-status="0"]').attr("disabled",!1),a.addClass("alert-success"),setTimeout(function(){a.removeClassStartingWith("alert-")},5e3))})),0==t.status&&(a.btnGroup.removeClass("disabled"),a.btn0.prop("disabled",!0),a.btn1.attr("disabled",!1),a.addClass("alert-warning"),setTimeout(function(){a.removeClassStartingWith("alert-")},5e3),$.each(t.descendants,function(t,e){let a=$("#row"+e);a.length&&(a.find('button[data-status="0"]').prop("disabled",!0),a.find('button[data-status="1"]').attr("disabled",!1),a.addClass("alert-warning"),setTimeout(function(){a.removeClassStartingWith("alert-")},5e3))}))}})}),jQuery(document).on("click","a.destroyComment",function(t){t.preventDefault();let e=$(this),a=$("#row"+e.attr("data-id"));jQuery.ajax({url:e.attr("data-route"),headers:{"X-CSRF-TOKEN":$('meta[name="csrf-token"]').attr("content")},method:"delete",beforeSend:function(){a.find(".responsive-btn-group").addClass("disabled"),a.append($.getLoader("spinner-border"))},complete:function(){a.find("div.loader-absolute").remove()},success:function(t){a.fadeOut("slow"),$.each(t.descendants,function(t,e){let a=$("#row"+e);a.length&&a.fadeOut("slow")})}})}),jQuery(document).on("click","button.storeComment",function(t){t.preventDefault();let e=$(this).closest("form");e.btn=e.find(".btn"),e.input=e.find(".form-control");let a={};a.body=e.closest(".modal-body"),jQuery.ajax({url:e.attr("data-route"),headers:{"X-CSRF-TOKEN":$('meta[name="csrf-token"]').attr("content")},method:"post",data:e.serialize(),dataType:"json",beforeSend:function(){e.btn.prop("disabled",!0),a.body.append($.getLoader("spinner-border")),$(".invalid-feedback").remove(),e.input.removeClass("is-valid"),e.input.removeClass("is-invalid")},complete:function(){e.btn.prop("disabled",!1),a.body.find("div.loader-absolute").remove(),e.input.addClass("is-valid")},success:function(t){let a=$("#row"+e.attr("data-id"));a.after($.sanitize(t.view));let n=a.next();n.addClass("alert-primary font-italic"),setTimeout(function(){n.removeClassStartingWith("alert-")},5e3),$(".modal").modal("hide")},error:function(t){var a=t.responseJSON;$.each(a.errors,function(t,a){e.find("#"+t).addClass("is-invalid"),e.find("#"+t).after($.getError(t,a))})}})}),jQuery(document).on("click","button.censoreComment",function(t){t.preventDefault();let e=$(this),a=e.closest("[id^=row]");jQuery.ajax({url:e.attr("data-route"),headers:{"X-CSRF-TOKEN":$('meta[name="csrf-token"]').attr("content")},method:"patch",data:{censored:e.attr("data-censored")},beforeSend:function(){a.find(".btn").prop("disabled",!0),a.append($.getLoader("spinner-border"))},complete:function(){a.find("div.loader-absolute").remove()},success:function(t){a.html($.sanitize($(t.view).html())),1==t.censored&&(a.addClass("alert-warning"),setTimeout(function(){a.removeClassStartingWith("alert-")},5e3)),0==t.censored&&(a.addClass("alert-success"),setTimeout(function(){a.removeClassStartingWith("alert-")},5e3))}})}),jQuery(document).on("click","button.statusComment",function(t){t.preventDefault();let e=$(this),a=e.closest("[id^=row]");a.btnGroup=a.find(".responsive-btn-group"),a.btn0=a.find('button[data-status="0"]'),a.btn1=a.find('button[data-status="1"]'),jQuery.ajax({url:e.attr("data-route"),headers:{"X-CSRF-TOKEN":$('meta[name="csrf-token"]').attr("content")},method:"patch",data:{status:e.attr("data-status")},beforeSend:function(){a.btnGroup.addClass("disabled"),a.append($.getLoader("spinner-border"))},complete:function(){a.find("div.loader-absolute").remove()},success:function(t){1==t.status&&(a.btnGroup.removeClass("disabled"),a.btn1.attr("disabled",!0),a.btn0.attr("disabled",!1),a.find("button.answer").attr("disabled",!1),a.addClass("alert-success"),setTimeout(function(){a.removeClassStartingWith("alert-")},5e3),$.each(t.ancestors,function(t,e){let a=$("#row"+e);a.length&&(a.find('button[data-status="1"]').attr("disabled",!0),a.find('button[data-status="0"]').attr("disabled",!1),a.find("button.answer").attr("disabled",!1),a.addClass("alert-success"),setTimeout(function(){a.removeClassStartingWith("alert-")},5e3))})),0==t.status&&(a.btnGroup.removeClass("disabled"),a.btn0.attr("disabled",!0),a.btn1.attr("disabled",!1),a.find("button.answer").attr("disabled",!0),a.addClass("alert-warning"),setTimeout(function(){a.removeClassStartingWith("alert-")},5e3),$.each(t.descendants,function(t,e){let a=$("#row"+e);a.length&&(a.find('button[data-status="0"]').attr("disabled",!0),a.find('button[data-status="1"]').attr("disabled",!1),a.find("button.answer").attr("disabled",!0),a.addClass("alert-warning"),setTimeout(function(){a.removeClassStartingWith("alert-")},5e3))}))}})}),jQuery(document).on("click",".create",function(t){t.preventDefault();let e=$(this),a={body:$(e.attr("data-target")).find(".modal-body"),content:$(e.attr("data-target")).find(".modal-content")};a.body.empty(),jQuery.ajax({url:e.attr("data-route"),method:"get",beforeSend:function(){a.body.append($.getLoader("spinner-grow"))},complete:function(){a.content.find("div.loader-absolute").remove()},success:function(t){a.body.html($.sanitize(t.view))}})}),jQuery(document).on("click",".destroy",function(t){t.preventDefault();let e=$(this),a=$("#row"+e.attr("data-id"));jQuery.ajax({url:e.attr("data-route"),headers:{"X-CSRF-TOKEN":$('meta[name="csrf-token"]').attr("content")},method:"delete",beforeSend:function(){a.find(".responsive-btn-group").addClass("disabled"),a.append($.getLoader("spinner-border"))},complete:function(){a.find("div.loader-absolute").remove()},success:function(t){a.fadeOut("slow")}})}),jQuery(document).on("click",".edit",function(t){t.preventDefault();let e=$(this),a={body:$(e.attr("data-target")).find(".modal-body"),content:$(e.attr("data-target")).find(".modal-content")};a.body.empty(),jQuery.ajax({url:e.attr("data-route"),method:"get",beforeSend:function(){a.body.append($.getLoader("spinner-grow"))},complete:function(){a.content.find("div.loader-absolute").remove()},success:function(t){a.body.html($.sanitize(t.view))}})}),function(t){function e(e,a){t.ajax({url:a,method:"get",dataType:"html",beforeSend:function(){t("#filterContent").find(".btn").prop("disabled",!0),t("#filterOrderBy").prop("disabled",!0),t("#filterPaginate").prop("disabled",!0),e.children("div").append(t.getLoader("spinner-border")),t("#filterModal").modal("hide")},complete:function(){e.find("div.loader-absolute").remove()},success:function(e){t("#filterContent").html(t.sanitize(t(e).find("#filterContent").html())),document.title=document.title.replace(/:\s(\d+)/,": 1"),history.replaceState(null,null,a)}})}jQuery(document).on("change","#filterOrderBy",function(a){a.preventDefault();let n=t("#filter");n.href=n.attr("data-route")+"?"+n.serialize(),e(n,n.href)}),jQuery(document).on("click","#filterFilter",function(a){a.preventDefault();let n=t("#filter");n.href=n.attr("data-route")+"?"+n.serialize(),t("#filter").valid()&&e(n,n.href)}),jQuery(document).on("click",".filterOption",function(a){a.preventDefault();let n=t("#filter");n.href=n.attr("data-route")+"?"+n.find('[name!="'+t.escapeSelector(t(this).attr("data-name"))+'"]').serialize(),e(n,n.href)}),jQuery(document).on("change","#filterPaginate",function(a){a.preventDefault();let n=t("#filter");n.href=n.attr("data-route")+"?"+n.serialize(),e(n,n.href)})}(jQuery),jQuery(document).on("click","a.show, button.show",function(t){t.preventDefault();let e=$(this),a={body:$(e.attr("data-target")).find(".modal-body"),content:$(e.attr("data-target")).find(".modal-content")};a.body.empty(),jQuery.ajax({url:e.attr("data-route"),method:"get",beforeSend:function(){a.body.append($.getLoader("spinner-grow"))},complete:function(){a.content.find("div.loader-absolute").remove()},success:function(t){a.body.html($.sanitize(t.view))}})}),jQuery(document).on("click",".store",function(t){t.preventDefault();let e=$(this).closest("form");e.btn=e.find(".btn"),e.input=e.find(".form-control");let a={body:e.closest(".modal-body")};jQuery.ajax({url:e.attr("data-route"),headers:{"X-CSRF-TOKEN":$('meta[name="csrf-token"]').attr("content")},method:"post",data:new FormData(e[0]),processData:!1,contentType:!1,dataType:"json",beforeSend:function(){e.btn.prop("disabled",!0),a.body.append($.getLoader("spinner-border")),$(".invalid-feedback").remove(),e.input.removeClass("is-valid"),e.input.removeClass("is-invalid")},complete:function(){e.btn.prop("disabled",!1),a.body.find("div.loader-absolute").remove(),e.input.addClass("is-valid")},success:function(t){$(".modal").modal("hide"),window.location.reload()},error:function(t){var a=t.responseJSON;$.each(a.errors,function(t,a){e.find("#"+$.escapeSelector(t)).addClass("is-invalid"),e.find("#"+$.escapeSelector(t)).parent().append($.getError(t,a))})}})}),jQuery(document).on("click",".update",function(t){t.preventDefault();let e=$(this).closest("form");e.btn=e.find(".btn"),e.input=e.find(".form-control");let a={body:e.closest(".modal-body")},n=new FormData(e[0]);n.append("_method","put"),jQuery.ajax({url:e.attr("data-route"),method:"post",data:n,processData:!1,contentType:!1,dataType:"json",beforeSend:function(){e.btn.prop("disabled",!0),a.body.append($.getLoader("spinner-border")),e.find(".invalid-feedback").remove(),e.input.removeClass("is-valid"),e.input.removeClass("is-invalid")},complete:function(){e.btn.prop("disabled",!1),a.body.find("div.loader-absolute").remove(),e.input.addClass("is-valid")},success:function(t){let a=$("#row"+e.attr("data-id"));a.html($.sanitize($(t.view).html())),a.addClass("alert-primary"),setTimeout(function(){a.removeClassStartingWith("alert-")},5e3),$(".modal").modal("hide")},error:function(t){var a=t.responseJSON;$.each(a.errors,function(t,a){e.find("#"+$.escapeSelector(t)).addClass("is-invalid"),e.find("#"+$.escapeSelector(t)).parent().append($.getError(t,a))})}})}),jQuery(document).on("click",".status",function(t){t.preventDefault();let e=$(this),a=e.closest("[id^=row]");jQuery.ajax({url:e.attr("data-route"),headers:{"X-CSRF-TOKEN":$('meta[name="csrf-token"]').attr("content")},method:"patch",data:{status:e.attr("data-status")},beforeSend:function(){a.find(".btn").prop("disabled",!0),a.append($.getLoader("spinner-border"))},complete:function(){a.find("div.loader-absolute").remove()},success:function(t){a.html($.sanitize($(t.view).html())),1==t.status&&(a.addClass("alert-success"),setTimeout(function(){a.removeClassStartingWith("alert-")},5e3)),0==t.status&&(a.addClass("alert-warning"),setTimeout(function(){a.removeClassStartingWith("alert-")},5e3))}})}),jQuery(document).on("click","a.resetMailing",function(t){t.preventDefault();var e=$(this),a=$("#row"+e.attr("data-id"));$.ajax({url:e.attr("data-route"),headers:{"X-CSRF-TOKEN":$('meta[name="csrf-token"]').attr("content")},method:"delete",beforeSend:function(){a.find(".btn").prop("disabled",!0),a.append($.getLoader("spinner-border"))},complete:function(){a.find("div.loader-absolute").remove()},success:function(t){a.html($.sanitize($(t.view).html())),a.addClass("alert-danger"),setTimeout(function(){a.removeClassStartingWith("alert-")},5e3)}})}),jQuery(document).on("click","a.destroyPage",function(t){t.preventDefault();let e=$(this),a=$("#row"+e.attr("data-id"));jQuery.ajax({url:e.attr("data-route"),headers:{"X-CSRF-TOKEN":$('meta[name="csrf-token"]').attr("content")},method:"delete",beforeSend:function(){a.find(".responsive-btn-group").addClass("disabled"),a.append($.getLoader("spinner-border"))},complete:function(){a.find("div.loader-absolute").remove()},success:function(t){a.fadeOut("slow"),$.each(t.descendants,function(t,e){let a=$("#row"+e);a.length&&a.fadeOut("slow")})}})}),jQuery(document).on("click","button.updatePositionPage",function(t){t.preventDefault();let e=$(this),a=e.closest("form"),n={body:e.closest(".modal").find(".modal-body"),content:e.closest(".modal").find(".modal-content")};$.ajax({url:a.attr("data-route"),headers:{"X-CSRF-TOKEN":$('meta[name="csrf-token"]').attr("content")},method:"patch",data:{position:a.find("#position").val()},beforeSend:function(){n.body.find(".btn").prop("disabled",!0),n.content.append($.getLoader("spinner-border"))},complete:function(){n.content.find("div.loader-absolute").remove()},success:function(t){$(".modal").modal("hide"),$.each(t.siblings,function(t,e){let a=$("#row"+t);a.length&&(a.find("#position").text(e+1),a.addClass("alert-primary"),setTimeout(function(){a.removeClassStartingWith("alert-")},5e3))})}})}),jQuery(document).on("click","button.statusPage",function(t){t.preventDefault();let e=$(this),a=e.closest("[id^=row]");a.btnGroup=a.find(".responsive-btn-group"),a.btn0=a.find('button[data-status="0"]'),a.btn1=a.find('button[data-status="1"]'),jQuery.ajax({url:e.attr("data-route"),headers:{"X-CSRF-TOKEN":$('meta[name="csrf-token"]').attr("content")},method:"patch",data:{status:e.attr("data-status")},beforeSend:function(){a.btnGroup.addClass("disabled"),a.append($.getLoader("spinner-border"))},complete:function(){a.find("div.loader-absolute").remove()},success:function(t){1==t.status&&(a.btnGroup.removeClass("disabled"),a.btn1.prop("disabled",!0),a.btn0.attr("disabled",!1),a.addClass("alert-success"),setTimeout(function(){a.removeClassStartingWith("alert-")},5e3),$.each(t.ancestors,function(t,e){let a=$("#row"+e);a.length&&(a.find('button[data-status="1"]').prop("disabled",!0),a.find('button[data-status="0"]').attr("disabled",!1),a.addClass("alert-success"),setTimeout(function(){a.removeClassStartingWith("alert-")},5e3))})),0==t.status&&(a.btnGroup.removeClass("disabled"),a.btn0.prop("disabled",!0),a.btn1.attr("disabled",!1),a.addClass("alert-warning"),setTimeout(function(){a.removeClassStartingWith("alert-")},5e3),$.each(t.descendants,function(t,e){let a=$("#row"+e);a.length&&(a.find('button[data-status="0"]').prop("disabled",!0),a.find('button[data-status="1"]').attr("disabled",!1),a.addClass("alert-warning"),setTimeout(function(){a.removeClassStartingWith("alert-")},5e3))}))}})}),jQuery(document).on("click","button.clearReport",function(t){t.preventDefault();let e=$(this),a={body:e.closest(".modal").find(".modal-body"),content:e.closest(".modal").find(".modal-content")};$.ajax({url:e.attr("data-route"),headers:{"X-CSRF-TOKEN":$('meta[name="csrf-token"]').attr("content")},method:"delete",beforeSend:function(){a.body.find(".btn").prop("disabled",!0),a.body.append($.getLoader("spinner-border"))},complete:function(){a.content.find("div.loader-absolute").remove()},success:function(t){let a=$("#row"+e.attr("data-id"));a.html($.sanitize($(t.view).html())),a.addClass("alert-primary"),setTimeout(function(){a.removeClassStartingWith("alert-")},5e3),$(".modal").modal("hide")}})}),function(t){t.fn.removeClassStartingWith=function(t){this.removeClass(function(e,a){return(a.match(new RegExp("\\b"+t+"\\S+","g"))||[]).join(" ")})},t.fn.focusWithoutScrolling=function(){var t=window.scrollX,e=window.scrollY;this.focus(),window.scrollTo(t,e)},t.sanitize=function(e){let a=t(t.parseHTML("<div>"+e+"</div>",null,!1));return a.find("*").each(function(e,a){t.each(a.attributes,function(){let e=this.name,n=this.value;0!=e.indexOf("on")&&0!=n.indexOf("javascript:")||t(a).removeAttr(e)})}),a.html()},t.getUrlParameter=function(t,e){return(RegExp(e+"=(.+?)(&|$)").exec(t)||[,null])[1]},t.getLoader=function(t,e="loader-absolute"){return'<div class="'+e+'"><div class="'+t+'"><span class="sr-only">Loading...</span></div></div>'},t.getAlert=function(e,a){return t.sanitize('<div class="alert alert-'+a+' alert-time" role="alert">'+e+"</div>")},t.getError=function(e,a){return t.sanitize('<span class="invalid-feedback d-block font-weight-bold" id="error-'+e+'">'+a+"</span>")}}(jQuery),jQuery(document).on("readyAndAjax",function(){$("[data-toggle=confirmation]").confirmation({rootSelector:"[data-toggle=confirmation]",copyAttributes:"href data-route data-id",singleton:!0,popout:!0,onConfirm:function(){$(this).hasClass("submit")&&$(this).parents("form:first").submit()}})}),jQuery(document).on("readyAndAjax",function(){let t=$("#infinite-scroll");t.jscroll({debug:!1,autoTrigger:1==t.data("autotrigger"),data:function(){let t=$(this).find("[id^=row]").map(function(){return $(this).attr("data-id")}).get();if(t.length)return{except:t}},loadingHtml:$.getLoader("spinner-border","loader"),loadingFunction:function(){$("#is-pagination").first().remove()},padding:0,nextSelector:"a#is-next:last",contentSelector:"#infinite-scroll",pagingSelector:".pagination",callback:function(t){let e=t.split(" ")[0];history.replaceState(null,null,e)}})}),jQuery(document).on("readyAndAjax",function(){$(".lazy").lazy({effect:"fadeIn",effectTime:"fast",threshold:0})}),jQuery(document).ready(function(){"pl"===$(".datepicker, .timepicker").data("lang")&&($.extend($.fn.pickadate.defaults,{monthsFull:["styczeń","luty","marzec","kwiecień","maj","czerwiec","lipiec","sierpień","wrzesień","październik","listopad","grudzień"],monthsShort:["sty","lut","mar","kwi","maj","cze","lip","sie","wrz","paź","lis","gru"],weekdaysFull:["niedziela","poniedziałek","wtorek","środa","czwartek","piątek","sobota"],weekdaysShort:["niedz.","pn.","wt.","śr.","cz.","pt.","sob."],today:"Dzisiaj",clear:"Usuń",close:"Zamknij",firstDay:1,format:"d mmmm yyyy",formatSubmit:"yyyy/mm/dd"}),$.extend($.fn.pickatime.defaults,{clear:"usunąć"})),$("form#createPost .datepicker, form#editFullPost .datepicker").pickadate({clear:"",formatSubmit:"yyyy-m-dd",hiddenName:!0}),$("form#createMailing .datepicker, form#editMailing .datepicker").pickadate({clear:"",formatSubmit:"yyyy-m-dd",hiddenName:!0,min:new Date}),$(".timepicker").pickatime({clear:"",format:"H:i",formatSubmit:"HH:i",hiddenName:!0})}),jQuery(document).on("readyAndAjax",function(){$('[id$="_tagsinput"]').length||$(".tagsinput").tagsInput({placeholder:$(".tagsinput").attr("placeholder"),minChars:3,maxChars:30,limit:$(".tagsinput").attr("data-max"),validationPattern:new RegExp("^(?:^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ0-9à-ü ]+$)$"),unique:!0})}),jQuery(document).on("readyAndAjax",function(){if(!$(".trumbowyg-box").length){let t=$("#content_html_trumbowyg");t.trumbowyg({lang:t.data("lang"),svgPath:!1,hideButtonTexts:!0,tagsToRemove:["script"],autogrow:!0,btnsDef:{more:{fn:function(){t.trumbowyg("execCmd",{cmd:"insertHtml",param:"<p>[more]</p>",forceCss:!1})},title:'Button "show more"',ico:"more"}},btns:[["viewHTML"],["historyUndo","historyRedo"],["formatting"],["foreColor","backColor"],["strong","em","del"],["superscript","subscript"],["link"],["insertImage"],["justifyLeft","justifyCenter","justifyRight","justifyFull"],["unorderedList","orderedList"],["horizontalRule"],["removeformat"],["more"],["fullscreen"]]})}}),jQuery(document).on("readyAndAjax",function(){$(".alert-time").delay(2e4).fadeOut()}),jQuery(document).on("readyAndAjax",function(){$('[data-toggle="tooltip"]').tooltip()}),jQuery(document).ready(function(){$('[aria-controls="collapsePublishedAt"]').change(function(){0==$(this).val()?$("#collapsePublishedAt").collapse("hide"):$("#collapsePublishedAt").collapse("show")}),$('[aria-controls="collapseActivationAt"]').change(function(){2==$(this).val()?$("#collapseActivationAt").collapse("show"):$("#collapseActivationAt").collapse("hide")})}),jQuery(document).on("readyAndAjax",function(){$(".counter").each(function(){let t=$(this);t.name=$.escapeSelector(t.data("name")),t.min=void 0!==t.data("min")&&Number.isInteger(t.data("min"))?t.data("min"):null,t.max=void 0!==t.data("max")&&Number.isInteger(t.data("max"))?t.data("max"):null;let e=function(){let e=[$('[name="'+t.name+'"]'),$('[name="'+t.name+'"]').hasClass("trumbowyg-textarea")?$('[name="'+t.name+'"]').parent().find(".trumbowyg-editor"):null];$.each(e.filter(t=>null!=t),function(){$(this).keyup(function(){let e=$(this).attr("contenteditable")?parseFloat($(this).text().length):parseFloat($($.parseHTML($(this).val())).text().length);t.firstchild=t.children(":first"),t.firstchild.text(e),0===e?t.firstchild.removeClass():(t.firstchild.addClass("text-success"),t.firstchild.removeClass("text-danger"),(null!==t.min&&e<t.min||null!==t.max&&e>t.max)&&(t.firstchild.addClass("text-danger"),t.firstchild.removeClass("text-success")))})})};-1!==$('[name="'+t.name+'"]').attr("id").indexOf("trumbowyg")?$("#"+$('[name="'+t.name+'"]').attr("id")).on("tbwinit",()=>e()):e()})}),jQuery(document).on("readyAndAjax",function(){$(".custom-file-input").on("change",function(){let t=$(this).val().split("\\").pop();$(this).siblings(".custom-file-label").addClass("selected").html(t)})}),jQuery(document).on("click","#selectAll",function(){$("#selectForm .select").prop("checked",$(this).prop("checked")).trigger("change")}),jQuery(document).on("change","#selectForm .select",function(){$("#selectForm .select:checked").length>0?$(".select-action").fadeIn():$(".select-action").fadeOut()}),function(t){let e,a=0,n=t(".navbar");t(window).scroll(function(){if(!t("body").hasClass("modal-open")){var o=t(window).scrollTop(),r=n.height()+10;e<(a=o)&&e>r?n.fadeOut():n.fadeIn(),e=a}})}(jQuery),$(document).on("scroll",function(){$(this).scrollTop()>100?$(".scroll-to-top").fadeIn():$(".scroll-to-top").fadeOut()}),$(document).on("click","a.scroll-to-top",function(t){$(this);$("html, body").stop().animate({scrollTop:0},1e3,"easeInOutExpo"),t.preventDefault()}),$(document).on("click",".modal-backdrop, #sidebarToggle",function(t){t.preventDefault(),window.innerWidth>=768?($(".sidebar").toggleClass("toggled"),$("ul.sidebar").hasClass("toggled")?$.cookie("sidebarToggle",1,{path:"/admin"}):$.cookie("sidebarToggle",0,{path:"/admin"})):($(".sidebar").removeClass("toggled"),$(".modal-backdrop").length?($(".modal-backdrop").fadeOut("slow",function(){$(this).remove()}),$(".sidebar").removeClass("show"),$("body").removeClass("modal-open")):($('<div class="modal-backdrop show z-900"></div>').appendTo("body").hide().fadeIn(),$(".sidebar").addClass("show"),$("body").addClass("modal-open")))}),jQuery(document).on("click","div#themeToggle button",function(t){t.preventDefault();let e=$(this);e.hasClass("btn-light")&&($('link[href*="admin-dark.css"]').attr("href",function(){return $(this).attr("href").replace("admin-dark.css","admin.css")}),$.cookie("themeToggle","light",{path:"/",expires:365})),e.hasClass("btn-dark")&&($('link[href*="admin.css"]').attr("href",function(){return $(this).attr("href").replace("admin.css","admin-dark.css")}),$.cookie("themeToggle","dark",{path:"/",expires:365})),e.prop("disabled",!0),e.siblings("button").prop("disabled",!1)}),jQuery(document).on("click","a.destroyDir",function(t){t.preventDefault();let e=$(this),a=$("#row"+e.attr("data-id"));jQuery.ajax({url:e.attr("data-route"),data:{reason:e.closest(".popover-body").find("#reason").val()},headers:{"X-CSRF-TOKEN":$('meta[name="csrf-token"]').attr("content")},method:"delete",beforeSend:function(){a.find(".responsive-btn-group").addClass("disabled"),a.append($.getLoader("spinner-border"))},complete:function(){a.find("div.loader-absolute").remove()},success:function(){a.fadeOut("slow")}})}),jQuery(document).on("click",".statusDir",function(t){t.preventDefault();let e=$(this),a=$("#row"+e.attr("data-id"));jQuery.ajax({url:e.attr("data-route"),headers:{"X-CSRF-TOKEN":$('meta[name="csrf-token"]').attr("content")},method:"patch",data:{status:e.attr("data-status"),reason:e.closest(".popover-body").find("#reason").val()},beforeSend:function(){a.find(".responsive-btn-group").addClass("disabled"),a.append($.getLoader("spinner-border"))},complete:function(){a.find("div.loader-absolute").remove()},success:function(t){a.html($.sanitize($(t.view).html())),1==t.status&&(a.addClass("alert-success"),setTimeout(function(){a.removeClassStartingWith("alert-")},5e3)),$.inArray(t.status,[0,5])>-1&&(a.addClass("alert-warning"),setTimeout(function(){a.removeClassStartingWith("alert-")},5e3))}})}),jQuery(document).on("click","a.reloadThumbnail",function(t){t.preventDefault();let e=$(this);e.thumbnail=e.parent().children(".thumbnail"),e.thumbnail.img=e.thumbnail.children("img"),jQuery.ajax({url:e.attr("data-route"),method:"patch",beforeSend:function(){e.prop("disabled",!0),e.thumbnail.append($.getLoader("spinner-border"))},complete:function(){e.prop("disabled",!1),e.thumbnail.find("div.loader-absolute").remove()},success:function(t){e.thumbnail.img.attr("src",t.thumbnail_url+"&reload="+Math.random())}})}),jQuery(document).on("readyAndAjax",function(){$("[data-toggle=dir-confirmation]").confirmation({rootSelector:"[data-toggle=dir-confirmation]",copyAttributes:"href data-route data-id data-status",singleton:!0,popout:!1,onConfirm:function(){$(this).hasClass("submit")&&$(this).parents("form:first").submit()}}),$("[data-toggle=dir-confirmation]").on("inserted.bs.confirmation",function(){let t=$('[id^="confirmation"] .popover-body p.confirmation-content'),e=$($.parseHTML('<div><div class="form-group"><select id="reason" class="form-control"><option value="">'+$("form#selectForm").attr("data-reasons-label")+":</option></select></div></div>"));e.reason=e.find("select#reason"),$.each($.parseJSON($("form#selectForm").attr("data-reasons")),function(t,a){e.reason.append('<option value="'+a+'">'+a+"</option>")}),e.reason.append('<option value="custom">'+$("form#selectForm").attr("data-reasons-custom")+"...</option>"),t.html($.sanitize(e.html())).show()})}),$(document).on("change","select#reason",function(){"custom"===$(this).val()&&$(this).replaceWith('<input type="text" id="reason" class="form-control">')}),jQuery(document).ready(function(){let t=$("#map");t.length&&(t.data=t.data(),void 0!==t.data.coordsMarker&&t.data.coordsMarker.length&&(t.html().length||t.googleMap({zoom:parseInt(t.data.zoom),scrollwheel:!0,type:"ROADMAP"}).addClass(t.data.containerClass),$.each(t.data.coordsMarker,function(e,a){t.addMarker({coords:a})})))}),jQuery(document).on("readyAndAjax",function(){let t=$("#map-select");t.length&&(t.data=t.data(),t.html().length||(t.googleMap({zoom:t.data.zoom,coords:t.data.coords,scrollwheel:!0,type:"ROADMAP"}).addClass(t.attr("data-container-class")),t.siblings('[id^="marker"]').each(function(e,a){let n=$(a);(n={lat:n.find('input[id$="lat"]'),long:n.find('input[id$="long"]')}).lat.val().length&&n.long.val().length&&t.addMarker({coords:[n.lat.val(),n.long.val()],id:"marker"+e,draggable:!0,success:function(t){n.lat.val(t.lat),n.long.val(t.lon)}})})))}),jQuery(document).on("click","#remove-marker",function(t){t.preventDefault();let e=$("#map-select");e.removeMarker("marker0"),e.siblings("#marker0").find('input[id$="lat"]').val(null),e.siblings("#marker0").find('input[id$="long"]').val(null),$("#add-marker").show(),$(this).hide()}),jQuery(document).on("click","#add-marker",function(t){t.preventDefault();let e=$("#map-select");e.addMarker({coords:e.data("coords"),draggable:!0,id:"marker0",success:function(t){e.siblings("#marker0").find('input[id$="lat"]').val(t.lat),e.siblings("#marker0").find('input[id$="long"]').val(t.lon)}}),$("#remove-marker").show(),$(this).hide()}),jQuery(document).on("readyAndAjax",function(){if(!$(".trumbowyg-box").length){let t=$("#content_html_dir_trumbowyg");t.trumbowyg({lang:t.data("lang"),svgPath:!1,hideButtonTexts:!0,tagsToRemove:["script"],autogrow:!0,btnsDef:{},btns:[["viewHTML"],["historyUndo","historyRedo"],["formatting"],["foreColor","backColor"],["strong","em","del"],["unorderedList","orderedList"],["removeformat"],["fullscreen"]]})}}),jQuery(document).ready(function(){$('[aria-controls="collapsePayments"]').change(function(){0==$(this).val()?$("#collapsePayments").collapse("hide"):$("#collapsePayments").collapse("show")})}),jQuery(document).on("change","form input[id^=delete_img]",function(){let t=$(this).closest(".form-group").find('[type="file"]'),e=$(this).closest(".form-group").find('[type="hidden"]');!0===$(this).prop("checked")?(t.prop("disabled",!1),e.prop("disabled",!0)):(t.prop("disabled",!0),e.prop("disabled",!1))}),jQuery(document).on("change","select#payment_code_sms",function(){let t=$.parseJSON($(this).find("option:selected").attr("data"));$("div#nav-code_sms p span#number").text(t.number),$("div#nav-code_sms p span#code_sms").text(t.code),$("div#nav-code_sms p span#price").text(t.price)}),jQuery(document).on("change","select#payment_code_transfer",function(){let t=$.parseJSON($(this).find("option:selected").attr("data"));$("div#nav-code_transfer p a#code_transfer").attr("href",function(){return $(this).attr("href").replace(/=(.*)/,"="+t.code).trim()}),$("div#nav-code_transfer p span#price").text(t.price)}),jQuery(document).on("change","select#backlink",function(){let t=$.parseJSON($(this).find("option:selected").attr("data")),e='<a href="'+t.url+'" title="'+t.name+'">';null!==t.img_url_from_storage?e+='<img src="'+t.img_url_from_storage+'" alt="'+t.name+'">':e+=t.name,e+="</a>",$("#backlink_code").val($.sanitize(e))}),jQuery(document).on("click",".checkContent",function(t){t.preventDefault();let e,a=$(this).parent().find('[id^="content"]').text().split(".").filter(t=>t),n=0,o="";for(e=0;e<50;e++)if(0===n&&(n=Math.floor(Math.random()*a.length)),void 0!==a[n]?(o+=a[n].trim()+". ",n++):(o="",n=0),o.length>150){window.open("http://www.google.pl/search?hl=pl&q="+encodeURI(o),"checkContent","resizable=yes,status=no,scrollbars=yes,width=1366,height=768").focus();break}return!1}),jQuery(document).on("change",'div[id^=prices] div.price:last-child input[name*="select"]',function(){if(!0===$(this).prop("checked")){let t=$(this).closest("div.price").clone();t.id=parseInt($(this).attr("id").match(/\d+/),10)+1,t.find("[id^=price], [for^=price], [name^=prices]").each(function(e,a){$.each(["id","for","name"],function(e,n){$(a).attr(n)&&$(a).attr(n,$(a).attr(n).replace(/(\d+)/,t.id))})}),$(this).closest("div[id^=prices]").append($.sanitize('<div class="price">'+t.html()+"</div>"))}}),jQuery(document).on("change",'div[id^=prices] div.price:not(:first-child) input[name*="select"]',function(){!1===$(this).prop("checked")&&$(this).closest("div.price").remove()}),jQuery(document).on("change",'div[id^=prices] input[name*="sync"]',function(){let t={textarea:$(this).closest("div.price").find('textarea[name*="codes"]')};!0===$(this).prop("checked")?t.textarea.prop("readonly",!1):t.textarea.prop("readonly",!0)}),jQuery(document).on("readyAndAjax",function(){$(".thumbnail").popover({trigger:"hover",boundary:"window",html:!0,content:function(){return $.sanitize($(this).html())},placement:"auto"}).on("inserted.bs.popover",function(){$('[id^="popover"]').addClass("thumbnail")})});
