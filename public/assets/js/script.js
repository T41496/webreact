$(document).ready(function() {

//Global variable for starting page
                var currentPageId = "page-home";
                var currentSelectorId = "home";

                //Function for getting the button ids
                function getButtons(){
                    //List of button ids
                    var list = ["home", "notification", "post", "chat", "account"];
                    return list;
                }

                function changePage(){
                    var currentSelector = document.getElementById(currentSelectorId);
                    var currentPage = document.getElementById(currentPageId);
                    var pageId = "page-"+this.id;
                    var page = document.getElementById(pageId);
                    var pageSelector = document.getElementById(this.id);
                    
                    if(page.classList.contains("active")){
                        return;
                    }

                    currentSelector.classList.remove("button-active");
                    currentSelector.classList.add("button-inactive");
                    currentPage.classList.remove("active");
                    currentPage.classList.add("inactive");

                    pageSelector.classList.remove("button-inactive");
                    pageSelector.classList.add("button-active");

                    page.classList.remove("inactive");
                    page.classList.add("active");

                    //Need to reset the scroll
                    window.scrollTo(0,0); 

                    currentSelectorId = this.id;
                    currentPageId = pageId;
                }
});

$(document).ready(function() {

$(document).ready(function(){
                  $('.js-gallery').slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    prevArrow: '<span className="gallery-arrow mod-prev glyphicon glyphicon-chevron-left"></span>',
                    nextArrow: '<span className="gallery-arrow mod-next glyphicon glyphicon-chevron-right"></span>'
                  });
                  
                  $('.js-gallery').slickLightbox({
                    src: 'src',
                    itemSelector: '.js-gallery-popup img',
                    background: 'rgba(0, 0, 0, .7)'
                  });
                });

                // toggle vie comment
                $('.Show').click(function() {
                  $('#target').show(500);
                  $('.Show').hide(0);
                  $('.Hide').show(0);
              });
              $('.Hide').click(function() {
                  $('#target').hide(500);
                  $('.Show').show(0);
                  $('.Hide').hide(0);
              });
              $('.toggle').click(function() {
                  $('#target').toggle('slow');
              });

              
});


$(document).ready(function() {
     // modal
              /**
 * Vertically center Bootstrap 3 modals so they aren't always stuck at the top
 */
$(function() {
    function reposition() {
        var modal = $(this),
            dialog = modal.find('.modal-dialog');
        modal.css('display', 'block');
        
        // Dividing by two centers the modal exactly, but dividing by three 
        // or four works better for larger screens.
        dialog.css("margin-top", Math.max(0, ($(window).height() - dialog.height()) / 2));
    }
    // Reposition when a modal is shown
    $('.modal').on('show.bs.modal', reposition);
    // Reposition when the window is resized
    $(window).on('resize', function() {
        $('.modal:visible').each(reposition);
    });
});

});




// Story Highlights
$(document).ready(function() {

  var initDemo = function(){
        var header = document.getElementById("header");
        var skin = location.href.split('skin=')[1];
        
        if(!skin) {
          skin = 'Snapgram';
        } 

        if(skin.indexOf('#')!==-1){
           skin = skin.split('#')[0];
        }

        var skins = {
          'Snapgram': {
            'avatars': true,
            'list': false,
            'autoFullScreen': false,
                        'cubeEffect': true
          },

          'VemDeZAP': {
            'avatars': false,
            'list': true,
            'autoFullScreen': false,
                        'cubeEffect': false
          },

          'FaceSnap': {
            'avatars': true,
            'list': false,
            'autoFullScreen': true,
                        'cubeEffect': false
          },

          'Snapssenger': {
            'avatars': false,
            'list': false,
            'autoFullScreen': false,
                        'cubeEffect': false
          }
        };
        
        var timeIndex = 0;
        var shifts = [35, 60, 60*3, 60*60*2, 60*60*25, 60*60*24*4, 60*60*24*10];
        var timestamp = function() {
            var now = new Date();
            var shift = shifts[timeIndex++] || 0;
            var date = new Date( now - shift*1000);

            return date.getTime() / 1000;
        };

        var stories = new Zuck('stories', {
          backNative: true,
                    previousTap: true,
          autoFullScreen: skins[skin]['autoFullScreen'],
          skin: skin,
          avatars: skins[skin]['avatars'],
          list: skins[skin]['list'],
                    cubeEffect: skins[skin]['cubeEffect'],
          localStorage: true,
          stories: [
          Zuck.buildTimelineItem(
            "jessica", 
            "assets/images/avatar/user-4.jpg",
            "Jessica",
            "#",
            timestamp(),
            [
              ["jessica-1", "photo", 3, "assets/images/story-1.jpg", "assets/images/story-1.jpg", '', false, false, timestamp()],
              ["jessica-2", "video", 0, "https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/2.mp4", "assets/images/story-2.jpg", '', false, false, timestamp()],
              ["jessica-3", "photo", 3, "assets/images/story-3.jpg", "assets/images/story-3.jpg", '', '', false, timestamp()]
            ]
          ),
          Zuck.buildTimelineItem(
            "Lexy",
            "assets/images/avatar/user-5.jpg",
            "Lexy",
            "",
            timestamp(),
            [
              ["gorillaz-1", "video", 0, "https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/4.mp4", "assets/images/story-4.jpg", '', false, false, timestamp()],
              ["gorillaz-2", "photo", 3, "assets/images/story-5.jpg", "assets/images/story-5.jpg", '', false, false, timestamp()],
            ]
          ),
          Zuck.buildTimelineItem(
            "Alex Mara",
            "assets/images/avatar/user-6.jpg",
            "Alex Mara",
            "",
            timestamp(),
            [
              ["ladygaga-1", "photo", 5, "assets/images/story-1.jpg", "assets/images/story-1.jpg", '', false, false, timestamp()],
              ["ladygaga-2", "photo", 3, "assets/images/story-3.jpg", "assets/images/story-3.jpg",  false, false, timestamp()],
            ]
          ),
          Zuck.buildTimelineItem(
            "sarah",
            "assets/images/avatar/user.jpg",
            "Sarah",
            "",
            timestamp(),
            [
              ["sarah-1", "photo", 5, "assets/images/story-4.jpg", "assets/images/story-4.jpg", '', false, false, timestamp()]
            ]
          ),
          Zuck.buildTimelineItem(
            "bodybylorrie",
            "assets/images/avatar/user-3.jpg",
            "Body by Lorrie",
            "",
            timestamp(),
            [
              ["bodybylorrie", "photo", 10, "assets/images/story-5.jpg", "assets/images/story-5.jpg", '', false, false, timestamp()]
            ]
          )
        ]
        });

                var el = document.querySelectorAll('#skin option');
                var total = el.length;
                for (var i = 0; i < total; i++) {
          var what = (skin==el[i].value)?true:false;
                    
          if(what){
            el[i].setAttribute('selected', what);

            header.innerHTML = skin;
            header.className = skin;
          } else {
            el[i].removeAttribute('selected');
          }
                }

        document.body.style.display = 'block';
      };
      
      initDemo();
});

$(document).ready(function(){
            var submitIcon = $('.searchbox-icon');
            var inputBox = $('.searchbox-input');
            var searchBox = $('.searchbox');
            var isOpen = false;
            submitIcon.click(function(){
                if(isOpen == false){
                    searchBox.addClass('searchbox-open');
                    inputBox.focus();
                    isOpen = true;
                } else {
                    searchBox.removeClass('searchbox-open');
                    inputBox.focusout();
                    isOpen = false;
                }
            });  
             submitIcon.mouseup(function(){
                    return false;
                });
            searchBox.mouseup(function(){
                    return false;
                });
            $(document).mouseup(function(){
                    if(isOpen == true){
                        $('.searchbox-icon').css('display','block');
                        submitIcon.click();
                    }
                });
        });
            function buttonUp(){
                var inputVal = $('.searchbox-input').val();
                inputVal = $.trim(inputVal).length;
                if( inputVal !== 0){
                    $('.searchbox-icon').css('display','none');
                } else {
                    $('.searchbox-input').val('');
                    $('.searchbox-icon').css('display','block');
                }
            }
$(document).ready(function() {

 var lightbox = GLightbox();
        lightbox.on('open', (target) => {
            console.log("lightbox opened");
        });
        var lightboxDescription = GLightbox({
            selector: '.glightbox2',
        });
        var lightboxVideo = GLightbox({
            selector: '.glightbox3'
        });
        lightboxVideo.on('slide_changed', ({ prev, current }) => {
            console.log("Prev slide", prev);
            console.log("Current slide", current);

            const { index, slide, player } = current;

            if (player) {
                if (!player.ready) {
                    // If player is not ready
                    player.on('ready', event => {
                        // Do something when video is ready
                    });
                }

                player.on('play', event => {
                    console.log("Started play");
                });

                player.on('volumechange', event => {
                    console.log("Volume change");
                });

                player.on('ended', event => {
                    console.log("Video ended");
                });
            }
        });

        var lightboxInlineIframe = GLightbox({
            'selector': '.glightbox4'
        });


});






