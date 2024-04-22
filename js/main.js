//
// Copyright 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License").
// You may not use this file except in compliance with the License.
// A copy of the License is located at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// or in the "license" file accompanying this file. This file is distributed
// on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
// express or implied. See the License for the specific language governing
// permissions and limitations under the License.

$(function () {
	var DEFAULT_PATH = '__ROOT';
	var SEPARATOR = '-';
	var debounceSearchTimeout;
	var debounceSearch = function () {
		clearTimeout(debounceSearchTimeout);
		debounceSearchTimeout = setTimeout(doSearch, 300);
	};
	var doSearch = function () {
		if(!$('.use_path')[0].checked && !$('.use_value')[0].checked && !$('.use_attributes')[0].checked) {
			alert('Search error: you can only perform a search with at least one field checked.');
			return;
		}

		var $e = $('.search-box');
		var searchVals = $e.val().split(" ");

		$('.style-guide-item.search-hidden').removeClass('search-hidden').not('.nav-hidden').removeClass('hidden');

		if(!$('.use_attributes')[0].checked) {
			$('.style-guide-item').addClass('minimized');
		}

		$('.style-guide-item').each(function (i, e) {
			var $e = $(e);
			var hidden = false;
			var foundInAttribute;
			var contentBeforeValue;

			searchVals.some(function (searchVal) {
				foundInAttribute = $e.find('.style-guide-item__attributes').text().indexOf(searchVal)>-1;
				$e.find('.style-guide-item__value').each(function(){
					contentBeforeValue = window.getComputedStyle(this, ':before').content;
				});
				if(
						(!$('.use_path')[0].checked || $e.find('.style-guide-item__path').text().indexOf(searchVal) === -1)
					&&
						// (!$('.use_value')[0].checked || $e.find('.style-guide-item__value').text().indexOf(searchVal) === -1)
						(!$('.use_value')[0].checked || contentBeforeValue.indexOf(searchVal) === -1)
					&&
						(!$('.use_attributes')[0].checked || !foundInAttribute)
				) {
					hidden = true;
					return true;
				}
			});

			if(hidden) {
				$e.addClass('search-hidden hidden');
			}
			else if($('.use_attributes')[0].checked && foundInAttribute) {
				$e.removeClass('minimized');
			}
		});
	};

	$('.search-box').on('keyup',debounceSearch);
	$('.search-modifier').on('click',doSearch);

	$('.style-guide-item').on('click',function (e) {
		var $property = $(e.target).closest('.style-guide-item');
		$property.toggleClass('minimized');
	});

	$('.key').addClass('hidden');
	$('.key[data-owner=' + DEFAULT_PATH + ']').removeClass('hidden');

	var currPath = "";
	$('.key').on('click', function (e) {
		var $e = $(e.target);

		var owner = $e.attr('data-owner');
		var value = $e.attr('data-value');
		var newPath = (owner===DEFAULT_PATH ? value : owner+SEPARATOR+value );
		if(newPath===currPath) {
			newPath = newPath.split(SEPARATOR);
			newPath.pop();
			newPath = newPath.join(SEPARATOR);
			if(newPath==='') {
				newPath = DEFAULT_PATH;
			}
		}

		currPath = newPath;
		$('.key').removeClass('selected last-selected').addClass('hidden');

		var buildPath = '';
		var currPathArr = currPath.split(SEPARATOR);
		currPathArr.forEach(function (key, i) {
			$('.key[data-owner=' + (buildPath || DEFAULT_PATH) + '][data-value=' + key + ']').removeClass('hidden').addClass('selected' + (i===currPathArr.length-1 ? ' last-selected' : ''));
			buildPath += (buildPath ? SEPARATOR+key : key);
		});

		if(buildPath) {
			$('.key[data-owner=' + buildPath + ']').removeClass('hidden');
			$('.style-guide-item').addClass('nav-hidden hidden');
			if(buildPath===DEFAULT_PATH) {
				$('.style-guide-item.nav-hidden').removeClass('nav-hidden').not('.search-hidden').removeClass('hidden');
			}
			else {
				$('.style-guide-item[data-path^='+buildPath+']').removeClass('nav-hidden').not('.search-hidden').removeClass('hidden');
				// $('.style-guide-item[data-path*='+buildPath+']').removeClass('nav-hidden').not('.search-hidden').removeClass('hidden');
			}
		}
	});
});