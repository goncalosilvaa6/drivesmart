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
  // 1. Dizer ao código qual é a secção que queremos vigiar
  const seccao = document.querySelector("#resultados");

  // (Segurança: se a secção não existir nesta página, pára aqui)
  if (!seccao) return;

  // 2. Criar o Vigia
  const vigia = new IntersectionObserver((entradas) => {
    // Se a secção apareceu no ecrã (isIntersecting é verdadeiro)...
    if (entradas[0].isIntersecting) {
      const contadores = document.querySelectorAll(".counter");

      contadores.forEach((elemento) => {
        const alvo = parseInt(elemento.getAttribute("data-target"));

        let numeroAtual = 0;
        const salto = alvo / 250;

        const cronometro = setInterval(() => {
          numeroAtual += salto;
          elemento.innerText = Math.ceil(numeroAtual);

          if (numeroAtual >= alvo) {
            elemento.innerText = alvo;
            clearInterval(cronometro);
          }
        }, 30);
      });
      // ---------------------------------------------

      // 3. Mandar o vigia embora (para não repetir a animação)
      vigia.disconnect();
    }
  });

  // 4. Começar a vigiar a secção
  vigia.observe(seccao);
});

/* TROCA AUTOMÁTICA DE FRASES */
document.addEventListener("DOMContentLoaded", () => {
  const elementoTexto = document.getElementById("phrase-header");

  // Segurança: Se não estivermos na Home, não faz nada
  if (!elementoTexto) return;

  const phrases = [
    "Investigação sobre Condução Inteligente e Sustentável aplicada à formação.",
    "Aprende a conduzir com confiança e segurança máxima.",
    "Simuladores de última geração e realidade aumentada.",
    "Formação eficiente, ecológica e inteligente.",
  ];

  let indiceAtual = 0;

  const trocarFrase = () => {
    // 1. Ativa a animação de saída (Blur/Scale Out)
    elementoTexto.classList.add("fade-out");

    // 2. Espera 600ms (tempo da transição CSS)
    setTimeout(() => {
      indiceAtual = (indiceAtual + 1) % phrases.length;
      elementoTexto.innerText = phrases[indiceAtual];

      // 3. Ativa a animação de entrada (Blur/Scale In)
      elementoTexto.classList.remove("fade-out");
    }, 500);
  };

  // Troca a cada 4 segundos
  setInterval(trocarFrase, 4000);
});