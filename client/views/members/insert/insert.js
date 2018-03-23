var pageSession = new ReactiveDict();

Template.MembersInsert.rendered = function() {
	
};

Template.MembersInsert.events({
	
});

Template.MembersInsert.helpers({
	
});

Template.MembersInsertForm.rendered = function() {
	

	pageSession.set("membersInsertFormInfoMessage", "");
	pageSession.set("membersInsertFormErrorMessage", "");

	$(".input-group.date").each(function() {
		var format = $(this).find("input[type='text']").attr("data-format");

		if(format) {
			format = format.toLowerCase();
		}
		else {
			format = "mm/dd/yyyy";
		}

		$(this).datepicker({
			autoclose: true,
			todayHighlight: true,
			todayBtn: true,
			forceParse: false,
			keyboardNavigation: false,
			format: format
		});
	});

	$("input[type='file']").fileinput();
	$("select[data-role='tagsinput']").tagsinput();
	$(".bootstrap-tagsinput").addClass("form-control");
	$("input[autofocus]").focus();
};

Template.MembersInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("membersInsertFormInfoMessage", "");
		pageSession.set("membersInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var membersInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(membersInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("membersInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("members", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("membersInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = Members.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("members", {});
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		/*CLOSE_REDIRECT*/
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		/*BACK_REDIRECT*/
	}

	
});

Template.MembersInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("membersInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("membersInsertFormErrorMessage");
	}
	
});
