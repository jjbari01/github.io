/* Copyright (C) arrowthemes, http://www.gnu.org/licenses/gpl.html GNU/GPL */

jQuery(function($) {

    "use strict";

    var preloader = $('.tm-preload');

    // page preloader
  	$(window).on("load",function(){preloader.removeClass('loading').fadeOut(300,function(){})}),$(window).on("beforeunload",function(){preloader.addClass('loading').fadeIn(100,function(){})});

  	//contact form
 	$.fn.clearForm = function() {
	  return this.each(function() {
		var type = this.type, tag = this.tagName.toLowerCase();
		if (tag == 'form')
		  return $(':input',this).clearForm();
		if (type == 'text' || type == 'password' || type == 'email' || tag == 'textarea')
		  this.value = '';
		else if (type == 'checkbox' || type == 'radio')
		  this.checked = false;
		else if (tag == 'select')
		  this.selectedIndex = -1;
	  });
	};

	$("#Submitbtn").on( "click", function(event) {
		event.preventDefault();
		var mydata = $("form").serialize();
		$.ajax({
			type: "POST",
			dataType: "json",
			url: "contact.php",
			data: mydata,
			success: function(data) {

			if( data["type"] == "error" ){
				$("#alert-msg").html(data["msg"]);
				$("#alert-msg").removeClass("uk-alert uk-alert-success");
				$("#alert-msg").addClass("uk-alert uk-alert-danger");
				$("#alert-msg").show();
				} else {
					$("#alert-msg").html(data["msg"]);
					$("#alert-msg").removeClass("uk-alert uk-alert-danger");
					$("#alert-msg").addClass("uk-alert uk-alert-success");
					$("#alert-msg").show();

					$("#contact_form").clearForm();
				}    
			},
			error: function(xhr, textStatus, errorThrown) {
			}
		});
		return false;
	});
});