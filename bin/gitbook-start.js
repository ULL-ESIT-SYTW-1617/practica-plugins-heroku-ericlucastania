#!/usr/bin/env node



var path = require('path');
var ejs = require('ejs');
var fs = require('fs-extra');
var argv = require('minimist')(process.argv.slice(2));
var gitConfig = require('git-config');


var re = /.ejs/g;
var replugin = /^gitbook-start-plugin/g;
var de = argv.d || argv.deploy;
	

var dep = '/'+ de + '/g';
//Rutas interesantes
var direct = process.cwd() + '/'; //Actual,desde donde se ejecuta el script

var rutaTemplate = path.join(__dirname, '..','template');
var rutaModulesGlobal = path.join(__dirname, '..','..');
var rutaModulesLocal = path.join(direct,'node_modules');

//Cosas de Tania
var opcionesValidas = ['d', 'a', 'r','dir','deploy','e'];
var flag = true;
var finish = false;

//variables funcionamiento
var sum=0;

var defaultname,defaultemail;





// Empezamos comprobando las opciones validas
function comprobarOpcion(opc) {
for (var i=0; i<opcionesValidas.length; i++) {
	if ((opcionesValidas[i] == opc))
		return true;
}
return false;
}

// Recorremos argumentos con minimist
for (var i in argv) {
if ((sum !=0) && (sum%2 == 0)) {
	if(comprobarOpcion(i)==false){
		flag = false;
		break;
	}
}
sum += 2;
}
  

gitConfig(function (err, config) {
	
	if(err)
		console.log(err);
	//opciones por defecto GitHub	
	defaultname = config.user.name;
	defaultemail = config.user.email;
	
	//ejecutar todos los initialize globales y locales
	var rutas = (ruta) => {
		var correctNames = [];
		try {
    		var names = fs.readdirSync(ruta);
		}
		catch(err) {
		    
		}
		
		if(names){
			for (var i in names){
				if(names[i].match(replugin)){
					correctNames.push(names[i]);
				}
			}
		}
		if(correctNames){
			for(var j in correctNames){
				var requireNames = require(correctNames[j]);
				requireNames.initialize();
			}
		}
		
	};
	rutas(rutaModulesGlobal);
	rutas(rutaModulesLocal);
	
	
	if (flag){
		
		// Creamos la carpeta
		
		var dir = argv.dir || defaultname;
		fs.mkdirsSync(direct + dir);
		
		//Ver los nombres de los archivos dentro de las carpetas
		var names = fs.readdirSync(rutaTemplate);
		
		var recursive = (names,folder) => {
			for (var i in names){
			
				if(names[i].match(re)){
				
					//Renderizamos el fichero
					var data = ejs.renderFile(rutaTemplate + '/' + folder + names[i],{
						
						autor:{
							name: argv.a || defaultname,
							email: argv.e || defaultemail
						}
						
					},(err,data) => {
						if(err){
							throw err;
							
						} else{
							return data;
							
						}
					});
					
					//Sustituimos el nombre, para quitarle la extensión ejs
					
					var newstr = names[i].replace(re, '');
				   
					fs.writeFile(direct + dir + '/' + folder + newstr, data, (err) => {
					  if (err) throw err;
					});
				}
				else{
					fs.mkdirsSync(direct + dir + '/' +names[i]);
					recursive(fs.readdirSync(rutaTemplate + '/' + names[i]),names[i] + '/');
				}
			}
		};
		
		recursive(names,'');
		finish = true;
	}
	
	
	else {
		console.log("gitbook-start [OPTIONS]\n"+
		"-dir nombre del directorio a crear node gitbook-star -d miDirectorio\n"+
		"-a autor del libro a crear node gitbook-star -a AutorDelLibro\n"+
		"-e email del autor del libro node gitbook-star -e eric.ramos.suarez@gmail.com\n"+
		"-r repositorio github contra el que se va a trabajar -r nameRepo\n"+
		"-d --deploy deploy en el que se quiera ejecutar gitbook-star -d iaas\n"+
		"-h muestra ayuda sobre las opciones disponibles\n");
	}
	
	
	//deploys
	
	
	if(finish && de){
		console.log("entra");
		var correctNames = [];
		var rutasDeploy = (ruta) => {
			try {
	    		var names = fs.readdirSync(ruta);
	    		console.log(names);
			}
			catch(err) {
			}
			
			if(names){
				for (var i in names){
					console.log("Resultado = ");
					console.log(names[i].match(dep));
					if(names[i].match(dep)){
						console.log("casa expresion regular");
						correctNames.push(names[i]);
					}
				}
			}
			if(correctNames){
				for(var j in correctNames){
					var requireNames = require(correctNames[j]);
					requireNames.deploy();
				}
			}
			
		};
		rutasDeploy(rutaModulesLocal);
	}
	
	
});


	

