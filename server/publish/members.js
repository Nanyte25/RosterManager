Meteor.publish("members", function() {
	return Members.find({}, {});
});

Meteor.publish("members_empty", function() {
	return Members.find({_id:null}, {});
});

Meteor.publish("members_selected", function(customerId) {
	return Members.find({_id:customerId}, {});
});

