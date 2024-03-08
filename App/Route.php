<?php
	namespace App;
	use MF\Init\Bootstrap;
	class Route extends Bootstrap{
		protected function initRoutes() {
			$routes['login'] = array(
				'route' => '/',
				'controller' => 'indexController',
				'action' => 'index'
			);
			$routes['inscreverse'] = array(
				'route' => '/inscreverse',
				'controller' => 'indexController',
				'action' => 'inscreverse'
			);
			$routes['pre_teste'] = array(
				'route' => '/pre_teste',
				'controller' => 'indexController',
				'action' => 'preTeste'
			);
			$routes['finalRegistro'] = array(
				'route' => '/finalRegistro',
				'controller' => 'indexController',
				'action' => 'finalRegistro'
			);
			$routes['registrar'] = array(
				'route' => '/registrar',
				'controller' => 'indexController',
				'action' => 'registrar'
			);
			$routes['autenticar'] = array(
				'route' => '/autenticar',
				'controller' => 'AuthController',
				'action' => 'autenticar'
			);
			$routes['sair'] = array(
				'route' => '/sair',
				'controller' => 'AuthController',
				'action' => 'sair'
			);
			$routes['home'] = array(
				'route' => '/home',
				'controller' => 'AppController',
				'action' => 'home'
			);
			$routes['perfil'] = array(
				'route' => '/perfil',
				'controller' => 'AppController',
				'action' => 'perfil'
			);
			$routes['investir'] = array(
				'route' => '/investir',
				'controller' => 'AppController',
				'action' => 'investir'
			);
			$routes['notFound404'] = array(
				'route' => '/notFound404',
				'controller' => 'AppController',
				'action' => 'notFound404'
			);
			$this->setRoutes($routes);
		}
	}
?>