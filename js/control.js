var theComboString;
var listDate;
var app;
var isLoadChart = false;
var listChart = [];

var listColors = {
    backgroundColor: [
        'rgba(255, 206, 86, 0.4)',
        'rgba(54, 162, 235, 0.4)',
        'rgba(299, 33, 33, 0.4)',
        'rgba(75, 192, 192, 0.4)',
        'rgba(153, 102, 255, 0.4)',
        'rgba(255, 159, 64, 0.4)'
    ],
    borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
    ]
};

//onload = function () {

app = angular.module('evaluationApp', []);

/*appCrt.config(function ($locationProvider, $routeProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', {
            controller: 'evaluationController'
        });
})*/

app.controller('evaluationController', ['$scope', function ($scope) {
    $scope.tab = 1;

    $scope.setTab = function (newTab) {
        $scope.tab = newTab;

        if (newTab == 2) {
            listPanelGrafic();
        }
    };

    $scope.isSet = function (tabNum) {
        return $scope.tab === tabNum;
    };

    $scope.updateDate = function () {
        var d = $scope.selectedDateSel;
        if (d && d.v) {
            getInfoText(d.v);
        }
    };

}]);

getInfoUs();

/**
 * información de usuario
 */
function getInfoUs() {
    $.ajax({
        method: "POST",
        url: "http://evaluacionpanel.amfitnesslife.com/controlPanel.php",
        cache: false,
        dataType: "json",
        data: JSON.stringify({ action: "getMenu" })
    }).done(function (msg) {

        if (msg.response) {

            $("#userName").text(msg.userName);

            for (i = 0; i < msg.items.length; i++) {
                switch (msg.items[i].typeGr) {
                    case 1:
                        break;
                    default:
                        listChart.push(msg.items[i]);
                        break;
                }
            }

            for (i = 0; i < listChart.length; i++) {
                var canvas = document.createElement('canvas');
                canvas.id = 'cv' + listChart[i].uuid;
                canvas.width = 400;
                canvas.height = 120;
                $('#bodyChart').append(canvas);
                var brEs = document.createElement('br');
                $('#bodyChart').append(brEs);

            }

            listPanel();

        } else {
            //showAlert(msg.msg);
            //if (msg.returnLogin) {
            //window.location.href = "login.aspx?s=1";
            window.location.href = "index.html?s=1";
            //}
            //showAlert(msg.msg);
        }
    });
}

/**información de fechas */
function listPanel() {

    $.ajax({
        method: "POST",
        url: "http://evaluacionpanel.amfitnesslife.com/dataEval.php",
        cache: false,
        dataType: "json",
    }).done(function (msg) {
        if (msg.response) {

            listDate = []
            var listDateObj = [];
            msg.data.forEach(function (item, ind) {
                var dSel = item.value;
                item.label = dSel.substring(6, 8).toString() + "/" + dSel.substring(4, 6).toString() + "/" + dSel.substring(0, 4).toString();
                listDateObj.push({ l: item.label, v: item.value });
            });

            var sc = angular.element('#selectDate').scope();

            sc.$apply(
                function () {
                    sc.selectedDate = listDateObj;
                    sc.selectedDateSel = listDateObj[0];
                    sc.updateDate();
                }
            );


        } else {

            if (msg.returnLogin) {
                window.location.href = "index.html?s=1";
            }
            alertPopup(msg.msg);
        }
    });


}

/**información de propiedades */
function getInfoText(dateSel) {

    $.ajax({
        method: "POST",
        url: "http://evaluacionpanel.amfitnesslife.com/getInfoText.php",
        cache: false,
        data: JSON.stringify({ action: "getInfoText", dateSel: dateSel })
    }).done(function (msg) {
        msg = JSON.parse(msg);

        if (msg.response) {

            if (msg.rows) {

                //$("#propertyTemplate").tmpl(msg.rows).appendTo("#bodyEv")
                var listPropertys = []
                msg.rows.forEach(function (pr, i) {

                    var cDefault = pr.c == '' ? '#75c2ed' : pr.c;
                    var prValue = pr.value;
                    var prDesc = pr.desc;
                    var iconView;

                    if (pr.icon != '') {
                        iconView = '<span class="fas ' + pr.icon + ' fa-2x" style="float:right; color:#252830"></span>';
                    } else {
                        iconView = '';
                    }

                    listPropertys.push('<div class="cardData" style="background: linear-gradient(to bottom right, ' + cDefault + ',  ' + cDefault + ',  ' + cDefault + ', white);"><span class="cardTitle">' + prDesc + '</span><h3 style="font-size:22px"> ' + prValue + '</h3>' + iconView + '</div>');

                });

                $('#bodyEv').html(listPropertys.join(' '));
            }


        } else {

            alertPopup(msg.msg);
            if (msg.returnLogin) {
                window.location.href = "index.html?s=1";
            }
        }
    });
}

/**
 * graficas
 */
function listPanelGrafic() {
    // var table = document.getElementById('graficPanel');

    // var height = (countGr + countTxt) * 225;
    // table.style.height = height + 'px';

    // var idPanelGr = '';

    for (i = 0; i < listChart.length; i++) {
        // switch (listMenuPanel[i].typeGr) {
        //     case 1:
        //         document.getElementById('panelTxt').style.display = 'block';
        //         //$('#tableText > tbody:last-child').append('<tr><td style="text-align: center;">' + listMenuPanel[i].desc + '</td><td><input class="textData" type="text" style="width:95%"/></td></tr>');
        //         break;
        //     default:
        //         idPanelGr = 'linechart' + listMenuPanel[i].uuid;
        //         $('#graficPanel > tbody:last-child').append('<tr><td><div id="' + idPanelGr + '" class="ui-widget ui-widget-content ui-corner-all" style="width: 100%; height: 225px; background: #242529;"> </div></td></tr>');
        //         getDataGrafic(listMenuPanel[i].uuid);
        //         break;
        // }

        getDataGrafic(listChart[i].uuid, i);
    }
    //document.getElementById('divPanelGr').style.display = 'none';
}


function getDataGrafic(idProperty, idIndex) {
    $.ajax({
        method: "POST",
        url: "http://evaluacionpanel.amfitnesslife.com/dataGrafic.php",
        cache: false,
        dataType: "json",
        data: JSON.stringify({ idproperty: idProperty })
    }).done(function (msg) {
        if (msg.response) {

            var dataNew = { label: [], value: [] }
            if (msg.data.length) {
                for (iG = 0; iG < msg.data.length; iG++) {
                    var t = msg.data[iG].date;

                    //msg.data[iG].date = new Date(t.substr(0, 4), parseFloat(t.substr(4, 2)) - 1, t.substr(6, 2));
                    //msg.data[iG].date = t.substr(6, 2) + "/" + t.substr(4, 2) + "/" + t.substr(0, 4);
                    dataNew.label.push(t.substr(6, 2) + "/" + t.substr(4, 2) + "/" + t.substr(0, 4));
                    dataNew.value.push(msg.data[iG].value);
                }
            }

            generateGrafic(msg.idProperty, dataNew, msg.desc, idIndex);

        } else {

            if (msg.returnLogin) {
                window.location.href = "index.html?s=1";
            }
            alertPopup(msg.msg);
        }
    });
}

function generateGrafic(idP, data, title, ind) {

    //<canvas id="myChart" width="400" height="400"></canvas>
    //create   
    var canvas = document.getElementById('cv' + idP);
    var ctx = canvas.getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            //labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
            labels: data.label,
            datasets: [{
                label: title,
                pointRadius: 6,
                fill: true,
                data: data.value,
                backgroundColor: [listColors.backgroundColor[ind]],
                borderColor: [listColors.backgroundColor[ind]],
                borderWidth: 2
            }]
        },
        options: {
            title: {
                display: true,
                text: title,

                fontColor: '#49cce8'
            },
            legend: {
                display: false,
                position: 'left',
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}