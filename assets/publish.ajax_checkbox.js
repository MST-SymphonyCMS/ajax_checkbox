/**
 * Publish Ajax Checkbox script
 * 
 * @author: Deux Huit Huit
 * 
 */
(function ($) {
	
	'use strict';
	
	var CSS_CLASS = 'ajax-checkbox';
	
	var click = function (e) {
		var t = $(this);
		t.closest('tr').removeClass('selected');
		
		e.stopPropagation();
	};
	
	var checkChanged = function (e) {
		var t = $(this);
		var td = t.closest('td');
		var tr = t.closest('tr');
		var input = td.find('input.ajax-checkbox');
		var loader = td.find('div.ajax-checkbox');
		var id = /id-([\d]+)/g.exec(tr.attr('id'))[1];
		var field_id = /field-([\d]+)/g.exec(td.attr('class'))[1];
		var isChecked = t.is(':checked');
		
		var postData = {
			'with-selected': 'toggle-'+ field_id +'-' + (isChecked ? 'yes' : 'no'),
			'action[apply]': 1
		};
		postData['items['+ id +']']  = 'on';
		
		e.stopPropagation();
		
		input.hide();
		loader.show();
		
		$.ajax($('#contents>form').attr('action'), {
			type: 'POST',
			dataType: 'html',
			data: postData
		}).error(function (e) {
			alert('Error. Try again');
		}).always(function (e) {
			input.show();
			loader.hide();
		});
		
		return false;
	};
	
	var createUI = function (currentValue) {
		var loader = $('<div />').addClass(CSS_CLASS);
		var input = $('<input />').attr('type', 'checkbox').addClass(CSS_CLASS);
		
		if (currentValue === 'Yes') {
			input.attr('checked', 'checked');
		}
		
		input.change(checkChanged).click(click);
		
		return input.add(loader);
	};
	
	var initOne = function (index, elem) {
		var t = $(this);
		var currentValue = t.text().replace(/\s/,'');
		var ui = createUI(currentValue);
		t.data('value', currentValue).empty().append(ui);
	};
	
	var init = function () {
		$('#contents table td.field-checkbox').each(initOne);
	};
	
	$(init);
	
})(jQuery);