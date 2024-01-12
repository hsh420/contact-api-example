const pending = document.querySelector("#pending-count");
const contactList = document.querySelector("#contacts");
const url = "https://dummy-apis.netlify.app/api/contact-suggestions?count=1";

// state

let contacts = [];
let pendingCount = 0;

// CRUD

async function getEightContacts() {
  const response = await fetch(
    "https://dummy-apis.netlify.app/api/contact-suggestions?count=8"
  );
  const data = await response.json();
  contacts.push(...data);
}

async function getContact() {
  const response = await fetch(url);
  const data = await response.json();
  contacts.push(...data);
}

// rendering

function renderContacts() {
  contactList.innerHTML = "";
  contacts.forEach((element) => {
    if (element.backgroundImage === "") {
      element.backgroundImage =
        "https://images.pexels.com/photos/17867764/pexels-photo-17867764/free-photo-of-damhirschkuh.jpeg";
    }
    const newDiv = document.createElement("div");
    const contactDetailsContainer = document.createElement("div");
    const newBackgroundImg = document.createElement("img");
    const deleteBtn = document.createElement("button");
    const deleteBtnText = document.createTextNode("X");
    const newProfileImg = document.createElement("img");
    const newTitle = document.createElement("h4");
    const titleText = document.createTextNode(
      element.name.first + " " + element.name.last
    );
    const newP = document.createElement("p");
    const mutationP = document.createElement("p");
    const description = document.createTextNode(element.title);
    const mutations = document.createTextNode(
      element.mutualConnections + " mutual connection(s)"
    );
    const newBtn = document.createElement("button");
    const btnText = document.createTextNode("Connect");
    contactList.appendChild(newDiv);
    newDiv.classList.add("card");
    newDiv.appendChild(newBackgroundImg);
    newBackgroundImg.classList.add("backgroundImg");
    newBackgroundImg.setAttribute("src", element.backgroundImage);
    newDiv.appendChild(deleteBtn);
    deleteBtn.appendChild(deleteBtnText);
    deleteBtn.classList.add("deleteBtn");
    deleteBtn.setAttribute("id", contacts.indexOf(element));
    newDiv.appendChild(newProfileImg);
    newProfileImg.classList.add("profilePic");
    newProfileImg.setAttribute("src", element.picture);
    newDiv.appendChild(contactDetailsContainer);
    contactDetailsContainer.classList.add("contactInformation");
    newDiv.appendChild(newTitle);
    newTitle.appendChild(titleText);
    newDiv.appendChild(newP);
    newP.appendChild(description);
    newP.classList.add("contactDescription");
    newDiv.appendChild(mutationP);
    mutationP.appendChild(mutations);
    newDiv.appendChild(newBtn);
    newBtn.appendChild(btnText);
    newBtn.classList.add("connectBtn");
  });
}

function renderPendingCount() {
  console.log(pendingCount);
  pending.innerHTML = "";
  const newP = document.createElement("p");
  const nothingPendingText = document.createTextNode("No pending invitations");
  const pendingText = document.createTextNode(
    pendingCount + " pending invitations"
  );
  if (pendingCount === 0) {
    pending.appendChild(newP);
    newP.appendChild(nothingPendingText);
  } else {
    pending.appendChild(newP);
    newP.appendChild(pendingText);
  }
}

// events

contactList.addEventListener("click", (event) => {
  console.log(event);
  if (event.target.className === "connectBtn") {
    if (event.target.innerText === "Connect") {
      event.target.innerText = "Pending";
      pendingCount++;
      localStorage.setItem("pendingCount", pendingCount);
      renderPendingCount();
    } else if (event.target.innerText === "Pending") {
      event.target.innerText = "Connect";
      pendingCount--;
      localStorage.setItem("pendingCount", pendingCount);
      renderPendingCount();
    }
  }
  if (event.target.className === "deleteBtn") {
    deleteContactAndAddNew(event.target.id);
  }
});

// helper functions

function deleteContactAndAddNew(id) {
  contacts.splice(id, 1);
  getContact().then(() => {
    renderContacts();
  });
}

// initialization

function init() {
  getEightContacts().then(() => {
    renderContacts();
  });
  localStorage.getItem("pendingCount") === null
    ? (pendingCount = 0)
    : (pendingCount = localStorage.getItem("pendingCount"));
  renderPendingCount();
}

init();
