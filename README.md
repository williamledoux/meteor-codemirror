Meteor CodeMirror package
=========================

<a href="http://codemirror.net/" target="_blank">CodeMirror</a> 4.7.1 packaged for Meteor. **CodeMirror** is a versatile text editor implemented in JavaScript for the browser.

About this fork
---------------
* Add optionnal template parameter `events` to provide listeners for CodeMirror's own events
* Add a quick and dirty demo to showcase two simple uses of the `"change"` event.
* Removed template parameter `reactiveVar` because `events` can do it with more control (cf. demo).
* Add a timeout of few milliseconds to prevent editor's content to refresh while you are editing it.

Usage
-----

Put somewhere in your template:

```html
<template name="EditorPage">

	{{> CodeMirror id="some-id" name="someName" options=editorOptions code=editorCode events=editorEvents}}

</template>
```

Parameters:

- `id` will be set to internal textarea element (reactive)

- `name` will be set to internal textarea element (useful in form submit) (reactive)

- `options` is CodeMirror options object (not reactive)

- `code` is code to show in editor (reactive)

- `events` is an optional object providing listeners for CodeMirror's events (not reactive)

And provide helpers that returns CodeMirror options and content:

```js
Template.EditorPage.helpers({

	"editorOptions": function() {
		return {
			lineNumbers: true,
			mode: "javascript"
		}
	},

	"editorCode": function() {
		return "Code to show in editor";
	}
});
```

To get value from editor, just read value from the internal textarea:

```js
Template.EditorPage.events({

	"click button#save": function(e, t) {
		var code = t.find("#some-id").value;
		alert(code);
	}

});

```

Or, if you provided a `change` listener in your `events` object, you can store it in a session variable, update your collections or whatever suits you :

```js
Template.EditorPage.helpers({

	"editorEvents": function(){
		return {
			// see https://codemirror.net/doc/manual.html#events
			"change": function(doc, change){
				console.log(d.getValue());
			}
		};
	}
});


```


Or, using raw html/javascript
-----------------------------

Create textarea somewhere in your html template:

```html
<template name="EditorPage">

	<textarea id="myTextarea"></textarea>

</template>
```

Initialize CodeMirror somewhere from your js:

```js
Template.EditorPage.rendered = function() {
	var editor = CodeMirror.fromTextArea(this.find("#myTextarea"), {
		lineNumbers: true,
		mode: "javascript" // set any of supported language modes here
	});
}
```

Deal with textarea as you normaly do with textarea, with exception that you cannot directly style `textarea` element - so, wrap it into `div` (that's because your textarea will be hidden and replaced by CodeMirror's own markup).


Supported modes
---------------

```
apl
asterisk
clike
clojure
cobol
commonlisp
coffeescript
css
cypher
d
diff
django
dtd
dylan
ecl
eiffel
erlang
fortran
gas
gfm
gherkin
go
groovy
haml
haskell
haxe
htmlembedded
htmlmixed
http
idl
jade
javascript
jinja2
julia
kotlin
livescript
lua
markdown
mirc
mllike
modelica
nginx
ntriples
octave
pascal
pegjs
perl
php
pig
properties
puppet
python
q
r
rpm
rst
ruby
rust
sass
scheme
shell
sieve
slim
smalltalk
smarty
smartymixed
solr
sparql
sql
stex
tcl
textile
tiddlywiki
tiki
toml
tornado
turtle
vb
vbscript
velocity
verilog
xml
xquery
yaml
z80
```


Supported themes
----------------

```
3024-day
3024-night
ambiance-mobile
ambiance
base16-dark
base16-light
blackboard
cobalt
eclipse
elegant
erlang-dark
lesser-dark
mbo
mdn-like
midnight
monokai
neat
neo
night
paraiso-dark
paraiso-light
pastel-on-dark
rubyblue
solarized
the-matrix
tomorrow-night-eighties
twilight
vibrant-ink
xq-dark
xq-light
```


Supported key bindings
----------------------

```
emacs
sublime
vim
```

Supported "lints"
-----------------

```
javascript
json
css
```

Version history
===============

1.2.5
-----

- Included search & replace addon


1.2.4
-----

- Included "active line mode" addon


1.2.3
-----

- Added `/addon/mode/overlay.js` required by gfm mode. Thanks to <a href="https://github.com/keyanzhang" target="_blank">Keyan Zhang</a>.


1.2.2
-----

- `reactiveVar` now gets and sets session variable to/from editor text


1.2.1
-----

- Fixed minor bug


1.2.0
-----

- Fixed bug with `reactiveVar` 



That's it.
