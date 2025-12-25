// التاكد من قرائة html بشكل كامل
document.addEventListener("DOMContentLoaded", function () {
  var openFormBtn = document.getElementById("add");
  var openFormBtn2 = document.getElementById("add2");
  var closeFormBtn = document.getElementById("close");
  var cancelForm = document.getElementById("cancel");
  var formContainer = document.getElementById("form");

  //فتح الفورم
  openFormBtn.onclick = function () {
    formContainer.classList.remove("d-none");
  };
  openFormBtn2.onclick = function () {
    formContainer.classList.remove("d-none");
  };
  //اغلاق الفورم
  closeFormBtn.onclick = function () {
    formContainer.classList.add("d-none");
  };
  cancelForm.onclick = function () {
    formContainer.classList.add("d-none");
    clearInputs();
  };
  formopen = formContainer;
  // =============================================================
});
var formopen;
// ========================= list Ar ====================
var allContacts = [];
var allfavorite = [];
var allEmergency = [];

//=================== var element ======================
var inputName = document.getElementById("name");
var inputImg = document.getElementById("fileImg");
var inputphoneNamber = document.getElementById("phoneNamber");
var inputEmil = document.getElementById("emil");
var inputAddress = document.getElementById("address");
var inputGroup = document.getElementById("group");
var inputNotes = document.getElementById("Notes");
var checkFavoriteElement = document.getElementById("checkFavorite");
var checkEmergencyElement = document.getElementById("checkEmergency");

var currentIndex = -1;

// =========== display واستدعاء دالة  localStorage استرجاع البيانات المخزنة في =====================
if (localStorage.getItem(`listContacts`)) {
  allContacts = JSON.parse(localStorage.getItem("listContacts"));
  display();
}
if (localStorage.getItem(`Favorite`)) {
  allfavorite = JSON.parse(localStorage.getItem("Favorite"));
  displayFavorite();
}
if (localStorage.getItem(`Emergency`)) {
  allEmergency = JSON.parse(localStorage.getItem("Emergency"));
  displayEmergency();
}

//   ===================== (display) Contacts طباعة  ==================
function display() {
  var containerAllContacts = "";
  for (var i = 0; i < allContacts.length; i++) {
    containerAllContacts += designContacts(i);
  }
  document.getElementById(`Contacts`).innerHTML = containerAllContacts;
}
// ============== Favorite طباعة =================================
function displayFavorite() {
  var containerAllFavorite = ``;
  for (var i = 0; i < allfavorite.length; i++) {
    containerAllFavorite += `<div class="p-3 col-xl-12 col-md-6 col-12">
                <div class="mt-3 d-flex align-items-center bg-15 p-3 hover-11 hover-10 rounded-4">
                  <div
                    class="w-60px h-60px bg-3 overflow-hidden text-white rounded-4 fs-3 fw-bold d-flex justify-content-center align-items-center flex-shrink-0">
                    ${allfavorite[i].img}
                  </div>

                  <div class="w-100 d-flex  justify-content-between align-items-center">
                    <div class="ms-3 ">
                      <h3 class="fs-5 mb-0">${allfavorite[i].Name}</h3>
                      <div class="fw-bold">${allfavorite[i].Phone}</div>
                    </div>

                    <div
                      class="icon w-40px h-40px rounded-3 bg-16 hover-4 d-flex justify-content-center align-items-center color-3 fs-12px">
                      <i class="fas fa-phone"></i>
                    </div>
                  </div>
                </div>
              </div>`;
  }
  document.getElementById("favorites").innerHTML = containerAllFavorite;
}
// ================ Emergency طباعة  ====================
function displayEmergency() {
  var containerAllEmergency = ``;
  for (var i = 0; i < allEmergency.length; i++) {
    containerAllEmergency += ` <div class="p-3 col-xl-12 col-md-6 col-12">
                <div class=" d-flex align-items-center bg-15 p-3 hover-11 hover-12 hover-10 rounded-4 ">
                  <div
                    class="w-60px h-60px bg-3 text-white overflow-hidden rounded-4 fs-3 fw-bold d-flex justify-content-center align-items-center flex-shrink-0">
                    ${allEmergency[i].img}
                  </div>

                  <div class="w-100 d-flex  justify-content-between align-items-center">
                    <div class="ms-3 ">
                      <h3 class="fs-5 mb-0">${allEmergency[i].Name}</h3>
                      <div class="fw-bold">${allEmergency[i].Phone}</div>
                    </div>

                    <div
                      class="icon w-40px h-40px rounded-3 bg-17 hover-4 d-flex justify-content-center align-items-center color-4 fs-12px">
                      <i class="fas fa-phone"></i>
                    </div>
                  </div>
                </div>
              </div>`;
  }
  document.getElementById("Emergency").innerHTML = containerAllEmergency;
}

// ========= جديد Contacts اضافة -=======================
var ImgPath = "";
function Add() {
  if (validateName() && validatePhone() && validateEmail()) {
    ImgPath = "";
    if (inputImg.files[0]) {
      // ImgPath = "img/" + inputImg.files[0].name;
      ImgPath = `<img src="img/${inputImg.files[0].name}" alt="">`;
    } else {
      ImgPath = inputName.value.substring(0, 1);
    }

    // إضافة البيانات للمصفوفة
    allContacts.push({
      Name: inputName.value,
      img: ImgPath,
      Phone: inputphoneNamber.value,
      Email: inputEmil.value,
      Address: inputAddress.value,
      Group: inputGroup.value,
      Notes: inputNotes.value,
      Favorite: checkFavoriteElement.checked ? checkFavoriteElement.value : "",
      Emergency: checkEmergencyElement.checked
        ? checkEmergencyElement.value
        : "",
    });
    // ========== وحفظ البينات Emergency التاكد من اذا كان من
    if (checkEmergencyElement.checked) {
      allEmergency.push({
        Name: inputName.value,
        img: ImgPath,
        Phone: inputphoneNamber.value,
        Email: inputEmil.value,
        Address: inputAddress.value,
        Group: inputGroup.value,
        Notes: inputNotes.value,
        Emergency: checkEmergencyElement.checked
          ? checkEmergencyElement.value
          : "",
      });
      localStorage.setItem("Emergency", JSON.stringify(allEmergency));
    }
    // ========== وحفظ البينات favorite التاكد من اذا كان من
    if (checkFavoriteElement.checked) {
      allfavorite.push({
        Name: inputName.value,
        img: ImgPath,
        Phone: inputphoneNamber.value,
        Email: inputEmil.value,
        Address: inputAddress.value,
        Group: inputGroup.value,
        Notes: inputNotes.value,
        Emergency: checkEmergencyElement.checked
          ? checkEmergencyElement.value
          : "",
      });
      localStorage.setItem("Favorite", JSON.stringify(allfavorite));
    }

    display();
    displayFavorite();
    displayEmergency();
    clearInputs();
    localStorage.setItem("listContacts", JSON.stringify(allContacts));
    counters();

    Swal.fire({
      title: "Added!",
      text: "Contact has been added successfully.",
      icon: "success",
      showConfirmButton: false,
      timer: 1500,
      width: "450px",
    });
    formopen.classList.add("d-none");
  }
}

// ================= counter طباعة ====================
function counters() {
  var elementTotal = document.getElementById("counterTotal");
  elementTotal.innerHTML = allContacts.length;

  var elementFavorites = document.getElementById("counterFavorites");
  elementFavorites.innerHTML = allfavorite.length;

  var elementEmergency = document.getElementById("counterEmergency");
  elementEmergency.innerHTML = allEmergency.length;
}
counters();
// =================== clear inputs ===========
function clearInputs() {
  (inputName.value = null),
    (inputImg.value = null),
    (inputphoneNamber.value = null),
    (inputEmil.value = null),
    (inputAddress.value = null),
    (inputGroup.value = null),
    (inputNotes.value = null);
  checkFavoriteElement.checked = false;
  checkEmergencyElement.checked = false;
}
// ======================== حذف =================
function deleteContacts(index) {
  var ContactsDelete = allContacts[index];
  for (var i = 0; i < allfavorite.length; i++) {
    if (
      ContactsDelete.Name == allfavorite[i].Name &&
      ContactsDelete.Phone == allfavorite[i].Phone
    ) {
      allfavorite.splice(i, 1);
      localStorage.setItem("Favorite", JSON.stringify(allfavorite));
      displayFavorite();
    }
  }
  for (var i = 0; i < allEmergency.length; i++) {
    if (
      ContactsDelete.Name == allEmergency[i].Name &&
      ContactsDelete.Phone == allEmergency[i].Phone
    ) {
      allEmergency.splice(i, 1);
      localStorage.setItem("Emergency", JSON.stringify(allEmergency));
      displayEmergency();
    }
  }
  allContacts.splice(index, 1);
  localStorage.setItem("listContacts", JSON.stringify(allContacts));
  display();
  counters();
}
// ============ بحث =======================
function search() {
  var inputSearch = document.getElementById("SearchContacts").value;
  var containerAllContacts = "";
  for (var i = 0; i < allContacts.length; i++) {
    if (allContacts[i].Name.toLowerCase().includes(inputSearch.toLowerCase())) {
      containerAllContacts += designContacts(i);
    }
  }
  document.getElementById(`Contacts`).innerHTML = containerAllContacts;
}

// ===================== html design Contacts ==================
function designContacts(i) {
 var emergencyClass =
    allContacts[i].Emergency !== "" ? "bg-12 text-danger" : "bg-light";

 var FavoriteClass =
    allContacts[i].Favorite !== "" ? "bg-7 text-warning" : "bg-light";

  return ` <div class="p-3 col-12 col-md-6">
                  <div class="rounded-4 overflow-hidden">
                    <div class="bg-white p-3">
                      <div class="d-flex">
                        <div
                          class="w-60px h-60px bg-3 text-white rounded-4 fs-3 fw-bold d-flex justify-content-center align-items-center overflow-hidden">
                          ${allContacts[i].img}

                          </div>
                        <div class="ms-3">
                          <h3 class="fs-5">${allContacts[i].Name}</h3>
                          <div class="d-flex align-items-center">
                            <div
                              class="w-30px h-30px rounded-3 bg-8 d-flex justify-content-center align-items-center color-2 fs-12px">
                              <i class="fas fa-phone"></i>
                            </div>
                            <div class=" fw-bold ms-3">${allContacts[i].Phone}</div>
                          </div>
                        </div>
                      </div>

                      <div class="mt-3">
                        <div class="d-flex align-items-center">
                          <div
                            class="w-30px h-30px rounded-3 bg-9  color-1 d-flex justify-content-center align-items-center  fs-12px">
                            <i class="fas fa-envelope"></i>
                          </div>
                          <div class=" fw-bold ms-3">${allContacts[i].Email}</div>
                        </div>

                        <div class="d-flex align-items-center mt-3">
                          <div
                            class="w-30px h-30px rounded-3 bg-10 color-3 d-flex justify-content-center align-items-center  fs-12px">
                            <i class="fas fa-map-marker-alt"></i>
                          </div>
                          <div class=" fw-bold ms-3">${allContacts[i].Address}</div>
                        </div>

                        <div class="d-flex mt-3">
                        <div class=" rounded-3 color-2 fw-bold bg-16 me-3">${allContacts[i].Group}</div>
                        <div class=" rounded-3 bg-12 fw-bold color-4">${allContacts[i].Emergency}</div>
                      </div>

                      </div>
                    </div>

                     

                    <div class="bg-11 p-3 d-flex justify-content-between">
                      <div class="d-flex align-items-center gap-3">
                        <div
                          class="w-30px h-30px rounded-3 cursor-pointer bg-13 hover-4 d-flex justify-content-center align-items-center color-3 fs-12px">
                          <i class="fas fa-phone"></i>
                        </div>
                        <div
                          class="w-30px h-30px rounded-3 cursor-pointer bg-14 hover-5 color-1 d-flex justify-content-center align-items-center  fs-12px">
                          <i class="fas fa-envelope"></i>
                        </div>
                      </div>

                      <div class="d-flex gap-3">
                        <div
                          class="w-30px h-30px rounded-3 cursor-pointer ${FavoriteClass} hover-6 d-flex justify-content-center align-items-center  fs-12px" onclick="updateFavorite(${i})">
                          <i class="fas fa-star "></i>
                        </div>
                        <div
                        
                          class="w-30px h-30px rounded-3 cursor-pointer p-3 ${emergencyClass} hover-7  d-flex justify-content-center align-items-center" onclick="updateEmergency(${i})">
                          <i class="fas fa-heart-pulse"></i>
                        </div>
                        <div
                          class="w-30px h-30px rounded-3 cursor-pointer p-3 hover-8 d-flex justify-content-center align-items-center" onclick="fillInputs(${i})">
                          <i class="fas fa-pen"></i>
                        </div>
                        <div
                          class="w-30px h-30px rounded-3 cursor-pointer  p-3 hover-9  d-flex justify-content-center align-items-center" onclick="deleteContacts(${i})">
                          <i class="fas fa-trash"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                </div>`;
}
// ==================== input استرجاع البينات الي
function fillInputs(Inindex) {
  var contant = allContacts[Inindex];
  var formContainer = document.getElementById("form");
  formContainer.classList.remove("d-none");

  inputName.value = contant.Name;
  inputphoneNamber.value = contant.Phone;
  inputEmil.value = contant.Email;
  inputAddress.value = contant.Address;
  inputGroup.value = contant.Group;
  inputNotes.value = contant.Notes;
  if (contant.Emergency !== "") {
    checkEmergencyElement.checked = true;
  } else {
    checkEmergencyElement.checked = false;
  }
  if (contant.Favorite !== "") {
    checkFavoriteElement.checked = true;
  } else {
    checkFavoriteElement.checked = false;
  }

  document.getElementById("save").classList.add("d-none");
  document.getElementById("btnUpdate").classList.remove("d-none");

  currentIndex = Inindex;
}
// التعديل علي البيانات الموجودة
function update() {
  if (validateName() && validateEmail() && validatePhone()) {
    if (inputImg.files[0]) {
      ImgPath = `<img src="img/${inputImg.files[0].name}" alt="">`;
    } else {
      ImgPath = allContacts[currentIndex].img;
    }
    allContacts[currentIndex].Name = inputName.value;
    allContacts[currentIndex].img = ImgPath;
    allContacts[currentIndex].Phone = inputphoneNamber.value;
    allContacts[currentIndex].Email = inputEmil.value;
    allContacts[currentIndex].Address = inputAddress.value;
    allContacts[currentIndex].Group = inputGroup.value;
    allContacts[currentIndex].Notes = inputNotes.value;
    allContacts[currentIndex].Favorite = checkFavoriteElement.checked
      ? checkFavoriteElement.value
      : "";
    allContacts[currentIndex].Emergency = checkEmergencyElement.checked
      ? checkEmergencyElement.value
      : "";

    localStorage.setItem("listContacts", JSON.stringify(allContacts));

    // ================ allfavorit اعادة طباعة
    allfavorite = allContacts.filter((contact) => contact.Favorite !== "");
    // =================== allEmergency اعادة طباعة
    allEmergency = allContacts.filter((contact) => contact.Emergency !== "");

    localStorage.setItem("Emergency", JSON.stringify(allEmergency));
    localStorage.setItem("Favorite", JSON.stringify(allfavorite));

    display();
    displayEmergency();
    displayFavorite();
    clearInputs();
    counters();

    document.getElementById("save").classList.remove("d-none");
    document.getElementById("btnUpdate").classList.add("d-none");
    var formContainer = document.getElementById("form");
    Swal.fire({
      title: "update!",
      text: "Contact has been update successfully.",
      icon: "success",
      showConfirmButton: false,
      timer: 1500,
      width: "450px",
    });
    formContainer.classList.add("d-none");
  }
}

// ========= التحقق من الاسم===================
function validateName() {
  var regexName = /^[a-zA-Z\s]{2,50}$/;
  var nameData = inputName.value;
  if (regexName.test(nameData)) {
    return true;
  } else {
    Swal.fire({
      icon: "error",
      title: "Invalid Name",
      text: "Name should contain only letters and spaces (2-50 characters)",
      width: "450px",
    });
    return false;
  }
}
function conditionName() {
  var conditionName = document.getElementById("conditionName");
  var regexName = /^[a-zA-Z\s]{2,50}$/;
  var nameData = inputName.value;

  if (regexName.test(nameData) == false) {
    conditionName.classList.remove("d-none");

    return false;
  } else {
    conditionName.classList.add("d-none");
    return true;
  }
}
// ======== التحقق من رقم الهاتف Phone Number ========
function validatePhone() {
  var regexPhone = /^(002)?(01)[2015][0-9]{8}$/;
  var phoneData = inputphoneNamber.value;
  if (regexPhone.test(phoneData)) {
    return true;
  } else {
    Swal.fire({
      icon: "error",
      title: "Invalid Phone Number",
      text: "Please enter a valid Egyptian phone number (e.g., 01012345678 or +201012345678)",
      width: "450px",
    });
    return false;
  }
}
function conditionPhone() {
  var conditionPhone = document.getElementById("conditionPhone");
  var regexPhone = /^(002)?(01)[2015][0-9]{8}$/;
  var phoneData = inputphoneNamber.value;

  if (regexPhone.test(phoneData) == false) {
    conditionPhone.classList.remove("d-none");

    return false;
  } else {
    conditionPhone.classList.add("d-none");
    return true;
  }
}
// ================= Email Address التحقق من ============
function validateEmail() {
  var regexEmail = /^[\w]+(@gmail.com)$/;
  var EmailData = inputEmil.value;
  if (regexEmail.test(EmailData)) {
    return true;
  } else {
    Swal.fire({
      icon: "error",
      title: "Invalid Email Address",
      text: "Please enter a valid Egyptian phone number (e.g., 01012345678 or +201012345678)",
      width: "450px",
    });
    return false;
  }
}
function conditionEmail() {
  var conditionEmail = document.getElementById("conditionEmil");
  var regexEmail = /^[\w]+(@gmail.com)$/;
  var EmailData = inputEmil.value;

  if (regexEmail.test(EmailData) == false) {
    conditionEmail.classList.remove("d-none");

    return false;
  } else {
    conditionEmail.classList.add("d-none");
    return true;
  }
}

// ============ تعديل قائمة الطوارئ ======================
function updateEmergency(index) {
  if (allContacts[index].Emergency === "") {
    allContacts[index].Emergency = "Emergency";
  } else {
    allContacts[index].Emergency = "";
  }
  allEmergency = allContacts.filter((contact) => contact.Emergency !== "");

  localStorage.setItem("listContacts", JSON.stringify(allContacts));
  localStorage.setItem("Emergency", JSON.stringify(allEmergency));

  display();
  displayEmergency();
  counters();
}

// ========== Favorite تعديل قائمة =========================
function updateFavorite(index) {
  if (allContacts[index].Favorite === "") {
    allContacts[index].Favorite = "Favorite";
  } else {
    allContacts[index].Favorite = "";
  }
  allfavorite = allContacts.filter((contact) => contact.Favorite !== "");

  localStorage.setItem("listContacts", JSON.stringify(allContacts));
  localStorage.setItem("Favorite", JSON.stringify(allfavorite));

  display();
  displayFavorite();
  counters();
}
