# Challenge para MercadoLibre
### Operación Fuego de Quasar
API REST de detección de objetos mediante triangulación y reconstrucción de mensajes.

### Stack
**Back-end**

- [NodeJS](https://nodejs.org/)
- [Express](http://expressjs.com/pt-br/)


### Instalación
**Desde la terminal:**
1. Descargar el proyecto:
`$ git clone https://github.com/elbarbasoyio/MercadoLibre_BackChallenge`
2. Instalar las dependencias:
`$ npm install`
3. Levantar el servidor:
`$ npm start`

El servidor queda escuchando por default en el puerto 8080. Se puede cambiar esta configuración desde el archivo config.js:
```javascript
module.exports = {
  port: 8080
}
```
Hay una DEMO disponible en: https://challenge-meli-aamaya.appspot.com/

### Uso
Para probar los requests a los distintos end-points se recomiendan estas aplicaciones:
* Insomnia: https://insomnia.rest/
* Postman: https://www.postman.com/

La URL por defecto es localhost:8080. En caso de ingresar una ruta no válida el sistema responde con un estado 404 (URL inválida)

Los sátelites son 3:
1. Skywalker (skywalker)
2. Kenobi (kenobi)
3. Sato (sato)

Sus coordenadas actuales se definen en el archivo `api/controllers/config-satellites.js`:
```javascript
module.exports = {
  currentPosition: {
    kenobi: { x: -500, y: -200 },
    skywalker: { x: 100, y: -100 },
    sato: { x: 500, y: 100 }
  }
}
````
* **POST -> /api/topsecret/**
  * Recibe la información de los satélites y devuelve la posición de la fuente y el contenido del mensaje original
  * Un ejemplo del payload sería el siguiente:
```javascript
{
  "satellites": [
  {
    "name": "kenobi",
    "distance": 100,
    "message": ["la", "", "", "en", "", "pocilga"]
  },
  {
    "name": "skywalker",
    "distance": 115.5,
    "message": ["", "la", "puerca", "", "", "", "pocilga"]
  },
  {
    "name": "sato",
    "distance": 142.7,
    "message": ["", "", "está", "", "la", ""]
  }]
}
```
  * Respuesta:
```javascript
{
  "position": {
    "x": 2.33,
    "y": -2802.18
  },
  "message": "a la grande le puse cuca"
}
````
* **POST -> /api/topsecret_split/:satellite_name**
  * Recibe la información de un satélite y la registra. 
  * Un ejemplo del payload sería el siguiente:
```javascript
{
  "distance": 50,
  "message": [“”, “este”, “es”, “”, “mensaje”]
}
```
  * Respuesta:
```javascript  
{
  "message": "Datos registrados correctamente",
}
```
* **GET -> /api/topsecret_split/**
  * Devuelve la posición de la fuente y el contenido del mensaje original siempre que se cuente con la información de los tres satélites.
  * Respuestas posibles:
 
```javascript
{
  "position": {
    "x": 23.35,
    "y": 18.30
  },
  "message": "este es un mensaje secreto"
}
````

```javascript
{
  "message": "No se pudo determinar la ubicación o el mensaje."
}
````
