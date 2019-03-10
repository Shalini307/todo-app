$(document).ready(function(){

  $('form').on('submit', function(){

      var item = $('form input');
      var todo = {item: item.val()};

      $.ajax({
        type: 'POST',
        url: '/todo',
        data: todo,
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });

      return false;

  });

  $('li').on('click', function(){
      var item = $(this).text().replace(/ /g, "-");//replace blank space with -
      $.ajax({
        type: 'DELETE',
        url: '/todo/' + item,//this is the url to be deleted e.g--/todo/walk-dog
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });
  });

});
