
//var theComboString = new wijmo.input('#us');
onload = function () {

    /*var t = new wijmo.input.Textbox('#user', {
    });*/

    /*var dropDown = new wijmo.input.Popup('#dropDown', {
        owner: document.getElementById('btnDropDown')
      });*/

    //$("#user").wijtextbox();
    $("#user").keyup(function (event) {
        if (event.keyCode === 13) {
            $("#loginbtn").click();
        }
    });

    $("#psw").keyup(function (event) {
        if (event.keyCode === 13) {
            $("#loginbtn").click();
        }
    });

    document.getElementById('forgotpw').addEventListener('click', function (event) {

        if (document.getElementById('user').value == '') {
            return false;
        }

        $.ajax({
            method: "POST",
            url: "http://evaluacionpanel.amfitnesslife.com/renew.php",
            cache: false,
            data: JSON.stringify({
                action: "saveUser",
                user: document.getElementById('user').value
            })
        }).done(function (msg) {
            var data = JSON.parse(msg);
            if (data.response) {
                alertPopup({ body: data.msg });
            } else {
                alertPopup({ body: data.msg });
            }
        });
        return false;
    });

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
                window.location.href = msg.path + "?" + msg.ss;
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
        return false;
    });

    document.getElementById('forgotpw').addEventListener('click', function (event) {

        return false;
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