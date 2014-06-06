var url = window.location.href;
parts = url.split("/");

if(parts[2].match(/192\.168\..*/)){

if($('#ft_un').size() > 0){
	// var message = $('body').find('form').find('h2').html();

	// if(message.match('failed')){
	// 	chrome.storage.sync.set({
	// 	    'last_error': true;
	// 	}, function(){});

	// }else{
	// 	chrome.storage.sync.set({
	// 	    'last_error': false;
	// 	}, function(){});
	// }

	chrome.storage.sync.get(function(item){
		$('#ft_un').val(item.username);
		$('#ft_pd').attr('type','text');
		$('#ft_pd').val(item.password);

		$('#ft_un').parents('form').submit();
	});
}

	
}else{
	alert("Make sure that the correct page is open");
}