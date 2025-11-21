window.onscroll = function() {
  let btn = document.getElementById("btn-top");

  if (window.scrollY > 500) {
    btn.style.display = "block";
  } else {
    btn.style.display = "none";
  }
};

function backToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}