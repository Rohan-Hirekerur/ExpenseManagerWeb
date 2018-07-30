var userId;

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var displayName = user.displayName;
    var email = user.email;
    var emailVerified = user.emailVerified;
    var photoURL = user.photoURL;
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    var providerData = user.providerData;
    userId = firebase.auth().currentUser.uid;
    var user = firebase.database().ref('users/' + userId);
    var entriesInDB = firebase.database().ref("/users/" + userId + "/entries");
    user.once('value', function(snap){
      var details = snap.val();
      $("#in-box").text("Income : " + details.income);
      $("#bal-box").text("Balance : " + details.balance);
      $("#ex-box").text("Expenses : " + details.expenses);
    });

    entriesInDB.on('child_added', function(snap){
      //localEntries.push(snap.val());
      entry = snap.val();
      console.log("added" + entry.title);
      if(entry.income) {
        $("#ballist").prepend('<li class="listItem"><img class="listimg" src="./img/incarrow.png" alt="income"><div class="item-content"><p class="li_header">'+entry.title+'</p><div class="details"><p>Date : '+entry.date+' &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Amount : '+entry.amount+'</p></div></div><div class="hline"></div></li>')
        $("#inlist").prepend('<li class="listItem"><img class="listimg" src="./img/incarrow.png" alt="income"><div class="item-content"><p class="li_header">'+entry.title+'</p><div class="details"><p>Date : '+entry.date+' &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Amount : '+entry.amount+'</p></div></div><div class="hline"></div></li>')
      }
      else {
        $("#ballist").prepend('<li class="listItem"><img class="listimg" src="./img/exparrow.png" alt="income"><div class="item-content"><p class="li_header">'+entry.title+'</p><div class="details"><p>Date : '+entry.date+' &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Amount : '+entry.amount+'</p></div></div><div class="hline"></div></li>')
        $("#exlist").prepend('<li class="listItem"><img class="listimg" src="./img/exparrow.png" alt="income"><div class="item-content"><p class="li_header">'+entry.title+'</p><div class="details"><p>Date : '+entry.date+' &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Amount : '+entry.amount+'</p></div></div><div class="hline"></div></li>')
      }
    });

    user.on('value', function(snap){
      var details = snap.val();
      console.log(snap +"\n"+ details);
      $("#in-box").text("Income : " + details.income);
      $("#bal-box").text("Balance : " + details.balance);
      $("#ex-box").text("Expenses : " + details.expenses);
    });

    // ...
    console.log('in');
  } else {
    // User is signed out.
    // ...
    window.location.href="login.html";
    console.log('out');
  }
});

$("#add").click(function(){
  $("#main").toggleClass("cover");
  $("#addPage").toggleClass("cover");
});
$("#cancel").click(function(){
  $("#main").toggleClass("cover");
  $("#addPage").toggleClass("cover");
});

$("#done").click(function(){
  var entryTitle = $("#title-box").val();
  var entryAmount = Number($("#amount-box").val());
  var income = $("#income-box").prop('checked');
  var entry = {
    title:  entryTitle,
    income: income,
    amount: entryAmount,
    date: "6/07/2018"
  };
  var newEntryKey = firebase.database().ref('/users/' + userId).push().key;
  var updates = {};
  var info = firebase.database().ref('users/' + userId);
  info.once('value', function(snapshot){
    user = snapshot.val();
    console.log(user);
    updates['/entries/' + newEntryKey] = entry;
    if(entry.income) {
      updates["/balance"] = Number(user.balance) + Number(entry.amount);
      updates["/income"] = Number(user.income) + Number(entry.amount);
    }
    else {
      updates["/balance"] = Number(user.balance) - Number(entry.amount);
      updates["/expenses"] = Number(user.expenses) + Number(entry.amount);
    }
    return firebase.database().ref('/users/' + userId).update(updates);
  });
  $("#main").toggleClass("cover");
  $("#addPage").toggleClass("cover");

});

$("#logout").click(function(){
  if (firebase.auth().currentUser) {
    // [START signout]
    firebase.auth().signOut();
  }
});


/*
users {
email
Balance
Income
Expenses
entries {
Title
Amount
Date
Type
}
}
*/
