var t_mess=document.getElementById('T-Mess')
var tm_send=document.getElementById('TM-send')
var m_div=document.getElementById('M-div')
// if(login==true){
//    window.location="index.html"
// }
// else{
//     window.location="login.html"
// }
// var checkbox=document.createElement('input')
// var checks=document.getElementById("check")
// get data of database from firebase database start here
firebase.database().ref('Messages/').on('child_added',function(data){
    var p=document.createElement('p')
    var span=document.createElement('span')
    var text=document.createTextNode(data.val().value)
    text.value
    span.appendChild(text)

    span.setAttribute('class','bg-primary text-wh border1 px-2 mr-1 ')
    p.setAttribute('class','text-right mr-1')
    // checkbox.setAttribute('type','checkbox')
    // checkbox.setAttribute('id','check')
    // checkbox.setAttribute('class','float-right mt-2 pt-1 mr-3')
   
m_div.appendChild(p)
p.appendChild(span)
// p.appendChild(checkbox)

})
// message send by enter key
t_mess.onkeypress=function(e){
if(e.keyCode===13){
    send()
}
}

function send(){
    // firebase database start
    if(t_mess.value===""){

    }
    else{
        var key=firebase.database().ref().push().key
        var mess_obj={
            value:t_mess.value,
            key:key
        }
        firebase.database().ref('Messages/').child(key).set(mess_obj)
            // firebase database end
        t_mess.value=""
    }

}

// DltAll btn start here
function dltall(){
    if(m_div.innerHTML==""){
    }
    else{
        firebase.database().ref('Messages/').remove()
        m_div.innerHTML=""
    }
}
// DltAll btn end here
// Delete btn start
// function DltBtn(para){
// firebase.database().ref('ToDo').child(para.id).remove()
// para.parentNode.remove()
// }
// delete btn end

// edit btn start
// function editBtn(para){
// var editval=prompt('Edit ToDo',para.parentNode.firstChild.nodeValue)
// var editTodo={
//     value:editval,
//     key:para.id
// }
// firebase.database().ref('ToDo/').child(para.id).set(editTodo)
// para.parentNode.firstChild.nodeValue=editval
// }
// edit btn end

