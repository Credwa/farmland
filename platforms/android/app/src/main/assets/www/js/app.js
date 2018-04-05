$(document).foundation();

$(document).ready(function(){

console.log('LOADED');


var menu1 = $('.top-bar');
var menu2 = $('.main-nav');
var page_holder = $('#page-data');

// Initial sign in
$('.sign-in').click(function(event){

    console.log('Clicked');
    event.preventDefault();


    TweenLite.to(menu1, .75, {css:{top:0}, ease:Power3.easeOut});
    TweenLite.to(menu2, .75, {css:{bottom:0}, ease:Power3.easeOut,onComplete:loadHome});

    function loadHome(){
      console.log('Enter Home');
      loadPage('Tasks',0,'tasks');
    }

  });


function hideMenu(){

  // var menu1 = $('.top-bar');
  // var menu2 = $('.main-nav');

  // TweenLite.to(menu1, .75, {css:{top:0}, ease:Power3.easeOut});
  // TweenLite.to(menu2, .75, {css:{bottom:0}, ease:Power3.easeOut,onComplete:loadHome});

}





   $(".main-btn").click(function(event){

     event.preventDefault();
     var post_id = $(this).data('post');
     var title = $(this).data('title');
     var screen = $(this).data('screen');
     console.log('Title = '+title+'Post_id = '+post_id+'Screen = '+screen);
     loadPage(title,post_id,screen);

    });



   /** ------------ AJAX PAGE LOAD -------------- **/
function loadPage(title,post_id,screen)
{
    $('.loader-holder').css('display','block');
    $.ajax({
    url: "http://oxrpts.farmlandmedia.com/wp-admin/admin-ajax.php",
    type:'POST',
    data: 'action=new_page&post_id='+ post_id+'&screen='+ screen+'&title='+ title,
      success: function(html)
      {
        console.log('Success');
        $("#page-title").text(title);
        $("#page-data").empty();
        $("#page-data").append(html);   // This will be the div where our content will be loaded
        $(document).foundation();
        $('.loader-holder').css('display','none');
      }
    });
    return false;

}



$("#page-data").on("click",".task-btn", function(event){

     event.preventDefault();
     var post_id = $(this).data('post');


     TweenLite.to(menu1, .5, {css:{top:'-20rem'}, ease:Power3.easeOut});
     TweenLite.to(menu2, .5, {css:{bottom:'-20rem'}, ease:Power3.easeOut,onComplete:loadNext});

     function loadNext(){
      TweenLite.to(page_holder, .5, {css:{opacity:0}, ease:Power3.easeOut,onComplete:loadNext2});


     }

     function loadNext2(){
      $('.loader-holder').css('display','block');
      loadTask(post_id);
     }



  });




   /** ------------ AJAX PAGE LOAD -------------- **/
function loadTask(post_id){

            $.ajax({
                url: "http://oxrpts.farmlandmedia.com/wp-admin/admin-ajax.php",
                //url : "simple.html",
                //type: 'POST',
                type : 'GET',
                data: 'action=new_task&post_id='+ post_id,
                success: function(html){
                    console.log('Success TASSK');
                    //$("#page-title").text(title);

                       $("#page-data").empty();
                       $("#page-data").append(html); // I am loading the content here
                       $(document).foundation();
                       bigmap();
                       $('.loader-holder').css('display','none');
                       TweenLite.to(page_holder, .5, {css:{opacity:1}, ease:Power3.easeOut});

                }
            });
           return false;
        }


//loadTask(0);












});







