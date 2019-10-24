const { Transform } = require('stream');

const transformStream = new Transform({
  transform(chunk, encoding, callback) {
    this.push(
      chunk
        .toString()
        .toLowerCase()
        .split(' ')
        .map((word, index) => 
          index > 0 ? word.charAt(0).toUpperCase() + word.substring(1) : word
        )
        .join('')
    );
    callback();
  }
});

process.stdin.pipe(transformStream).pipe(process.stdout);