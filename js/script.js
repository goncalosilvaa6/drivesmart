// BACK TO TOP
window.onscroll = function () {
  let btn = document.getElementById("btn-top");

  if (!btn) {
    return;
  }

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

// ALTERAÇÃO AUTOMÁTICA DO ANO FOOTER
const year = new Date().getFullYear();
document.getElementById("year").textContent = year;

// CONTADOR ESTATÍSTICAS
document.addEventListener("DOMContentLoaded", () => {
  
  const contadores = document.querySelectorAll(".counter");

  contadores.forEach((elemento) => {
    const alvo = parseInt(elemento.getAttribute("data-target"));
    
    let numeroAtual = 0;
    const salto = alvo / 70; 

    const cronometro = setInterval(() => {
      numeroAtual += salto;
      elemento.innerText = Math.ceil(numeroAtual);

      if (numeroAtual >= alvo) {
        elemento.innerText = alvo;
        clearInterval(cronometro);
      }
    }, 30);
  });

});