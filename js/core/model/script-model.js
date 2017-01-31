define(function(require) {

    var Protoplast = require('protoplast'),
        fquery = require('utils/fountain/query'),
        fhelpers = require('utils/fountain/helpers'),
        fparser = require('aw-parser').parser,
        fliner = require('utils/fountain/liner'),
        converter = require('utils/converters/scriptconverter'),
        preprocessor = require('utils/fountain/preprocessor');
    
    var h = fhelpers.fq;

    var ScriptModel = Protoplast.Model.extend({

        settings: {
            inject: 'settings'
        },
        
        /**
         * Basic stats query
         */
        _basicStats: null,
        
        format: null,

        parsed: null,
        
        parsed_stats: null,
        
        script: {
            set: function (value) {
                var result = converter.to_fountain(value);
                result.value = preprocessor.process_snippets(result.value, this.settings.snippets);
                this.format = this.format || result.format;
                this._script = result.value;
                this.dispatch('script_changed');
            },
            get: function() {
                return this._script;
            }
        },
        
        parse: function () {
            this.parsed = fparser.parse(this.script, this.settings);
            this.parsed.lines = fliner.line(this.parsed.tokens, this.settings);

            if (this.settings.use_print_settings_for_stats) {
                this.parsed_stats = this.parsed;
            } else {
                var stats_config = Object.create(this.settings);
                stats_config.print_actions = true;
                stats_config.print_headers = true;
                stats_config.print_dialogues = true;
                stats_config.print_sections = false;
                stats_config.print_notes = false;
                stats_config.print_synopsis = false;
                this.parsed_stats = fparser.parse(this.script, stats_config);
                this.parsed_stats.lines = fliner.line(this.parsed_stats.tokens, stats_config);
            }
        },
        
        getBasicStats: function() {
            this._createStatsQuery(); // to refresh config-related properties
            return this._basicStats.run(this.parsed_stats.lines);
        },
        
        _createStatsQuery: function() {
            var print = this.settings.print();
            var basic = fquery(null, {
                last_page_lines: 0,
                scenes: 0,
                pages: 0,
                filled_pages: 0,
                action_lines: 0,
                dialogue_lines: 0,
                action_scenes: 0,
                dialogue_scenes: 0
            });
            basic.prepare(function (fq) {
                fq.current_scene_heading_token = null;
                fq.dialogue_in_the_scene = false;
            });
            basic.count('action_lines', h.is('action', 'scene_heading', 'shot'));
            basic.count('dialogue_lines', h.is_dialogue());
            basic.count('pages', h.is('page_break'));
            basic.enter(h.is_dialogue(), function (item, fq) {
                fq.dialogue_in_the_scene = true;
            });
            basic.enter(h.is('scene_heading'), function (item, fq) {
                if (fq.current_scene_heading_token !== item.token) {
                    fq.select().scenes++;
                    fq.current_scene_heading_token = item.token;
                    if (fq.select().scenes > 1) {
                        if (fq.dialogue_in_the_scene) {
                            fq.select().dialogue_scenes += 1;
                        } else {
                            fq.select().action_scenes += 1;
                        }
                        fq.dialogue_in_the_scene = false;
                    }
                }
            });
            basic.enter(true, function (item, fq) {
                var selector = fq.select();
                if (item.is('page_break')) {
                    selector.filled_pages += (selector.last_page_lines + 1) / print.lines_per_page;
                    selector.last_page_lines = 0;
                } else {
                    selector.last_page_lines++;
                }
            });
            basic.exit(function (item, fq) {
                // last scene
                if (fq.dialogue_in_the_scene) {
                    fq.select().dialogue_scenes++;
                } else {
                    fq.select().action_scenes++;
                }

                var all = item.action_lines + item.dialogue_lines;
                item.pages = item.pages + item.last_page_lines / print.lines_per_page;
                item.filled_pages += item.last_page_lines / print.lines_per_page;
                item.action_time = (item.action_lines / all) * item.filled_pages;
                item.dialogue_time = (item.dialogue_lines / all) * item.filled_pages;
            });
            basic.end(function (result) {
                if (result.length === 0) {
                    result.push({
                        pages: 0.0,
                        filled_pages: 0.0,
                        scenes: 0,
                        action_time: 0.0,
                        dialogue_time: 0.0,
                        dialogue_lines: 0,
                        characters: [],
                        locations: []
                    });
                }
            });
            
            this._basicStats = basic;
        }
        
    });

    return ScriptModel;
});