$(document).ready(function (){
    
    $('#createForm').on('click', function(e){
        console.log('Create form button pressed');
        console.log($('#email').val());

        if(!e.isDefaultPrevented()){
            e.preventDefault();
            $.ajax({
                method: 'POST',
                url: '/auth/create',
                contentType: 'application/json',
                data: JSON.stringify({
                    email: $('#email').val(),
                    password: $('#password').val()
                }),
            })
            .done(function(msg){
                window.location = '/';
            })
            .fail(function(msg){
                alert(`Fail ${msg}`);
            });
        }
        e.preventDefault();
    });

    $('#loginForm').on('click', function(e){
        console.log('login form button pressed');
        if(!e.isDefaultPrevented()){
            e.preventDefault();
            $.ajax({
                method: 'POST',
                url: '/auth/login',
                contentType: 'application/json',
                data: JSON.stringify({
                    email: $('#email').val(),
                    password: $('#password').val()
                }),
                success: function(res){
                    console.log('Login sucess!');
                    sessionStorage.setItem('jwtToken', res.jwtToken);
                    // fetch('/secure', {
                    //     method: 'GET',
                    //     headers: {
                    //       'Authorization': sessionStorage.getItem('jwtToken') 
                    //     }
                    //   })
                    // .then(res => res.json())
                    // .then(data => { console.log(data) })
                    // .catch(err => { console.log(err) })
                },
            })
            .fail(function(msg){
                alert(`Fail ${msg}`);
            });
        }
        e.preventDefault();
    });

    $('#clearCookie').on('click', function(e){
        console.log(document.cookie);
        deleteAllCookies();
        console.log(document.cookie);
    });

    $('#home').on('click', function(e){
        window.location = '/';
    });
})
