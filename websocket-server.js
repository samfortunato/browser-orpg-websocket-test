const WebSocket = require('ws');

const stateOfWorld = {
  entities: {},
};

const webSocketServer = new WebSocket.Server({ port: 8080 });

webSocketServer.on('connection', (webSocket) => {
  webSocket.on('message', (data) => {
    if (data) {
      const player = JSON.parse(data);
      stateOfWorld.entities[player.id] = { id: player.id, xPos: player.xPos, yPos: player.yPos };

      webSocket.send(JSON.stringify(stateOfWorld));
    }
  });
});


