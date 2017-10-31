window.ondragstart = function() { return false; }

$(function() {

    chrome.storage.sync.get(function(item) {
        $('#nitc_username').val(item.username);
        $('#nitc_password').val(item.password);

        if (item.last_error == 'true') {
            $('#nitc_message').html("The last attempt failed, probably due to an invalid username/password.");
        }
    });

    function saveChanges() {
        var username = $('#nitc_username').val(),
            password = $('#nitc_password').val();

        chrome.storage.sync.set({
            'username': username,
            'password': password,
        }, function() {
            $('#nitc_submit').removeClass('submit').addClass('success');
            $('#nitc_submit').html('SAVED');

            setTimeout(function() {
                $('#nitc_submit').removeClass('success').addClass('submit');
                $('#nitc_submit').html('Save Credentials');
            }, 1000);
        });
    }


    $('#nitc_submit').on('click', function(event) {
        event.preventDefault();
        saveChanges();

        return false;
    });

    $('#nitc_authenticate').on('click', function(event) {
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
