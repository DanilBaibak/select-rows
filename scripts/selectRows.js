(function (factory) {
    if (typeof define === 'function' && define.amd) {
        /**
         * AMD is used - Register as an anonymous module.
         */
        define(['jquery'], factory);
    } else {
        /**
         * AMD is not used - Attempt to fetch dependencies from scope.
         */
        if (!jQuery) {
            throw 'Select-rows requires jQuery to be loaded first';
        } else {
            factory(jQuery);
        }
    }
}

(function ($) {
    var defaultOptions = {class: 'selectedRow'},
        options,
        pluginArea,
        selectedRows,
        currentRow,
        allRows,
        mouseY = 0,
        newRow;

    $.fn.selectRows = function (inputOptions) {
        //merge options
        options = $.extend({}, defaultOptions, options, inputOptions);
        pluginArea = $(this);
        //select all rows
        allRows = document.querySelector(this.selector).getElementsByTagName('tr');

        /**
         * Finish selecting rows, when user released the button
         */
        pluginArea.delegate('tr', 'mouseup', function (e) {
            pluginArea.undelegate('tr', 'mouseover');
            pluginArea.unbind('mouseleave');
            pluginArea.undelegate('tr', 'mouseout');

            /**
             * Trigger event, that selection is started
             */
            if (!e.ctrlKey && !e.shiftKey) {
                pluginArea.trigger({type: 'finishSelection', currentRow: this});
            }

        });

        pluginArea.delegate('tr', 'mousedown', function (e) {
            e.preventDefault();
            currentRow = this;

            /**
             * Trigger event, that selection is started
             */
            pluginArea.trigger({type: 'startSelection', currentRow: currentRow});


            //Get the rows that were selected before
            selectedRows = $('.' + options.class);

            /**
             * Remove rows that were selected before
             * if key "Ctrl" and "Shift" were not pushed
             */
            if (selectedRows.length > 0 && !e.ctrlKey && !e.shiftKey) {
                pluginArea.find('.' + options.class).each(function () {
                    $(this).removeClass(options.class)
                });
            }

            /**
             * Select several of the rows with help of the button 'shift'
             */
            if (e.shiftKey) {
                //Check the direction of selection
                if (
                    $.inArray(document.querySelector('.' + options.class), allRows) > $.inArray(currentRow, allRows)
                ) {
                    $(currentRow).nextUntil(selectedRows[0]).addClass(options.class);
                } else {
                    $(selectedRows[0]).nextUntil(currentRow).addClass(options.class);
                }
            }

            /**
             * Finish selecting contacts, when cursor moved beyond area for selecting
             */
            pluginArea.on('mouseleave', function () {
                pluginArea.undelegate('tr', 'mouseover');

                /**
                 * Trigger event, that selection is started
                 */
                pluginArea.trigger({type: 'finishSelection', currentRow: currentRow[0]});

                pluginArea.unbind('mouseleave');
            });

            /**
             * if Ctrl is pressed toggle сlass, else add class
             */
            if (e.ctrlKey) {
                $(currentRow).toggleClass(options.class);
            } else {
                $(currentRow).addClass(options.class);
            }

            /**
             * Check moving of the cursor
             */
            pluginArea.delegate('tr', 'mouseover', function (e) {
                newRow = $(this);
                setTimeout(function () {
                    //check whether was pressed ctrl or shift
                    if (!e.ctrlKey && !e.shiftKey) {
                        /**
                         * Toggle class for selected rows
                         */
                        if (newRow.hasClass(options.class)) {
                            //check direction
                            if ($(currentRow) !== newRow) {
                                if (e.pageY > mouseY) {
                                    newRow.prev().removeClass(options.class);
                                } else {
                                    newRow.next().removeClass(options.class);
                                }
                            }
                        } else {
                            newRow.addClass(options.class);
                        }
                    }

                    /**
                     * Set new coordinate and current row
                     */
                    mouseY = e.pageY;
                    currentRow = newRow;
                }, 1);
            });
        });
        return this;
    };
}));
