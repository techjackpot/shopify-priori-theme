$(document).ready(function(){

  //dropdown carousel
  $ddc = $('.dropdown-cycle-container');

  $ddcflickity = $ddc.flickity({
    wrapAround: true,
    cellSelector: '.cycle-content',
    cellAlign: 'left',
    setGallerySize: false,
    prevNextButtons: false,
    pageDots: false
  });

  $ddc.on( 'select.flickity', function() {
    var flkty = $ddcflickity.data('flickity');
    var i = flkty.selectedIndex;
    $('.dropdown-cycler .cycle-image').removeClass('active');
    $('.dropdown-cycler .cycle-image').eq(i).addClass('active');
    $('.dropdown-cycler .cycle-span').removeClass('active');
    $('.dropdown-cycler .cycle-span').eq(i).addClass('active');
  });

  $('.dropdown-cycler .prevnext .prev').on('click', function(){
    $ddc.flickity( 'previous', true );
  });

  $('.dropdown-cycler .prevnext .next').on('click', function(){
    $ddc.flickity( 'next', true );
  });

  //main dropdown toggle, also rebuilds the carousel in the dropdown
  $('.shop-nav-item a.site-nav__link').on('click', function (e) {
    e.preventDefault();
    $('.big-ol-dropdown-thang').toggle();
    $ddc.flickity('resize');
  });

  //dropdown close
  $('.dropdown-close').on('click', function (e) {
    e.preventDefault();
    $('.big-ol-dropdown-thang').css('display','none');
  });

  //dropdown tabs
  $('.dropdown-tabs a:not(.see-all)').on('click', function (e) {
    e.preventDefault();
    $('.dropdown-tabs a').removeClass('active');
    $(this).addClass('active');

    var target = $(this).attr('href');
    $('.dropdown-products > div').hide().removeClass('active');
    $(target).addClass('active').show();
  });

  //other carousels like the one in the dropdown
  //add selectors here and they should work
  //as long as the markup template is the same
  $carousels = $('.carousel-explore-wrapper');

  $carousels.each(function(index,element){

    console.log(element, $(element));

    var $c = $(element).find('.carousel-with-linked-images');
    var $cflickity = $c.flickity({
      wrapAround: true,
      cellSelector: '.cycle-content',
      cellAlign: 'left',
			autoPlay: 10000,
      setGallerySize: false,
      prevNextButtons: false,
      pageDots: false
    });

    $(element).on( 'select.flickity', function() {
      var flkty = $cflickity.data('flickity');
      var i = flkty.selectedIndex;
      $(element).find('.cycle-image').removeClass('active');
      $(element).find('.cycle-image').eq(i).addClass('active');
    });

    $(element).find('.prevnext .prev').on('click', function(){
      $c.flickity( 'previous', true );
    });

    $(element).find('.prevnext .next').on('click', function(){
      $c.flickity( 'next', true );
    });

  });

  var $carousel = $('.product-carousel, .product-single__thumbnails');
  var hasMultipleCells = $carousel.find('.carousel-cell').length > 1;

  // init Flickity if mulitple cells
  if ( hasMultipleCells ) {
    $('.product-carousel').flickity({
      wrapAround: true,
      pageDots: false
    });

    $( ".single-option-selector" )
      .change(function() {
        $( ".single-option-selector option:selected" ).each(function() {
          $('.product-carousel').flickity( 'select', 0 );
        });
      })
    .trigger( "change" );

    $( ".customizable-variants .single-option-selector" )
    .change(function() {
      var index = $(this).prop('selectedIndex');

      $('.product-carousel').flickity( 'select', index );
    })
    .trigger( "change" );

    $('.product-single__thumbnails').flickity({
      wrapAround: false,
      pageDots: false,
      asNavFor: '.product-carousel',
      cellAlign: 'left'
    });
  }

  $('.day-carousel').flickity({
    wrapAround: true,
    cellSelector: '.cycle-content',
    pageDots: true
  });

  $('.thumbnail-carousel').flickity({
    wrapAround: true,
    cellSelector: '.cycle-content',
		lazyLoad: true,
    pageDots: true
  });

  $('.adaptive-carousel').flickity({
    wrapAround: true,
    cellSelector: '.cycle-content',
    pageDots: false,
    asNavFor: '.title-carousel'
  });

  $('.title-carousel').flickity({
    wrapAround: true,
    cellSelector: '.cycle-content',
    asNavFor: '.adaptive-carousel, .products-carousel',
    pageDots: false,
    prevNextButtons: false,
    percentPosition: true
  });

  $('.carousel-pagination').flickity({
    asNavFor: '.day-carousel',
    contain: true,
    pageDots: false,
    prevNextButtons: false,
  });

	$('.products-carousel').flickity({
    wrapAround: false,
    cellSelector: '.cycle-content',
    pageDots: false,
		draggable: false,
		percentPosition: true,
    asNavFor: '.title-carousel'
  });

	$('ul.tabs li').click(function(){
		var tab_id = $(this).attr('data-tab');

		$('ul.tabs li').removeClass('active');
		$('.tab-content').removeClass('active');

		$(this).addClass('active');
		$("#"+tab_id).addClass('active');
	});

  // Select all links with hashes
  $('faq-links a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function(event) {
      // On-page links
      if (
        location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
        &&
        location.hostname == this.hostname
      ) {
        // Figure out element to scroll to
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        // Does a scroll target exist?
        if (target.length) {
          // Only prevent default if animation is actually gonna happen
          event.preventDefault();
          $('html, body').animate({
            scrollTop: target.offset().top
          }, 1000, function() {
            // Callback after animation
            // Must change focus!
            var $target = $(target);
            $target.focus();
            if ($target.is(":focus")) { // Checking if the target was focused
              return false;
            } else {
              $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
              $target.focus(); // Set focus again
            };
          });
        }
      }
    });

});


//search-bar toggle, set focus to search bar on toggle

$('.search-toggle').on('click', function(e) {
	$(this).toggleClass("active");
	$('.search--nav').toggleClass("active");
	if ($('.search--nav').hasClass('active')) {
    $('.search--nav .input-group input').focus();
	} else {
	    $('.search--nav .input-group input').blur();
	}
	e.preventDefault();
});

//smooth scroll for anchore links
$(document).on('click', 'a[href^="#"]', function (event) {
    event.preventDefault();

    $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top
    }, 500);
});

jQuery('#notify-me').click(function() {

jQuery('#notify-me-wrapper').fadeIn();

return false;
} );


/**
 * Variant Selection scripts
 * ------------------------------------------------------------------------------
 *
 * Handles change events from the variant inputs in any `cart/add` forms that may
 * exist. Also updates the master select and triggers updates when the variants
 * price or image changes.
 *
 * @namespace variants
 */

Variants = (function() {

  /**
   * Variant constructor
   *
   * @param {object} options - Settings from `product.js`
   */
  function Variants(options) {
    this.$container = options.$container;
    this.product = options.product;
    this.singleOptionSelector = options.singleOptionSelector;
    this.originalSelectorId = options.originalSelectorId;
    this.enableHistoryState = options.enableHistoryState;
    this.currentVariant = this._getVariantFromOptions();

    $(this.singleOptionSelector, this.$container).on('change', this._onSelectChange.bind(this));
  }

  Variants.prototype = $.extend({}, Variants.prototype, {

    /**
     * Get the currently selected options from add-to-cart form. Works with all
     * form input elements.
     *
     * @return {array} options - Values of currently selected variants
     */
    _getCurrentOptions: function() {
      var currentOptions = $.map($(this.singleOptionSelector, this.$container), function(element) {
        var $element = $(element);
        var type = $element.attr('type');
        var currentOption = {};

        if (type === 'radio' || type === 'checkbox') {
          if ($element[0].checked) {
            currentOption.value = $element.val();
            currentOption.index = $element.data('index');

            return currentOption;
          } else {
            return false;
          }
        } else {
          currentOption.value = $element.val();
          currentOption.index = $element.data('index');

          return currentOption;
        }
      });

      // remove any unchecked input values if using radio buttons or checkboxes
      currentOptions = slate.utils.compact(currentOptions);

      return currentOptions;
    },

    /**
     * Find variant based on selected values.
     *
     * @param  {array} selectedValues - Values of variant inputs
     * @return {object || undefined} found - Variant object from product.variants
     */
    _getVariantFromOptions: function() {
      var selectedValues = this._getCurrentOptions();
      var variants = this.product.variants;
      var found = false;

      variants.forEach(function(variant) {
        var satisfied = true;

        selectedValues.forEach(function(option) {
          if (satisfied) {
            satisfied = (option.value === variant[option.index]);
          }
        });

        if (satisfied) {
          found = variant;
        }
      });

      return found || null;
    },

    /**
     * Event handler for when a variant input changes.
     */
    _onSelectChange: function() {
      var variant = this._getVariantFromOptions();

      this.$container.trigger({
        type: 'variantChange',
        variant: variant
      });

      if (!variant) {
        return;
      }

      this._updateMasterSelect(variant);
      this._updateImages(variant);
      this._updatePrice(variant);
      this.currentVariant = variant;

      if (this.enableHistoryState) {
        this._updateHistoryState(variant);
      }
    },

    /**
     * Trigger event when variant image changes
     *
     * @param  {object} variant - Currently selected variant
     * @return {event}  variantImageChange
     */
    _updateImages: function(variant) {
      var variantImage = variant.featured_image || {};
      var currentVariantImage = this.currentVariant.featured_image || {};

      if (!variant.featured_image || variantImage.src === currentVariantImage.src) {
        return;
      }

      this.$container.trigger({
        type: 'variantImageChange',
        variant: variant
      });
    },

    /**
     * Trigger event when variant price changes.
     *
     * @param  {object} variant - Currently selected variant
     * @return {event} variantPriceChange
     */
    _updatePrice: function(variant) {
      if (variant.price === this.currentVariant.price && variant.compare_at_price === this.currentVariant.compare_at_price) {
        return;
      }

      this.$container.trigger({
        type: 'variantPriceChange',
        variant: variant
      });
    },

    /**
     * Update history state for product deeplinking
     *
     * @param  {variant} variant - Currently selected variant
     * @return {k}         [description]
     */
    _updateHistoryState: function(variant) {
      if (!history.replaceState || !variant) {
        return;
      }

      var newurl = window.location.protocol + '//' + window.location.host + window.location.pathname + '?variant=' + variant.id;
      window.history.replaceState({path: newurl}, '', newurl);
    },

    /**
     * Update hidden master select of variant change
     *
     * @param  {variant} variant - Currently selected variant
     */
    _updateMasterSelect: function(variant) {
      $(this.originalSelectorId, this.$container)[0].value = variant.id;
    }
  });

  return Variants;
})();
