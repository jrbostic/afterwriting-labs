define(function(require) {

    var Protoplast = require('protoplast'),
        pdfmaker = require('utils/pdfmaker'),
        textstats = require('utils/textstats');

    var PdfController = Protoplast.Object.extend({

        settings: {
            inject: 'settings'
        },

        scriptModel: {
            inject: 'script'
        },

        fontFixEnabled: false,

        getPdf: function(callback, filePath) {
            pdfmaker.get_pdf(
                {
                    callback: callback,
                    filepath: filePath,
                    print: this.settings.print(),
                    config: this.settings,
                    parsed: this.scriptModel.parsed,
                    hooks: {before_script: this._fontFix}
                });
        },

        _fontFix: function(doc) {
            if (this.fontFixEnabled) {
                var unicode_sample = textstats.get_characters(this.scriptModel.script);
                unicode_sample.forEach(function(character) {
                    doc.format_text(character, 0, 0, {color: '#eeeeee'});
                })
            }
        }

    });

    return PdfController;
});