const fs = require('fs');

const streamPipe = (path, res) => {
    const fileStream = fs.createReadStream(path);

    fileStream.pipe(res)
}

module.exports = streamPipe