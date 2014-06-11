$(function() {
    if ($('body .oc .ic h1').size() > 0 && $('body .oc .ic h1').html().match('Campus Networking Centre')) {
        if ($('#ft_un').size() > 0) {
            var message = $('body').find('form').find('h2').html();
            var header_message = $('body .oc .ic h1').html();

            if (message.match('failed') || header_message.match('Authentication Failed')) {

                if (sessionStorage.getItem("fail") >= 1) {

                    chrome.storage.sync.get(function(item) {
                        $('#ft_un').val(item.username);
                        $('#ft_pd').val(item.password);
                    });

                    if (sessionStorage.getItem("override")) {
                        if (sessionStorage.getItem("override") != "yes") {
                            return false;
                        }
                    } else {
                        return false;
                    }

                    sessionStorage.setItem("override", "no");
                }

                var fail = sessionStorage.getItem("fail");

                if (isNaN(parseInt(fail)))
                    fail = 0;
                else
                    fail = parseInt(fail);

                fail++;

                sessionStorage.setItem("fail", fail);

                chrome.storage.sync.set({
                    'last_error': 'true'
                }, function() {
                    //Wrong Password.
                });
            }

            chrome.storage.sync.get(function(item) {
                $('#ft_un').val(item.username);
                $('#ft_pd').val(item.password);

                if (item.username != '' && item.password != '')
                    $('#ft_un').parents('form').submit();
            });

        }
    } else if ($('body .oc .ic h1').size() > 0 && $('body .oc .ic h1').html().match('Authentication Keepalive')) {
        var message = $('body').find('form').find('h2').html();

        if (message.match('authentication session active')) {

            chrome.storage.sync.set({
                'last_error': 'false'
            }, function() {
                //Authenticated
            });

            sessionStorage.setItem("fail", 0);

            if (sessionStorage.getItem("new_window") == "open")
                return false;

            window.open($('body').find('form').find('h2').find('a').prop('href'));
            sessionStorage.setItem("new_window", "open");
        }
    } else {
        if (sessionStorage.getItem("override") == "yes") {
            sessionStorage.setItem("override", "no");

            if ($('#ft_un').size() == 0) {
                alert("Please open the authentication page before you use the Authenticate button.");
                return false;
            } else {
                chrome.storage.sync.get(function(item) {
                    $('#ft_un').val(item.username);
                    $('#ft_pd').val(item.password);

                    if (item.username != '' && item.password != '')
                        $('#ft_un').parents('form').submit();
                });
            }
        }
    }
});