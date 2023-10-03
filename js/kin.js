 // Elementos das abas:
const tab_usuarios = document.getElementById('tab-usuarios');
const tab_cadastrar = document.getElementById('tab-cadastrar');

// Elementos do formulario:
const formulario = document.getElementById('portador');
const div_tabela = document.getElementById('div-tabela');


tab_usuarios.addEventListener('click', () => {
  formulario.style.display = 'none';
  div_tabela.style.display = 'flex';
  segunda_div.style.display = 'none';
  div_visualizar.style.display = 'none';
  div_editar.style.display = 'none';
  tabela.style.display = 'flex';
  tab_usuarios.style.color = '#ff7f07';
  tab_cadastrar.style.color = '#ffffff';

  preenche_tabela()
});

tab_cadastrar.addEventListener('click', () => {
  formulario.style.display = 'block';
  div_tabela.style.display = 'none';
  tab_usuarios.style.color = '#ffffff';
  tab_cadastrar.style.color = '#ff7f07';

  // esvazia_tabela()
});


const mostrar_segunda_div_button = document.getElementById('mostrar_segunda_div');
const segunda_div = document.getElementById('infos-cep');
const campo_cep = document.getElementById('cep');
const campo_rua = document.getElementById('rua');
const campo_bairro = document.getElementById('bairro');
const campo_cidade = document.getElementById('cidade');
const campo_estado = document.getElementById('estado');

mostrar_segunda_div_button.addEventListener('click', function() {
  if (campo_cep.value.trim() !== '') {
    // URL da API adicionando o campo CEP:
    const url = `https://brasilapi.com.br/api/cep/v1/${campo_cep.value}`;

    // Criando uma instância do objeto XMLHttpRequest:
    const requisicao = new XMLHttpRequest();

    // Configurando a solicitação GET para o URL da API:
    requisicao.open('GET', url, true);

    requisicao.onload = function() {
        if (requisicao.status === 200) {
            const data = JSON.parse(requisicao.responseText);

            // Preenchendo os campos da segunda_div com os valores obtidos da API:
            campo_rua.value = data.street;
            campo_bairro.value = data.neighborhood;
            campo_cidade.value = data.city;
            campo_estado.value = data.state;

            // Deixando a segunda_div visivel:
            segunda_div.style.display = 'flex';
        } else {
            window.alert('CEP inválido!');
        }
    };

    // Enviando a solicitação:
    requisicao.send();
  } else{
    window.alert('Preencha o campo CEP para poder continuar.')
  }
});


const botao_voltar = document.getElementById('voltar');

botao_voltar.addEventListener('click', () => {
  location.reload();
})


// Selecione os formulários
const formulario1 = document.getElementById('formulario1');
const formulario2 = document.getElementById('formulario2');

// Criando um ouvinte parao evento de submit:
document.addEventListener('submit', (event) => {
  event.preventDefault(); // Impedindo um comportamento indesejado.

  try {
    const form_data1 = new FormData(formulario1);
    const form_data2 = new FormData(formulario2);

    const form_data_object1 = {};
    form_data1.forEach((value, key) => {
      form_data_object1[key] = value;
    });

    const form_data_object2 = {};
    form_data2.forEach((value, key) => {
      form_data_object2[key] = value;
    });

    // Verificando se os campos estao preenchidos:
    if (Object.values(form_data_object1).every((value) => value.trim() !== '') &&
        Object.values(form_data_object2).every((value) => value.trim() !== '')) {
      const dadosCombinados = { ...form_data_object1, ...form_data_object2 };
      localStorage.setItem('dados_formularios', JSON.stringify(dadosCombinados));

      // Esvaziando os formularios:
      formulario1.reset();
      formulario2.reset();

      window.alert('Dados dos formulários cadastrados com sucesso!');
    } else {
      window.alert('Preencha todos os campos antes de cadastrar os dados.');
    }
  } catch (e) {
    window.alert(e.message)
  }

});


// Preenchendo a tabela dinamicamente:
function preenche_tabela(){
  const dados_armazenados = localStorage.getItem('dados_formularios');
  const tabela1 = document.getElementById('tabela');

  if (dados_armazenados) {
    const dados_objeto = JSON.parse(dados_armazenados);

    tabela1.style.display = 'flex';

    // Preenchendo os campos da tabela com os valores do objeto:
    document.getElementById('nome-tb').textContent = dados_objeto.nome + ' ' + dados_objeto.sobrenome || '';
    document.getElementById('email-tb').textContent = dados_objeto.email || '';
    document.getElementById('telefone-tb').textContent = dados_objeto.telefone || '';
    document.getElementById('rua-tb').textContent = dados_objeto.rua || '';
    document.getElementById('bairro-tb').textContent = dados_objeto.bairro || '';
    document.getElementById('cidade-tb').textContent = dados_objeto.cidade || '';
    document.getElementById('estado-tb').textContent = dados_objeto.estado || '';
    document.getElementById('cep-tb').textContent = dados_objeto.cep || '';
  } else{
      try {
        const titulo_usuario = document.getElementById('titulo-usuario');
        const div_visualizar1 = document.getElementById('div-visualizar');
        const div_editar1 = document.getElementById('div-editar');

        tabela1.style.display = 'none';
        div_visualizar1.style.display = 'none';
        div_editar1.style.display = 'none';

        titulo_usuario.textContent = 'Não há usuário Cadastrado';
      }catch (e) {
          window.alert(e);
      }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  preenche_tabela()
});

const botao_excluir = document.getElementById('excluir');

botao_excluir.addEventListener('click', () => {
  const dados_armazenados = localStorage.getItem('dados_formularios');

  if (dados_armazenados) {
    const confirmacao = window.confirm('Tem certeza de que deseja excluir os dados cadastrados?');
    if (confirmacao) {
      localStorage.removeItem('dados_formularios');
      window.alert('Dados cadastrados apagados!');
      location.reload();
    } else {
      window.alert('A exclusão foi cancelada.');
    }
  } else {
    window.alert('Não existem dados cadastrados!')
  }

});

const tabela = document.getElementById('tabela');

const botao_visualizar = document.getElementById('visualizar');
const div_visualizar = document.getElementById('div-visualizar')

botao_visualizar.addEventListener('click', () => {
  const dados_armazenados = localStorage.getItem('dados_formularios');

  if (dados_armazenados) {
    tabela.style.display = 'none';
    div_visualizar.style.display = 'block';

    const dados_objeto = JSON.parse(dados_armazenados);

    document.getElementById('nome-vs').textContent = dados_objeto.nome + ' ' + dados_objeto.sobrenome || '';
    document.getElementById('email-vs').textContent = dados_objeto.email || '';
    document.getElementById('telefone-vs').textContent = dados_objeto.telefone || '';
    document.getElementById('rua-vs').textContent = dados_objeto.rua || '';
    document.getElementById('numero-vs').textContent = dados_objeto.numero || '';
    document.getElementById('bairro-vs').textContent = dados_objeto.bairro || '';
    document.getElementById('cidade-vs').textContent = dados_objeto.cidade || '';
    document.getElementById('estado-vs').textContent = dados_objeto.estado || '';
    document.getElementById('cep-vs').textContent = dados_objeto.cep || '';
    document.getElementById('habilidades-vs').textContent = dados_objeto.habilidades || '';
  } else {
    window.alert('Não existem dados cadastrados!')
  }
});

const botao_voltar_vs = document.getElementById('voltar-vs');

botao_voltar_vs.addEventListener('click', () => {
  tabela.style.display = 'flex';
  div_visualizar.style.display = 'none';
});

const botao_editar = document.getElementById('editar');
const div_editar = document.getElementById('div-editar');

botao_editar.addEventListener('click', () => {
  const dados_armazenados = localStorage.getItem('dados_formularios');

  if (dados_armazenados) {
    tabela.style.display = 'none';
    div_editar.style.display = 'flex';

    try{
      const dados_objeto2 = JSON.parse(dados_armazenados);

      document.getElementById('name-ed').value = dados_objeto2.nome || '';
      document.getElementById('sobrenome-ed').value = dados_objeto2.sobrenome || '';
      document.getElementById('email-ed').value = dados_objeto2.email || '';
      document.getElementById('telefone-ed').value = dados_objeto2.telefone || '';
      document.getElementById('cep-ed').value = dados_objeto2.cep || '';
      document.getElementById('habilidades-ed').value = dados_objeto2.habilidades || '';

      document.getElementById('rua-ed').value = dados_objeto2.rua || '';
      document.getElementById('numero-ed').value = dados_objeto2.numero || '';
      document.getElementById('bairro-ed').value = dados_objeto2.bairro || '';
      document.getElementById('cidade-ed').value = dados_objeto2.cidade || '';
      document.getElementById('estado-ed').value = dados_objeto2.estado || '';
    } catch (e) {
      window.alert(e)
    }
  } else {
    window.alert('Não existem dados cadastrados!')
  }
});

const botao_voltar_ed = document.getElementById('voltar-ed');

botao_voltar_ed.addEventListener('click', () => {
  tabela.style.display = 'flex';
  div_editar.style.display = 'none';
});


// Atualizando os dados presente no localStorage
const botao_atualizar = document.getElementById('atualizar-ed');
const formulario1_ed = document.getElementById('formulario1-ed');
const formulario2_ed = document.getElementById('formulario2-ed');

botao_atualizar.addEventListener('click', () => {
  try {
    const cep_ed = document.getElementById('cep-ed').value


    const url = `https://brasilapi.com.br/api/cep/v1/${cep_ed}`;

    // Criando uma instância do objeto XMLHttpRequest:
    const requisicao = new XMLHttpRequest();

    // Configurando a solicitação GET para o URL da API:
    requisicao.open('GET', url, true);

    requisicao.onload = function() {
        if (requisicao.status === 200) {
          const form_data1 = new FormData(formulario1_ed);
          const form_data2 = new FormData(formulario2_ed);

          const form_data_object1 = {};
          form_data1.forEach((value, key) => {
            form_data_object1[key] = value;
          });

          const form_data_object2 = {};
          form_data2.forEach((value, key) => {
          form_data_object2[key] = value;
          });

          // Verifique se os campos estão preenchidos
          if (Object.values(form_data_object1).every((value) => value.trim() !== '') &&
              Object.values(form_data_object2).every((value) => value.trim() !== '')) {
            const dadosCombinados = { ...form_data_object1, ...form_data_object2 };
            localStorage.setItem('dados_formularios', JSON.stringify(dadosCombinados));

            window.alert('Dados atualizados com sucesso!');
            preenche_tabela()
            tabela.style.display = 'flex';
            div_editar.style.display = 'none';
          } else {
            window.alert('Preencha todos os campos antes de atualizar os dados.');
          }
        } else {
            window.alert('CEP inválido!');
        }
    };
    // Enviando a solicitação:
    requisicao.send();
  } catch (e) {
    window.alert(e.message)
  }
});
