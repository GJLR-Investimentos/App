<?php
    namespace App\Controllers;
    use MF\Controller\Action;
    use MF\Model\Container;

    class indexController extends Action{
        public function index(){ 
            $this->view->login = isset($_GET['login']) ? $_GET['login'] : '';         
            $this->render('index');
        }
        public function inscreverse(){
            session_start();
            if(isset($_GET['page']) && $_GET['page'] == 1){               
                session_destroy();
                $this->render('inscreverse');
            }
            else if(isset($_GET['page']) && $_GET['page'] == 2){
                if(isset($_SESSION['nome']) && $_SESSION['nome'] != ''
                    && isset($_SESSION['data']) && $_SESSION['data'] != ''
                    && isset($_SESSION['phone']) && $_SESSION['phone'] != ''
                    && isset($_SESSION['cpf']) && $_SESSION['cpf'] != ''
                    && isset($_SESSION['email']) && $_SESSION['email'] != ''
                    && isset($_SESSION['senha']) && $_SESSION['senha'] != ''
                    ){
                        $this->render('inscreverse2');
                }
                else if(!isset($_POST['nome']) || $_POST['nome'] == ''
                    || !isset($_POST['data']) || $_POST['data'] == ''
                    || !isset($_POST['phone']) || $_POST['phone'] == ''
                    || !isset($_POST['cpf']) || $_POST['cpf'] == ''
                    || !isset($_POST['email']) || $_POST['email'] == ''
                    || !isset($_POST['senha']) || $_POST['senha'] == ''
                    || !isset($_POST['senha2']) || $_POST['senha2'] == ''
                    ){
                    header('Location: /inscreverse?page=1&erro=1');
                }
                else{
                    $usuario = Container::getModel('Usuario');
                    $usuario->__set('nome', $_POST['nome']);
                    $usuario->__set('data', $_POST['data']);
                    $usuario->__set('phone', $_POST['phone']);
                    $usuario->__set('cpf', $_POST['cpf']);
                    $usuario->__set('email', $_POST['email']);
                    $usuario->__set('senha', $_POST['senha']);
                    $usuario->__set('senha2', $_POST['senha2']);

                    $boolValida = true;
                    $str = '';
                    if(!$usuario->validarNome($usuario->__get('nome'))){
                        $str = $str."&nome=erro";
                        $boolValida = false;
                    }
                    if(!$usuario->validarData()){
                        $str = $str."&data=erro";
                        $boolValida = false;
                    }
                    if(!$usuario->validarPhone()){
                        $str = $str."&phone=erro";
                        $boolValida = false;
                    }
                    if(!$usuario->validarCPF()){
                        $str = $str."&cpf=erro";
                        $boolValida = false;
                    }
                    if(!$usuario->validarEmail()){
                        $str = $str."&email=erro";
                        $boolValida = false;
                    }
                    else if(count($usuario->getUsuarioPorEmail()) != 0){
                        $str = $str."&email=erro2";
                        $boolValida = false;
                    }
                    if(!$usuario->validarSenha()){
                        $str = $str."&senha=erro";
                        $boolValida = false;
                    }
                    if(!$usuario->validarSenha2()){
                        $str = $str."&senha2=erro";
                        $boolValida = false;
                    }
                    if($boolValida){
                        $_SESSION['nome'] = $_POST['nome'];
                        $_SESSION['data'] = $_POST['data'];
                        $_SESSION['phone'] = $_POST['phone'];
                        $_SESSION['cpf'] = $_POST['cpf'];
                        $_SESSION['email'] = $_POST['email'];
                        $_SESSION['senha'] = $_POST['senha'];
                        if(isset($_POST['genero']) && $_POST['genero'] != ''){
                            $_SESSION['genero'] = $_POST['genero'];
                        }
                        else $_SESSION['genero'] = 0;
                        if(isset($_POST['escolaridade']) && $_POST['escolaridade'] != ''){
                            $_SESSION['escolaridade'] = $_POST['escolaridade'];
                        }
                        else $_SESSION['escolaridade'] = 0;
                        $this->render('inscreverse2');
                    }
                    else{
                        header('Location: /inscreverse?page=1'.$str);
                    }                   
                }
            }           
        }
        public function preTeste(){
            session_start();
            if(isset($_SESSION['id'])){
                $this->render('pre_teste');
            }
            else{
                if(isset($_SESSION['mae']) && $_SESSION['mae'] != ''
                    && isset($_SESSION['pl']) && $_SESSION['pl'] != ''
                    && isset($_SESSION['bens']) && $_SESSION['bens'] != ''
                    && isset($_SESSION['renda']) && $_SESSION['renda'] != ''
                    && isset($_SESSION['cep']) && $_SESSION['cep'] != ''
                    && isset($_SESSION['estado']) && $_SESSION['estado'] != ''
                    && isset($_SESSION['cidade']) && $_SESSION['cidade'] != ''
                    && isset($_SESSION['endereco']) && $_SESSION['endereco'] != ''
                    && isset($_SESSION['bairro']) && $_SESSION['bairro'] != ''
                    ){
                        $this->render('pre_teste');
                }
                else if(!isset($_POST['mae']) || $_POST['mae'] == ''
                    || !isset($_POST['pl']) || $_POST['pl'] == ''
                    || !isset($_POST['bens']) || $_POST['bens'] == ''
                    || !isset($_POST['renda']) || $_POST['renda'] == ''
                    || !isset($_POST['cep']) || $_POST['cep'] == ''
                    || !isset($_POST['estado']) || $_POST['estado'] == ''
                    || !isset($_POST['cidade']) || $_POST['cidade'] == ''
                    || !isset($_POST['endereco']) || $_POST['endereco'] == ''
                    || !isset($_POST['bairro']) || $_POST['bairro'] == ''
                    ){
                    header('Location: /inscreverse?page=2&erro=1');
                }
                else{
                    $usuario = Container::getModel('Usuario');
                    $usuario->__set('mae', $_POST['mae']);
                    $usuario->__set('pl', $_POST['pl']);
                    $usuario->__set('bens', $_POST['bens']);
                    $usuario->__set('renda', $_POST['renda']);
                    $usuario->__set('cep', $_POST['cep']);
                    $usuario->__set('estado', $_POST['estado']);
                    $usuario->__set('cidade', $_POST['cidade']);
                    $usuario->__set('endereco', $_POST['endereco']);
                    $usuario->__set('bairro', $_POST['bairro']);

                    $boolValida = true;
                    $str = '';
                    if(isset($_POST['pai']) && $_POST['pai'] != ''){
                        $usuario->__set('pai', $_POST['pai']);
                        if(!$usuario->validarNome($usuario->__get('pai'))){
                            $str = $str."&pai=erro";
                            $boolValida = false;
                        }
                    }
                    if(isset($_POST['complemento']) && $_POST['complemento'] != ''){
                        $usuario->__set('complemento', $_POST['complemento']);
                    }
                    if(!$usuario->validarNome($usuario->__get('mae'))){
                        $str = $str."&mae=erro";
                        $boolValida = false;
                    }
                    if(!$usuario->validarNumero($usuario->__get('pl'))){
                        $str = $str."&pl=erro";
                        $boolValida = false;
                    }
                    if(!$usuario->validarNumeroReal($usuario->__get('bens'))){
                        $str = $str."&bens=erro";
                        $boolValida = false;
                    }
                    if(!$usuario->validarNumeroReal($usuario->__get('renda'))){
                        $str = $str."&renda=erro";
                        $boolValida = false;
                    }
                    if(!$usuario->validarCEP()){
                        $str = $str."&cep=erro";
                        $boolValida = false;
                    }
                    //TODO -> Validar outros dados em outro momento;
                    if($boolValida){
                        $_SESSION['mae'] = $_POST['mae'];
                        $_SESSION['pl'] = $_POST['pl'];
                        $_SESSION['bens'] = $_POST['bens'];
                        $_SESSION['renda'] = $_POST['renda'];
                        $_SESSION['cep'] = $_POST['cep'];
                        $_SESSION['estado'] = $_POST['estado'];
                        $_SESSION['cidade'] = $_POST['cidade'];
                        $_SESSION['endereco'] = $_POST['endereco'];
                        $_SESSION['bairro'] = $_POST['bairro'];
                        if(isset($_POST['pai']) && $_POST['pai'] != ''){
                            $_SESSION['pai'] = $_POST['pai'];
                        }
                        else $_SESSION['pai'] = "N/A";
                        if(isset($_POST['complemento']) && $_POST['complemento'] != ''){
                            $_SESSION['complemento'] = $_POST['complemento'];
                        }
                        else $_SESSION['complemento'] = "N/A";
                        $this->render('pre_teste');
                    }
                    else{
                        header('Location: /inscreverse?page=2'.$str);
                    }
                }                  
            }         
        }
        public function registrar(){
            session_start();
            if(isset($_POST['soma']) && $_POST['soma'] != ''){
                $investidor = 0;
                if(intval($_POST['soma']) > 78) $investidor = 4;
                else if(intval($_POST['soma']) > 61) $investidor = 3;
                else if(intval($_POST['soma']) > 42) $investidor = 2;
                else{
                    $investidor = 1;
                }
                $_SESSION['investidor'] = $investidor;
                $usuario = Container::getModel('Usuario');
                echo $usuario->getInfoUsuario();
                if(isset($_SESSION['id'])){
                    $usuario->__set('id', $_SESSION['id']);
                    $usuario->__set('investidor', $_SESSION['investidor']);
                    $usuario->trocarInvestidor();
                    $investidor = $_SESSION['investidor'];
                    header('Location: /finalRegistro?investidor='.$investidor);
                }
                else{
                    $usuario->__set('nome', $_SESSION['nome']);
                    $usuario->__set('email', $_SESSION['email']);
                    $usuario->__set('senha', $_SESSION['senha']);
                    $usuario->__set('genero', $_SESSION['genero']);
                    $usuario->__set('escolaridade', $_SESSION['escolaridade']);
                    $usuario->__set('data', $_SESSION['data']);
                    $usuario->__set('phone', $_SESSION['phone']);
                    $usuario->__set('cpf', $_SESSION['cpf']);
                    $usuario->__set('mae', $_SESSION['mae']);
                    $usuario->__set('pai', $_SESSION['pai']);
                    $usuario->__set('pl', $_SESSION['pl']);
                    $usuario->__set('bens', $_SESSION['bens']);
                    $usuario->__set('renda', $_SESSION['renda']);
                    $usuario->__set('cep', $_SESSION['cep']);
                    $usuario->__set('estado', $_SESSION['estado']);
                    $usuario->__set('cidade', $_SESSION['cidade']);
                    $usuario->__set('endereco', $_SESSION['endereco']);
                    $usuario->__set('bairro', $_SESSION['bairro']);
                    $usuario->__set('complemento', $_SESSION['complemento']);
                    $usuario->__set('investidor', $_SESSION['investidor']);
                    if($usuario->validarRegistro() && count($usuario->getUsuarioPorEmail()) == 0){
                        $usuario->salvar();
                        $investidor = $_SESSION['investidor'];
                        session_destroy();
                        header('Location: /finalRegistro?investidor='.$investidor);            
                    }
                    else{
                        header('Location: /inscreverse?page=1&erro=2');
                    }
                }
            }
            else{
                header('Location: /pre_teste');
            }
        }
        public function finalRegistro(){          
            $this->render('finalRegistro');   
        }
    }
?>