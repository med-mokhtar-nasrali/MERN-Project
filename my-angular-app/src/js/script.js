// const navbarMenu = document.querySelector(".navbar .links");
// const hamburgerBtn = document.querySelector(".hamburger-btn");
// const hideMenuBtn = navbarMenu.querySelector(".close-btn");
// const showPopupBtn = document.querySelector(".login-btn");
// const formPopup = document.querySelector(".form-popup");
// const hidePopupBtn = formPopup.querySelector(".close-btn");
// const signupLoginLink = formPopup.querySelectorAll(".bottom-link a");

// // Show mobile menu
// hamburgerBtn.addEventListener("click", () => {
//     navbarMenu.classList.toggle("show-menu");
// });

// // Hide mobile menu
// hideMenuBtn.addEventListener("click", () =>  hamburgerBtn.click());

// // Show login popup
// showPopupBtn.addEventListener("click", () => {
//     document.body.classList.toggle("show-popup");
// });

// // Hide login popup
// hidePopupBtn.addEventListener("click", () => showPopupBtn.click());

// // Show or hide signup form
// signupLoginLink.forEach(link => {
//     link.addEventListener("click", (e) => {
//         e.preventDefault();
//         formPopup.classList[link.id === 'signup-link' ? 'add' : 'remove']("show-signup");
//     });
// });
$('#exampleModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var recipient = button.data('whatever') // Extract info from data-* attributes
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this)
    modal.find('.modal-title').text('New message to ' + recipient)
    modal.find('.modal-body input').val(recipient)
  })