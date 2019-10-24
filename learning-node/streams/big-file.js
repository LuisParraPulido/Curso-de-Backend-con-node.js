const fs = require('fs');
const file = fs.createWriteStream('./big');

for (let i = 0; i <= 1e6; i++) {
  file.write(
    'Estaba la pájara pinta a la sombra de un verde limón, con las alas cortaba las hojas, con el pico cortaba la flor.¡Ay! ¡ay!, cuándo veré a mi amor,¡Ay! ¡ay!, cuándo lo veré yo.'
  )
}

file.end();