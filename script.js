var tab_links = document.getElementsByClassName("tab-links");
var tab_contents=document.getElementsByClassName("tab-contents");


function openTab(tab_name) {
    for(let tab_link of tab_links) {
        tab_link.classList.remove("active-link");
    }

    for(let tab_content of tab_contents) {
        tab_content.classList.remove("active-tab");
    }

    event.currentTarget.classList.add("active-link");
    document.getElementById(tab_name).classList.add("active-tab");
}

// Javascript for small screens

var side_menu=document.getElementById("side-menu");

function openMenu(){
    side_menu.style.right="0";
}

function closeMenu(){
    side_menu.style.right="-200px";
}

// Javascript for linking my portfolio with google spreadsheets

const scriptURL = 'https://script.google.com/macros/s/AKfycbw_Q_ZPY7XhNhLgtV_HhiWUq5dsPqvKo4ZKEei4-Y5VABCxQN1Wf6hd1asV-2_cZDrpeA/exec'
const form = document.forms['submit-to-google-sheet'];

const msg=document.getElementById("msg");

form.addEventListener('submit', e => {
    e.preventDefault();
    const name = form['Name'].value.trim();
    const email = form['Email'].value.trim();
    const message = form['Message'].value.trim();
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');

    // Hide all errors first
    nameError.style.display = "none";
    emailError.style.display = "none";
    messageError.style.display = "none";

    // Name validation
    if (!name) {
        nameError.textContent = "Please enter your name.";
        nameError.style.display = "block";
        form['Name'].focus();
        return;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        emailError.textContent = "Please enter your email address.";
        emailError.style.display = "block";
        form['Email'].focus();
        return;
    } else if (!emailPattern.test(email)) {
        emailError.textContent = "Please enter a valid email address.";
        emailError.style.display = "block";
        form['Email'].focus();
        return;
    }

    // Message validation
    if (!message) {
        messageError.textContent = "Please enter your message.";
        messageError.style.display = "block";
        form['Message'].focus();
        return;
    }

    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => {
        msg.innerHTML = "Thank you for your message! I'll get back to you shortly.";
        setTimeout(function(){
            msg.innerHTML = "";
        }, 10000);
        form.reset();
    })
    .catch(error => console.error('Error!', error.message));
})
