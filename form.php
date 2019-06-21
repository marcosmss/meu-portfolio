<?php
  $emailEnviar = "marcosmss1304@gmail.com";
  $nome = $_POST['nome'];
  $telefone = $_POST['telefone'];
  $email = $_POST['email'];
  $mensagem = $_POST['mensagem'];

  if($_POST['enviar']) (
    mail("$emailEnviar", "$mensagem", "
    
    Este é um contato enviado pelo site por $nome com as seguintes informações:

    Nome: "$nome"
    Telefone: "$telefone"
    Email: "$email"
    --
    Mensagem: "$mensagem"

    ";)
  )
?>