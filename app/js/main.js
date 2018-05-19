$(document).ready(function () {
    var $window = $(window);
    var scrollTime = 0.7;
    var scrollDistance = 250;
    $window.on("mousewheel DOMMouseScroll", function (event) {
        event.preventDefault();
        var delta = event.originalEvent.wheelDelta / 120 || -event.originalEvent.detail / 3;
        var scrollTop = $window.scrollTop();
        var finalScroll = scrollTop - parseInt(delta * scrollDistance);

        TweenMax.to($window, scrollTime, {
            scrollTo: {y: finalScroll, autoKill: true},
            ease: Power1.easeOut,
            autoKill: true,
            overwrite: 5
        });

    });

    $('.tooltip').tooltipster({
        theme: 'tooltipster-light',
        contentAsHTML: true,
        viewportAware: true,
        maxWidth: 320,
        trigger: "custom",
        triggerOpen: {
            mouseenter: true,  // For mouse
            tap: true    // For touch device
        },
        triggerClose: {
            mouseleave: true,  // For mouse
            tap: true,    // For touch device
            scroll: true  // For touch device
        }
    });

  //ANIMATION ScrollMagic + GSAP

    var controller = new ScrollMagic.Controller();

    var sceneHeader = new ScrollMagic.Scene({triggerElement: '#header', reverse: false});
    var ltHeader = new TimelineLite();
    sceneHeader.setTween(ltHeader).addTo(controller);
    var scenePrecaution = new ScrollMagic.Scene({triggerElement: '#precaution', reverse: false, offset: 0});
    var ltPrecaution = new TimelineLite();
    scenePrecaution.setTween(ltPrecaution).addTo(controller);
    var sceneAdvantage = new ScrollMagic.Scene({triggerElement: '#advantage', reverse: false, offset: 0});
    var ltAdvantage = new TimelineLite();
    sceneAdvantage.setTween(ltAdvantage).addTo(controller);
    var sceneFeatures = new ScrollMagic.Scene({triggerElement: '#features', reverse: false, offset: 0});
    var ltFeatures = new TimelineLite();
    sceneFeatures.setTween(ltFeatures).addTo(controller);
    var sceneInstruction = new ScrollMagic.Scene({triggerElement: '#instruction', reverse: false, offset: 0});
    var ltInstruction = new TimelineLite();
    sceneInstruction.setTween(ltInstruction).addTo(controller);
    var sceneUsage = new ScrollMagic.Scene({triggerElement: '#usage', reverse: false, offset: 0});
    var ltUsage  = new TimelineLite();
    sceneUsage .setTween(ltUsage ).addTo(controller);
    var sceneStorage = new ScrollMagic.Scene({triggerElement: '#storage', reverse: false, offset: 0});
    var tlStorage = new TimelineMax();
    sceneStorage.setTween(tlStorage).addTo(controller);

    ltHeader
        .from('.logo', 0.5, {yPercent: -100})
        .from('header a', 0.5, {autoAlpha: 0});

    ltPrecaution
        .from('.img1', 0.5, {yPercent: 50, autoAlpha: 0})
        .from('.img2', 0.7, {yPercent: 100, autoAlpha: 0}, '-=0.5')
        .from('.precaution .title', 0.5, {autoAlpha: 0})
        .staggerFrom('.precaution p', 0.5, {autoAlpha: 0}, 0.4, '-=0.2');

    ltAdvantage
        .staggerFrom(['.advantage .title', '.advantage p'], 0.5, {autoAlpha: 0}, 0.3)
        .from('.advantage', 1, {backgroundPosition: '250% 50%, 100% 50%'});

    ltFeatures
        .from('.features .title', 0.5, {autoAlpha: 0})
        .from('.features .heading', 0.5, {xPercent: 20, autoAlpha: 0})
        .staggerFrom(['.features__list', '.features__left img'], 0.5, {autoAlpha: 0}, 0.5)
        .staggerFrom('.features__list li', 0.3, {autoAlpha: 0}, 0.2, '-=0.5');

    ltInstruction
        .from('.instruction .container', 0.5, {yPercent: 20, autoAlpha: 0});

    ltUsage
        .from('.usage__left', 0.5, {height: 0, paddingTop: 0, paddingBottom: 0})
        .staggerFrom(['.usage__left img', '.usage__left .heading', '.usage__left p'], 0.5, {autoAlpha: 0})
        .from('.usage__left a', 0.5, {autoAlpha: 0})
        .staggerFrom(['.usage__middle', '.usage__right'], 0.5, {autoAlpha: 0}, 0.5);

    tlStorage
        .staggerFrom(['.storage .title', '.storage p', '.storage svg'], 0.5, {autoAlpha: 0}, 0.3)
        .staggerFrom('.btn-box a', 0.5, {autoAlpha: 0, yPercent: 50}, 0.3);



    //burger menu trigger with menu animation
    $('.menu-slim').on("click", animateMenu);
    $(document).on("click", '.logo a, nav a, .button-box a, .overview a, .usage a', goToLink);

});


function goToLink(e) {
    e.preventDefault();
    var id  = $(this).attr('href');
    var h = $('.header-content').height();
    var top;
    top = $(id).offset().top - h;

    $('body,html').stop(true).animate({scrollTop: top}, 1000);

    var tlMenu = new TimelineMax();
    tlMenu
        .staggerTo('.nav-mobile a', 0.5, {x: '-500%'}, 0.1)
        .to('.nav-mobile', 0.3, {
            bottom: '100%'
        }, "-=0.3");
    $('.menu-slim').removeClass("menu-js-toggle");
}

function animateMenu() {
    $(this).toggleClass("menu-js-toggle");
    var tlMenu = new TimelineMax();
    if ($(this).hasClass("menu-js-toggle")) {
        tlMenu
            .to('.nav-mobile', 0.3, {
                bottom: '0%',
                ease: Power3.easeOut
            })
            .staggerTo('.nav-mobile a', 0.5, {x: '0%'}, 0.1);
    }
    else {
        tlMenu
            .staggerTo('.nav-mobile a', 0.5, {x: '-500%'}, 0.1)
            .to('.nav-mobile', 0.3, {
                bottom: '100%',
                ease: Power3.easeOut
            }, "-=0.3");
    }
}


$(window).on("scroll", stickyHeader);

function stickyHeader() {
    var numb = 0;
    if ($(window).scrollTop() >= 50) {
        $('.header-content').removeClass('addBg-js ');
        $('.header-content').addClass('addBg-js ');
        numb = $(window).scrollTop()/500;
        if (numb >= 1.5) {
            return;
        }
        $('.addBg-js').css('background', 'rgba(118,60,191,' +  numb  + ')');
    }
    else {
        $('.header-content').removeClass('addBg-js ');
    }
}
