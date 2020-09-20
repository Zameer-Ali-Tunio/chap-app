
// Sign in start


var err_m=document.getElementById("error_m")
var r_err=document.getElementById("r_err")
let SignIn=()=>{
    firebase.auth().signInWithEmailAndPassword(email.value, password.value)
    .then(()=>{
        window.location='login.html'
    })   
    .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        err_m.innerHTML=errorMessage
      })
    }
// end of sign in
// sign up by email and pass start
let SignUp=()=>{
    var name=document.getElementById('Name')
    var email=document.getElementById('Email')
    var password=document.getElementById('Password')
    var C_password=document.getElementById('C-Password')
    var T_C=document.getElementById('T&C').checked
    
    if(password.value===C_password.value){
        if(T_C===true){
    firebase.auth().createUserWithEmailAndPassword(email.value,password.value)
    .then(result=>{
        console.log(result)
        window.location='login.html'
    })   
    .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        r_err.innerHTML=errorMessage
      })
    }
    else{
        r_err="Please Accept Terms and Conditions"
    }
    }
    else{
        r_err="Password Does not Match"
    }
}
// Sign up by email and pass end

// fb login  start
let fblogin=()=>{
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider)
    .then(function(result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        var username=result.user.displayName
        var userpic=result.user.photoURL
        // ...
        
        window.location='index.html'

      })
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
        err_m.innerHTML=errorMessage
      });
      
}
// fb login  end
// Google login  start
var ex=(data)=>{
console.log(data)}

let googlelogin=()=>{
  
  let promise= new Promise(function(resolve,reject){
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
    .then(function(result) {
        var token = result.credential.accessToken;
        var user = result.user;
        var username=result.user.displayName
        var userpic=result.user.photoURL
        resolve(username,userpic)
        window.location='index.html'
      })
    .catch(function(error) {
        // Handle Errors here.
        reject(error)
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        
        err_m.innerHTML=errorMessage
      });
    })
    promise
    .then(function(result){
      console.log("result",result)
      var userName=document.getElementById('user-name')
  var userPic=document.getElementById('user-pic')
  userName.innerHTML='zam'
  userPic.src="sss"

    })
    .catch(function(error){
      console.log("rer",error)
    })

}

// Google login  end
// github login  start
let githublogin=()=>{
  var provider = new firebase.auth.GithubAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then(function(result) {
        // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
        // You can use these server side with your app's credentials to access the Twitter API.
        var token = result.credential.accessToken;
        var secret = result.credential.secret;
        // The signed-in user info.
        var user = result.user;
        // ...
        window.location='login.html'
      })
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
        err_m.innerHTML=errorMessage
      });
      
}
// github login  end

