    $(document).ready(function() {
       
        // this hides the form buttons and the text of the website when printing
       $('.bnt').click(function(e){
            e.preventDefault();
            $('form').hide();
            $('button').hide();
            $('.title').hide();
            window.print();

        //timer to bring the form, button, and text back in the page
            setTimeout(function (){
                console.log("show");
                $('form').fadeIn();
                $('button').fadeIn();
                $('.title').fadeIn();
            }, 100);
        });

        // create listener for form submit event
        $('#photo-form').on('submit', function(e) {
            // prevent page from reloading
            e.preventDefault();
            // get tag from the input field
            var tag = $('input').val();
            // make ajax request
            getPhotosForTag(tag);
        });

        function getPhotosForTag(tag) {
            // make an ajax request and use the tag entered in the form to construct the instagram url
            $.ajax({
                url: "https://api.instagram.com/v1/tags/" + tag + "/media/recent?access_token=2339943.1fb234f.44384f3946ff44cb83a3068374578484&count=50",
                type: "GET",
                crossDomain: true, // used to prevent cross domain issues
                dataType: 'jsonp', // used to prevent cross domain issues
                success: function(data) {
                    // parse the json to add the photos to the dom
                    parsePhotos(data);
                },
                error: function(error) {
                    console.log(error);
                }
            });
        }

        function parsePhotos(json) {
            // if there are existing photos, remove them
            // $('#photos').empty();
            // loop through each object and extract the data we want function(index,object)

            $.each(json.data, function(index, val) {
                // get a reference to the photo, user, and username
                var photo = val.images.thumbnail.url;
                var user = val.user.profile_picture;
                var username = val.user.username;
                // when the instagram image is finished loading, replace the loading image with it
                $('<img/>').attr('src', photo).on('load', function() {
                    // update the photo
                    $('#' + val.id).html(this);
                });
                // add a new list item for the current object with a loading indicator
                $('<li id="' + val.id + '"><img src="images/loading.gif"/></li>').appendTo('#photos');
                //pick an specific li element to put the effect and erase them from the dom
                if (index == json.data.length-1){
                    $('li').click(function(){
            // animate and remove the element from the dom     
            $(this).slideUp(300,function(){
                console.log("up");
                $(this).remove();
            });   
        });
                $("li").hover(function(){ // When mouse pointer is above the photo id
      // Make the image inside li transparent
      $(this).find("img").animate(
        {opacity:"0.5"},
        {duration:300}
        );
  },
    function(){ // When mouse pointer move out of the link
      // Return image to its previous state
      $(this).find("img").animate(
        {opacity:"1"},
        {duration:300}
        );
  });
            }
        });
}

});









