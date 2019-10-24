const fs = require('fs');

fs.mkdir('so-archivos/nfl/mierda', { recursive: true}, err => {
  if (err) {
    return console.log(err);
  }
});