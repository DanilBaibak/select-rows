select-rows
===========

jQuery plugin for rows selection in the grid. You can check an example here
http://danilbaibak.github.io/select-rows/

How to use:

<code><div>$('#contactsList').selectRows({class: 'success'});</div></code>

Markup should be done as simple table. "contactsList" - is an id of <code><div>table</div></code> or
<code><div>tbody</div></code>. You need to pass to the plugin
the class name parameter that will be added to the selected row. By default the class name is "selectedRow".

Plugin can be used as an AMD module or just be included to the page by tag <code><div>script</div></code>.
If you use it as AMD module, you'll have to pass jQuery as the dependency.

The plugin supports usage of Ctrl and Shift for rows selection.