var pageSession = new ReactiveDict();

Template.Members.rendered = function() {
	
};

Template.Members.events({
	
});

Template.Members.helpers({
	
});

var MembersListItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("MembersListSearchString");
	var sortBy = pageSession.get("MembersListSortBy");
	var sortAscending = pageSession.get("MembersListSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["firstname", "surname", "team", "location", "description", "active", "e_mail"];
		filtered = _.filter(raw, function(item) {
			var match = false;
			_.each(searchFields, function(field) {
				var value = (getPropertyValue(field, item) || "") + "";

				match = match || (value && value.match(regEx));
				if(match) {
					return false;
				}
			})
			return match;
		});
	}

	// sort
	if(sortBy) {
		filtered = _.sortBy(filtered, sortBy);

		// descending?
		if(!sortAscending) {
			filtered = filtered.reverse();
		}
	}

	return filtered;
};

var MembersListExport = function(cursor, fileType) {
	var data = MembersListItems(cursor);
	var exportFields = [];

	var str = convertArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.MembersList.rendered = function() {
	pageSession.set("MembersListStyle", "table");
	
};

Template.MembersList.events({
	"submit #dataview-controls": function(e, t) {
		return false;
	},

	"click #dataview-search-button": function(e, t) {
		e.preventDefault();
		var form = $(e.currentTarget).parent();
		if(form) {
			var searchInput = form.find("#dataview-search-input");
			if(searchInput) {
				searchInput.focus();
				var searchString = searchInput.val();
				pageSession.set("MembersListSearchString", searchString);
			}

		}
		return false;
	},

	"keydown #dataview-search-input": function(e, t) {
		if(e.which === 13)
		{
			e.preventDefault();
			var form = $(e.currentTarget).parent();
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					var searchString = searchInput.val();
					pageSession.set("MembersListSearchString", searchString);
				}

			}
			return false;
		}

		if(e.which === 27)
		{
			e.preventDefault();
			var form = $(e.currentTarget).parent();
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					searchInput.val("");
					pageSession.set("MembersListSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("members.insert", {});
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		MembersListExport(this.members, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		MembersListExport(this.members, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		MembersListExport(this.members, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		MembersListExport(this.members, "json");
	}

	
});

Template.MembersList.helpers({

	

	"isEmpty": function() {
		return !this.members || this.members.count() == 0;
	},
	"isNotEmpty": function() {
		return this.members && this.members.count() > 0;
	},
	"isNotFound": function() {
		return this.members && pageSession.get("MembersListSearchString") && MembersListItems(this.members).length == 0;
	},
	"searchString": function() {
		return pageSession.get("MembersListSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("MembersListStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("MembersListStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("MembersListStyle") == "gallery";
	}

	
});


Template.MembersListTable.rendered = function() {
	
};

Template.MembersListTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("MembersListSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("MembersListSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("MembersListSortAscending") || false;
			pageSession.set("MembersListSortAscending", !sortAscending);
		} else {
			pageSession.set("MembersListSortAscending", true);
		}
	}
});

Template.MembersListTable.helpers({
	"tableItems": function() {
		return MembersListItems(this.members);
	}
});


Template.MembersListTableItems.rendered = function() {
	
};

Template.MembersListTableItems.events({
	"click td": function(e, t) {
		e.preventDefault();
		
		/**/
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Members.update({ _id: this._id }, { $set: values });

		return false;
	},

	"click #delete-button": function(e, t) {
		e.preventDefault();
		var me = this;
		bootbox.dialog({
			message: "Delete? Are you sure?",
			title: "Delete",
			animate: false,
			buttons: {
				success: {
					label: "Yes",
					className: "btn-success",
					callback: function() {
						Members.remove({ _id: me._id });
					}
				},
				danger: {
					label: "No",
					className: "btn-default"
				}
			}
		});
		return false;
	},
	"click #edit-button": function(e, t) {
		e.preventDefault();
		Router.go("members.edit", {customerId: this._id});
		return false;
	}
});

Template.MembersListTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }
	

	
});
