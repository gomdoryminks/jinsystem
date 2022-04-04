/*
	Introspect by TEMPLATED
	templated.co @templatedco
	Released for free under the Creative Commons Attribution 3.0 license (templated.co/license)
*/

(function($) {

	skel.breakpoints({
		xlarge:	'(max-width: 1680px)',
		large:	'(max-width: 1280px)',
		medium:	'(max-width: 980px)',
		small:	'(max-width: 736px)',
		xsmall:	'(max-width: 480px)'
	});
    
    //PRE loader
    $(window).load(function(){
        $('.preloader').fadeOut(1000); // set duration in brackets    
    });

	$(function() {
        
        //IE일 경우 강제로 페이지 이동
        var agent = navigator.userAgent.toLowerCase();
        
        if ((navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1)) {
            location.href = "https://support.microsoft.com/ko-kr/office/microsoft-edge%ec%97%90%ec%84%9c-%ec%9d%b4-%ec%9b%b9-%ec%82%ac%ec%9d%b4%ed%8a%b8%eb%a5%bc-%eb%b3%b4%eb%8a%94-%ea%b2%83%ec%9d%b4-%ec%a2%8b%ec%8a%b5%eb%8b%88%eb%8b%a4-160fa918-d581-4932-9e4e-1075c4713595?ui=ko-kr&rs=ko-kr&ad=kr";
        }

		var	$window = $(window),
			$body = $('body');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-loading');
				}, 100);
			});

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on medium.
			skel.on('+medium -medium', function() {
				$.prioritize(
					'.important\\28 medium\\29',
					skel.breakpoint('medium').active
				);
			});

		// Off-Canvas Navigation.

			// Navigation Panel Toggle.
				$('<a href="#navPanel" class="navPanelToggle"><span class="fa fa-bars"></span></a>')
					.appendTo(".navPanelArea");

			// Navigation Panel.
				$(
					'<div id="navPanel">' +
						$('#nav').html() +
						'<a href="#navPanel" class="close"></a>' +
					'</div>'
				)
					.appendTo(".navPanelArea")
					.panel({
						delay: 500,
						hideOnClick: true,
						hideOnSwipe: true,
						resetScroll: true,
						resetForms: true,
						side: 'left'
					});

			// Fix: Remove transitions on WP<10 (poor/buggy performance).
				if (skel.vars.os == 'wp' && skel.vars.osVersion < 10)
					$('#navPanel')
						.css('transition', 'none');
        
        //리사이즈
        $(window).resize(function() {
            //HOME 내용 높이 설정
            setHomeHeight();
            
            //레이어 팝업 높이 설정
            $(".layer_content_area").each(function() {
                if ($(this).hasClass("on")) {
                    var layerId = $(this).attr("id");

                    //레이어 팝업 열기
                    openLayer(layerId);
                }
            });
        });
        
        //HOME 내용 높이 설정
        setHomeHeight();
        
        //Smoothscroll js
        $('#header a, #navPanel a:not(.close)').bind('click', function(event) {
            var win_width = window.innerWidth;
            var hd_height = 0;
            var $anchor = $(this);
            
            if (win_width > 1680) {
                hd_height = 100;
            } else if (win_width > 980) {
                hd_height = 86;
            } else {
                hd_height = 80;
            }
            
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top - hd_height
            }, 1000);
            
            event.preventDefault();
        });
        
        //Back to top button
        $(window).scroll(function() {
            if ($(this).scrollTop() > 100) {
                $('.back-to-top').fadeIn('slow');
            } else {
                $('.back-to-top').fadeOut('slow');
            }
        });

        $('.back-to-top').bind('click', function(event) {
            $('html, body').stop().animate({
                scrollTop: 0
            }, 1000);

            event.preventDefault();
        });
        
        //swiper 이미지 슬라이드 (사업소개)
        var swiper = new Swiper('.business_slide', {
            observer: true,
            observeParents: true,
            slidesPerView : 1,
            effect : 'fade',
            autoplay: {
                delay: 8000,
                disableOnInteraction: false
            },
            pagination: {
                el: '.business_slide_pagination',
                clickable: true,
                renderBullet: function (index, className) {
					return '<span class="' + className + '"><i class="fas fa-burn"></i><i class="fas fa-map-pin"></i>' + $(document).find(".business_slide li").eq(index).attr("data-slide-title") + '</span>';
				},
            },
            watchOverflow: true
        });
        
        //magnific popup 미리보기 (기술 보유현황)
        $('.license_group_area').magnificPopup({
            delegate: 'a', // child items selector, by clicking on it popup will open
            type: 'image',
            tLoading: 'Loading image #%curr%...',
            mainClass: 'mfp-img-mobile',
            gallery: {
                enabled: true,
                navigateByImgClick: true,
                preload: [0,1] // Will preload 0 - before current, and 1 after the current image
            },
            image: {
                tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
                titleSrc: function(item) {
                    return item.el.attr('title');
                }
            }
        });

	});
    
    //WOW Animation js
    new WOW({ mobile: false }).init();   

})(jQuery);

//HOME 내용 높이 설정
function setHomeHeight() {
    $("#home .inner").css("height", "auto");

    var home_height = $("#home .inner").innerHeight();

    $("#home .inner").height(home_height);
}

//Email 유효성 검사
function validateEmail(email) {
    var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

    if (filter.test(email)) {
        return true;
    } else {
        return false;
    }
}

//레이어 팝업 열기
function openLayer(layerId) {
    $("#" + layerId).addClass("on");
    
    $("#" + layerId).children(".layer_box").find(".layer_content").css("height", "auto");

    var winHeight = $(window).outerHeight();
    var layerHeight = $("#" + layerId).children(".layer_box").find(".layer_content").outerHeight();
    
    if (layerHeight > (winHeight - 20)) {
        layerHeight = winHeight - 20;
    }
    
    $("#" + layerId).children(".layer_box").find(".layer_content").css("height", layerHeight + "px");
    
    $("html").css({"margin-right": "17px", "overflow": "hidden"});
}

//레이어 팝업 닫기
function closeLayer(layerId) {
    $("#" + layerId).removeClass("on");
    
    if ($(".layer_content_area.on").length == 0) {
        $("html").css({"margin-right": "", "overflow": ""});
    }
}

//레이어 alert창 열기 (msg : 메시지 내용, fun : 버튼 클릭시 실행할 함수 (함수가 여러개일 경우 세미콜론으로 구분))
function alertLayer(msg, fun) {
    if ($("#alert_layer").length > 0) {
        $("#alert_layer .layer_box .layer_content .layer_content_txt").html(msg);
        
        if (fun != "") {
            $("#alert_layer .layer_box .layer_content .layer_content_btn .content_btn").removeAttr("onclick");
            $("#alert_layer .layer_box .layer_content .layer_content_btn .content_btn").attr("onclick","closeLayer('alert_layer'); " + fun);
        }
        
        openLayer("alert_layer");
    }
}

//Inquiry 전송
function fmSubmit() {
    var f = document.fm;
    
    if (f.name.value == null || f.name.value == undefined || f.name.value == "") {
        alertLayer("성명을 입력해주세요.", "document.fm.name.focus();");
    } else if (f.email.value == null || f.email.value == undefined || f.email.value == "") {
        alertLayer("EMAIL을 입력해주세요.", "document.fm.email.focus();");
    } else if (validateEmail(f.email.value) == false) {
        alertLayer("EMAIL을 형식에 맞게 입력해주세요.", "document.fm.email.focus();");
    } else if (f.subject.value == null || f.subject.value == undefined || f.subject.value == "") {
        alertLayer("제목을 입력해주세요.", "document.fm.subject.focus();");
    } else if (f.message.value == null || f.message.value == undefined || f.message.value == "") {
        alertLayer("내용을 입력해주세요.", "document.fm.message.focus();");
    } else {
        $.post('/sendmail.jsp', {
            subject: f.subject.value, //제목
            from: f.email.value, //문의자이메일
            name: f.name.value, //문의자명
            content: f.message.value, //내용
        }, function(result) {
            console.log(result);
            
            f.name.value = "";
            f.email.value = "";
            f.subject.value = "";
            f.message.value = "";
            
            alertLayer("메세지가 정상적으로 전송되었습니다.", "");
        });
    }
    
    return false;
}

