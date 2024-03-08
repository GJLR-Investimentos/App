<link rel="stylesheet" href="/css/header.css">
<div class="navegacao"><!--Barra de navegação-->
    <nav class="navbar navbar-expand-md navbar-light">
    <div class="container">
        <a class="logo" href="/home">
        <div class="logo" style="width: 130px; height: 130px;"> <!--Logo-->
            <img src="img/logo2.png" class="image img-fluid">
        </div>
        </a>
        <button class="navbar-toggler mb-auto mt-3" data-toggle="collapse" data-target="#nav-principal">
        <i class="fas fa-bars"></i>
        </button>
        <div class="collapse navbar-collapse nav-principal" id="nav-principal">
        <ul class="navbar-nav">
            <li class="nav-item">
                <a href="#" class="nav-link">Sobre a GJLR</a>
            </li>  
            <li class="nav-item">
            <a href="/investir" class="nav-link">Investimentos</a>
            </li>
            <li class="nav-item">
            <a href="#" class="nav-link">Ajuda</a>
            </li>
            <li class="nav-item divisor"></li>
        </ul>              
        <div class="row">
            <div class="col-lg-6">                    
                <?php if(isset($this->view->info_usuario)){?>
                <a href="/perfil">
                <button class="btn btn-custom btn-azul cadastre"><i class="fas fa-user"> Usuário</i></button></a>
                <?php } else {?>
                <a href="/"><button class="btn btn-custom btn-azul cadastre"><i class="fas fa-sign-in-alt"></i></button></a>           
                <?php }?>                    
            </div>
            <div class="col-lg-6 espacoTopo">                   
            <a href="/sair"><button class="btn btn-custom btn-azul cadastre"><i class="fas fa-sign-out-alt"> Sair</i></button></a>                              
            </div>
        </div>             
        </div>
    </div>
    </nav>
</div><!--Fim Barra de navegação-->