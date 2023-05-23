// ----------------- Start Global
var documentHTML = document;

var siteName = documentHTML.getElementById("siteName"),
   siteUrl = documentHTML.getElementById("siteUrl"),
   btnAdd = documentHTML.getElementById("btnAdd"),
   btnUpdate = documentHTML.getElementById("btnUpdate"),
   searchBook = documentHTML.getElementById("searchBook"),
   alertName = documentHTML.getElementById("alertName"),
   alertUrl = documentHTML.getElementById("alertUrl"),
   alertExite = documentHTML.getElementById("alertExite"),
   
   indexUpdate=0 // to use index that will be (update in table ) glopal to can use it (btnUpdate)

   booksContainer = []

// ----------------- When  Start

if (getLocal() !== null) {
   booksContainer = getLocal();
   displayData();
}

// ----------------- Start Events

btnAdd.onclick = function () {
   addBook();
};

btnUpdate.onclick = function () {
   updateData();
};

searchBook.oninput = function () {
   searchData();
};



// ----------------- Start Function


   function addBook() {
      if ((nameValidation() === true) & (urlValidation() === true)) {
         var book = {
            name: siteName.value,
            url: siteUrl.value,
         };
         booksContainer.push(book);
         // console.log(booksContainer);
         displayData();
         setLocal();
         resetForm();
      }
   }

// display
function displayData() {
   var tableData = "";
   var term = searchBook.value.toLowerCase(); // ""


   for (var i = 0; i < booksContainer.length; i++) {
      if (booksContainer[i].name.toLowerCase().includes(term)) {// this line to filter data for search
         tableData += `
         <tr>
         <td >${booksContainer[i].name.toLowerCase().replaceAll(term,`<span class="bg-info">${term}</span>`)}</td> 
         <td>
            <p class="small text-truncate" style="max-width: 250px">${booksContainer[i].url}</p>
         </td>
         <td>
            <div class="hstack gap-3 justify-content-center">
               <a href="${booksContainer[i].url}" target="_blank" class="btn btn-outline-dark">
                  <i class="fa-regular fa-eye"></i>
               </a>
   
               <button class="btn btn-outline-warning" onclick="setUpdateInput(${i})">
                  <i class="fa-regular fa-pen-to-square"></i>
               </button>
   
               <button class="btn btn-outline-danger" onclick="deleteRow(${i})">
                  <i class="fa-solid fa-trash"></i>
               </button>
            </div>
         </td>
      </tr>
         
         `;
      
   }
}

   documentHTML.getElementById("tableBody").innerHTML = tableData;
}

// delate
function deleteRow(index) {
   booksContainer.splice(index, 1);
   setLocal();
   displayData();
   // console.log(booksContainer);
}


// rase data to main inpute

function setUpdateInput(index) {
   indexUpdate = index;
   //   console.log(booksContainer.at(index));

   siteName.value = booksContainer.at(index).name; //== booksContainer[index].name
   siteUrl.value = booksContainer.at(index).url;

   btnAdd.classList.add("d-none");
   btnUpdate.classList.remove("d-none");
}

//  updata

function updateData() {
   var book = {
      name: siteName.value,
      url: siteUrl.value,
   };

   booksContainer.splice(indexUpdate, 1, book);
   setLocal();
   displayData();
   resetForm();

   btnUpdate.classList.add("d-none");
   btnAdd.classList.remove("d-none");

   // console.log(booksContainer);
}

// search 

function searchData() { // filter to display 
   displayData();
}


function resetForm() {
   siteName.value = "";
   siteUrl.value = "";
}

function setLocal() {
   localStorage.setItem("booksContainer", JSON.stringify(booksContainer));
}

function getLocal() {
   return JSON.parse(localStorage.getItem("booksContainer"));
}
// ----------------- Start Validation


function nameValidation() {
   if (siteName.value === "") {
      alertName.classList.remove("d-none"); //show alert
      return false;
   } else {
      alertName.classList.add("d-none"); //hide alert
      return true;
   }
}

function urlValidation() {
   if (siteUrl.value === "") {
      alertUrl.classList.remove("d-none"); //show alert
      return false;
   } else {
      var isExite = false;

      for (var i = 0; i < booksContainer.length; i++) {
         // filter array
         if (booksContainer[i].url === siteUrl.value) {
            isExite = true; // exite
            break;
         }
      }

      if (isExite === true) {
         // true
         alertExite.classList.remove("d-none"); // show alert url is exite
         return false;
      } else {
         alertExite.classList.add("d-none"); // hide alert url is exite
      }

      alertUrl.classList.add("d-none"); //hide alert required

      return true;
   }
}
