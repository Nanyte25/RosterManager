this.Members = new Mongo.Collection("members");

this.Members.userCanInsert = function(userId, doc) {
	return true;
};

this.Members.userCanUpdate = function(userId, doc) {
	return true;
};

this.Members.userCanRemove = function(userId, doc) {
	return true;
};
