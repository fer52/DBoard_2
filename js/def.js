
//var theComboString = new wijmo.input('#us');
onload = function () {

    /*var t = new wijmo.input.Textbox('#user', {
    });*/

    /*var dropDown = new wijmo.input.Popup('#dropDown', {
        owner: document.getElementById('btnDropDown')
      });*/

    //$("#user").wijtextbox();

    document.getElementById('loginbtn').addEventListener('click', function (event) {

        //$("#dialog-loading").wijdialog('open');

        if (document.getElementById('user').value == '') {
            return false;
        }

        if (document.getElementById('psw').value == '' || document.getElementById('psw').value == null) {
            return false;
        }

        $.ajax({
            method: "POST",
            dataType: "json",
            url: "http://evaluacionpanel.amfitnesslife.com/login.php",
            cache: false,
            data: JSON.stringify({ action: "access", us: document.getElementById('user').value, psw: document.getElementById('psw').value })
        }).done(function (msg) {

            if (msg.success) {
                window.location.href = "controlPanel.html?" + msg.ss;
            } else {
                alertPopup({ body: msg.msg });
                //showAlert(msg.msg);
                //$("#dialog-loading").wijdialog('close');
            }
            return false;
        }).fail(function () {
            //showAlert("Intentelo nuevamente");
            //$("#dialog-loading").wijdialog('close');
        });

        //event.preventDefault();
        //return false;
    });

    /*
        // show the Alert/Prompt
      document.getElementById('btnShow').addEventListener('click', function() {
        var options = getOptions();
        if (cmbType.text == 'Alert') {
          
        } else {
          propmtPopup(options, function(result) {
            alert('you entered: ' + result);
          });
        }
      });
    */
};