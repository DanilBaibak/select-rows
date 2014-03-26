select-rows
===========

jQuery plugin for rows selection in the grid. You can check an example here
http://danilbaibak.github.io/select-rows/

<h3>How to use:</h3>

<code>$('#contactsList').selectRows({class: 'success'});</code>

Markup should be done as simple table. "contactsList" - is an id of "table" or "tbody". You need to pass to the plugin the class name parameter that will be added to the selected row. By default the class name is "selectedRow".

Plugin can be used as an AMD module or just be included to the page by tag "script". If you use it as AMD module, you'll have to pass jQuery as the dependency.

The plugin supports usage of Ctrl and Shift for rows selection. Also it triggered two events:<br>
&nbsp;&nbsp;1th - "<b>startSelection</b>" - when user <i>start</i> selecting;<br>
&nbsp;&nbsp;2d - "<b>finishSelection</b>" - when user <i>finish</i> selecting.<br>
In both cases, it returns row "<b>currentRow</b>", which will be first or last in the selection. So, if you need, you can catch it:

<code>
$('#contactsList').selectRows({class: 'success'})<br>
&nbsp;&nbsp;&nbsp;&nbsp;.bind('startSelection', function(e) {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;var firstRow = e.currentRow;<br>
&nbsp;&nbsp;&nbsp;&nbsp;})<br>
&nbsp;&nbsp;&nbsp;&nbsp;.bind('finishSelection', function(e) {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;var lastRow = e.currentRow;<br>
&nbsp;&nbsp;&nbsp;&nbsp;});
</code>
