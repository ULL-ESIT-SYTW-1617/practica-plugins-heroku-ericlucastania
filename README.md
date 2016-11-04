#Práctica: Heroku [PRINCIPAL]


## Descripción

El objetivo de esta práctica es implementar un plugin para el despliegue en la plataforma Heroku. Para ello se hacen uso de dos repositorios.
Este es el principal


## Pasos a ejecutar 

ANTES DE EMPEZAR ASEGÚRATE DE TENER EL TOOLBET DE HEROKU INSTALADO

**1. Instala nuestro paquete de forma global**

```npm install -g gitbook-start-elt```

**2. Instala el plugin de forma global**

```npm install -g gitbook-start-plugin-heroku-ericlucastania```

**3. Ejecuta el binario para el render del template**

```gitbook-start --dir Carpeta``` !!Si no ejecutas el --dir se creará una carpeta con tu nombre de usuario

**4. Entra en la carpeta**

 ```cd Carpeta```

**5. Ejecuta el plugin**

```gitbook-start -d heroku``` !! También puedes usar la opción --deploy

**6. Ejecuta un npm install**

```npm install```


**7. Ejecuta el gulp creado**


```gulp deploy-heroku```

#### Explicación

Cunado se ejecuta el gitbook-start -d PLUGIN se te lanzará el initialize del plugin,
el initialize crea una tarea en el gulp para realizar el deploy. Además de guardarte el paquete
elegido en el package.json.

## Opciones

    gitbook-start [OPTIONS]
        -d nombre del directorio a crear node gitbook-star -d miDirectorio
        -a autor del libro a crear node gitbook-star -a AutorDelLibro
        -e email del autor del libro node gitbook-star -e eric.ramos.suarez@gmail.com
        -r repositorio github contra el que se va a trabajar -r nameRepo
        -v muestra la version del paquete gitbook-start -v
        -h muestra ayuda sobre las opciones disponibles




## Enlaces interesantes 
 
* [NPM](https://www.npmjs.com/package/gitbook-start-elt)
* [Repositorio de la práctica](https://github.com/ULL-ESIT-SYTW-1617/practica-plugins-heroku-ericlucastania)
* [PLUGIN HEROKU](https://github.com/ULL-ESIT-SYTW-1617/gitbook-start-heroku-ericlucastania.git)
* [Descripción de la tarea campus](https://casianorodriguezleon.gitbooks.io/ull-esit-1617/content/practicas/practicaplugin2.html)
* [NPM PLUGIN HEROKU](https://www.npmjs.com/package/gitbook-start-plugin-heroku-ericlucastania)

## Componentes del grupo de trabajo

* [Eric Ramos](https://github.com/alu0100786330)
* [Lucas Ruiz](https://github.com/alu0100785265)
* [Tania González](https://github.com/tania77)


