// JavaScript Documenta
var currentUserKey = '' ;
var chatkey = '';

 function show_chat(friendKey, friendName, friendPhoto) {

	var friendList = { friendId: friendKey, userId: currentUserKey };
	friend_id = friendKey;
	
	var db = firebase.database().ref('friend_list');
	var flag = false;
	db.on('value', function (friends) {
		friends.forEach(function (data) {
			var user = data.val();
			if ((user.friendId === friendList.friendId && user.userId === friendList.userId) || ((user.friendId === friendList.userId && user.userId === friendList.friendId))) {
				flag = true;
				chatKey = data.key;
			}
		});
	
		if (flag === false) {
			chatKey = firebase.database().ref('friend_list').push(friendList, function (error) {
				if (error) alert(error);
				else {
					document.getElementById('chat-panel').removeAttribute('style','height:100%');
					document.getElementById('srat-div').setAttribute('style', 'display:none');
					
				}
			}).getKey();

			
			
		}
		else {
			document.getElementById('chat-panel').removeAttribute('style','height:100%');
			document.getElementById('srat-div').setAttribute('style', 'display:none');
			
		}
	   
		document.getElementById("friend_profile_name").innerHTML = friendName; 
			document.getElementById("friend_profile_seen").innerHTML = "10/9/2020"
			document.getElementById("friend_profile_img").src = friendPhoto;
			document.getElementById("msg-show-area").innerHTML = '';
		
			

		
			document.getElementById("msg").value='';
			document.getElementById("msg").focus();

			display_msg(chatKey,friendPhoto);
		 
			
	});
	

 }

 let display_msg = (chatKey,friendPhoto) =>{
	 var db = firebase.database().ref("chatMessages").child(chatKey);
	 db.on("value",function(chats){
		var messageDisplay = '';
		 chats.forEach(function(data){
			var chat = data.val()
			var dateTime = chat.datetime.split(",");

			 if (chat.userid !== currentUserKey) {
                messageDisplay += `<div class="containerS">
				<img src="${friendPhoto}" alt="Avatar">
				<p>${chat.msg}</p>
				<span class="time-right" title="${dateTime[1]}">${dateTime[0]}</span>
			  </div>`;
            }
            else {
				messageDisplay += 
				` <div class="containerS darker">
				<img src="${firebase.auth().currentUser.photoURL}" alt="Avatar" class="right">
				<p>${chat.msg}</p>
				<span class="time-left" title="${dateTime[1]}">${dateTime[0]}</span>
			  </div>`;
            }
		
			

		 })
		 document.getElementById("msg-show-area").innerHTML = messageDisplay;
		 document.getElementById("msg").value = "";
		 document.getElementById("msg").focus();
	 })
 }


 let show_area = ()=>{
	 document.getElementById("side-1").classList.remove('d-none' ,'d-md-block');
	 document.getElementById("side-2").classList.add('d-none');
 }

 let send_msg = ()=>{

	var msg_text = document.getElementById("msg").value;

	var message = {
		userid :currentUserKey,
		msg : msg_text ,
		datetime : new Date().toLocaleString()
	}

	firebase.database().ref('chatMessages').child(chatKey).push(message, function (error) {
		if (error) alert(error);
		else{
		document.getElementById("msg").value = "";
		document.getElementById("msg").focus();
		document.getElementById("msg-show-area").scrollTo(0,document.getElementById("msg-show-area").clientHeight)
		}
	})



 }
 let load_chat_recent = ()=>{
	var db = firebase.database().ref('friend_list');
    db.on('value', function (lists) {
        lists.forEach(function (data) {
            var lst = data.val();
            var friendKey = '';
            if (lst.friendId === currentUserKey) {
                friendKey = lst.userId;
            }
            else if (lst.userId === currentUserKey) {
                friendKey = lst.friendId;
            }
			firebase.database().ref('users').child(friendKey).on('value', function (data) {
				var user = data.val();
				document.getElementById('lstChat').innerHTML += `<li class="list-group-item list-group-item-action " onclick="show_chat('${data.key}', '${user.name}', '${user.photourl}')"
				style=" margin:20px;>
						<div class="row">
							<div class="col-md-2">
								<img src="${user.photourl}" class="friend-pic rounded-circle" />
							</div>
							<div class="col-md-10" style="cursor:pointer;">
								<div class="name">${user.name}</div>
								<div class="under-name">This is some message text...</div>
							</div>
						</div>
					</li>`;

					

			})
		 })
	 })
 }

 let sigin = ()=>{
	var provider = new firebase.auth.GoogleAuthProvider();
	firebase.auth().signInWithPopup(provider)
 }

 let signout = ()=>{
	 var x = firebase.auth().signOut();

	 if(x)
	 {
		 alert("Log Out");
		window.location("Index.html");
	 }
	
 }

 let OnFirebaseStateChanged = ()=>{
	 firebase.auth().onAuthStateChanged(onStateChanged);
 }

 let onStateChanged = user =>{
	 if(user){
		 var user_email = firebase.auth().currentUser.email;
		 var user_name = firebase.auth().currentUser.displayName;
		 var user_pic = firebase.auth().currentUser.photoURL;

		 var userprofile = {email : user_email, name : user_name , photourl : user_pic}

		 var db = firebase.database().ref("users");
		 flag  = false;
		 db.on("value",function(users){
				users.forEach(function(data){
					var user = data.val();
					if(user.email === firebase.auth().currentUser.email)
						{
							currentUserKey = data.key;
							flag = true;
						}
					
				});
				if(flag === false)
				{
					firebase.database().ref("users").push(userprofile,callback);
					
				}	
				else{
			 
					var user_email = firebase.auth().currentUser.email;
				var user_name = firebase.auth().currentUser.displayName;
				var user_pic = firebase.auth().currentUser.photoURL;
				
				document.getElementById("img-profile").src = user_pic;
				document.getElementById("img-profile").title = user_name;
				document.getElementById("display_name").innerHTML=user_name;
				
				document.getElementById("linksignin").style = "display:none";
				document.getElementById("linksignout").style ="";
				document.getElementById("new_chat").style = "";
				load_chat_recent();
				
				}
	   
				
		 });
		 
	 }
	 else{
		document.getElementById("img-profile").src = "img/icon.png";
		document.getElementById("img-profile").title ="User Nmae";
		document.getElementById("display_name").innerHTML="User Name";

		document.getElementById("linksignin").style = "";
		document.getElementById("linksignout").style ="display:none";

		document.getElementById("new_chat").style = "display:none";

		alert("USER NOTR LOGIN")
		
		
	 }
 }
 

 let callback = error =>{
if(error){
	alert(error)
}
else{
		var user_email = firebase.auth().currentUser.email;
		 var user_name = firebase.auth().currentUser.displayName;
		 var user_pic = firebase.auth().currentUser.photoURL;

		 document.getElementById("img-profile").src = user_pic;
		 document.getElementById("img-profile").title = user_name;
		 document.getElementById("display_name").innerHTML=user_name;
		
		 document.getElementById("linksignin").style = "display:none";
		document.getElementById("linksignout").style ="";

}
 }

   function progress(){
	 var list = "";
	 var db = firebase.database().ref("users");
	 db.on("value",function(users){
		 if(users.hasChildren())
		 {
			 list = `<li class="list-group-item" >
			 <input type="text" placeholder="Correct Email Adress Type Here" class="form-control" id="friend_email"/>
			 <spna><input type="submit" onclick="serch_friend()" class="btn btn-primary" style="margin-top:20px;" /></span>
		 </li>`
		 }
		users.forEach(function(data){
			var user = data.val();
			
			if(user.email !== firebase.auth().currentUser.email)
			{
				// list += `<li class="list-group-item  " onclick="show_chat('${data.key}','${user.name}','${user.photourl}')" data-dismiss="modal">
				// <div class="row">
				// <div class="col-md-2"><img src="${user.photourl}" class="img_profile "/></div>
				// <div class="col-md-10 d-none d-md-block" style="cursor: pointer;" >
				// 	<div class="name">${user.name}</div>
				// </div>
				// </div>
				// </li>`
				
			}
			

		});
		document.getElementById("show_friend").innerHTML = list;
	});
	
 }

 OnFirebaseStateChanged();

 function openNav() {
	progress();
	document.getElementById("mySidebar").style.width = "100%";
  }
  
  function closeNav() {
	document.getElementById("mySidebar").style.width = "0";
  }

  let serch_friend = () =>{
	{
		var list = "" ;
		alert(firebase.auth().currentUser.email)
		user_serch_email = document.getElementById("friend_email").value;
		var db = firebase.database().ref("users");
		db.on("value",function(users){
		   users.forEach(function(data){
			   var user = data.val();
			   
			   if(user.email === user_serch_email && user_serch_email !== firebase.auth().currentUser.email)
			   {
				list = `<li class="list-group-item  " onclick="show_chat('${data.key}','${user.name}','${user.photourl}')" data-dismiss="modal">
				<div class="row">
				<div class="col-md-2"><img src="${user.photourl}" class="img_profile "/></div>
				<div class="col-md-10 d-none d-md-block" style="cursor: pointer;" >
					<div class="name">${user.name}</div>
				</div>
				<a href="#" onclick="closeNav()" >Close</a>
				</div>
				</li>`
				   
			   }
			   else{
				list = `<li class="list-group-item  " onclick="show_chat('${data.key}','${user.name}','${user.photourl}')" data-dismiss="modal">
				<div class="row">
				No Person Avaliable With This Email ${user_serch_email}</br>
				<a href="#" onclick="closeNav()" >Close</a>
				</div>
				</li>`
			   }
			   
   
		   });

		   document.getElementById("show_friend").innerHTML = list;
		  
	   });
	   
	}
  }
// firebase.database().ref("users").remove()