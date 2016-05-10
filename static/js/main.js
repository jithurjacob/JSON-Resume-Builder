function reset() {
    $.getJSON("json/resume.json", function(e) { builder.setFormValues(e) })

}

function clear() {

    builder.setFormValues({})

}

function enableTSEplugin() {
    var e = $("#preview"),
        n = $(".tse-scrollable");
    n.TrackpadScrollEmulator(), n.on("startDrag", function() {

        e.addClass("scroll")
    }), n.on("endDrag", function() {
        e.removeClass("scroll")
    })
}

function enableCSStransitions() {

    setTimeout(function() { $("body").removeClass("preload") }, 200)

}

var builder;
jQuery(document).ready(function(e) {
    function n(n) {
        var t = "flat",
            i = window.location.hash;
        "" != i && (t = i.replace("#", "")), e.ajax({
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify({ resume: n }, null, "  "),
                url: "/resume",//"https://themes.jsonresume.org/" + t,
                success: function(e) {
                    a.contents().find("body").html(e), o.removeClass("loading")

                }
            }),
            function() {
                e("#theme-current").html(t);
                var n = e("#themes-list .item[href='#" + t + "']").addClass("active");
                n.siblings().removeClass("active")
            }()
    }

    var t = e("#form");
    builder = new Builder(t), e.getJSON("json/schema.json", function(e) {
        builder.init(e), reset()
    });
    reset();
    var o = e("#preview"),
        a = e("#iframe");
    ! function() {
        var e = null;
        t.on("change", function() {
            clearTimeout(e), o.addClass("loading"), e = setTimeout(function() {
                var e = builder.getFormValues();
                t.data("resume", e), n(e)
            }, 200)
        })
    }(), enableTSEplugin(), enableCSStransitions(), e("#export").on("click", function() {
        var e = t.data("resume");
        download(JSON.stringify(e, null, "  "), "resume.json", "text/plain")
    }),e("#save").on("click", function() {
        var p = t.data("resume");
        var q = $("#fileName").val();
        //console.log(JSON.stringify(e, null, "  "));
        e.ajax({
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify({ resume: p }, null, "  "),
                url: "/saveResume/"+q,//"https://themes.jsonresume.org/" + t,
                success: function(data) {
                    //a.contents().find("body").html(e), o.removeClass("loading")
alert(data);
                }
            });

    }), e("#export").tooltip({ container: "body" }), e("#reset").on("click", function() {
        confirm("Are you sure?") && reset()
    }), e("#clear").on("click", function() {
        confirm("Are you sure?") && clear()
    });


    // var i = e("#sidebar .tabs a");
    // i.on("click", function() {
    //         var n = e(this);
    //         n.addClass("active").siblings().removeClass("active")
    //     }),
    //     function() {
    //         var n = e("#themes-list"),
    //             o = n.find(".item").remove();
    //         e.getJSON("https://themes.jsonresume.org/themes.json", function(e) {
    //             var t = e.themes;
    //             if (t)
    //                 for (var a in t) var i = o.clone().attr("href", "#" + a).find(".name").html(a).end().find(".version").html(t[a].versions.shift()).end().appendTo(n)
    //         }), n.on("click", ".item", function() { t.trigger("change") })
    //     }();

    /*    
    var r = e("#json-editor");
    ! function() {
        var e = null;
        r.on("keyup", function() {
            clearTimeout(e), e = setTimeout(function() {
                try {
                    var e = r.val();
                    builder.setFormValues(JSON.parse(e))
                } catch (n) {}
            }, 200)
        })
    }(), t.on("change", function() {
        var e = builder.getFormValuesAsJSON();
        r.val() !== e && r.val(e)
    }), e("#sidebar .view").on("click", "a", function(n) {
        n.preventDefault();
        var t = e(this),
            o = t.data("type");
        t.addClass("active").siblings().removeClass("active"), r.toggleClass("show", "json" == o)
    })*/
});
