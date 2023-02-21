// firebase linking object
const firebaseConfig = {
  apiKey: "AIzaSyDeJ38hZjljLSveiw8WwDTe04G-NZA3ViQ",
  authDomain: "todo-app-c8319.firebaseapp.com",
  databaseURL: "https://todo-app-c8319-default-rtdb.firebaseio.com",
  projectId: "todo-app-c8319",
  storageBucket: "todo-app-c8319.appspot.com",
  messagingSenderId: "854841284499",
  appId: "1:854841284499:web:434746a34310c34164fa66"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let inputval = document.getElementById("input");
function storeData() {
  // firebase Database value store in database
  //   initializ the input field to direct stored data in database
  // obj create to store value in database
  let databaseObj = {
    valueOfInput: inputval.value,
  };

  firebase.database().ref("/").child("usersData/").push(databaseObj);
  if (inputval !== "") {
    document.getElementById("input").value = "";
  }
}


// onLoad karny main data screen main araha hai
// is main funtion ko body main onload main call karaya hai
// or create set atrribute sub data base sy data utha kar kia hai
function getDataInScreen() {
  firebase.database().ref("/usersData").on("child_added", function (data) {
      console.log(data.key, data.val());

      //   creat element
      let tablerow = document.createElement("tr");
      let storeDataInTd = document.createElement("td");
      let delBtn = document.createElement("td");
      let editBtn = document.createElement("td");
      let deleteb = document.createElement("button");
      let editb = document.createElement("button");
      //   set the value of element use inner html
      storeDataInTd.innerHTML = data.val().valueOfInput;
      deleteb.innerHTML = "Delete";
      editb.innerHTML = "EDIT";
      // now appendchild to apped the element in table
      let table = document.getElementById("dataStro");
      editBtn.appendChild(editb);
      delBtn.appendChild(deleteb);
      tablerow.appendChild(storeDataInTd);
      tablerow.appendChild(delBtn);
      tablerow.appendChild(editBtn);
      table.appendChild(tablerow);
      // set del edit attribute

      storeDataInTd.setAttribute("class", "todoTask");
      deleteb.setAttribute("id", data.key);
      deleteb.setAttribute("onclick", "deleterow(this)");
      editb.setAttribute("onclick", "editrow(this)");
      editb.setAttribute("id", data.key);
    });
}

// make del function on delbtn and del the row using remove()
function deleterow(val) {
  // id main key ki value set kar ky us ki sy del kia hai
  // console.log(val.id);
  app.database().ref("/").child("usersData").child(val.id).remove();
  val.parentNode.parentNode.remove();
}
// making edit funtion on edit btn
function editrow(val) {
  // give the id to target on other function and foucs ( )use to focus input when click in edit btn
  // let focusOnIput = inputval.focus();
  let inputvals = document.getElementById("input");

  val.setAttribute("class", "editedBTN");
  inputvals.value = val.parentNode.parentNode.childNodes[0].innerHTML;
  document.getElementById("btn").className = "hidden";
  if ((document.getElementById("uPt").className = "hidden")) {
    document.getElementById("uPt").className = "visible";
  }
}

// making update function to update the edit task
function update() {
  let whichRowUpdate = document.querySelector(".editedBTN");
  console.log(whichRowUpdate.id);
  let editedTextfrbd = {
    valueOfInput: inputval.value,
    key: whichRowUpdate.id,
  };
  app
    .database()
    .ref("/")
    .child("usersData/")
    .child(whichRowUpdate.id)
    .set(editedTextfrbd);
  whichRowUpdate.parentNode.parentNode.childNodes[0].innerHTML = inputval.value;
  console.log(
    whichRowUpdate.parentNode.parentNode.childNodes[0],
    inputval.value
  );

  //   document.getElementById("btn").className = "visible";
  //   if ((document.getElementById("uPt").className = "visible")) {
  //     document.getElementById("uPt").className = "hidden";
  //   }
}
