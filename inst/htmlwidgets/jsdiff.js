HTMLWidgets.widget({

  name: 'jsdiff',

  type: 'output',

  initialize: function(el, width, height) {
    return {};
  },

  renderValue: function(el, x, instance) {

    var result = $('#' + el.id + ' code');
    result.addClass(x.language);

    function changed() {
      var diff = JsDiff['diff' + x.diffType](x.oldStr, x.newStr);
    	var fragment = document.createDocumentFragment();
    	for (var i=0; i < diff.length; i++) {
    		if (diff[i].added && diff[i + 1] && diff[i + 1].removed) {
    			var swap = diff[i];
    			diff[i] = diff[i + 1];
    			diff[i + 1] = swap;
    		}
    		var node;
    		if (diff[i].removed) {
    			node = document.createElement('del');
    			node.appendChild(document.createTextNode(diff[i].value));
    		} else if (diff[i].added) {
    			node = document.createElement('ins');
    			node.appendChild(document.createTextNode(diff[i].value));
    		} else {
      		node = document.createElement('span');
    			node.appendChild(document.createTextNode(diff[i].value));
    		}
    		fragment.appendChild(node);
    	}
    	result.text('');
    	result.append(fragment);

      result.each(function(i, block) {
        hljs.highlightBlock(block);
      });
    }

    var diffType = $('#' + el.id + ' input:radio');
    diffType.change(
      function(){
          x.diffType = this.value;
          changed();
      }
    );
    diffType.filter('[value="' + x.diffType + '"]').attr('checked', true);
    changed();
  },

  resize: function(el, width, height, instance) {

  }

});
