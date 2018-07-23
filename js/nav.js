$('#btnInc').click(function(){
  $(this).addClass('active');
  $('#btnBal').removeClass('active');
  $('#btnExp').removeClass('active');
  $('#balpage').addClass('hide');
  $('#expage').addClass('hide');
  $('#inpage').removeClass('hide')
});

$('#btnBal').click(function(){
  $(this).addClass('active');
  $('#btnInc').removeClass('active');
  $('#btnExp').removeClass('active');
  $('#inpage').addClass('hide');
  $('#expage').addClass('hide');
  $('#balpage').removeClass('hide')     
});

$('#btnExp').click(function(){
  $(this).addClass('active');
  $('#btnBal').removeClass('active');
  $('#btnInc').removeClass('active');
  $('#balpage').addClass('hide');
  $('#inpage').addClass('hide');
  $('#expage').removeClass('hide')
});
