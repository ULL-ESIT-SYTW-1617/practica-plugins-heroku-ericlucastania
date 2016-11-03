'use strict';

module.exports = {

	rend: (argv,path,fs,defaultname,defaultemail,direct) => {
		
		
		var ejs = require('ejs');
		require('shelljs/global');
		
		//Rutas interesantes
		var rutaTemplate = path.join(__dirname, '..','template');
		var pck = require(path.join(__dirname, '..','package.json'));
		//Expresion regular
		
		var re = /.ejs/g;
	
		
		// Si la opcion es -v,imprime version
		
		if(argv.v){
			console.log(pck.version);
		}
		
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
		cd(dir);
		exec('git init');
		exec('npm install');
	}
};