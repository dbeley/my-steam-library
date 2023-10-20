$(document).ready(function() {
    //Only needed for the filename of export files.
    //Normally set in the title tag of your page.
    document.title='My Steam Library';
    var numbersType = $.fn.dataTable.absoluteOrderNumber( [
        { value: 'N/A', position: 'bottom' }
    ] );

    $.fn.dataTable.render.formatDuration = function () {
        return function ( data, type, row ) {
            if ( type === 'display' ) {
                var hours = Math.floor(data / 60);
                var minutes = Math.ceil(data % 60/60*10);
                return hours + ',' + minutes + " hours"
                }
            return data;
            }
    };
    $.extend( $.fn.dataTable.ext.type.order, {
      "achievements-custom-sort-desc": function (val_1, val_2) {
        var regex = /(\d+(\.\d+)?)/g;
        var match1 = val_1.match(regex);
        var match2 = val_2.match(regex);

        if (match1 && match2) {
          var percentage1 = parseInt(match1[match1.length - 1]);
          var total1 = parseInt(match1[match1.length - 2]);
          var percentage2 = parseInt(match2[match2.length - 1]);
          var total2 = parseInt(match2[match2.length - 2]);

          if (percentage1 > percentage2) {
            return 1;
          } else if (percentage1 < percentage2) {
            return -1;
          }
          if (total1 > total2) {
            return 1;
          } else if (total1 < total2) {
            return -1;
          }
        }

        return 0;
      }
    } );


    $.extend( $.fn.dataTable.ext.type.order, {
      "achievements-custom-sort-asc": function (val_1, val_2) {
        var regex = /(\d+(\.\d+)?)/g;
        var match1 = val_1.match(regex);
        var match2 = val_2.match(regex);

        if (match1 && match2) {
          var percentage1 = parseInt(match1[match1.length - 1]);
          var total1 = parseInt(match1[match1.length - 2]);
          var percentage2 = parseInt(match2[match2.length - 1]);
          var total2 = parseInt(match2[match2.length - 2]);

          if (percentage1 < percentage2) {
            return 1;
          } else if (percentage1 > percentage2) {
            return -1;
          }
          if (total1 < total2) {
            return 1;
          } else if (total1 > total2) {
            return -1;
          }
        }

        return 0;
      }
    } );

    // DataTable initialisation
    $('#insights').DataTable(
        {
            "dom": 'BlfrtipQ',
            "buttons": [
                'copy',
                'csv',
                'excel',
                'print',
                'colvis'
            ],
            "paging": true,
            "autoWidth": true,
            "aLengthMenu": [[10, 25, 50, 100, 1000, -1], [10, 25, 50, 100, 1000, "All"]],
            "pageLength": 25,
            "scrollToTop": true,
            "order": [[6, 'desc']],
            "columnDefs": [
                { type: "achievements-custom-sort", targets: [9] },
                { type: numbersType, targets: [1] },
                { targets: [2], render: DataTable.render.number() },
                { targets: [4, 6], render: DataTable.render.formatDuration() },
                { width: "25%", targets: 0 }
            ],
            "responsive": true
        }
    );
});
