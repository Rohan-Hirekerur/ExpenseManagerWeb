
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
  if (firebase.auth().currentUser) {
    // [START signout]
    firebase.auth().signOut();
  }
});
