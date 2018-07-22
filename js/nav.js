$('#btnInc').click(function(){
  $(this).addClass('active');
  $('#btnBal').removeClass('active');
  $('#btnExp').removeClass('active');
  $('#inpage').removeClass('hide')
  $('#balpage').addClass('hide');
  $('#expage').addClass('hide');
});

$('#btnBal').click(function(){
  $(this).addClass('active');
  $('#btnInc').removeClass('active');
  $('#btnExp').removeClass('active');
  $('#balpage').removeClass('hide')
  $('#inpage').addClass('hide');
  $('#expage').addClass('hide');
});

$('#btnExp').click(function(){
  $(this).addClass('active');
  $('#btnBal').removeClass('active');
  $('#btnInc').removeClass('active');
  $('#expage').removeClass('hide')
  $('#balpage').addClass('hide');
  $('#inpage').addClass('hide');
});
