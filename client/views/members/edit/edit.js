var pageSession = new ReactiveDict();

Template.MembersEdit.rendered = function() {
	
};

Template.MembersEdit.events({
	
});

Template.MembersEdit.helpers({
	
});

Template.MembersEditForm.rendered = function() {
	

	pageSession.set("membersEditFormInfoMessage", "");
	pageSession.set("membersEditFormErrorMessage", "");

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

Template.MembersEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("membersEditFormInfoMessage", "");
		pageSession.set("membersEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var membersEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(membersEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("membersEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("members", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("membersEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Members.update({ _id: t.data.members_selected._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
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

Template.MembersEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("membersEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("membersEditFormErrorMessage");
	}
	
});
