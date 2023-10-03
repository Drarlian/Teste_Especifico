const botao_login = document.getElementById('botao_login');
const dado_usuario = document.getElementById('usuario');

botao_login.addEventListener('click', () => {
  const usuario = dado_usuario.value;

  const requisicao = new XMLHttpRequest();
  requisicao.open('GET', `https://api.github.com/users/${usuario}`, true);

  requisicao.onload = function () {
      if (requisicao.status >= 200 && requisicao.status < 300) {
          const data = JSON.parse(requisicao.responseText);  // Convertendo uma String JSON em um Objeto JS (JSON).
          armazena_usuario(data)
      } else {
          window.alert('Erro ao buscar o usuário do GitHub');
      }
  };
  requisicao.send();
});


function armazena_usuario(data) {
  localStorage.setItem('user', JSON.stringify(data));  // Transformando um JSON em uma String JSON.

  window.alert('Login efetuado com sucesso!')
  window.location.href = 'sistema.html';
}
