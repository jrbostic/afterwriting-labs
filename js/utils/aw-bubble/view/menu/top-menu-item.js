define(function(require) {

    var  $ = require('jquery'),
        Protoplast = require('protoplast'),
        TopMenuItemPresenter = require('aw-bubble/presenter/menu/top-menu-item-presenter');

    var TopMenuItem = Protoplast.Component.extend({

        $meta: {
            presenter: TopMenuItemPresenter
        },

        html: '<img class="tool" />',

        section: null,

        _selected: false,

        selected: {
            set: function(value) {
                this._selected = value;
                if (value) {
                    this.$root.addClass('active');
                }
                else {
                    this.$root.removeClass('active');
                }
            },
            get: function() {
                return this._selected
            }
        },

        $create: function() {
            this.$root = $(this.root);

            this.$root.hover(function() {
                $(this).addClass('tool-hover');
            }, function() {
                $(this).removeClass('tool-hover');
            });

            this.root.onclick = this.dispatch.bind(this, 'clicked', this._selected);
        },

        renderIcon: {
            bindWith: 'section.smallIcon',
            value: function() {
                this.root.setAttribute('src', this.section.smallIcon);
            }
        },

        render: {
            bindWith: 'section.name',
            value: function() {
                this.root.className = 'tool ' + this.section.name;
            }
        }

    });

    return TopMenuItem;
});