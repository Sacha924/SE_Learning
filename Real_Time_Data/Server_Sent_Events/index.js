const http = require('http');

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Connection', 'keep-alive');

  let counter = getRandomNumber(1, 10);

  const interval = setInterval(() => {
    // Every second, send a "ping" event.
    const curDate = new Date().toISOString();
    res.write('event: ping\n');
    res.write(`data: {"time": "${curDate}"}`);
    res.write('\n\n');

    // Send a simple message at random intervals.
    counter--;

    if (counter === 0) {
      res.write(`data: This is a message at time ${curDate}\n\n`);
      counter = getRandomNumber(1, 10);
    }

    // Break the loop if the client aborted the connection (closed the page)
    if (res.socket.destroyed) {
      clearInterval(interval);
      res.end();
    }
  }, 1000);

  req.on('close', () => {
    clearInterval(interval);
    res.end();
  });
});

server.listen(3000, () => {
  console.log('SSE server is running on port 3000');
});

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
