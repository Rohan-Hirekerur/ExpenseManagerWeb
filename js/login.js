var config = {
  apiKey: "AIzaSyCxQ1dbfI3oBXVKSL_NDnrPulwB8gcPMsc",
  authDomain: "expense-manager-fc1cd.firebaseapp.com",
  databaseURL: "https://expense-manager-fc1cd.firebaseio.com",
  projectId: "expense-manager-fc1cd",
  storageBucket: "",
  messagingSenderId: "916352200202"
};
firebase.initializeApp(config);
var database = firebase.database();


$("#submit").click(function(event){
  var email = $("#email-box").val();
  var password = $("#pass-box").val();

  if (email.length < 4) {
    alert('Please enter an email address.');
    return;
  }
  if (password.length < 4) {
    alert('Please enter a password.');
    return;
  }

  $("#card").toggleClass("hide");
  $("#loader-parent").toggleClass("hide");

  firebase.auth().signInWithEmailAndPassword(email, password).then(function(){
    window.location.href = 'index.html';
  }).catch(function(error) {
    $("#card").toggleClass("hide");
    $("#loader-parent").toggleClass("hide");
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode === 'auth/wrong-password') {
      alert('Wrong password.');
    } else {
      alert(errorMessage);
    }
    console.log(error);
    return;
  });
  console.log("working");
});

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log("signed in");
  }
});

$("a.forgot").click(function(){
  var email = $("#email-box").val();
  if (email.length < 4) {
    alert('Please enter an email address.');
    return;
  }
  console.log("forgot-click" + email);

  $("#card").toggleClass("hide");
  $("#loader-parent").toggleClass("hide");

  firebase.auth().sendPasswordResetEmail(email).then(function() {
    alert('Password Reset Email Sent! \nFollow the instructions in the mail to reset your password.');
    $("#card").toggleClass("hide");
    $("#loader-parent").toggleClass("hide");
  }).catch(function(error) {
    $("#card").toggleClass("hide");
    $("#loader-parent").toggleClass("hide");
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode == 'auth/invalid-email') {
      alert(errorMessage);
    } else if (errorCode == 'auth/user-not-found') {
      alert(errorMessage);
    }
    console.log(error);
  });


});

$("a.tex").click(function(){
  var email = $("#email-box").val();
  var password = $("#pass-box").val();

  if (email.length < 4) {
    alert('Please enter an email address.');
    return;
  }
  if (password.length < 4) {
    alert('Please enter a password.');
    return;
  }

  $("#card").toggleClass("hide");
  $("#loader-parent").toggleClass("hide");

  firebase.auth().createUserWithEmailAndPassword(email, password).then(function(){
    var userId = firebase.auth().currentUser.uid;
    firebase.database().ref('users/' + userId).set({
    email: email,
    balance: 0,
    income: 0,
    expenses: 0
  });
    firebase.auth().signInWithEmailAndPassword(email, password).then(function(){
      firebase.auth().currentUser.sendEmailVerification().then(function() {
        alert('Email Verification Sent! Check your mail !');
        $("#card").toggleClass("hide");
        $("#loader-parent").toggleClass("hide");
      });
    }).catch(function(error) {
      $("#card").toggleClass("hide");
      $("#loader-parent").toggleClass("hide");
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
      return;
    });
  }).catch(function(error) {
    $("#card").toggleClass("hide");
    $("#loader-parent").toggleClass("hide");
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode == 'auth/weak-password') {
      alert('The password is too weak.');
    } else {
      alert(errorMessage);
    }
    console.log(error);
  });
});
