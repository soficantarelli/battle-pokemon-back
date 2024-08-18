# battle-pokemon-back

Proyecto backend para mostrar pokemon disponibles y peleen, además de decir cual es el ganador.
El mismo tiene una lógica para decidir cual es el ganador del reto
```
  El pokemon con la velocidad más alta hace el primer ataque, si son iguales, el pokemon con el ataque más alto va primero.
  Para calcular el daño, resta la defensa del ataque (ataque-defensa). La diferencia es el daño. Si el ataque es igual o menor que la defensa el daño es 1.
  El daño lo restas del HP.
  Los pokemon pelearán por turnos. Todos los turnos serán calculados in el mismo request. Es por esto por lo que el endpoint debe retornar la data del ganador en la misma llamada.
  El ganador es el que se reste el HP del enemigo a cero
```

# Requisitos Previos

Asegúrate de tener instalados los siguientes requisitos antes de empezar:

- [Node.js](https://nodejs.org/) (versión recomendada: v14.x o superior)
- [Git](https://git-scm.com/)

  ## Instalación

Sigue estos pasos para clonar el repositorio y ejecutar el proyecto en tu máquina local:

1. **Clonar el repositorio**

   Abre una terminal y ejecuta el siguiente comando para clonar el repositorio:

   ```bash
   git clone https://github.com/soficantarelli/battle-pokemon-back.git

2. **Ir a la carpeta del repositorio**

   ```bash
    cd battle-pokemon-back

3. **Instalar dependencias**

    ```bash
    npm install


Uso
Para iniciar el proyecto en modo de desarrollo, ejecuta el siguiente comando, el mismo se levantará en el puerto 4000
    
   ```bash
    npm run start:dev
   ````

Para la migración los pasos son los siguientes
En caso de no tener la base de datos:
```bash
1. npm run migration:create --name=Pokemon
2. npm run typeorm migration:run -- -d ./src/config/typeorm.ts
3. Eliminar luego la carpeta migrations
````

# Endpoints de la API
  ```
  http://localhost:4000/api/v1/battle-pokemon/
  ```


### `GET /pokemon`

**Descripción:** Devuelve todos los pokemons agregados a la base de datos

Response
  ```
    [
    {
      "id": "pokemon-1",
      "name": "Pikachu",
      "attack": 4,
      "defense": 3,
      "hp": 3,
      "speed": 6,
      "type": "Type",
      "imageUrl": "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/025.png"
    },
    {
      "id": "pokemon-2",
      "name": "Charmander",
      "attack": 4,
      "defense": 3,
      "hp": 3,
      "speed": 4,
      "type": "Type",
      "imageUrl": "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/004.png"
    }
]
  ```

### `GET /pokemon/random-opponent/:id`

**Descripción:** Devuelve un oponente random para el pokemon seleccionado

URL Params:

id (string): ID del pokemon retador.

 ```
    pokemon-3
  ```

Response
  ```
    {
      "id": "pokemon-4",
      "name": "Bulbasur",
      "attack": 4,
      "defense": 3,
      "hp": 3,
      "speed": 3,
      "type": "Type",
      "imageUrl": "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/001.png"
    }
  ```

### `GET /pokemon/:id`

**Descripción:** Devuelve el pokemon seleccionado

URL Params:

id (string): ID del pokemon seleccionado.

  ```
    pokemon-3
  ```

Response
  ```
    {
      "id": "pokemon-3",
      "name": "Squirtle",
      "attack": 3,
      "defense": 4,
      "hp": 3,
      "speed": 3,
      "type": "Type",
      "imageUrl": "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/007.png"
    }
  ```

### `POST /pokemon`

**Descripción:** Crear un pokemon

Request Body:

  ```
    {
      "id": "pokemon-1",
      "name": "Pikachu",
      "attack": 4,
      "defense": 3,
      "hp": 3,
      "speed": 6,
      "type": "Type",
      "imageUrl": "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/025.png"
    }
  ```

Response
  ```
    {
      "id": "pokemon-1",
      "name": "Pikachu",
      "attack": 4,
      "defense": 3,
      "hp": 3,
      "speed": 6,
      "type": "Type",
      "imageUrl": "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/025.png"
    }
  ```

### `POST /pokemon/json`

**Descripción:** Crear todos los pokemons que se encuentren en el archivo json

Request Body:

  ```
    -form 'file=@"/pokemon.json"'
  ```

Response
  ```
    [
    {
      "id": "pokemon-1",
      "name": "Pikachu",
      "attack": 4,
      "defense": 3,
      "hp": 3,
      "speed": 6,
      "type": "Type",
      "imageUrl": "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/025.png"
    },
    {
      "id": "pokemon-2",
      "name": "Charmander",
      "attack": 4,
      "defense": 3,
      "hp": 3,
      "speed": 4,
      "type": "Type",
      "imageUrl": "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/004.png"
    }
]
  ```
### `POST /battles`

**Descripción:** Se utiliza para guardar las batallas realizadas

Request Body:

  ```
    {
      "challenger_id": "pokemon-2",
      "opponent_id": "pokemon-1
    }
  ```

Response
  ```
[
    {
      "challenger_id": "pokemon-2",
      "opponent_id": "pokemon-1,
      "winner": "pokemon-2"
    }
]
  ```

### `GET /battles`

**Descripción:** Devuelve todas las batallas realizadas

Response
  ```
[
    {
      "challenger_id": "pokemon-2",
      "opponent_id": "pokemon-1,
      "winner": "pokemon-2"
    }
]
  ```
