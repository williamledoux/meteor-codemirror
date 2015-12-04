Snippets = new Meteor.Collection("Snippets");

if (Meteor.isClient) {

  //https://codemirror.net/doc/manual.html#config
  var config = {
    theme:"base16-dark",
    tabSize: 2,
    indentWithTabs: false,
    indentUnit: 2,
    lineNumbers: true,
    mode: "gfm",
    lint: false
  };

  Template.snippet_editors.events({
    "click button#actionAddSnippet": function(){
        Snippets.insert({
          "content": "this is a new snippet"
        });
    }
  });

  Template.snippet_editors.helpers({
    editors: function () {
      return Snippets.find();
    },
   "editorID": function(){
      return "snippet_editor_"+this._id;
    },
    "editorOptions": function() {
      return config;
    },
    "editorCode": function(){
      return this.content;
    },
    "editorEvents":function(){
      var self=this;
      return {
        "change": function(doc, change){
          if(change.origin != "setValue") // only for my own modifications !
            Snippets.update(self._id, {$set:{"content":doc.getValue()}});
        }
      };
    },
  });

  Session.set("content", "This is session content");

  Template.sessionvar_editors.helpers({
    editors: function () {
      return ["content", "content"];
    },
   "editorID": function(){
      return "snippet_session_"+this.valueOf();
    },
    "editorOptions": function() {
      return config;
    },
    "editorCode": function(){
      return Session.get(this.valueOf());
    },
    "editorEvents":function(){
      var self=this;
      return {
        "change": function(d){
          Session.set(self.valueOf(), d.getValue());
        }
      };
    },
  });
}

if (Meteor.isServer) {

  Meteor.startup(function () {
    Snippets.remove({});
    Snippets.insert({
      "content": "This is snippet 1"
    });
    Snippets.insert({
      "content": "This is snippet 2"
    });
  });

}
