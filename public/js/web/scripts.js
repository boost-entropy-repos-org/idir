function categorySelect(){return $("#categoryOptions .form-group").map(function(){return"#"+$(this).attr("id")}).get()}function ajaxCreateComment(e){let t=e.closest("[id^=comment]");$.ajax({url:e.attr("data-route"),method:"get",beforeSend:function(){e.prop("disabled",!0),t.append($.getLoader("spinner-border","loader"))},complete:function(){e.prop("disabled",!1),t.find("div.loader").remove(),t.find(".captcha").recaptcha()},success:function(e){t.children("div").append($.sanitize(e.view))},error:function(e){e.responseJSON.message&&t.children("div").prepend($.getAlert(e.responseJSON.message,"danger"))}})}jQuery(document).ready(function(){$(document).trigger("readyAndAjax")}),jQuery(document).ajaxComplete(function(){$(document).trigger("readyAndAjax")}),jQuery(document).on("readyAndAjax",function(){$("form").find("input, select").keypress(function(e){if(13==e.which)return e.preventDefault(),!1})}),jQuery(document).on("click","#searchCategory .btn",function(e){e.preventDefault();let t=$("#searchCategory");t.url=t.attr("data-route"),t.btn=t.find(".btn"),t.input=t.find("input"),$.ajax({url:t.url+"?name="+t.input.val(),method:"get",dataType:"json",beforeSend:function(){t.btn.prop("disabled",!0),$("#searchCategoryOptions").empty(),t.append($.getLoader("spinner-border")),t.find(".invalid-feedback").remove(),t.input.removeClass("is-valid"),t.input.removeClass("is-invalid")},complete:function(){t.btn.prop("disabled",!1),t.find("div.loader-absolute").remove()},success:function(e){let n=$(e.view).find(categorySelect().join(",")).remove().end();t.find("#searchCategoryOptions").html($.sanitize(n.html()))},error:function(e){var n=e.responseJSON;$.each(n.errors,function(e,n){t.input.addClass("is-invalid"),t.input.parent().after($.getError(e,n))})}})}),jQuery(document).on("change",".categoryOption",function(){let e=$("#searchCategory");e.max=e.attr("data-max");let t=$(this).closest(".form-group");1==$(this).prop("checked")?t.appendTo("#categoryOptions"):t.remove(),$.isNumeric(e.max)&&(e.is(":visible")&&categorySelect().length>=e.max&&e.fadeOut(),!e.is(":visible")&&categorySelect().length<e.max&&e.fadeIn())}),jQuery(document).on("readyAndAjax",function(){$("#searchCategory input").keypress(function(e){if(13==e.which)return $("#searchCategory .btn").trigger("click"),!1})}),jQuery(document).on("click","a.createComment",function(e){e.preventDefault();let t=$(this).closest("[id^=comment]").find("form#createComment");t.length>0?t.fadeToggle():ajaxCreateComment($(this))}),jQuery(document).on("click","a.editComment",function(e){e.preventDefault();let t=$(this),n=t.closest("[id^=comment]");$.ajax({url:t.attr("data-route"),method:"get",beforeSend:function(){n.children("div").hide(),n.append($.getLoader("spinner-border","loader"))},complete:function(){n.find("div.loader").remove()},success:function(e){n.append($.sanitize(e.view))},error:function(e){n.children("div").show(),e.responseJSON.message&&n.children("div").prepend($.getAlert(e.responseJSON.message,"danger"))}})}),jQuery(document).on("click","button.editCommentCancel",function(e){e.preventDefault();let t=$(this).closest("[id^=comment]");t.children("div").show(),t.find("form#editComment").remove()}),function(e){jQuery(document).on("change","#filterCommentOrderBy",function(t){t.preventDefault();let n=e("#filter");n.href=n.attr("data-route")+"?"+n.serialize(),function(t,n){e.ajax({url:n,method:"get",dataType:"html",beforeSend:function(){e("#filterContent").find(".btn").prop("disabled",!0),e("#filterOrderBy").prop("disabled",!0),e("#filterPaginate").prop("disabled",!0),t.children("div").append(e.getLoader("spinner-border")),e("#filterModal").modal("hide")},complete:function(){t.find("div.loader-absolute").remove(),e("div#comment").find(".captcha").recaptcha()},success:function(t){e("#filterContent").html(e.sanitize(e(t).find("#filterContent").html())),document.title=document.title.replace(/:\s(\d+)/,": 1"),history.replaceState(null,null,n)}})}(n,n.href)})}(jQuery),jQuery(document).on("click","a.rateComment",function(e){e.preventDefault();let t=$(this),n=t.closest("[id^=comment]").find("span.rating");$.ajax({url:t.attr("data-route"),method:"get",beforeSend:function(){},complete:function(){n.addClass("font-weight-bold")},success:function(e){n.text(e.sum_rating)}})}),jQuery(document).on("click","button.storeComment",function(e){e.preventDefault();let t=$(this).closest("form");t.btn=t.find(".btn"),t.input=t.find(".form-control"),jQuery.ajax({url:t.attr("data-route"),headers:{"X-CSRF-TOKEN":$('meta[name="csrf-token"]').attr("content")},method:"post",data:t.serialize(),dataType:"json",beforeSend:function(){t.btn.prop("disabled",!0),t.append($.getLoader("spinner-border")),$(".invalid-feedback").remove(),t.input.removeClass("is-valid"),t.input.removeClass("is-invalid")},complete:function(){t.btn.prop("disabled",!1),t.find("div.loader-absolute").remove(),t.input.addClass("is-valid"),t.find(".captcha").recaptcha(),t.find(".captcha").captcha()},success:function(e){if(e.view){t.closest("[id^=comment]").after($.sanitize(e.view));let n=t.closest("[id^=comment]").next("div");n.addClass("alert-primary font-italic border-bottom"),setTimeout(function(){n.removeClassStartingWith("alert-")},5e3)}e.success&&t.before($.getAlert(e.success,"success")),0!=t.find("#parent_id").val()?t.remove():t.find("#content").val("")},error:function(e){e.responseJSON.errors?$.each(e.responseJSON.errors,function(e,n){t.find('[name="'+e+'"]').addClass("is-invalid"),t.find('[name="'+e+'"]').closest(".form-group").append($.getError(e,n))}):e.responseJSON.message&&t.prepend($.getAlert(e.responseJSON.message,"danger"))}})}),jQuery(document).on("click","a.takeComment",function(e){e.preventDefault();let t=$(this),n=t.closest("[id^=row]"),a=t.closest("div");$.ajax({url:t.attr("data-route"),headers:{"X-CSRF-TOKEN":$('meta[name="csrf-token"]').attr("content")},method:"post",data:{except:n.children("[id^=row]").map(function(){return $(this).attr("data-id")}).get(),orderby:t.closest("#filterContent").find("#filterCommentOrderBy").val()},beforeSend:function(){t.hide(),a.append($.getLoader("spinner-border","loader"))},complete:function(){a.find("div.loader").remove()},success:function(e){n.append($.sanitize(e.view))}})}),jQuery(document).on("click","button.updateComment",function(e){e.preventDefault();let t=$(this).closest("form");t.btn=t.find(".btn"),t.input=t.find(".form-control"),jQuery.ajax({url:t.attr("data-route"),headers:{"X-CSRF-TOKEN":$('meta[name="csrf-token"]').attr("content")},method:"put",data:t.serialize(),dataType:"json",beforeSend:function(){t.btn.prop("disabled",!0),t.append($.getLoader("spinner-border")),$(".invalid-feedback").remove(),t.input.removeClass("is-valid"),t.input.removeClass("is-invalid")},complete:function(){t.btn.prop("disabled",!1),t.find("div.loader-absolute").remove(),t.input.addClass("is-valid")},success:function(e){let n=t.closest("[id^=comment]");n.html($.sanitize($(e.view).html())),n.addClass("alert-primary"),setTimeout(function(){n.removeClassStartingWith("alert-")},5e3)},error:function(e){e.responseJSON.errors?$.each(e.responseJSON.errors,function(e,n){t.find('[name="'+e+'"]').addClass("is-invalid"),t.find('[name="'+e+'"]').closest(".form-group").append($.getError(e,n))}):e.responseJSON.message&&t.prepend($.sanitize($.getAlert(e.responseJSON.message,"danger")))}})}),jQuery(document).on("click",".destroy",function(e){e.preventDefault();let t=$(this),n=$("#row"+t.attr("data-id"));jQuery.ajax({url:t.attr("data-route"),headers:{"X-CSRF-TOKEN":$('meta[name="csrf-token"]').attr("content")},method:"delete",beforeSend:function(){n.find(".responsive-btn-group").addClass("disabled"),n.append($.getLoader("spinner-border"))},complete:function(){n.find("div.loader-absolute").remove()},success:function(e){n.fadeOut("slow")}})}),function(e){function t(t,n){e.ajax({url:n,method:"get",dataType:"html",beforeSend:function(){e("#filterContent").find(".btn").prop("disabled",!0),e("#filterOrderBy").prop("disabled",!0),e("#filterPaginate").prop("disabled",!0),t.children("div").append(e.getLoader("spinner-border")),e("#filterModal").modal("hide")},complete:function(){t.find("div.loader-absolute").remove()},success:function(t){e("#filterContent").html(e.sanitize(e(t).find("#filterContent").html())),document.title=document.title.replace(/:\s(\d+)/,": 1"),history.replaceState(null,null,n)}})}jQuery(document).on("change","#filterOrderBy",function(n){n.preventDefault();let a=e("#filter");a.href=a.attr("data-route")+"?"+a.serialize(),t(a,a.href)}),jQuery(document).on("click","#filterFilter",function(n){n.preventDefault();let a=e("#filter");a.href=a.attr("data-route")+"?"+a.serialize(),e("#filter").valid()&&t(a,a.href)}),jQuery(document).on("click",".filterOption",function(n){n.preventDefault();let a=e("#filter");a.href=a.attr("data-route")+"?"+a.find("[name!="+e.escapeSelector(e(this).attr("data-name"))+"]").serialize(),t(a,a.href)}),jQuery(document).on("change","#filterPaginate",function(n){n.preventDefault();let a=e("#filter");a.href=a.attr("data-route")+"?"+a.serialize(),t(a,a.href)})}(jQuery),jQuery(document).on("click",".storeNewsletter",function(e){e.preventDefault();let t=$(this).parents("form");t.btn=t.find(".btn"),t.group=t.find(".form-group"),t.input=t.find(".form-control, .custom-control-input"),jQuery.ajax({url:t.attr("data-route"),headers:{"X-CSRF-TOKEN":$('meta[name="csrf-token"]').attr("content")},method:"post",data:t.serialize(),dataType:"json",beforeSend:function(){t.btn.prop("disabled",!0),t.append($.getLoader("spinner-border")),$(".invalid-feedback").remove(),$(".valid-feedback").remove(),t.input.removeClass("is-valid"),t.input.removeClass("is-invalid")},complete:function(){t.btn.prop("disabled",!1),t.find("div.loader-absolute").remove(),t.input.addClass("is-valid")},success:function(e){e.success&&(t.find('[name="email"]').val(""),t.find('[name="email"]').closest(".form-group").append($.getMessage(e.success)))},error:function(e){e.responseJSON.errors&&$.each(e.responseJSON.errors,function(e,n){t.find('[name="'+e+'"]').addClass("is-invalid"),t.find('[name="'+e+'"]').closest(".form-group").append($.getError(e,n))})}})}),jQuery(document).on("click","a.createReport",function(e){e.preventDefault();let t=$(this),n={body:$(t.attr("data-target")).find(".modal-body"),content:$(t.attr("data-target")).find(".modal-content")};n.body.empty(),jQuery.ajax({url:t.attr("data-route"),method:"get",beforeSend:function(){n.body.html($.getLoader("spinner-grow"))},complete:function(){n.content.find("div.loader-absolute").remove()},success:function(e){n.body.html($.sanitize(e.view))}})}),jQuery(document).on("click","button.storeReport",function(e){e.preventDefault();let t=$(this).closest("form");t.btn=t.find(".btn"),t.input=t.find(".form-control");let n={body:t.closest(".modal-body")};$.ajax({url:t.attr("data-route"),headers:{"X-CSRF-TOKEN":$('meta[name="csrf-token"]').attr("content")},method:"post",data:t.serialize(),dataType:"json",beforeSend:function(){t.btn.prop("disabled",!0),n.body.append($.getLoader("spinner-border")),$(".invalid-feedback").remove(),t.input.removeClass("is-valid"),t.input.removeClass("is-invalid")},complete:function(){t.btn.prop("disabled",!1),n.body.find("div.loader-absolute").remove(),t.input.addClass("is-valid")},success:function(e){n.body.html($.getAlert(e.success,"success"))},error:function(e){let n=e.responseJSON;$.each(n.errors,function(e,n){t.find("#"+e).addClass("is-invalid"),t.find("#"+e).after($.getError(e,n))})}})}),function(e){e.fn.removeClassStartingWith=function(e){this.removeClass(function(t,n){return(n.match(new RegExp("\\b"+e+"\\S+","g"))||[]).join(" ")})},e.sanitize=function(t){let n=e(e.parseHTML("<div>"+t+"</div>",null,!1));return n.find("*").each(function(t,n){e.each(n.attributes,function(){let t=this.name,a=this.value;0!=t.indexOf("on")&&0!=a.indexOf("javascript:")||e(n).removeAttr(t)})}),n.html()},e.getUrlParameter=function(e,t){return(RegExp(t+"=(.+?)(&|$)").exec(e)||[,null])[1]},e.fn.recaptcha=function(){var e;this.hasClass("g-recaptcha")&&(e=this.html().length?parseInt(this.find('textarea[name="g-recaptcha-response"]').attr("id").match(/\d+$/),10):grecaptcha.render(this[0],{sitekey:this.attr("data-sitekey")}),Number.isInteger(e)?grecaptcha.reset(e):grecaptcha.reset())},e.fn.captcha=function(){this.hasClass("logic_captcha")&&(this.find('input[name="captcha"]').val(""),this.find(".reload_captcha_base64").trigger("click"))},e.getLoader=function(e,t="loader-absolute"){return'<div class="'+t+'"><div class="'+e+'"><span class="sr-only">Loading...</span></div></div>'},e.getAlert=function(t,n){return e.sanitize('<div class="alert alert-'+n+' alert-time" role="alert">'+t+"</div>")},e.getError=function(t,n){return e.sanitize('<span class="invalid-feedback d-block font-weight-bold" id="error-'+t+'">'+n+"</span>")},e.getMessage=function(t){return e.sanitize('<span class="valid-feedback d-block font-weight-bold">'+t+"</span>")}}(jQuery),jQuery(document).on("readyAndAjax",function(){$("[data-toggle=confirmation]").confirmation({rootSelector:"[data-toggle=confirmation]",copyAttributes:"href data-route data-id",singleton:!0,popout:!0,onConfirm:function(){$(this).hasClass("submit")&&$(this).parents("form:first").submit()}})}),jQuery(document).on("readyAndAjax",function(){let e=$("#infinite-scroll");e.jscroll({debug:!1,autoTrigger:1==e.data("autotrigger"),data:function(){let e=$(this).find("[id^=row]").map(function(){return $(this).attr("data-id")}).get();if(e.length)return{except:e}},loadingHtml:$.getLoader("spinner-border","loader"),loadingFunction:function(){$("#is-pagination").first().remove()},padding:0,nextSelector:"a#is-next:last",contentSelector:"#infinite-scroll",pagingSelector:".pagination",callback:function(e){let t=e.split(" ")[0];history.replaceState(null,null,t)}})}),jQuery(document).ready(function(){let e=$("#map");e.length&&(e.data=e.data(),void 0!==e.data.addressMarker&&e.data.addressMarker.length&&(e.googleMap({zoom:parseInt(e.data.zoom),scrollwheel:!0,type:"ROADMAP"}).addClass(e.data.containerClass),$.each(e.data.addressMarker,function(t,n){e.addMarker({address:n})})))}),jQuery(document).on("readyAndAjax",function(){$(".lazy").lazy({effect:"fadeIn",effectTime:"fast",threshold:0})}),jQuery(document).ready(function(){$(".tagsinput").tagsInput({placeholder:$(".tagsinput").attr("placeholder"),minChars:3,maxChars:30,limit:$(".tagsinput").attr("data-max"),validationPattern:new RegExp("^(?:^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ0-9à-ü ]+$)$"),unique:!0})}),function(e){jQuery(document).ready(function(){e.when(function(){let t=e("#typeahead"),n=t.closest("form"),a=new Bloodhound({remote:{url:t.attr("data-route")+"?search=%QUERY%",wildcard:"%QUERY%"},datumTokenizer:Bloodhound.tokenizers.whitespace("search"),queryTokenizer:Bloodhound.tokenizers.whitespace});t.typeahead({hint:!0,highlight:!0,minLength:3},{source:a.ttAdapter(),display:function(t){return e(e.parseHTML(t.name)).text()},templates:{suggestion:function(t){let a=e(e.parseHTML(t.name)).text(),o=n.attr("action")+"?source="+n.find('[name="source"]').val()+"&search="+a;return e.sanitize('<a href="'+o+'" class="list-group-item py-2 text-truncate">'+a+"</a>")}}})}()).then(function(){e("input.tt-input").css("background-color","")})})}(jQuery),jQuery(document).on("readyAndAjax",function(){$(".alert-time").delay(2e4).fadeOut()}),jQuery(document).on("readyAndAjax",function(){$('[data-toggle="tooltip"]').tooltip()}),jQuery(document).on("readyAndAjax",function(){$(".counter").each(function(){let e=$(this);e.name=$.escapeSelector(e.data("name")),e.min=void 0!==e.data("min")&&Number.isInteger(e.data("min"))?e.data("min"):null,e.max=void 0!==e.data("max")&&Number.isInteger(e.data("max"))?e.data("max"):null;let t=function(){let t=[$('[name="'+e.name+'"]'),$('[name="'+e.name+'"]').hasClass("trumbowyg-textarea")?$('[name="'+e.name+'"]').parent().find(".trumbowyg-editor"):null];$.each(t.filter(e=>null!=e),function(){$(this).keyup(function(){let t=$(this).attr("contenteditable")?parseFloat($(this).text().length):parseFloat($($.parseHTML($(this).val())).text().length);e.firstchild=e.children(":first"),e.firstchild.text(t),0===t?e.firstchild.removeClass():(e.firstchild.addClass("text-success"),e.firstchild.removeClass("text-danger"),(null!==e.min&&t<e.min||null!==e.max&&t>e.max)&&(e.firstchild.addClass("text-danger"),e.firstchild.removeClass("text-success")))})})};-1!==$('[name="'+e.name+'"]').attr("id").indexOf("trumbowyg")?$("#"+$('[name="'+e.name+'"]').attr("id")).on("tbwinit",()=>t()):t()})}),jQuery(document).on("readyAndAjax",function(){$(".custom-file-input").on("change",function(){let e=$(this).val().split("\\").pop();$(this).siblings(".custom-file-label").addClass("selected").html(e)})}),jQuery(document).ready(function(){let e,t=0,n=$(".menu.navbar");$(window).scroll(function(){if(!$("body").hasClass("modal-open")){var a=$(window).scrollTop(),o=n.height()+10;e<(t=a)&&e>o?n.fadeOut():n.fadeIn(),e=t}})}),jQuery(document).on("click",".modal-backdrop, #navbarToggle",function(e){e.preventDefault(),$(".modal-backdrop").length?($(".navbar-collapse").collapse("hide"),$(".modal-backdrop").fadeOut("slow",function(){$(this).remove()}),$("body").removeClass("modal-open")):($(".navbar-collapse").collapse("show"),$('<div class="modal-backdrop show z-900"></div>').appendTo("body").hide().fadeIn(),$("body").addClass("modal-open"))}),jQuery(document).on("click","#policy #agree",function(e){e.preventDefault(),$("#policy").remove(),$.cookie("policyAgree",1,{path:"/",expires:365})}),$(document).on("scroll",function(){$(this).scrollTop()>100?$(".scroll-to-top").fadeIn():$(".scroll-to-top").fadeOut()}),$(document).on("click","a.scroll-to-top",function(e){$("html, body").stop().animate({scrollTop:0},1e3,"easeInOutExpo"),e.preventDefault()}),$(document).on("click",".search-toggler",function(e){e.preventDefault(),window.innerWidth>=768?$("#pagesToggle").fadeToggle(0):($("#navbarLogo").fadeToggle(0),$("#navbarToggle").fadeToggle(0)),$("#searchForm").fadeToggle(0),$(".search-toggler").find("i").toggleClass("fa-search fa-times")}),$(document).ready(function(){let e=$("form#searchForm");e.btn=e.find("button"),e.find('input[name="search"]').keyup(function(t){$(this).val().trim().length>=3?e.btn.prop("disabled",!1):e.btn.prop("disabled",!0)})}),jQuery(document).on("readyAndAjax",function(){let e=$("form#searchForm");e.btn=e.find("button"),e.find('input[name="search"]').keypress(function(t){if(13==t.which&&!1===e.btn.prop("disabled"))return $("form#searchForm").submit(),!1})}),jQuery(document).on("click","div#themeToggle button",function(e){e.preventDefault();let t=$(this);t.hasClass("btn-light")&&$.cookie("themeToggle","light",{path:"/",expires:365}),t.hasClass("btn-dark")&&$.cookie("themeToggle","dark",{path:"/",expires:365}),window.location.reload()}),jQuery(document).on("click","button.sendContact",function(e){e.preventDefault();let t=$(this).closest("form");t.btn=t.find(".btn"),t.input=t.find(".form-control, .custom-control-input");let n={body:t.closest(".modal-body")};$.ajax({url:t.attr("data-route"),headers:{"X-CSRF-TOKEN":$('meta[name="csrf-token"]').attr("content")},method:"post",data:t.serialize(),dataType:"json",beforeSend:function(){t.btn.prop("disabled",!0),n.body.append($.getLoader("spinner-border")),$(".invalid-feedback").remove(),t.input.removeClass("is-valid"),t.input.removeClass("is-invalid")},complete:function(){t.btn.prop("disabled",!1),n.body.find("div.loader-absolute").remove(),t.find(".captcha").recaptcha(),t.find(".captcha").captcha(),t.input.addClass("is-valid")},success:function(e){n.body.html($.getAlert(e.success,"success"))},error:function(e){e.responseJSON.errors?$.each(e.responseJSON.errors,function(e,n){t.find('[name="'+e+'"]').addClass("is-invalid"),t.find('[name="'+e+'"]').closest(".form-group").append($.getError(e,n))}):e.responseJSON.message&&t.prepend($.getAlert(e.responseJSON.message,"danger"))}})}),jQuery(document).on("click",".showContact",function(e){e.preventDefault();let t=$(this),n={body:$(t.attr("data-target")).find(".modal-body"),content:$(t.attr("data-target")).find(".modal-content")};n.body.empty(),jQuery.ajax({url:t.attr("data-route"),method:"get",beforeSend:function(){n.body.append($.getLoader("spinner-grow"))},complete:function(){n.content.find("script"),n.content.find("div.loader-absolute").remove(),n.content.find(".captcha").recaptcha()},success:function(e){n.body.html($.sanitize(e.view))}})}),jQuery(document).ready(function(){$('[id^="star-rating"]').on("rating:change",function(e,t){e.preventDefault();let n=$(this);t!==n.attr("data-user-value")?$.ajax({url:n.attr("data-route")+"?rating="+t,method:"get",beforeSend:function(){},complete:function(){},success:function(e){n.rating("update",e.sum_rating).rating("refresh",{showClear:!0}).attr("value",e.sum_rating).attr("data-user-value",t)}}):n.rating("update",n.attr("value"))}),$('[id^="star-rating"]').on("rating:clear",function(e){e.preventDefault();let t=$(this);$.ajax({url:t.attr("data-route")+"?rating="+t.attr("data-user-value"),method:"get",beforeSend:function(){},complete:function(){},success:function(e){t.rating("update",e.sum_rating).rating("refresh",{showClear:!1}).attr("data-user-value","")}})})}),jQuery(document).on("readyAndAjax",function(){$('[id^="star-rating"]').rating({theme:"krajee-svg",showCaption:!1})}),$(document).ready(function(){$("#map-poland").CSSMap({size:430,tooltips:"floating-top-center",responsive:"auto",tapOnce:!0,onLoad:function(){$("#map-poland").find("a.active-region").parent().addClass("active-region")}}).children().show()}),jQuery(document).ready(function(){let e=$("#map");e.length&&(e.data=e.data(),void 0!==e.data.coordsMarker&&e.data.coordsMarker.length&&(e.html().length||e.googleMap({zoom:parseInt(e.data.zoom),scrollwheel:!0,type:"ROADMAP"}).addClass(e.data.containerClass),$.each(e.data.coordsMarker,function(t,n){e.addMarker({coords:n})})))}),jQuery(document).on("readyAndAjax",function(){let e=$("#map-select");e.length&&(e.data=e.data(),e.html().length||(e.googleMap({zoom:e.data.zoom,coords:e.data.coords,scrollwheel:!0,type:"ROADMAP"}).addClass(e.attr("data-container-class")),e.siblings('[id^="marker"]').each(function(t,n){let a=$(n);(a={lat:a.find('input[id$="lat"]'),long:a.find('input[id$="long"]')}).lat.val().length&&a.long.val().length&&e.addMarker({coords:[a.lat.val(),a.long.val()],id:"marker"+t,draggable:!0,success:function(e){a.lat.val(e.lat),a.long.val(e.lon)}})})))}),jQuery(document).on("click","#remove-marker",function(e){e.preventDefault();let t=$("#map-select");t.removeMarker("marker0"),t.siblings("#marker0").find('input[id$="lat"]').val(null),t.siblings("#marker0").find('input[id$="long"]').val(null),$("#add-marker").show(),$(this).hide()}),jQuery(document).on("click","#add-marker",function(e){e.preventDefault();let t=$("#map-select");t.addMarker({coords:t.data("coords"),draggable:!0,id:"marker0",success:function(e){t.siblings("#marker0").find('input[id$="lat"]').val(e.lat),t.siblings("#marker0").find('input[id$="long"]').val(e.lon)}}),$("#remove-marker").show(),$(this).hide()}),jQuery(document).on("readyAndAjax",function(){if(!$(".trumbowyg-box").length){let e=$("#content_html_dir_trumbowyg");e.trumbowyg({lang:e.data("lang"),svgPath:!1,hideButtonTexts:!0,tagsToRemove:["script"],autogrow:!0,btnsDef:{},btns:[["viewHTML"],["historyUndo","historyRedo"],["formatting"],["foreColor","backColor"],["strong","em","del"],["unorderedList","orderedList"],["removeformat"],["fullscreen"]]})}}),jQuery(document).ready(function(){}),jQuery(document).on("change","form input[id^=delete_img]",function(){let e=$(this).closest(".form-group").find('[type="file"]'),t=$(this).closest(".form-group").find('[type="hidden"]');!0===$(this).prop("checked")?(e.prop("disabled",!1),t.prop("disabled",!0)):(e.prop("disabled",!0),t.prop("disabled",!1))}),jQuery(document).on("change","select#payment_code_sms",function(){let e=$.parseJSON($(this).find("option:selected").attr("data"));$("div#nav-code_sms p span#number").text(e.number),$("div#nav-code_sms p span#code_sms").text(e.code),$("div#nav-code_sms p span#price").text(e.price)}),jQuery(document).on("change","select#payment_code_transfer",function(){let e=$.parseJSON($(this).find("option:selected").attr("data"));$("div#nav-code_transfer p a#code_transfer").attr("href",function(){return $(this).attr("href").replace(/=(.*)/,"="+e.code).trim()}),$("div#nav-code_transfer p span#price").text(e.price)}),jQuery(document).on("change","select#backlink",function(){let e=$.parseJSON($(this).find("option:selected").attr("data")),t='<a href="'+e.url+'" title="'+e.name+'">';null!==e.img_url_from_storage?t+='<img src="'+e.img_url_from_storage+'" alt="'+e.name+'">':t+=e.name,t+="</a>",$("#backlink_code").val($.sanitize(t))});
