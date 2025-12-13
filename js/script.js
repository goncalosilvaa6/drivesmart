// BACK TO TOP

// evento "onscroll" ativo sempre que o utilizador fizer scroll na página
window.onscroll = function () {
  // procurar o botão HTML pelo ID
  let btn = document.getElementById("btn-top");

  // se o botão não exsitir na página atual, sai da função para nao causar erros
  if (!btn) {
    return;
  }

  // se o scroll vertical (Y) for mairo que 500px, mostra o botão
  if (window.scrollY > 500) {
    btn.style.display = "block"; // tornar botão visível
  } else {
    btn.style.display = "none"; // esconder botão
  }
};

// função chamada quando se clica no botão (onclick)
function backToTop() {
  // faz o scroll automático na janela para a posição 0 com efeito suave
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// ALTERAÇÃO AUTOMÁTICA DO ANO FOOTER

// criar variável que extrai apenas o ano completo
const year = new Date().getFullYear();
// colocar essa variáveis dentro do elemento com ID "year"
document.getElementById("year").textContent = year;

// CONTADOR ESTATÍSTICAS
document.addEventListener("DOMContentLoaded", () => {
  // selecionar a secção inteira que contém os números
  const seccao = document.querySelector("#resultados");

  // se a secção não existir nesta página, para aqui para evitar erros
  if (!seccao) return;

  // 2. Criar o Vigia (IntersectionObserver)
  const vigia = new IntersectionObserver((entradas) => {
    // verifica se a primeira entrada está vísivel
    if (entradas[0].isIntersecting) {
      // seleciona todos os números individuais com a classe .counter
      const contadores = document.querySelectorAll(".counter");

      // para cada número, inicia a animação
      contadores.forEach((elemento) => {
        // pega o valor final guardado no atributo HTML "data-target" converte para inteiro
        const alvo = parseInt(elemento.getAttribute("data-target"));

        let numeroAtual = 0;
        // definir o tamanho número para que todos acabem ao mesmo tempo
        // dividir por 250 define a velocidade relativa ao total
        const salto = alvo / 250;

        // iniciar um intervalo que corre a cada 30 milissegundos
        const cronometro = setInterval(() => {
          // incrementação do valor
          numeroAtual += salto;
          // arredondar para cima o valor para evitar casas decimais
          elemento.innerText = Math.ceil(numeroAtual);

          if (numeroAtual >= alvo) {
            // garantir que o valor final é exato
            elemento.innerText = alvo;
            // parar o intervalo
            clearInterval(cronometro);
          }
        }, 30);
      });

      // desligar o vigia, garante que a animação só acontece uma vez quando fazemos o scroll
      vigia.disconnect();
    }
  });

  // iniciar a observação da secção
  vigia.observe(seccao);
});

/* TROCA AUTOMÁTICA DE FRASES */
document.addEventListener("DOMContentLoaded", () => {
  const elementoTexto = document.getElementById("phrase-header");

  // se não existir o elemento, sai da função
  if (!elementoTexto) return;

  // array com frases que vão rodar
  const phrases = [
    "Investigação sobre Condução Inteligente e Sustentável aplicada à formação.",
    "Aprende a conduzir com confiança e segurança máxima.",
    "Simuladores de última geração e realidade aumentada.",
    "Formação eficiente, ecológica e inteligente.",
  ];

  // começar na frase 1º frase (indice 0)
  let indiceAtual = 0;

  // função que vai trocar de frase
  const trocarFrase = () => {
    // adiciona a class CSS que faz o texto desaparecer
    elementoTexto.classList.add("fade-out");

    // espera 500ms, tempo da animação CSS demora a esconder o texto
    setTimeout(() => {
      // atualiza o indice, o operador % faz o loop voltar a 0 quando chega ao fim
      indiceAtual = (indiceAtual + 1) % phrases.length;
      // trocar o texto no HTML
      elementoTexto.innerText = phrases[indiceAtual];

      // remover classe para o texto reaparecer
      elementoTexto.classList.remove("fade-out");
    }, 500);
  };

  // temporizador infinitor que troca a frase a cada 4000ms = 4segundos
  setInterval(trocarFrase, 4000);
});

/* VALIDAÇÃO DO CONTACTO */
const formulario = document.getElementById("contactForm");

// só executa se o formulário existir na página
if (formulario) {
  formulario.addEventListener("submit", (evento) => {
    // impede o formulário de ser enviado ao servidor imediatamente
    // permite validar os dados com JS primeiro
    evento.preventDefault(); 

    // selecionar os elementos
    const nome = document.getElementById("nome");
    const erroNome = document.getElementById("erro-nome");

    const email = document.getElementById("email");
    const erroEmail = document.getElementById("erro-email");

    const mensagem = document.getElementById("mensagem");
    const erroMensagem = document.getElementById("erro-mensagem");

    const msgSucesso = document.getElementById("mensagem-sucesso");

    // função para mostrar erro para evitar a repetição de código
    const mostrarErro = (input, elementoErro, texto) => {
      // adiciona a borda vermelha
      input.classList.add("input-error");
      // define a mensagem de texto
      elementoErro.innerText = texto;
      // tornar a mensagem visível
      elementoErro.style.display = "block";
    };

    // função para limpar erro 
    const limparErro = (input, elementoErro) => {
      input.classList.remove("input-error");
      elementoErro.style.display = "none";
    };

    // flag de controlo, se virar true, não envia
    let temErros = false;

    // limpa todos os erros antigos e esconde o sucesso
    limparErro(nome, erroNome);
    limparErro(email, erroEmail);
    limparErro(mensagem, erroMensagem);
    msgSucesso.style.display = "none";

    // Validar NOME, .trim() remove espaços vazios antes e depois
    if (nome.value.trim() === "") {
      mostrarErro(nome, erroNome, "Por favor, escreve o teu nome.");
      temErros = true;
    }

    // Validar EMAIL, verifica se está vazio ou se falta "@" ou se falta "."
    if (email.value.trim() === "" || !email.value.includes("@") || !email.value.includes(".")) {
      mostrarErro(email, erroEmail, "Insere um email válido (ex: nome@email.com).");
      temErros = true;
    }

    // Validar MENSAGEM, exige pelos menos 10 caracteres
    if (mensagem.value.trim().length < 10) {
      mostrarErro(mensagem, erroMensagem, "A mensagem é muito curta (mínimo 10 letras).");
      temErros = true;
    }

    // se a flag continuar "false", significa que passou em todos os testes
    if (!temErros) {
      // sucesso =  mostra a caixa verde
      msgSucesso.style.display = "block";

      // limpa o formulário
      formulario.reset();

      // temporizador que remove a mensagem de sucesso passados 7 segundos
      setTimeout(() => {
        msgSucesso.style.display = "none";
      }, 7000);
    }
  });
}