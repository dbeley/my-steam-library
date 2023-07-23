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
			"order": [[4, 'desc']],
    		"columnDefs": [
      	  	  { type: numbersType, targets: [1] },
      	  	  { targets: [2], render: DataTable.render.number() },
      	  	  { targets: [4, 6], render: DataTable.render.formatDuration() },
    		],
    		"responsive": true
		}
	);
});
