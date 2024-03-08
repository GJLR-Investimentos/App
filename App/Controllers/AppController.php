<?php
    namespace App\Controllers;
    use MF\Controller\Action;
    use MF\Model\Container;

    class AppController extends Action{
        public function home(){
            if($this->validaAutenticacao())
            {
                //infos do usuario
                $usuario = Container::getModel('Usuario');
                $usuario->__set('id', $_SESSION['id']);
                $this->view->info_usuario = $usuario->getInfoUsuario();    
            }
            $this->render('home');
        }
        public function perfil(){
            if(!$this->validaAutenticacao())
            {   
                header('Location: /?login=erro');
            }
            $usuario = Container::getModel('Usuario');
            $usuario->__set('id', $_SESSION['id']);
            $this->view->info_usuario = $usuario->getPerfilUsuario();
            if($this->view->info_usuario['investidor'] == "1"){
                $this->view->info_usuario['investidor'] = "Conservador";
            }
            else if($this->view->info_usuario['investidor'] == "2"){
                $this->view->info_usuario['investidor'] = "Moderado";
            }
            else if($this->view->info_usuario['investidor'] == "3"){
                $this->view->info_usuario['investidor'] = "Arrojado";
            }
            else{
                $this->view->info_usuario['investidor'] = "Agressivo";
            }
            $this->render('perfil');
        }
        public function investir(){
            if(!$this->validaAutenticacao())
            {   
                header('Location: /?login=erro');
            }
            $usuario = Container::getModel('Usuario');
            $usuario->__set('id', $_SESSION['id']);
            $this->view->info_usuario = $usuario->getPerfilUsuario();
            if($this->view->info_usuario['investidor'] == "1"){
                $this->view->info_usuario['investidor'] = "Conservador";
            }
            else if($this->view->info_usuario['investidor'] == "2"){
                $this->view->info_usuario['investidor'] = "Moderado";
            }
            else if($this->view->info_usuario['investidor'] == "3"){
                $this->view->info_usuario['investidor'] = "Arrojado";
            }
            else{
                $this->view->info_usuario['investidor'] = "Agressivo";
            }
            $this->render('investir');
        }
        public function validaAutenticacao(){
            session_start();
            if(!isset($_SESSION['id']) || $_SESSION['id'] == '' 
            || !isset($_SESSION['nome']) || $_SESSION['nome'] == ''){
                //header('Location: /?login=erro');
                return false;
            }
            return true;
        }
        public function notFound404(){
            if($this->validaAutenticacao())
            {
                //infos do usuario
                $usuario = Container::getModel('Usuario');
                $usuario->__set('id', $_SESSION['id']);
                $this->view->info_usuario = $usuario->getInfoUsuario();    
            }
            $this->render('notFound404');
        }
        public function getValueArrays(){
            session_start();
            // Get the array from the AJAX request
            $myArray = json_decode($_POST['myArray'], true);
            $nome = $myArray["name"];
            // Set the array in the session
            $_SESSION[$nome] = $myArray["data"];
            echo 'Value set in session: ' . print_r($_SESSION[$nome]);
        }
    }
?>