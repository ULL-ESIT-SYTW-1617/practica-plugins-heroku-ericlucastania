'use strict';

module.exports = {    
        
        iniDeplo: (path,direct,fs,option) =>{
            //ejecutar todos los initialize globales y locales si no hay argumentos
			var rutaModulesGlobal = path.join(__dirname, '..','..');
		    //var rutaModulesLocal = path.join(direct,'node_modules');
			
			var replugin = /^gitbook-start-plugin/g;
			
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
        