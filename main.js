$(function() {

    chrome.storage.sync.get(function(item){
        $('#username').val(item.username);
        $('#password').val(item.password);
    	// $('#testarea').html(item.last_error);
    });

    function saveChanges() {
        var username = $('#username').val(),
            password = $('#password').val();

        chrome.storage.sync.set({
            'username': username,
            'password': password
        }, function() {
            $('#submit').removeClass('submit').addClass('success');
            $('#submit').html('SAVED');

            setTimeout(function(){
                $('#submit').removeClass('success').addClass('submit');
                $('#submit').html('Save Credentials');
            },1000);
        });
    }


    $('#submit').on('click', function(event) {
        event.preventDefault();
        saveChanges();

    });

    $('#authenticate').on('click', function(event) {
        event.preventDefault();

        chrome.tabs.executeScript(null, {file: "jquery.js"});
        chrome.tabs.executeScript(null, {file: "authenticate.js"});
    });
});