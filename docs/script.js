$(document).ready(function() {
	//Only needed for the filename of export files.
	//Normally set in the title tag of your page.
	document.title='my-steam-library';
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
        	// Search, order and type can use the original data
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
			"pageLength": 25,
			"order": [[4, 'desc']],
    		"columnDefs": [
      	  	  { type: numbersType, targets: [1] },
      	  	  // { targets: [2], render: DataTable.render.datetime('D MMM. YYYY', 'YYYY-MM-DD', 'en') },
      	  	  { targets: [4], render: DataTable.render.formatDuration() },
    		],
    		"responsive": true
		}
	);
});
