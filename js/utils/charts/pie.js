/* global define */
define(function (require) {
	var d3 = require('d3'),
		$ = require('jquery'),
		layout = require('utils/layout');

	var plugin = {};

	plugin.render = function(id, data, config) {
		$(id).empty();
		var vis = d3.select(id)
			.append('svg:svg')
			.data([data])
			.attr('width', 200)
			.attr('height', 200)
			.style('margin-left', 'auto')
			.style('margin-right', 'auto')
			.append('svg:g')
			.attr('transform', 'translate(100,100)');

		var arc = d3.svg.arc().outerRadius(100);
		var pie = d3.layout.pie().value(function (d) {
			return d[config.value];
		});

		var arcs = vis.selectAll('g')
			.data(pie)
			.enter()
			.append('svg:g');

		arcs.append('svg:path')
			.attr('fill', function (d) {
			return config.color(d);
		}).attr('d', arc)
			.on("mouseover", function (d) {
			layout.show_tooltip(config.tooltip(d));
		})
			.on("mousemove", function () {
			layout.move_tooltip(d3.event.pageX, d3.event.pageY);
		})
			.on("mouseout", function () {
			layout.hide_tooltip();
		});

		vis.append('svg:circle')
			.attr('fill', 'none')
			.attr('stroke', '#000000')
			.attr('stroke-width', '1')
			.attr('cx', '0')
			.attr('cy', '0')
			.attr('r', '100');
	};
	
	return plugin;
});