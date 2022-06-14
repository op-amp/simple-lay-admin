/**
 * Page timeout jump to URL
 * @param {String} url URL to jump to
 * @param {Number} clock Check period (s)
 * @param {Number} halt Timeout time (s)
 */
function timeout(url, clock = 1, halt = 60) {
    var intervalID, lastTime, currentTime;
    halt *= 1000;

    top.addEventListener("blur", function () {
        lastTime = new Date().getTime();
        intervalID = setInterval(function () {
            currentTime = new Date().getTime();
            if (currentTime - lastTime > halt) {
                top.location.assign(url);
            }
        }, clock * 1000);
    });

    top.addEventListener("focus", function () {
        clearInterval(intervalID);
    });
}

layui.use(function () {
    var element = layui.element,
    util = layui.util,
    $ = layui.$;

    $(".layui-href").click(function () {
        var url = $(this).data('href');
        if ($(`.layui-body > .layui-tab > .layui-tab-title > li[lay-id="` + url + `"]`).length == 0) {
            var title = $(this).find("cite:first").text();
            if (!title) {
                title = $(this).text();
            }
            element.tabAdd('layout-tabs', {
                title: title,
                content: `<iframe src="` + url + `" frameborder="0" class="layui-iframe"></iframe>`,
                id: url
            });
            $(".layui-tab-bar").off('click transitionrun', resizeIframe);
            $(".layui-tab-bar").on('click transitionrun', resizeIframe);
        }
        element.tabChange('layout-tabs', url);
    });

    element.on('tab(layout-tabs)', function (data) {
        var currNav = $(".layui-side .layui-this a.layui-href"),
        nextUrl = $(this).attr('lay-id');
        if (currNav.data('href') != nextUrl) {
            currNav.parent().removeClass('layui-this');
            $(`.layui-side a.layui-href[data-href="` + nextUrl + `"]`).parent().addClass('layui-this');
        }
    });

    $(window).resize(function () {
        $(".layui-tab-bar").off('click transitionrun', resizeIframe);
        $(".layui-tab-bar").on('click transitionrun', resizeIframe);
        resizeIframe();
    });

    $(document).ready(function () {
        $(".layui-tab-bar").on('click transitionrun', resizeIframe);
        resizeIframe();
    });

    function resizeIframe () {
        var tabBarHeight = $(".layui-body > .layui-tab").css("height");
        $(".layui-iframe").css("height", "calc(100% - " + tabBarHeight + ")");
        $(".layui-click-blocker").css("height", "calc(100% - " + tabBarHeight + ")");
        $(".layui-click-blocker").css("top", tabBarHeight);
    }

    util.event('lay-header-button', {
        refresh: function () {
            var focusTab = $(".layui-tab-content .layui-show .layui-iframe");
            focusTab.attr('src', focusTab.attr('src'));
        },
        fullscreen: function () {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            } else {
                document.body.requestFullscreen();
            }
        }
    });

    $(document).on('fullscreenchange', function () {
        if (document.fullscreenElement) {
            $(".layui-icon-screen-full").addClass('layui-icon-screen-restore');
            $(".layui-icon-screen-full").removeClass('layui-icon-screen-full');
        } else {
            $(".layui-icon-screen-restore").addClass('layui-icon-screen-full');
            $(".layui-icon-screen-restore").removeClass('layui-icon-screen-restore');
        }
    });
});
