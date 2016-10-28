'use strict';

module.exports = {    
        
        execute: (path,direct,fs,option,d,deploy) =>{
            //ejecutar todos los initialize globales y locales si no hay argumentos
			var rutaModulesGlobal = path.join(__dirname, '..','..');
		    //var rutaModulesLocal = path.join(direct,'node_modules');
			var argum = d || deploy;
			var expr = "^gitbook-start-plugin" + argum;
			var replugin = new RegExp(expr,"g");
			
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
						requireNames[option]();
					}
				}
				
			};
			rutas(rutaModulesGlobal);
			//rutas(rutaModulesLocal);
        },
        
};
        