// login.js - scripts for login.html

layui.use(function () {
    var form = layui.form,
    $ = layui.$;

    $("body").keydown(function (event) {
        if (event.keyCode === 13 && event.target.tagName != "INPUT") {
            $("#login-btn").click();
        }
    });
});
