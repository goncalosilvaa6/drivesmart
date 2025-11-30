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

    // 2. Espera 500ms (tempo da transição CSS)
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

/* VALIDAÇÃO DO CONTACTO */
const formulario = document.getElementById("contactForm");

if (formulario) {
  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault(); // para o envio

    // 1. Selecionar Elementos 
    const nome = document.getElementById("nome");
    const erroNome = document.getElementById("erro-nome");

    const email = document.getElementById("email");
    const erroEmail = document.getElementById("erro-email");

    const mensagem = document.getElementById("mensagem");
    const erroMensagem = document.getElementById("erro-mensagem");

    const msgSucesso = document.getElementById("mensagem-sucesso");

    // 2. Função Auxiliar para Mostrar Erro
    const mostrarErro = (input, elementoErro, texto) => {
      input.classList.add("input-error");      // borda Vermelha
      elementoErro.innerText = texto;         // define o texto
      elementoErro.style.display = "block";   // mostra o texto
    };

    // 3. Função Auxiliar para Limpar Erro
    const limparErro = (input, elementoErro) => {
      input.classList.remove("input-error");
      elementoErro.style.display = "none";
    };

    let temErros = false;

    // Limpa mensagens antigas e esconde sucesso antes de validar
    limparErro(nome, erroNome);
    limparErro(email, erroEmail);
    limparErro(mensagem, erroMensagem);
    msgSucesso.style.display = "none";

    // Validar NOME
    if (nome.value.trim() === "") {
      mostrarErro(nome, erroNome, "Por favor, escreve o teu nome.");
      temErros = true;
    }

    // Validar EMAIL
    if (email.value.trim() === "" || !email.value.includes("@") || !email.value.includes(".")) {
      mostrarErro(email, erroEmail, "Insere um email válido (ex: nome@email.com).");
      temErros = true;
    }

    // Validar MENSAGEM
    if (mensagem.value.trim().length < 10) {
      mostrarErro(mensagem, erroMensagem, "A mensagem é muito curta (mínimo 10 letras).");
      temErros = true;
    }

    if (!temErros) {
      // sucesso =  mostra a caixa verde
      msgSucesso.style.display = "block";

      // limpa o formulário
      formulario.reset();

      // remove a mensagem de sucesso passados 7 segundos
      setTimeout(() => {
        msgSucesso.style.display = "none";
      }, 7000);
    }
  });
}