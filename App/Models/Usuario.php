<?php
    namespace App\Models;
    use MF\Model\Model;
    class Usuario extends Model{
        private $id;
        private $nome;
        private $email;
        private $senha;
        private $data; 
        private $genero;
        private $phone;
        private $escolaridade;
        private $cpf;
        private $mae;
        private $pai;
        private $pl;
        private $bens;
        private $renda;
        private $cep;
        private $estado;
        private $cidade;
        private $endereco;
        private $bairro;
        private $complemento; 
        private $investidor;

        public function __get($atributo){
            return $this->$atributo;
        }
        public function __set($atributo, $valor){
            $this->$atributo = $valor;
        }
        //bd
        //recuperar usuario por email
        public function getUsuarioPorEmail(){
            $query = "select nome, email from usuarios where email = ?";
            $stmt = $this->db->prepare($query);
            $stmt->bindValue(1, $this->__get('email'));
            $stmt->execute();
            return $stmt->fetchAll(\PDO::FETCH_ASSOC);
        }
        public function getInfoUsuario(){
            $query = "select nome from usuarios where id = ?";
            $stmt = $this->db->prepare($query);
            $stmt->bindValue(1, $this->__get('id'));
            $stmt->execute();
            return $stmt->fetch(\PDO::FETCH_ASSOC);
        }
        public function getPerfilUsuario(){
            $query = "select nome, email, phone,investidor from usuarios where id = ?";
            $stmt = $this->db->prepare($query);
            $stmt->bindValue(1, $this->__get('id'));
            $stmt->execute();
            return $stmt->fetch(\PDO::FETCH_ASSOC);
        }
        public function autenticar(){
            $query = "select id, nome, email from usuarios where email = ? and
            senha = ?";
            $stmt = $this->db->prepare($query);
            $stmt->bindValue(1, $this->__get('email'));
            $stmt->bindValue(2, $this->__get('senha'));
            $stmt->execute();
            $usuario = $stmt->fetch(\PDO::FETCH_ASSOC);
            
            if($usuario['id'] != '' && $usuario['nome'] != ''){
                $this->__set('id', $usuario['id']);
                $this->__set('nome', $usuario['nome']);
            }
            return $this;
        }
        public function trocarInvestidor(){
            $query = "update usuarios set investidor = ? where usuarios.id = ?";
            $stmt = $this->db->prepare($query);
            $stmt->bindValue(1, $this->__get('investidor'));
            $stmt->bindValue(2, $this->__get('id'));
            $stmt->execute();
            return $this;
        }

        //salva usuario
        public function salvar(){
            $query = "insert into usuarios(nome, email, senha, idade, phone, 
            cpf, genero, escolaridade, mae, pl, bens, renda, cep, estado, 
            cidade, endereco, pai, complemento, investidor) values
            (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
            $stmt = $this->db->prepare($query);
            $stmt->bindValue(1, $this->__get('nome'));
            $stmt->bindValue(2, $this->__get('email'));
            $stmt->bindValue(3, $this->__get('senha'));
            $stmt->bindValue(4, $this->__get('data'));
            $stmt->bindValue(5, $this->__get('phone'));
            $stmt->bindValue(6, $this->__get('cpf'));
            $stmt->bindValue(7, $this->__get('genero'));
            $stmt->bindValue(8, $this->__get('escolaridade'));
            $stmt->bindValue(9, $this->__get('mae'));
            $stmt->bindValue(10, $this->__get('pl'));
            $stmt->bindValue(11, $this->__get('bens'));
            $stmt->bindValue(12, $this->__get('renda'));
            $stmt->bindValue(13, $this->__get('cep'));
            $stmt->bindValue(14, $this->__get('estado'));
            $stmt->bindValue(15, $this->__get('cidade'));
            $stmt->bindValue(16, $this->__get('endereco'));
            $stmt->bindValue(17, $this->__get('pai'));
            $stmt->bindValue(18, $this->__get('complemento'));
            $stmt->bindValue(19, $this->__get('investidor'));
            $stmt->execute();
            return $this;
        }
        //-----------------------------------------------------------------------------
        //validações
        public function validarRegistro(){
            if($this->validarNome($this->__get('nome')) &&
                $this->validarEmail() && $this->validarSenha() &&
                $this->validarData() && $this->validarPhone() && $this->validarCPF() &&
                $this->validarNome($this->__get('mae')) && 
                ($this->validarNome($this->__get('pai')) || $this->__get('pai') == 'N/A') &&
                $this->validarNumero($this->__get('pl')) && 
                $this->validarNumeroReal($this->__get('bens')) &&
                $this->validarNumeroReal($this->__get('renda')) &&
                $this->validarCEP()
            ){
                $this->__set('senha', md5($this->__get('senha')));
                return true;
            }
            return false;
        }            
        public function validarNome($nome){
            $str = explode(" ",$nome);
            $lenght = sizeof($str);
            if($lenght < 2) return false;
            if(!preg_match("/^([a-zA-Z' ]+)$/",$nome)) return false;
            for($i = 0; $i < $lenght; $i++){
                if(strlen($str[$i]) < 3) return false;
            }
            return true;
        }
        public function validarNumero($numero){
            $re = "/^[0-9]+$/";
            if(!preg_match($re, $numero)) return false;
            return true;
        }
        public function validarNumeroReal($numero){
            $re =  "/^[0-9]+?(.|,[0-9]+)$/";
            if(!preg_match($re, $numero)) return false;
            return true;
        }
        public function validarCEP(){
            $cep = $this->__get('cep');
            $re = "/^\d{5}\-?\d{3}$/";
            if(!preg_match($re, $cep)) return false;
            return true;
        }
        public function validarData(){
            $data = $this->__get('data');
            $str = explode("-",$data);
            $mes = (int) $str[1];
            $dia = (int) $str[2];
            $ano = (int) $str[0];
            if(!checkdate($mes, $dia, $ano)) return false;
            $lenght = sizeof($str);
            if($lenght < 3) return false;

            date_default_timezone_set('America/Sao_Paulo');
            $data_atual = date('Y-m-d');
            $str2 = explode("-",$data_atual);
            if($str2[0] - $str[0] < 18) return false;
            else if($str2[0] - $str[0] == 18){
                if($str2[1] - $str[1] < 0){
                    return false;
                }
                else if($str2[1] - $str[1] == 0){
                    if($str2[2] - $str[2] < 0) return false;
                }
            }
            if($str2[0] - $str[0] > 100) return false;
            return true;
        }
        public function validarPhone(){
            $numero = $this->__get('phone');
            $re = "/^\(?(?:[14689][1-9]|2[12478]|3[1234578]|5[1345]|7[134579])\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/";
            if(!preg_match($re, $numero)) return false;
            return true;
        }
        public function validarCPF(){
            $cpf = $this->__get('cpf');
            $re = "/^(([0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2})|([0-9]{11}))$/";
            if(!preg_match($re, $cpf)) return false;
            return true;
        }
        public function validarEmail(){
            $email = $this->__get('email');
            $re = "/\S+@\S+\.\S+/";
            if(!preg_match($re, $email)) return false;
            return true;
        }
        public function validarSenha(){
            $senha = $this->__get('senha');
            $re = "/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/";
            if(!preg_match($re, $senha)) return false;
            return true;
        }
        public function validarSenha2(){
            $senha = $this->__get('senha');
            $senha2 = $this->__get('senha2');
            if($senha != $senha2) return false;
            return true;
        }
    }
?>