var url = window.location.href;
var parts = url.split("/");

console.log(parts);

if (parts[2].match(/192\.168\..*/)) {
    if ($('#ft_un').size() > 0) {
        var message = $('body').find('form').find('h2').html();

        if (message.match('failed')) {

        	// chrome.storage.sync.get(function(item) {
        	//     count = parseInt(item.count);
        	// });

            // chrome.storage.sync.set({
            //     'last_error': 'true',
            //     'count': count+1,
            // }, function() {
            // 	console.log('Wrong Password.');
            // });            
        }else if (message.match('authentication')){
            alert('yoooo');
        	console.log('No error.');
        }

        chrome.storage.sync.get(function(item) {
            $('#ft_un').val(item.username);
            $('#ft_pd').attr('type', 'text');
            $('#ft_pd').val(item.password);
            $('#ft_un').parents('form').submit();
        });

    }else{
        var message = $('body').find('form').find('h2').html();

        if (message.match('authentication session active')){
            
            window.open($('body').find('form').find('h2').find('a').prop('href'));

            console.log('No error.');
        }


    	chrome.storage.sync.set({
    	    'last_error': 'false',
    	}, function() {
    		console.log('Authenticated.');
    	});    
    }
}