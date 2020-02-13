jQuery(function() {
  var BrowserDetect = {
        init: function () {
            this.browser = this.searchString(this.dataBrowser) || "Other";
            this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "Unknown";
        },
        searchString: function (data) {
            for (var i = 0; i < data.length; i++) {
                var dataString = data[i].string;
                this.versionSearchString = data[i].subString;

                if (dataString.indexOf(data[i].subString) !== -1) {
                    return data[i].identity;
                }
            }
        },
        searchVersion: function (dataString) {
            var index = dataString.indexOf(this.versionSearchString);
            if (index === -1) {
                return;
            }

            var rv = dataString.indexOf("rv:");
            if (this.versionSearchString === "Trident" && rv !== -1) {
                return parseFloat(dataString.substring(rv + 3));
            } else {
                return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
            }
        },

        dataBrowser: [
            {string: navigator.userAgent, subString: "Edge", identity: "MS Edge"},
            {string: navigator.userAgent, subString: "MSIE", identity: "Explorer"},
            {string: navigator.userAgent, subString: "Trident", identity: "Explorer"},
            {string: navigator.userAgent, subString: "Firefox", identity: "Firefox"},
            {string: navigator.userAgent, subString: "Opera", identity: "Opera"},  
            {string: navigator.userAgent, subString: "OPR", identity: "Opera"},  

            {string: navigator.userAgent, subString: "Chrome", identity: "Chrome"}, 
            {string: navigator.userAgent, subString: "Safari", identity: "Safari"}       
        ]
    };
    
    BrowserDetect.init();
    console.log(BrowserDetect.browser);
    console.log(BrowserDetect.version);
    // document.write("You are using <b>" + BrowserDetect.browser + "</b> with version <b>" + BrowserDetect.version );
  

    var isMobile = {
      Android:        function() { return navigator.userAgent.match(/Android/i) ? true : false; },
      BlackBerry:     function() { return navigator.userAgent.match(/BlackBerry/i) ? true : false; },
      iOS:            function() { return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false; },
      Windows:        function() { return navigator.userAgent.match(/IEMobile/i) ? true : false; },
      any:            function() { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows());  }
    };

  $(window).load(function() {
    // product slider
      if($('.product-slider').length > 0){
        $(document).ready(function(){
          $(".product-slider").owlCarousel({
            items:1,
            mouseDrag: false,
            animateOut: 'fadeOut',
            onInitialized: function() {
              console.log('owl init!');
              initStickySidebar();
            },
            onResized: function() {
              console.log('owl resize');
            }
          });
        });

      }
    // end product slider

  });

  // selection-page-sticky
    function initStickySidebar(){

      if($('#selection-sticky').length > 0){
          var sidebar = document.querySelector('.content-original .product-display');
          var stickySidebar = new StickySidebar(sidebar, {
            containerSelector: '.content-original .selection-wapper',
            innerWrapperSelector: '.content-original .sticky-inner',
            topSpacing: 280,
            bottomSpacing: 107,
            minWidth: 992
            // resizeSensor: true
          });
        }

    }
    
  // end selection-page-sticky

  // slider-fixed
    // if($('.product-display').length > 0){
    //     var $productSlider = $('.product-slider'),
    //         top = $productSlider.offset().top,
    //         width = $('.product-display').width();
          
    //     $('.product-display').addClass('affixed');
    //     $productSlider.width(width);
 
    // }
  // end slider-fixed

  // header blur

    function Blur() {
      var _self = this,
          content,
          header = $('.header'),
          headerContainer = $('.header-container'),
          windowHeight = window.innerHeight;

      this.init = function() {
        this.contentCloning();
        this.events();
      },
      this.events = function() {
        $(window).on('resize', this.winResize);
        $(document).on('scroll', this.docScroll);
        $(document).on('ready', this.docReady);
      },

      this.docReady = function() {
        if($(this).scrollTop() > 0){
          _self.bluredFooterScroll($(this).scrollTop());
          _self.bluredHeaderScroll($(this).scrollTop());
          $('.header').find('.appl-content').addClass('blur');
          
        }
      },

      this.docScroll = function() {
         var scroll = $(this).scrollTop();

          if(scroll > 0){
             $('.header').find('.appl-content').addClass('blur');
             $('.header').addClass('header-cover');
           }else{
             $('.header').find('.appl-content').removeClass('blur');
             $('.header').removeClass('header-cover');
           }

           _self.bluredHeaderScroll(scroll);

           if(_self.productsStikyFooterCheking()){
              _self.bluredFooterScroll(scroll);
           }
      },

      this.winResize = function() {
        windowHeight = window.innerHeight;
      },

      this.productSliderCheking = function() {
        return document.querySelector('.product-slider');
      },

      this.productsStikyFooterCheking = function() {
        return document.querySelector('.sticky-footer');
      },

      this.contentRendering = function() {
        if(this.productsStikyFooterCheking()){
          content = $('.appl-content, .footer');
        }else{
          content = $('.appl-content');         
        }
        return content;
      },

      this.bluredHeaderScroll = function(scroll) {
        $('.header .blured').css({
          '-webkit-transform' : 'translateY(-'+scroll+'px)',
          'transform' : 'translateY(-'+scroll+'px)'
        });
      },

      this.bluredFooterScroll = function(scroll) {
        $('.sticky-footer .blured').css({
          '-webkit-transform' : 'translateY(-'+this.stickyFooterOffsetCalc(scroll)+'px)',
          'transform' : 'translateY(-'+this.stickyFooterOffsetCalc(scroll)+'px)'
        });
      },

      this.contentCloning = function() {
        var $clonedContent = this.contentRendering().clone().removeClass('content-original');
       
        if(this.productSliderCheking()){
          $clonedContent.find('.product-slider').remove();
        }
        $clonedContent.appendTo(headerContainer);
      },

      this.stickyFooterOffsetCalc = function(scroll) {
        return scroll+windowHeight - 107;
      }
    }

    var blur = new Blur;
    if(BrowserDetect.browser !== 'Explorer' && !isMobile.any() ){
      console.log('blur init');
      blur.init(); 
    }
  // end header blur

  // header tooltips
    function headerHandling() {
      var _self = this,
          $header = $('.header'),
          $tooltipBlock = $('.to-tooltip'),
          $body = $('body'),
          $toggleMenuButton = $(".toggle-mnu"),
          $cover = $('.appl-cover');

      this.init = function() {
        this.events();
      },
      this.events = function() {
        $tooltipBlock.on('click', this.toggleTooltip);
        $body.on('click', this.bodyClick);
        $toggleMenuButton.on('click', this.toggleMenu);
      },

      this.toggleMenu = function() {
        $(this).toggleClass("on");
        $(".main-menu").stop(true, true).slideToggle(300);
        $header.toggleClass('mob-menu-open');
        _self.hiddenAllTooltips();

        return false;
      },

      this.toggleTooltip = function(e) {
        e.stopPropagation();

        var $th = $(this),
            $tooltip = $th.find('.appl-header-popup');

            console.log(e.target.className);

        if(screen.width > 768){
          _self.tooltipDesktopDemonstration($th, e.target);
        }else{
          _self.tooltipMobileDemonstration($th, e.target);
        }

      },

      this.bodyClick = function() {
          _self.hiddenAllTooltips();
      },

      this.tooltipDesktopDemonstration = function($item, target) {
        var $tooltip = $item.find('.appl-header-popup');
        
        if(this.tooltipState($item)){
           $cover.fadeOut(500);
        }else{
           $cover.fadeIn(500);
        }

        if(this.iconClickCheck(target)){
            $tooltip.toggleClass('fadeOutDown');
            $tooltip.toggleClass('fadeInUp');

            $item.toggleClass('active');
            $item.siblings()
              .removeClass('active');
          }
          $item.siblings()
            .find('.appl-header-popup')
            .addClass('fadeOutDown')
            .removeClass('fadeInUp');

      },

      this.tooltipMobileDemonstration = function($item, target){
        var $tooltip = $item.find('.appl-header-popup');
                
        if(this.tooltipState($item)){
           $cover.fadeOut(500);
        }else{
           $cover.fadeIn(500);
        }

        if(this.iconClickCheck(target)){
            $tooltip.stop(true, true).fadeToggle();
            $item.toggleClass('active');
            $item.siblings()
              .removeClass('active');
        }
         $item.siblings()
            .find('.appl-header-popup')
            .stop(true, true)
            .hide();
      },

      this.iconClickCheck = function(target) {
        return $(target).hasClass('tooltip-icon');
      },

      this.coverHidden = function() {
        $cover.fadeOut();
      },

      this.tooltipState = function($item) {
        return $item.hasClass('active');
      }

      this.hiddenAllTooltips = function() {
          if(screen.width > 768){
            $tooltipBlock
              .removeClass('active')
              .find('.appl-header-popup')
              .addClass('fadeOutDown')
              .removeClass('fadeInUp');
          }else{
            $tooltipBlock
              .removeClass('active')
              .find('.appl-header-popup')
              .hide();
          }
           this.coverHidden();
      }
    }

    var headHandle = new headerHandling();
    headHandle.init();

  // end header tooltips


  // dropdown
  if($('select').length > 0){

    $('select').selectmenu({
      open: function( event, ui ) {
        if(event.target.hasAttribute('data-drop-class')){
          var id = event.currentTarget.getAttribute('aria-owns');
              dropdown = document.getElementById(id),
              className = event.target.getAttribute('data-drop-class');

              dropdown.classList.add(className);
        }
      }
    });
  }
  // end dropdown

});