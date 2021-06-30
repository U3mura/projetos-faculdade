//dependencias
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const http = require('http');
const path = require('path');
const parser = require('body-parser');
const ejs = require('ejs');
const csv = require('csv-parser');
const fs = require('fs');

//configuracoes iniciais
const app = express();
const porta = 8126;
const banco = new sqlite3.Database('./dados/usuario.db');

app.use(parser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'.')));
app.set('view engine','ejs');

//scripts SQL
//cria tabela se ainda nao existir
const criarBanco = 'CREATE TABLE IF NOT EXISTS usuario(id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT NOT NULL, email TEXT NOT NULL, login TEXT NOT NULL, senha TEXT NOT NULL)';
const criarBancoPontos = 'CREATE TABLE IF NOT EXISTS pontos (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT NOT NULL, tipo TEXT NOT NULL, descricao TEXT NOT NULL, latitude TEXT NOT NULL, longitude TEXT NOT NULL)';
const incluirUsuario = 'INSERT INTO usuario(nome, email, login, senha) VALUES(?,?,?,?)';
const consultarUsuario = 'SELECT * FROM usuario WHERE login=? AND senha=?';
const atualizarUsuario = 'UPDATE usuario SET nome = ?, email = ?, login = ?, senha = ? WHERE id = ?';


const incluirPonto = 'INSERT INTO pontos(nome, tipo, descricao, latitude, longitude) VALUES(?,?,?,?,?)';
const consultarPontos = 'SELECT * FROM pontos';


banco.run(criarBanco);
banco.run(criarBancoPontos);

var usuario;
var dados = [];

//adiciona arquivo existente no diretório raiz
//esta é a página que vai aparecer ao acessar a aplicação
app.get('/',(request, response) => {
  response.sendFile(path.join(__dirname,'./views/login.html'));
});

app.get('/erroLogin',(request, response) => {
  response.sendFile(path.join(__dirname,'./views/erroLogin.html'));
});



//renderiza página principal
app.get('/main',(request, response) => {
  if(usuario != null){
    banco.serialize(() => {
      banco.all(consultarPontos,[], (err,rows) => {
        if(err){
          response.send('Erro no acesso ao banco de dados');
          return console.log(err.message);
        }
        dados = [];
        rows.forEach((row)=>{
          let item = {nome:row.nome,tipo:row.tipo,descricao:row.descricao,latitude:row.latitude,longitude:row.longitude};
          dados.push(item);
        });
      });
    response.render("main",{itens:dados, usuario});
    });

    //response.render("main",{usuario});
  }else{
    response.redirect('/');
  }
});

app.get('/pontos',(request, response) => {
  if(usuario != null){
    response.status(200).json(dados);
  }else{
    response.redirect('/');
  }
});



app.get('/sobreoprojeto',(request, response) => {
  if(usuario != null){
    response.render("sobreoprojeto",{usuario});
  }else{
    response.redirect('/');
  }
});

app.get('/locais',(request, response) => {
  if(usuario != null){
    response.render("locais",{usuario});
  }else{
    response.redirect('/');
  }
});

app.get('/faleconosco',(request, response) => {
  if(usuario != null){
    response.render("faleconosco",{usuario});
  }else{
    response.redirect('/');
  }
});

app.get('/comousar',(request, response) => {
  if(usuario != null){
    response.render("comousar",{usuario});
  }else{
    response.redirect('/');
  }
});

app.get('/usuario',(request, response) => {
  if(usuario != null){
    response.render("usuario",{usuario});
  }else{
    response.redirect('/');
  }
});

//consulta se usuário está cadastrado
app.post('/validate',(request, response) => {
  banco.serialize(() => {
    banco.get(consultarUsuario,[request.body.login,request.body.senha], (err,row) => {
      if(err){
        response.send('Erro no acesso ao banco de dados');
        return console.log(err.message);
      }
      if(row){
        usuario = {
          id: row.id,
          nome: row.nome,
          email: row.email,
          login: row.login,
          senha: row.senha
        }
        response.redirect('main');
      }else{
        response.send('<body style=" background-color: black; "><div style="font-size: 20px;margin: 10% 20%; background-color: gray; color: white; padding: 10%;"><center>Não existe usuario ' + request.body.login + ' ou a senha está incorreta.<br><br><a href="/">Voltar</a></center></div></body>');
      }
    });
  });
});

app.get('/logout',(request, response) => {
    usuario = '';
    response.redirect('/');
});

//adiciona página de cadastro de usuário
app.get('/cadastro',(request, response) => {
  response.sendFile(path.join(__dirname,'./views/cadastro.html'));
});

//adiciona novo usuario
app.post('/adduser',(request, response) => {
  banco.serialize(() => {
  	banco.run(incluirUsuario,[request.body.nome,request.body.email,request.body.login,request.body.senha], (err) => {
  	  if(err){
  	  	response.send('Erro no acesso ao banco de dados');
  	  	return console.log(err.message);
  	  }
  	  console.log('Usuario cadastrado');
  	  response.send('<body style=" background-color: black; "><div style="font-size: 20px;margin: 10% 20%; background-color: gray; color: white; padding: 10%;"><center>Usuario ' + request.body.login + ' cadastrado com sucesso.<br><br><a href="/">Entrar</a></center></div></body>');
  	});
  });
});

//atualizar usuario
app.post('/attuser',(request, response) => {
  banco.serialize(() => {
    banco.run(atualizarUsuario,[request.body.nome,request.body.email,request.body.login,request.body.senha,usuario.id], (err) => {
      if(err){
        response.send('Erro no acesso ao banco de dados');
        return console.log(err.message);
      }
      usuario = '';
      console.log('Usuario atualizado');
      response.send('<body style=" background-color: black; "><div style="font-size: 20px;margin: 10% 20%; background-color: gray; color: white; padding: 10%;"><center>Usuario ' + request.body.login + ' atualizado com sucesso.<br><br><a href="/">Continuar</a></center></div></body>');
    });
  });
});

//adiciona novo ponto
app.post('/addponto',(request, response) => {
  banco.serialize(() => {
    banco.run(incluirPonto,[request.body.nomeEvento, request.body.tipo, request.body.descricao, request.body.lat, request.body.lon], (err) => {
      if(err){
        response.send('Erro no acesso ao banco de dados');
        return console.log(err.message);
      }
      console.log('Ponto Cadastrado');
      response.redirect('main');
    });
  });
});

//página que carrega os dados cadaastrados
app.get('/dados',(request, response) => {
  if(usuario != null){
    banco.serialize(() => {
      banco.all(consultarDados,[], (err,rows) => {
        if(err){
          response.send('Erro no acesso ao banco de dados');
          return console.log(err.message);
        }
        dados = [];
        rows.forEach((row)=>{
          let item = {descricao:row.descricao,valor:row.valor};
          dados.push(item);
        });
      });
    response.render("dados",{itens:dados});
    });
  }else{
    response.redirect('/');
  }
});


//adiciona arquivo existente no diretório raiz
//esta é a página que vai aparecer ao acessar a aplicação
app.get('/insere',(request, response) => {
  if(usuario != null){
    response.sendFile(path.join(__dirname,'./views/insere.html'));
  }else{
    response.redirect('/');
  }
});

//adiciona novo item
app.post('/additem',(request, response) => {
  banco.serialize(() => {
    banco.run(incluirDados,[request.body.descricao,request.body.valor], (err) => {
      if(err){
        response.send('Erro no acesso ao banco de dados');
        return console.log(err.message);
      }
      console.log('Item cadastrado');
      response.send('Item '+request.body.descricao+' cadastrado com sucesso.<br><br><a href="dados">Visualizar dados</a>');
    });
  });
});

//desvincula o usuário
app.get('/logout',(request, response) => {
    usuario = null;
    response.redirect('/');
});


//fecha o banco
app.get('/close',(request, response) => {
	banco.close((err) => {
		if(err){
			response.send('Nao foi possivel encerrar a conexao');
			return console.log(err.message);
		}
		console.log('Conexao encerrada');
		response.send('Conexao com banco de dados encerrada');
	});
});

var estacoes = [];
//le arquivo csv
function leArquivo(){
  estacoes = [];
  fs.createReadStream('dados/estacoes-bikesampa.csv')
    .on('error',()=> {})
    .pipe(csv())
    .on('data',(row) => {
      estacoes.push(row);
      console.log(row);
    })
    .on('end', () => {
      console.log(estacoes.length);
      console.log('terminou');
    });
}

//página que carrega os dados cadaastrados
app.get('/estacoes',(request, response) => {
    leArquivo();
});

app.listen(porta, () => {
  console.log(`Servidor usando Express rodando na porta ${porta}!`);
});
