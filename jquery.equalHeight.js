/**
 * equalHeight - jQuery plugin for setting equal height of selected elements
 *
 * Copyright (c) 2014 Jacek Smolak
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Version: 1.0
 */
(function($) {

    $.fn.equalHeight = function(options) {
        var settings = $.extend({
            onWindowResize: true,
            minWindowWidth: 0,
            maxWindowWidth: 99999
        }, options);

        checkSettings();

        var elements = this;
        var maxHeight = 0;
        var initialStyles = [];
        var windowWidth = $(window).innerWidth();

        getMaxHeight();

        if (settings.onWindowResize) {
            /**
             * This is needed, since jQuery adds a attrib style with CSS height
             * style when item.height(val) is being used.
             * If window resize is being done, this height style must be
             * removed, but if there are predefined styles, you do not wan't them
             * to be removed.
             */
            saveInitialStyles();

            if (windowWidthMatches(windowWidth)) {
                alignItemsHeight();
            }

            $(window).on('resize', function() {
                indowWidth = $(window).innerWidth();
                maxHeight = 0;

                setInitialStyles();
                getMaxHeight();

                if (windowWidthMatches(windowWidth)) {
                    alignItemsHeight();
                }
            });
        }
        else {
            if (windowWidthMatches(windowWidth)) {
                alignItemsHeight();
            }
        }

        return elements;

        /**
         * Checks if window width matches min and max size.
         *
         * @param {Number} windowWidth
         * @returns {Boolean}
         */
        function windowWidthMatches(windowWidth) {
            return windowWidth >= settings.minWindowWidth && windowWidth <= settings.maxWindowWidth;
        }

        /**
         * Checks settings. If something is wrong, throws error message
         * with explanation what is wrong.
         *
         * @returns void
         * @throws Error message
         */
        function checkSettings() {
            checkType(settings.minWindowWidth, 'minWindowWidth', 'number');
            checkType(settings.maxWindowWidth, 'maxWindowWidth', 'number');
            checkType(settings.onWindowResize, 'onWindowResize', 'boolean');

            //If nothing has happened yet check min max window widths
            if (settings.minWindowWidth > settings.maxWindowWidth) {
                throw 'minWindowWidth is greater than maxWindowWidth';
            }
        }

        /**
         * Performs a type check on a variable.
         *
         * @param {mixed} variable Variable this is being checked
         * @param {String} varName Variable name
         * @param {String} expectedType String representation of expected variable type, e.g. 'number' or 'boolean'
         * @returns void
         * @throws Error message
         */
        function checkType(variable, varName, expectedType) {
            if (typeof (variable) !== expectedType) {
                throw varName + ' must be of \'' + expectedType + '\' type, \'' + typeof (variable) + '\' detected, value: \'' + variable + '\'.';
            }
        }

        /**
         * Checks all items in stack and sets max height in 'height' varaible.
         *
         * @returns void
         */
        function getMaxHeight() {
            elements.each(function() {
                var itemsHeight = $(this).innerHeight();
                if (itemsHeight > maxHeight) {
                    maxHeight = itemsHeight;
                }
            });
        }

        /**
         * Sets equal height to all items in stack.
         *
         * @returns void
         */
        function alignItemsHeight() {
            elements.each(function() {
                $(this).innerHeight(maxHeight);
            });
        }

        /**
         * Saves initial style attribute.
         *
         * @returns void
         */
        function saveInitialStyles() {
            elements.each(function(index) {
                initialStyles[index] = !!$(this).attr('style') ? $(this).attr('style') : '';
            });
        }

        /**
         * Sets initial styles to all items in stack.
         *
         * @returns void
         */
        function setInitialStyles() {
            elements.each(function(index) {
                $(this).removeAttr('style').attr('style', initialStyles[index]);
            });
        }
    };

}(jQuery));