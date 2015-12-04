Template.CodeMirror.rendered = function() {
  var self = this;
	var options = self.data.options || { lineNumbers: true };
	var textarea = self.find("textarea");
	
  self.editor = CodeMirror.fromTextArea(textarea, options);
  var lastEvents = null;
  
	if(self.data.events){

		Tracker.autorun(function(){
			if(lastEvents){
				for(var prop in lastEvents){
					if(lastEvents.hasOwnProperty(prop)){
						self.editor.off(prop, lastEvents[prop]);
					}
				}
			}
			
			for(var prop in self.data.events){
				if(self.data.events.hasOwnProperty(prop)){
					self.editor.on(prop, self.data.events[prop]);
				}
			}

			lastEvents = self.data.events;

		});
	}
  
  self.tLastEdit = 0;
	self.editor.on("change", function(doc, change) {
		textarea.value = doc.getValue();
	});
};

Template.CodeMirror.destroyed = function() {
	this.$("textarea").parent().find(".CodeMirror").remove();
}

Template.CodeMirror.helpers({
	"code": function(){
		var editor = Template.instance().editor;
		if(editor && this.code != editor.getValue()) {
			editor.setValue(this.code);
		}
		return this.code;
	},

	"editorId": function() {
		return this.id || "code-mirror-textarea";
	},

	"editorName": function() {
		return this.name || "code-mirror-textarea";
	}
});
