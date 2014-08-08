window.ondragstart = function() { return false; } 

$(function() {

    chrome.storage.sync.get(function(item){
        $('#username').val(item.username);
        $('#password').val(item.password);

        if(item.last_error == 'true'){
            $('#message').html("The last attempt failed due to invalid username/password.");
        }
    });

    function saveChanges() {
        var username = $('#username').val(),
            password = $('#password').val();

        chrome.storage.sync.set({
            'username': username,
            'password': password,
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

        return false;
    });

    $('#authenticate').on('click', function(event) {
        event.preventDefault();
        
        saveChanges();

        chrome.tabs.executeScript(null, {
            file: "jquery.js"
        });

        chrome.tabs.executeScript({
            code: 'sessionStorage.setItem("override", "yes")'
        });

        chrome.tabs.executeScript(null, {
            file: "authenticate.js"
        });
    });
});