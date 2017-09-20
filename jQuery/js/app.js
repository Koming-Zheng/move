/**
 * Created by Koming on 2017/8/13.
 */
var getRandomColor = function () {

    return '#' +
        (function (color) {
            return (color += '0123456789abcdef'[Math.floor(Math.random() * 16)])
            && (color.length == 6) ? color : arguments.callee(color);
        })('');
}

$('.loader').hide()


resizeView()

function resizeView() {
    var width = $(window).width(), height = $(window).height(), portrait = height > width, landscape = width > height,
        scale

    if (portrait) {
        scale = width / 750
    } else if (landscape) {
        scale = height / 750
    }
    //
    $('.scroll').width(1334 * $('.scene').length).css({transform: 'scale(' + scale + ')', transformOrigin: '0 50% 0'})
    if (portrait) {
        var position = (height - width) / 2
        $('#main').css({
            width: height,
            height: width,
            transform: 'rotate(90deg) translate(' + position + 'px,' + position + 'px)'
        })
        $('.loader').css({
            width: height,
            height: width,
            transform: 'rotate(90deg) translate(' + position + 'px,' + position + 'px)'
        })
    } else if (landscape) {
        $('#main').css({
            width: width,
            height: height,
            transform: ''
        })
        $('.loader').css({
            width: width,
            height: height,
            transform: ''
        })
    }
}

$(window).on('resize', function () {
    resizeView()
})

$('.scene').each(function () {
    $(this).css({backgroundColor: getRandomColor()})
})

var cwScrollLeft, $scroll = $('.wrap')
$('.ctrl-wrap')
    .hammer({recognizers: [[Hammer.Pan]]})
    .on({
        panstart: function (e) {
            cwScrollLeft = $(this).scrollLeft()
        },
        panmove: function (e) {
            var move = cwScrollLeft - getMove(e)
            // $scroll.scrollLeft(move)
            $(this).scrollLeft(move)
            TweenLite.set(this,{scrollLeft:move})
            // TweenMax.set(this,{scrollLeft:move})

        },
        panend: function (e) {
            // TweenLite.to(this,.5,{scrollLeft: cwScrollLeft - getMove(e) - 100 * e.gesture.velocity})
            // TweenMax.to(this,.5,{scrollLeft: cwScrollLeft - getMove(e) - 100 * e.gesture.velocity})
            $(this).animate({scrollLeft: cwScrollLeft - getMove(e) - 100 * e.gesture.velocity}, 500, 'easeOutQuad')
            // $scroll.animate({scrollLeft: cwScrollLeft - getMove(e) - 100 * e.gesture.velocity}, 500, 'swing')
        }
    })

$('.ctrl-wrap').scroll(function () {
    $scroll.scrollLeft($(this).scrollLeft())
})


function getMove(e) {
    var width = $(window).width(), height = $(window).height(), portrait = height > width, landscape = width > height
    if (portrait) {
        return e.gesture.deltaY
    } else {
        return e.gesture.deltaX
    }

}

document.getElementById('main').addEventListener('touchmove', function (e) {
    e.preventDefault()
})