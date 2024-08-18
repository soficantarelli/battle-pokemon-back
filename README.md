# battle-pokemon-back

Proyecto backend para mostrar pokemon disponibles y peleen, además de decir cual es el ganador

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
Para iniciar el proyecto en modo de desarrollo, ejecuta el siguiente comando:
    
   ```bash
    npm run start:dev

Para la migración los pasos son los siguientes
En caso de no tener la base de datos:
1. npm run migration:create --name=Pokemon
2. npm run typeorm migration:run -- -d ./src/config/typeorm.ts
3. Eliminar luego la carpeta migrations    
