"use strict";if(!Bunyad){var Bunyad={};}
Bunyad.theme=(function($){var hasTouch=false,responsiveMenu=false,isIframe=window.BunyadIsIframe||false,schemeKey=window.BunyadSchemeKey||'bunyad-scheme';if(!window.requestIdleCallback){window.requestIdleCallback=requestAnimationFrame;}
var self={init:function(){$(window).on('touchstart',function(){if(!hasTouch){$('body').addClass('touch');self.touchNav();}
hasTouch=true;});this.imageEffects();this.sliders();this.contentSlideshow();this.header();this.responsiveNav();this.megaMenus();this.newsTicker();requestIdleCallback(this.lightbox);this.searchModal();this.initStickySidebar();this.userRatings();this.tabWidget();$('.woocommerce-ordering .drop li a').on('click',function(e){var form=$(this).closest('form');form.find('[name=orderby]').val($(this).parent().data('value'));form.trigger('submit');e.preventDefault();});$(document).on('ts-ajax-pagination',e=>{$(document).trigger('scroll.TSS');Bunyad.sliders();});requestIdleCallback(()=>{self.contextualBinds(document);$('.navigation i.only-icon').each(function(){var el=$(this).closest('li');if(!el.hasClass('only-icon')){el.addClass('only-icon');}});$(document).on('click','.ts-comments-show',function(){$(this).hide().closest('.comments').find('.ts-comments-hidden').show();return false;});},{timeout:1000});},contextualBinds:function(document)
{requestAnimationFrame(()=>{$('.featured-vid, .post-content',document).fitVids();});$('.review-number',document).each(function(){var raw=$(this).find('span:not(.progress)').html(),progress=parseFloat(raw);$(this).find('.progress').css('width',(raw.search('%')===-1?(Math.round(progress/10*100))+'%':progress));});$('.review-box ul li .bar',document).each(function(){$(this).data('width',$(this)[0].style.width).css('width',0);});new Bunyad_InView(document.querySelectorAll('.review-box ul li',document),entry=>{const bar=$(entry.target).find('.bar');bar.addClass('appear').css('width',bar.data('width'));},{once:true});$('.post-share-b .show-more',document).on('click',function(){$(this).parent().addClass('all');return false;});$('.service.s-link').on('click',e=>{const temp=document.createElement('input');Object.assign(temp,{value:location.href,style:{position:'absolute',left:'-200vw'}});document.body.prepend(temp);temp.select();document.execCommand('copy');temp.remove();let snackbar=document.querySelector('.ts-snackbar.copy-link');if(!snackbar){snackbar=document.createElement('div');const message=e.currentTarget.querySelector('[data-message]').dataset.message;snackbar.className='ts-snackbar copy-link';snackbar.innerHTML=`<span>${message}</span><i class="tsi tsi-close"></i>`;document.body.append(snackbar);}
if(snackbar.classList.contains('ts-snackbar-active')){return false;}
requestAnimationFrame(()=>snackbar.classList.add('ts-snackbar-active'));const hideMessage=()=>{snackbar.classList.remove('ts-snackbar-active');snackbar.hide();return false;}
setTimeout(hideMessage,5*1000);$(snackbar).on('click','.tsi-close',hideMessage);return false;});$('.go-back').on('click',function(){window.history.back();return false;});},reInit:function(context){if(context!==document){this.imageEffects(context.querySelectorAll('img'));}
this.contextualBinds(context);this.lightbox();this.contentSlideshow();this.userRatings();setTimeout(this.stickySidebar,50);Bunyad.sliders();},imageEffects:function(elements){if(!$('body').hasClass('img-effects')){return;}
if(!elements){elements=document.querySelectorAll('.main-wrap .wp-post-image, .post-content img');}
elements.forEach(e=>e.classList.add('no-display'));$('.bunyad-img-effects-css').remove();new Bunyad_InView(elements,entry=>entry.target.classList.add('appear'),{once:true},()=>$(elements).addClass('appear'));},newsTicker:function(){$('.trending-ticker').each(function(){if(!$(this).find('li.active').length){$(this).find('li:first').addClass('active');}
let ticker=$(this);let interval=false;const delay=parseInt(ticker.data('delay')||5)*1000;const setTick=()=>{var active=ticker.find('li.active');active.fadeOut(function(){var next=active.next();if(!next.length){next=ticker.find('li:first');}
next.addClass('active').fadeIn();active.removeClass('active');});}
const startTicker=()=>{if(interval){return;}
interval=window.setInterval(setTick,delay);}
startTicker();ticker.on('mouseenter','li',()=>{clearInterval(interval);interval=false;});ticker.on('mouseleave','li',startTicker);});},header:function(){const toggleDarkMode=(scheme)=>{const prevScheme=(scheme=='dark'?'light':'dark');const htmlClass=$('html').data('origClass');let initialScheme;if(htmlClass){initialScheme=htmlClass.includes('s-dark')?'dark':'light';}
if($('html').data('autoDark')){initialScheme='dark';}
if(scheme!==initialScheme){localStorage.setItem(schemeKey,scheme);}
else{localStorage.removeItem(schemeKey);}
$('html').removeClass(`s-${prevScheme} site-s-${prevScheme}`).addClass(`s-${scheme} site-s-${scheme}`);};$('.scheme-switcher .toggle').on('click',function(){const ele=$(this);let scheme=ele.hasClass('toggle-dark')?'dark':'light';toggleDarkMode(scheme);document.querySelectorAll('iframe.spc-auto-load-post').forEach(element=>{element.contentWindow.postMessage({action:'toggle-dark-mode',scheme},'*');});return false;});if(isIframe){window.addEventListener('message',e=>{if(!e.data||e.data.action!=='toggle-dark-mode'){return;}
toggleDarkMode(e.data.scheme);});}},responsiveNav:function(){this.initResponsiveNav();},initResponsiveNav:function(){if(responsiveMenu||!$('.off-canvas').length){responsiveMenu=true;return;}
responsiveMenu=true;const hasOverlayScroll=()=>{const ele=document.createElement("div");ele.setAttribute("style","width:30px;height:30px;overflow:scroll;opacity:0");document.body.appendChild(ele);const result=ele.offsetWidth===ele.clientWidth;document.body.removeChild(ele);return result;}
const setupScroll=()=>{if(!hasTouch&&!hasOverlayScroll()){document.body.classList.add("has-scrollbar");const ele=$('.off-canvas-content');ele.css('display','block');requestAnimationFrame(function(){ele.css('display','flex');});}}
const setupMenuHandlers=()=>{$('.mobile-menu li > a').each(function(){if($(this).parent().children('ul').length){$('<span class="chevron"><i class="tsi tsi-chevron-down"></i></span>').insertAfter($(this));}});$('.mobile-menu li .chevron').on('click',function(){$(this).closest('li').find('ul').first().parent().toggleClass('active item-active');return false;});}
const setupMobileMenu=()=>{var container=$('.mobile-menu-container');if(!container.find('.mobile-menu').children().length){var mobileMenu=container.find('.mobile-menu'),mainMenu=$('.navigation-main .menu');if(!mainMenu.length){return;}
var menu=mainMenu.children().clone();menu.find('.mega-menu .sub-cats').each(function(){var container=$(this).closest('.menu-item');container.append($(this).find('.sub-nav'));container.find('.sub-nav').replaceWith(function(){return $('<ul />',{html:$(this).html()});});$(this).remove();});mobileMenu.append(menu);}}
let isMenuSetup=false;const initSetup=()=>{setupScroll();setupMobileMenu();setupMenuHandlers();isMenuSetup=true;};const showMenu=()=>{if(!isMenuSetup){initSetup();}
$('html').toggleClass('off-canvas-active');}
$('.mobile-head .menu-icon a, .smart-head .offcanvas-toggle').on('click',function(){$(document).trigger('ts-sticky-bar-remove');showMenu();});$('.off-canvas .close').on('click',function(){showMenu();return false;});$('.off-canvas-backdrop').on('click',function(){$('.off-canvas .close').click();return false;})},megaMenus:function(){const media=window.matchMedia('(min-width: 940px)');const init=e=>{if(e.matches){this.initMegaMenus();}
media.removeListener(init);};init(media);media.addListener(init);},initMegaMenus:function(){$('.navigation .mega-menu-a').each(function(){var menu=$(this),number=menu.find('.recent-posts').data('columns');var default_mega_menu=function f(){menu.find('.posts').last().addClass('active');return f;}();menu.find('.menu-item').on('mouseenter',function(){var id=parseInt($(this).attr('class').match(/menu-cat-(\d+)/)[1]||0),menu=$(this).parents('.mega-menu'),view_all=$(this).hasClass('view-all');if(!view_all&&!id){return;}
menu.find('.active, .current-menu-item').removeClass('active current-menu-item');$(this).addClass('current-menu-item');var posts=menu.find('[data-id='+id+']').addClass('active');return false;});menu.parent().on('mouseenter',function(){var menu=$(this).find('.mega-menu');menu.find('.active, .current-menu-item').removeClass('active current-menu-item');$(this)[0].offsetWidth;default_mega_menu();});});},touchNav:function(){var targets=$('.menu:not(.mobile-menu) a'),open_class='item-active',child_tag='ul, .mega-menu';targets.each(function(){var $this=$(this),$parent=$this.parent('li'),$siblings=$parent.siblings().find('a');$this.on('click',function(e){var $this=$(this);e.stopPropagation();$siblings.parent('li').removeClass(open_class);if(!$this.parent().hasClass(open_class)&&$this.next(child_tag).length>0&&!$this.parents('.mega-menu.links').length){e.preventDefault();$this.parent().addClass(open_class);}});});$(document).on('click',function(e){if(!$(e.target).is('.menu')&&!$(e.target).parents('.menu').length){targets.parent('li').removeClass(open_class);}});},initStickySidebar:function(){let hasInit=false;const events='resize orientationchange scroll';const init=()=>{if(hasInit){return;}
if(document.documentElement.clientWidth>=940){self.stickySidebar();hasInit=true;$(window).off(events,init);}}
$(window).on(events,init);Bunyad.util.onLoad(init);},stickySidebar:function(){const stickyHeaderHeight=()=>{const stickyHead=$('.smart-head-sticky');let addHeight=0;if(stickyHead.length){let height=window.getComputedStyle(stickyHead[0]).getPropertyValue('--head-h');addHeight=parseInt(height)||0;}
return addHeight;}
const initNative=()=>{if(!$('.ts-sticky-native').length){return;}
let baseTop=20;if($('.admin-bar').length){baseTop+=$('#wpadminbar').height();}
const setTop=top=>$('body').css('--ts-sticky-top',top+'px');$(document).on('sticky-bar-show',()=>setTop(baseTop+stickyHeaderHeight()));$(document).on('sticky-bar-hide',()=>setTop(baseTop));}
const init=(addExtra)=>{const sticky=$('.ts-sticky-col, .main-sidebar[data-sticky=1]');if(!sticky.length){return;}
let add=20;if($('.admin-bar').length){add+=$('#wpadminbar').height();}
add+=addExtra||0;sticky.each(function(){var stickyCol=$(this);if(stickyCol.data('init')||stickyCol.hasClass('.ts-sticky-native')){return;}
stickyCol.data('init',1);if(!stickyCol.find('.theiaStickySidebar').length){stickyCol.find('.elementor-widget-wrap').first().addClass('theiaStickySidebar');stickyCol.css({display:'block'});}
stickyCol.theiaStickySidebar({minWidth:940,updateSidebarHeight:false,additionalMarginTop:add,additionalMarginBottom:20,disableOnResponsiveLayouts:false});const options=stickyCol.data('tss-options');if(!options){return;}
const stickyInner=stickyCol.find('.theiaStickySidebar');const stickyColHeight=stickyCol.outerHeight();const stickyInnerHeight=stickyInner.outerHeight();$(document).on('sticky-bar-show',()=>{const newMarginTop=add+stickyHeaderHeight();if(stickyInnerHeight+newMarginTop>=stickyColHeight){return;}
if(newMarginTop!==options.additionalMarginTop){if(!sticky.css('transform').includes('-')){options.additionalMarginTop=newMarginTop;setTimeout(()=>$(window).trigger('scroll.TSS'),300);}}});$(document).on('sticky-bar-hide',()=>{options.additionalMarginTop=add;setTimeout(()=>$(window).trigger('scroll.TSS'),300);});});};init();initNative();Bunyad.util.onLoad(()=>setTimeout(()=>{$(window).trigger('resize.TSS');},3500));},sliders:function(){if(!$.fn.flexslider){return;}
var is_rtl=($('html').attr('dir')=='rtl'?true:false);var slider=$('.classic-slider');if(!slider.length){return;}
slider.find('.flexslider').flexslider({controlNav:true,animationSpeed:slider.data('animation-speed'),animation:slider.data('animation'),slideshowSpeed:slider.data('slide-delay'),manualControls:'.main-featured .flexslider .pages a',pauseOnHover:true,start:function(){$('.main-featured .slider').css('opacity',1);},rtl:is_rtl});var pages=slider.find('.pages'),number=parseInt(pages.data('number'));if(number&&number!==5){var width=(100-((number+1)*0.284900285))/number;pages.find('a').css('width',width+'%');}},contentSlideshow:function(){var slideshow_cache={},slideshow_wrap='.post-slideshow .post-pagination-large';if($(slideshow_wrap).length&&!$(slideshow_wrap).data('init')&&$(slideshow_wrap).data('type')=='ajax'){var processing;$(slideshow_wrap).data('init',true);$('.main-content').on('click','.post-slideshow .post-pagination-large .links a',function(){if($('body').hasClass('page')){return;}
var scroll;if($(this).parents('.bottom').length){scroll=true;}
if(processing&&processing.hasOwnProperty('abort')){processing.abort();}
var parent=$(this).closest('.post-slideshow'),url=$(this).attr('href');parent.find('.content-page').removeClass('active').addClass('hidden previous');var show_slide=function(data){if(history.pushState){history.pushState({},'',url);}
var page=$(data).find('.post-slideshow');if(page.length){parent.find('.post-pagination-large').html(page.find('.post-pagination-large').html());parent.find('.content-page').after(page.find('.content-page').addClass('hidden loading'));setTimeout(function(){if(scroll){$('html, body').animate({scrollTop:parent.offset().top-50},200);}
parent.find('.content-page.previous').remove();parent.find('.content-page.loading').removeClass('previous hidden loading').find('img').addClass('appear');},1);}
processing=null;};if(slideshow_cache[url]){show_slide(slideshow_cache[url]);}
else{processing=$.get(url,function(data){slideshow_cache[url]=data;show_slide(data);});}
return false;});$(document).on('keyup',function(e){if(e.which==37){$(slideshow_wrap).find('.prev').parent().click();}
else if(e.which==39){$(slideshow_wrap).find('.next').parent().click();}});}},userRatings:function(){var compute_percent=function(e){var offset=$(this).offset(),position,percent;if($('html').attr('dir')=='rtl'){offset.left=offset.left+$(this).outerWidth();}
position=Math.abs(e.pageX-Math.max(0,offset.left));percent=Math.min(100,Math.round(position/$(this).width()*100));return percent;};var is_points=true,scale=parseInt($('.review-box .value-title').text())||10;if($('.review-box .overall .percent').length){is_points=false;}
$('.user-ratings .main-stars, .user-ratings .rating-bar').on('mousemove mouseenter mouseleave',function(e){var bar=$(this).find('span'),user_ratings=$(this).closest('.user-ratings');bar.css('transition','none');if(user_ratings.hasClass('voted')){return;}
if(e.type=='mouseleave'){bar.css('width',bar.data('orig-width'));user_ratings.find('.hover-number').hide();user_ratings.find('.rating').show();return;}
var percent=compute_percent.call(this,e);if(!bar.data('orig-width')){bar.data('orig-width',bar[0].style.width);}
bar.css('width',percent+'%');user_ratings.find('.rating').hide();user_ratings.find('.hover-number').show().text((is_points?+parseFloat(percent/100*scale).toFixed(1):percent+'%'));});$('.user-ratings .main-stars, .user-ratings .rating-bar').on('click',function(e){var bar=$(this).find('span'),user_ratings=$(this).closest('.user-ratings');if(user_ratings.hasClass('voted')){return;}
var post_data={'action':'bunyad_rate','id':user_ratings.data('post-id'),'rating':compute_percent.call(this,e)};var votes=user_ratings.find('.number'),cur_votes=parseInt(votes.text())||0;user_ratings.css('opacity','0.3');bar.data('orig-width',bar[0].style.width);votes.text((cur_votes+1).toString());$(this).trigger('mouseleave');user_ratings.addClass('voted');$.post(Bunyad.ajaxurl,post_data,function(data){if(data===Object(data)){var cur_rating=user_ratings.find('.rating').text();user_ratings.find('.rating').text(cur_rating.search('%')!==-1?data.percent+' %':data.decimal);bar.css('width',data.percent+'%');bar.data('orig-width',data.percent);}
user_ratings.hide().css('opacity',1).fadeIn('slow');},'json');});},tabWidget:function(){$(document).on('click','.widget-tabbed .heading a',function(){var tab=$(this).data('tab'),tabs_data=$(this).closest('.widget-tabbed').find('.tabs-data'),parent=$(this).parent().parent(),active=parent.find('.active');if(!active.length){active=parent.find('li:first-child');}
active.removeClass('active').addClass('inactive');$(this).parent().addClass('active').removeClass('inactive');var active_data=tabs_data.find('.tab-posts.active');if(!active_data.length){active_data=tabs_data.find('.tab-posts:first-child');}
active_data.hide();tabs_data.find('#recent-tab-'+tab).fadeIn().addClass('active').removeClass('inactive');return false;});},searchModal:function(){let isSetup=false;const target=$('.smart-head .search-icon');const setup=()=>{if(isSetup||!$.fn.magnificPopup){return;}
isSetup=true;const scheme=$('.search-modal-wrap').data('scheme')=='dark'?' s-dark':'';target.magnificPopup({items:{src:'.search-modal-wrap',type:'inline'},removalDelay:400,focus:'input',closeBtnInside:false,closeOnBgClick:false,mainClass:'search-modal'+scheme,midClick:true,fixedContentPos:true,autoFocusLast:false});};target.on('mouseover',setup);setTimeout(setup,400);},lightbox:function(){if(!$.fn.magnificPopup||!$('body').hasClass('has-lb')||(!$('body').hasClass('has-lb-sm')&&$(window).width()<768)){return;}
if(isIframe){return;}
var mfpInit={type:'image',tLoading:'',mainClass:'mfp-fade mfp-img-mobile',removalDelay:300,callbacks:{afterClose:function(){if(this._lastFocusedEl){$(this._lastFocusedEl).addClass('blur');}}}};var filterImages=function(){if(!$(this).attr('href')){return false;}
return $(this).attr('href').match(/\.(jpe?g|webp|png|bmp|gif)($|\?.+?)/);};var addGalleryLightbox=function(context){var gal_selectors='.gallery-slider, .post-content .gallery, .post-content .blocks-gallery-item, .post-content .tiled-gallery, .wp-block-gallery .wp-block-image, .tiled-gallery__gallery .tiled-gallery__item';$(gal_selectors,context).find('a').has('img').filter(filterImages).addClass('lightbox-gallery-img');$('.woocommerce a[data-rel^="prettyPhoto"], a.zoom').addClass('lightbox-gallery-img');gal_selectors+=', .woocommerce .images';$(gal_selectors,context).magnificPopup($.extend({},mfpInit,{delegate:'.lightbox-gallery-img',gallery:{enabled:true},image:{titleSrc:function(item){var image=item.el.find('img'),caption=item.el.find('.caption').html();return(caption||image.attr('title')||' ');}}}));};var addLightboxImages=function(context){var selector=$('.post-content, .main .featured, .single-creative .featured',context).find('a:not(.lightbox-gallery-img)').has('img, .img');selector.add('.lightbox-img').filter(filterImages).magnificPopup(mfpInit);};addGalleryLightbox();addLightboxImages();$('iframe.spc-auto-load-post').each(function(){const iframe=$(this).get(0).contentDocument;addGalleryLightbox(iframe);addLightboxImages(iframe);});}};self.stickyBarPause=false;return self;})(jQuery);Bunyad.util={throttle(fn,delay=150,trails=true){let pause=false;let trail;let timeout=function(){if(trail){fn.apply(trail[0],trail[1]);trail=null;setTimeout(timeout,delay);}else{pause=false;}};return function(...args){if(!pause){fn.apply(this,args);pause=true;setTimeout(timeout,delay);}else if(trails){trail=[this,args];}};},writeRaf(fn,options){var running,args,that;var run=function(){running=false;fn.apply(that,args);};if(!options){options={};}
return function(){args=arguments;that=options.that||this;if(!running){running=true;requestAnimationFrame(run);}};},onLoad(cb){document.readyState==='complete'?cb():window.addEventListener('load',cb);}};(function($){let isInitialized=false;function init(){if(!$('#auth-modal').length){return;}
$(document).on('click','a',e=>{if(e.currentTarget.hash==='#auth-modal'){if(!window.MicroModal){return;}
initModal();MicroModal.show('auth-modal',{awaitCloseAnimation:true});e.preventDefault();}});}
function initModal(e){if(isInitialized){return;}
const modal=$('#auth-modal');const toggle=e=>{modal.find('.auth-modal-login, .auth-modal-register').toggle();e.preventDefault();}
modal.on('click','.register-link, .login-link',toggle);isInitialized=true;}
Bunyad.authModal=init;})(jQuery);(function($){const cache=[];function init(){$('.section-head .subcats a, .block-head .filters a').on('click',e=>{doFilter(e.currentTarget);return false;});}
function doFilter(ele){if($(this).hasClass('active')){return false;}
ele=$(ele);const block=ele.closest('.block-wrap');const blockId=block.data('id');const termId=ele.data('id');const content=block.find('.block-content');const curActive=ele.parents('.filters').find('a.active');if(!curActive.data('id')){cache[`${blockId}-0`]=block[0].outerHTML;}
ele.addClass('active');curActive.removeClass('active');block.data('filter-active',ele.data('id'));const cacheId=`${blockId}-${termId}`;content.removeClass('fade-in-up-lg').addClass('loading');if(!cache[cacheId]){const blockData=block.data('block')||{};blockData.props.filter=termId;const params={action:'bunyad_block',block:blockData};$.post(Bunyad.ajaxurl,params,data=>{cache[cacheId]=data;replaceContent(cache[cacheId],block,content);});}
else{replaceContent(cache[cacheId],block,content);}}
function replaceContent(data,block,content){const newHtml=$(data);const newContent=newHtml.find('.block-content')
newContent.find('img').addClass('no-display appear');newContent.find('.lazyloading').removeClass('lazyloading').addClass('lazyload');content.removeClass('fade-in-up-lg');requestAnimationFrame(()=>{content.html(newContent.html()).removeClass('loading').addClass('fade-in-up-lg').addClass('ready');});block.data('block',newHtml.data('block'));}
Bunyad.blocksFilters=init;})(jQuery);(function($){Bunyad.stickyHeader=function(header,options={}){var nav,isSmart=false,isSticky=false,stickyIsStatic=false,prevScroll=0,curScroll=0,extraTop=0,stickyTop,hideAt,head,headHeight;let stickyBar;let stickyIsActive=false;let hasInitialized=false;const calcHeadSize=Bunyad.util.writeRaf(()=>{if(stickyIsActive){return;}
var new_height=head.css('min-height',0).height();head.css('min-height',new_height);headHeight=new_height;});function setSize(skipCalc){if(skipCalc&&headHeight){return;}
calcHeadSize();}
function removeSticky(simpleHide){if(isSticky){stickyIsActive=false;let visualHide=false;if(simpleHide){if(!nav.hasClass('off')){nav.addClass('off');visualHide=true;}}
else{nav.removeClass('smart-head-sticky off');visualHide=true;}
if(visualHide){setSize(true);$(document).trigger('sticky-bar-hide');}}}
function toggleSticky(){if(stickyIsStatic){return;}
curScroll=$(window).scrollTop();isSticky=nav.hasClass('smart-head-sticky');const stickyWrites=Bunyad.util.writeRaf(()=>{if(curScroll>stickyTop){if(isSmart&&(!prevScroll||curScroll>prevScroll)){removeSticky(true);}
else{stickyIsActive=true;if(!isSmart||curScroll<prevScroll-4&&!Bunyad.theme.stickyBarPause){if(!nav.hasClass('smart-head-sticky')||nav.hasClass('off')){nav.removeClass('off');nav.addClass('smart-head-sticky');$(document).trigger('sticky-bar-show');}}}
prevScroll=curScroll;}else{if(curScroll<=hideAt){prevScroll=0;removeSticky();}}});stickyWrites();}
function checkSmart(){if(head.data('sticky-type')=='smart'){isSmart=true;}
if(isSmart&&nav.length){nav.addClass('is-smart');}}
function setup(){stickyIsStatic=false;if($('.admin-bar').length){extraTop=$('#wpadminbar').height();}
stickyBar=head.data('sticky');if(!stickyBar){return;}
if(stickyBar==='auto'){const menu=head.find('.navigation-main .menu');if(menu.length){const match=menu.eq(0).closest('.smart-head-row').attr('class').match(/smart-head-(top|mid|bot)/);if(!match||!match[1]){return;}
stickyBar=match[1];}}
stickyBar=head.find('.smart-head-'+stickyBar);nav=stickyBar;if(!stickyBar.length){return;}
if(head.data('sticky-full')){stickyBar.addClass('sticky-is-full');}
stickyTop=nav.offset().top-extraTop;hideAt=stickyTop+1;const isLast=head.find('.smart-head-row:last-child').is(stickyBar);if(!isLast){stickyTop=head.offset().top+head.height();hideAt=stickyTop+1;nav.addClass('animate');}
checkSmart();if(isSmart){nav.addClass('animate');}
if(isSmart&&!stickyIsActive){prevScroll=0;}}
function initHandler(){if(hasInitialized){return false;}
if((options.mobile&&$(window).width()>940)||(!options.mobile&&$(window).width()<=940)){return;}
setup();if(!nav||!nav.length){return;}
toggleSticky();Bunyad.util.onLoad(calcHeadSize);$(window).on('scroll',toggleSticky);$(window).on('resize orientationchange',()=>{removeSticky();calcHeadSize();setup();toggleSticky();});hasInitialized=true;$(document).on('ts-sticky-bar-remove',removeSticky);}
function init(header){hasInitialized=false;head=$(header);if(!head.length){return;}
initHandler();$(window).on('resize orientationchange',initHandler);}
init(header);return{init,getSticky:()=>stickyBar,};};})(jQuery);class Bunyad_InView{constructor(elements=[],callback,options={},fallback){this.elements=elements;this.callback=callback;this.options=Object.assign({intersectOnly:true,observeOptions:{},once:false},options);if(!this.callback){return false;}
if(!window.IntersectionObserver){console.warn('Intersection observer missing.');fallback();return false;}
this.observer=new IntersectionObserver(this.handleIntersection.bind(this),this.options.observeOptions);elements.forEach(element=>{this.observer.observe(element);});}
handleIntersection(entries){entries.forEach(entry=>{if(this.options.intersectOnly&&!entry.isIntersecting){return;}
this.callback.call(this,entry);if(this.options.once){this.observer.unobserve(entry.target);}});}}
(function($){const cache=[];function init(){$('.main-wrap').on('click','.main-pagination .load-button, .pagination-numbers[data-type=numbers-ajax] a',e=>{const target=e.currentTarget;if(target.dataset.processing){return;}
target.dataset.processing=true;ajaxPagination(target,()=>{target.dataset.processing=false;});return false;});$('.main-pagination[data-type=infinite]').each(function(){infiniteLoad($(this).get(0));});}
function infiniteLoad(pageEle,options){const block=pageEle.closest('.block-wrap');pageEle._loads=1;options=Object.assign({bottomDeduct:30},options);if(!block){return;}
const offset={top:0,bottom:0};const compute=()=>{const rect=block.getBoundingClientRect();offset.top=rect.top+window.scrollY;offset.bottom=offset.top+block.clientHeight-window.innerHeight;offset.bottom-=pageEle.clientHeight+options.bottomDeduct;}
compute();let isLoading=false;const loadOnScroll=(e)=>{if(isLoading||pageEle._loads>5){return;}
if(window.scrollY>offset.bottom){isLoading=true;pageEle._loads++;ajaxPagination(pageEle.querySelector('.load-button'),()=>{compute();isLoading=false;});}};$(window).on('scroll',Bunyad.util.throttle(loadOnScroll,150,false));$(window).on('resize',Bunyad.util.throttle(compute));}
function ajaxPagination(ele,callback){ele=$(ele);let block=ele.closest('.block-wrap');let isBlock=true;let process=processLoadMore;if(!block.length){isBlock=false;block=ele.closest('.main-content');}
const params={action:'bunyad_block',block:block.data('block')||{},paged:(ele.data('page')||0)+1};const type=ele.closest('.main-pagination').data('type');switch(type){case 'load-more':case 'infinite':ele.addClass('loading').find('.tsi').addClass('tsi-spin');process=processLoadMore;break;case 'numbers-ajax':block.find('.block-content').addClass('loading');const permalink=ele.attr('href').match(/\/page\/(\d+)(\/|$)/);if(permalink!==null){params.paged=permalink[1];}
else{const src=ele.attr('href').match(/(\?|&)paged?=(\d+)/);params.paged=src?src[2]:1;}
block.css('height',block.height());process=processNumbered;break;}
if(isBlock){const ajaxUrl=Bunyad.ajaxurl;const blockId=block.data('id');const cacheId=`${blockId}-${ block.data('filter-active')}-${params.paged}`;if(!cache[cacheId]){$.post(ajaxUrl,params,data=>{requestAnimationFrame(()=>{process(data,block,ele);cache[cacheId]=data;!callback||callback();});});}
else{requestAnimationFrame(()=>{process(cache[cacheId],block,ele);!callback||callback();});}}}
function processNumbered(data,block){const blockContent=block.find('.block-content');blockContent.removeClass('fade-in-down-lg').html($(data).find('.block-content').html());block.css('height','auto');blockContent.addClass('fade-in-down-lg').removeClass('loading');blockContent.on('animationend',e=>blockContent.removeClass('fade-in-down-lg'));Bunyad.theme.stickyBarPause=true;setTimeout(()=>{Bunyad.theme.stickyBarPause=false;},300);$('html, body').animate({scrollTop:block.offset().top-50},200);$(document).trigger('ts-ajax-pagination');}
function processLoadMore(data,block,ele){var content=$(data),posts;const isMixed=block.data('is-mixed');const wrap=isMixed?block.find('.block-content'):block.find('.loop');const pagination=block.find('.main-pagination');posts=content.find('.loop').children().addClass('fade-in-up-lg');posts.each(function(){$(this).on('animationend',()=>$(this).removeClass('fade-in-up-lg'));});if(isMixed){pagination.remove();wrap.append(content.find('.block-content').children());}
else{wrap.append(posts);const newPagination=content.find('.main-pagination');if(newPagination.length){pagination.html(newPagination.html());}
else{pagination.remove();}}
if(wrap.hasClass('masonry')){}
$(document).trigger('ts-ajax-pagination');ele.removeClass('loading').find('.tsi').removeClass('tsi-spin');}
Bunyad.pagination=init;})(jQuery);(function($){"use strict";var cache={},timer,element;const self={init:function(){var search=$('.live-search-query');if(!search.length){return;}
$('.live-search-query').attr('autocomplete','off');$('.live-search-query').on('keyup focus',function(){element=$(this).parent();var query=$(this).val(),result;clearTimeout(timer);if(query.length<1){self.add_result('');return;}
timer=setTimeout(function(){self.process(query);},250);});$(document).on('click',function(e){var results=$('.live-search-results');if(results.is(':visible')&&!$(e.target).closest('.search-form').length){results.removeClass('fade-in');results.closest('form').removeClass('has-live-results');}});},process:function(query){if(query in cache){self.add_result(cache[query]);}
else{$.get(Bunyad.ajaxurl,{action:'bunyad_live_search','query':query},function(data){cache[query]=data;self.add_result(data);});}},add_result:function(result){if(!element.find('.live-search-results').length){element.append($('<div class="live-search-results"></div>'));}
var container=element.find('.live-search-results');if(!result){container.removeClass('fade-in');return;}
container.html(result);requestAnimationFrame(function(){container.addClass('fade-in');container.closest('form').addClass('has-live-results');});}};Bunyad.liveSearch=self.init;})(jQuery);(function($){function init(){if(!$.fn.slick){return;}
$('.common-slider .slides:not(.loaded), .loop-carousel:not(.loaded), .gallery-slider:not(.loaded)').each(function(){const slider=$(this);if(slider.hasClass('loaded')){return;}
slider.one('init',function(){$(this).addClass('loaded');});var vars={rows:0,prevArrow:'<a href="#" class="prev-arrow"><i class="tsi tsi-angle-left"></i></a>',nextArrow:'<a href="#" class="next-arrow"><i class="tsi tsi-angle-right"></i></a>',autoplay:slider.data('autoplay')?true:false,autoplaySpeed:slider.data('speed')||5000,fade:slider.data('animation')=='fade'?true:false,rtl:$('html').prop('dir')==='rtl'};const sliderType=slider.data('slider');if(vars.autoplay){slider.on('init afterChange',function(e,slick){var ele=$(this),current=ele.find('[data-slick-index="'+slick.currentSlide+'"]');var img=current.find('.wp-post-image').first();if(!img.length){return;}
var loaded=img.hasClass('lazyloaded')||(img.is('img:not(.lazyload)')&&img.prop('complete'));if(!loaded){img.on('lazyloaded load',function(e){slick.slickPlay();});slick.slickPause();}});}
switch(sliderType){case 'feat-grid':setupFeatGrid(slider,vars);break;case 'carousel':setupCarousel(slider,vars);break;case 'gallery':setupGallery(slider,vars);break;}});$('.common-slider').on('click','.slick-arrow',function(e){e.preventDefault();});}
function setupCarousel(slider,vars){const slidesNum=slider.data('slides')||1;const slidesNumMd=slider.data('slides-md')||(Math.min(4,Math.max(2,slidesNum-1)));const slidesNumSm=slider.data('slides-sm')||1;if(slider.data('arrows')){slider.on('init',(ele)=>{const height=slider.find('.l-post:first-child .media-ratio').outerHeight();if(height){slider[0].style.setProperty('--arrow-top',(height/2)+'px');}});}
slider.slick($.extend(vars,{arrows:slider.data('arrows')?true:false,infinite:true,cssEase:'ease-out',speed:400,dots:slider.data('dots')?true:false,dotsClass:'nav-dots',adaptiveHeight:true,slidesToShow:slidesNum,slidesToScroll:slidesNum,responsive:[{breakpoint:940,settings:{slidesToShow:slidesNumMd,slidesToScroll:slidesNumMd}},{breakpoint:540,settings:{slidesToShow:slidesNumSm,slidesToScroll:slidesNumSm}}]}));}
function setupFeatGrid(slider,vars){const scrollNum=slider.data('scroll-num')||1;let scrollNumMd=slider.data('scroll-num-md');if(!scrollNumMd){scrollNumMd=Math.min(2,Math.max(1,scrollNum-1));}
slider.slick($.extend(vars,{arrows:true,infinite:true,cssEase:'ease-out',speed:500,slidesToShow:scrollNum,slidesToScroll:scrollNumMd,responsive:[{breakpoint:940,settings:{slidesToShow:scrollNumMd,slidesToScroll:scrollNumMd}},{breakpoint:540,settings:{slidesToShow:1,slidesToScroll:1}}]}));}
function setupGallery(slider,vars){vars=Object.assign(vars,{infinite:true,slidesToShow:1,slidesToScroll:1,adaptiveHeight:true});const init=()=>{slider.slick(vars);};init();}
Bunyad.sliders=init;})(jQuery);jQuery(function($){Bunyad.theme.init();Bunyad.pagination();Bunyad.sliders();Bunyad.blocksFilters();Bunyad.stickyHeaders={main:Bunyad.stickyHeader('.smart-head-main',{mobile:false}),mobile:Bunyad.stickyHeader('.smart-head-mobile',{mobile:true})};Bunyad.liveSearch();Bunyad.authModal();});/*!
* FitVids 1.1
* Released under the WTFPL license - http://sam.zoy.org/wtfpl/
*/;(function($){$.fn.fitVids=function(options){var settings={customSelector:null,ignore:null};if(!document.getElementById("fit-vids-style")){var head=document.head||document.getElementsByTagName("head")[0];var css=".fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}";var div=document.createElement("div");div.innerHTML='<p>x</p><style id="fit-vids-style">'+css+"</style>";head.appendChild(div.childNodes[1])}if(options){$.extend(settings,options)}return this.each(function(){var selectors=['iframe[src*="player.vimeo.com"]','iframe[src*="youtube.com"]','iframe[src*="youtube-nocookie.com"]','iframe[src*="kickstarter.com"][src*="video.html"]',"object","embed"];if(settings.customSelector){selectors.push(settings.customSelector)}var ignoreList=".fitvidsignore";if(settings.ignore){ignoreList=ignoreList+", "+settings.ignore}var $allVideos=$(this).find(selectors.join(","));$allVideos=$allVideos.not("object object");$allVideos=$allVideos.not(ignoreList);$allVideos.each(function(){var $this=$(this);if($this.parents(ignoreList).length>0){return}if(this.tagName.toLowerCase()==="embed"&&$this.parent("object").length||$this.parent(".fluid-width-video-wrapper").length){return}if((!$this.css("height")&&!$this.css("width"))&&(isNaN($this.attr("height"))||isNaN($this.attr("width")))){$this.attr("height",9);$this.attr("width",16)}var height=(this.tagName.toLowerCase()==="object"||($this.attr("height")&&!isNaN(parseInt($this.attr("height"),10))))?parseInt($this.attr("height"),10):$this.height(),width=!isNaN(parseInt($this.attr("width"),10))?parseInt($this.attr("width"),10):$this.width(),aspectRatio=height/width;if(!$this.attr("id")){var videoID="fitvid"+Math.floor(Math.random()*999999);$this.attr("id",videoID)}$this.wrap('<div class="fluid-width-video-wrapper"></div>').parent(".fluid-width-video-wrapper").css("padding-top",(aspectRatio*100)+"%");$this.removeAttr("height").removeAttr("width")})})}})(window.jQuery||window.Zepto);jQuery(function($){$('div.quantity:not(.buttons_added), td.quantity:not(.buttons_added)').addClass('buttons_added').append('<div class="vertical-buttons"><input type="button" value="+" class="plus" /><input type="button" value="-" class="minus" /></div>');$(document).on('click','.plus, .minus',function(){var $qty=$(this).closest('.quantity').find('.qty'),currentVal=parseFloat($qty.val()),max=parseFloat($qty.attr('max')),min=parseFloat($qty.attr('min')),step=$qty.attr('step');if(!currentVal||currentVal===''||currentVal==='NaN')currentVal=0;if(max===''||max==='NaN')max='';if(min===''||min==='NaN')min=0;if(step==='any'||step===''||step===undefined||parseFloat(step)==='NaN')step=1;if($(this).is('.plus')){if(max&&(max==currentVal||currentVal>max)){$qty.val(max);}else{$qty.val(currentVal+parseFloat(step));}}else{if(min&&(min==currentVal||currentVal<min)){$qty.val(min);}else if(currentVal>0){$qty.val(currentVal-parseFloat(step));}}
$qty.trigger('change');});});