<?php

class Container {

	function get ($object) {
		return new $object;
	}

}

$c = new Container();

class Dependency {
	public $param = __CLASS__;
}



class _Object {
	public function example (Dependency $dependency) {
		return $dependency->param;
	}
}

$r = new ReflectionMethod('_Object', 'example');

$param = $r->getParameters()[0];
$nameArgument = $param->getName();
$dependency = $param->getClass()->name;

$object = new _Object();
echo $object->example( $c->get($dependency) );
