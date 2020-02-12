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
    // document.write("You are using <b>" + BrowserDetect.browser + "</b> with version <b>" + BrowserDetect.version );
  
    
  // product slider
    if($('.product-slider').length > 0){
      $(document).ready(function(){
        $(".product-slider").owlCarousel({
          items:1,
          mouseDrag: false,
          animateOut: 'fadeOut',
          onInitialized: function() {
            console.log('owl init!');
            // initStickySidebar();
          },
          onResized: function() {
            console.log('owl resize');
          }
        });
      });

    }
  // end product slider

  // slider-fixed
    if($('.product-display').length > 0){
        var $productSlider = $('.product-slider'),
            top = $productSlider.offset().top,
            width = $('.product-display').width();
            console.log(width);

      // $(document).scroll(function() {
      //   if($(this).scrollTop() > 0){
          $('.product-display').addClass('affixed');
          $productSlider.width(width);
        // }else{
          // $('.product-display').removeClass('affixed');
          // $productSlider.width('auto');
      //   }
      // });
      
    }
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
        content.find('appl-content').removeClass('content-original');

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
        var $clonedContent = this.contentRendering().clone();
       
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
    blur.init();
  // end header blur

  // header tooltips
    function headerHandling() {
      var _self = this,
          $header = $('.header'),
          $tooltipBlock = $('.to-tooltip'),
          $body = $('body'),
          $toggleMenuButton = $(".toggle-mnu");

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
        $(".main-menu").stop(true, true).slideToggle(200);
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
       
        if(this.iconClickCheck(target)){
            $tooltip.fadeToggle();
            $item.toggleClass('active');
            $item.siblings()
              .removeClass('active');
        }
         $item.siblings()
            .find('.appl-header-popup')
            .hide('fadeOutDown');
      },

      this.iconClickCheck = function(target) {
        return $(target).hasClass('tooltip-icon');
      },

      this.siblingsToggle = function() {

      },

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
      }
    }

    var headHandle = new headerHandling();
    headHandle.init();

    // $('.to-tooltip').click(function(e) {
    //   e.stopPropagation();

    //   var $th = $(this),
    //       $tooltip = $th.find('.appl-header-popup');

    //       console.log(e.target.className);
     
    //   if($(e.target).hasClass('tooltip-icon')){
    //     $tooltip.toggleClass('fadeOutDown');
    //     $tooltip.toggleClass('fadeInUp');

    //     $th.toggleClass('active');
    //     $th.siblings()
    //       .removeClass('active');

    //   }
    //   $th.siblings()
    //     .find('.appl-header-popup')
    //     .addClass('fadeOutDown')
    //     .removeClass('fadeInUp');
    // });
    
    // $('body').click(function() {
    //   console.log('click on body!');
    //   $('.to-tooltip')
    //     .removeClass('active')
    //     .find('.appl-header-popup')
    //     .addClass('fadeOutDown')
    //     .removeClass('fadeInUp');
    // });
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

  // selection-page-sticky
    function initStickySidebar(){

      if($('#selection-sticky').length > 0){
          var sidebar = document.querySelector('.content-original .product-display');
          var stickySidebar = new StickySidebar(sidebar, {
            // containerSelector: '.content-original .selection-wapper',
            // innerWrapperSelector: '.content-original .sticky-inner',
            topSpacing: 280,
            bottomSpacing: 20
            // resizeSensor: true
          });
          sidebar.addEventListener('affix.top.stickySidebar', function () {
             stickySidebar.updateSticky();
            // $('#selection-sticky').height(412);
            console.log('sidebar' + $('.product-slider').height());
            $('.content-original .product-display').removeClass('hidden');
            stickySidebar.updateSticky();
            $('.content-original .product-slider').removeClass('hidden');
          });
          sidebar.addEventListener('affix.container-bottom.stickySidebar', function () {
            console.log('container-bottom');
            // $('.content-original .product-slider').addClass('hidden');
          });
          sidebar.addEventListener('affix.unbottom.stickySidebar', function () {
          });

        }
    }
  // end selection-page-sticky

});