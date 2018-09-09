

// alert popup
function alertPopup(options, callback) {

    $("#warningInfo").html(options.body);

    $("#dialog-message").dialog({
        modal: true,
        buttons: {
            Ok: function () {
                $(this).dialog("close");
            }
        }
    });

    /*var dialog = createDialog(options);
    var popup = new wijmo.input.Popup(dialog);
    popup.show(true, function (sender) {
        if (callback) {
            callback(sender.dialogResult);
        }
    });*/
}

// prompt popup
function propmtPopup(text, options, callback) {
    var dialog = createDialog(options, true);
    var popup = new wijmo.input.Popup(dialog);
    popup.show(true, function (sender) {
        if (callback) {
            var result = sender.dialogResult.indexOf('ok') > -1
                ? dialog.querySelector('input').value
                : null;
            callback(result);
        }
    });
}

// create dialog to use as an alert or prompt
function createDialog(options, input) {

    // fill out default options
    options.ok = options.ok || 'OK';
    //options.cancel = options.cancel || 'Cancel';
    options.clsDialog = options.clsDialog || 'wj-dialog';
    options.clsHeader = options.clsHeader || 'wj-dialog-header';
    options.clsBody = options.clsBody || 'wj-dialog-body';
    options.clsInput = options.clsInput || 'wj-control';
    options.clsFooter = options.clsFooter || 'wj-dialog-footer';
    options.clsOK = options.clsOK || 'wj-btn';
    options.clsCancel = options.clsCancel || 'wj-btn';

    // create dialog
    var template = '<div class="{clsDialog}" role="dialog">' +
        '<div class="{clsHeader}">' +
        '<h4>{header}</h4>' +
        '</div>' +
        '<div class="{clsBody}">' +
        '<p>{body}</p>' +
        (input ? '<input class="{clsInput}">' : '') +
        '</div>' +
        '<div class="{clsFooter}">' +
        '<button class="{clsOK} wj-hide-ok">{ok}</button>' +
        (options.cancel ? '<button class="{clsCancel} wj-hide">{cancel}</button>' : '') +
        '</div>' +
        '</div>';
    var dialog = wijmo.createElement(wijmo.format(template, options));

    // honor 'small' option
    dialog.style.width = options.small ? '20%' : '40%';

    // dialog is ready
    return dialog;
}

  /*

  // create form
  var cmbType = new wijmo.input.ComboBox('#type', {
  	textChanged: function(s, e) {
    	document.getElementById('btnShow').textContent = 'Show ' + s.text;
    },
  	itemsSource: 'Alert,Prompt'.split(',') 
	});
  var header = new wijmo.input.ComboBox('#header', { text: 'Header' });
  var body = new wijmo.input.ComboBox('#body', { text: 'Dialog message.' });
  var defVal = new wijmo.input.ComboBox('#defVal', { text: 'Default value' });
  var ok = new wijmo.input.ComboBox('#ok', { text: 'OK' });
  var cancel = new wijmo.input.ComboBox('#cancel', { text: 'Cancel' });
  var clsDialog = new wijmo.input.ComboBox('#clsDialog', { text: 'modal-dialog' });
  var clsHeader = new wijmo.input.ComboBox('#clsHeader', { text: 'modal-header' });
  var clsBody = new wijmo.input.ComboBox('#clsBody', { text: 'modal-body' });
  var clsInput = new wijmo.input.ComboBox('#clsInput', { text: 'form-control' });
  var clsFooter = new wijmo.input.ComboBox('#clsFooter', { text: 'modal-footer' });
  var clsOK = new wijmo.input.ComboBox('#clsOK', { text: 'btn btn-primary' });
  var clsCancel = new wijmo.input.ComboBox('#clsCancel', { text: 'btn btn-default' });
  function getChecked(id) {
    return document.getElementById(id).checked;
  }

	// load options into an object
  function getOptions() {
    return {
      header: header.text,
      body: body.text,
      defVal: defVal.text,
      small: getChecked('small'),
      ok: ok.text,
      cancel: cancel.text,
      clsDialog: clsDialog.text,
      clsHeader: clsHeader.text,
      clsBody: clsBody.text,
      clsInput: clsInput.text,
      clsFooter: clsFooter.text,
      clsOK: clsOK.text,
      clsCancel: clsCancel.text,
    }
  }*/