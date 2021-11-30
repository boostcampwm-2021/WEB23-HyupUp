import { Server } from 'socket.io';
import { createClient } from 'redis';
import { createAdapter } from '@socket.io/redis-adapter';
import { RedisClient } from 'redis';

const io = new Server();
const pubClient = new RedisClient({ host: 'localhost', port: 6379 });
const subClient = pubClient.duplicate();

io.adapter(createAdapter(pubClient, subClient));

const client = createClient({ host: process.env.REDIS_HOST });

io.on('connection', (socket) => {
  socket.on('LOGIN', ({ userId, organizationId }: { userId: number; organizationId: number }) => {
    const roomName = organizationId.toString();
    socket.data.roomName = roomName;
    socket.join(roomName);
    socket.to(roomName).emit('ON', userId);
    client.lrange(roomName, 0, -1, (err, items) => {
      if (err) return;
      io.to(socket.id).emit(
        'LOGIN_CALLBACK',
        items.map((el) => JSON.parse(el)),
      );
    });
    client.lpush(roomName, JSON.stringify({ userId: userId, sid: socket.id }));
  });

  socket.on('LOGOUT', (userId: number) => {
    client.lrange(socket.data.roomName, 0, -1, (err, items) => {
      if (err) return;
      items.forEach((el) => {
        if (JSON.parse(el).userId !== userId) return;
        socket.to(socket.data.roomName).emit('OFF', userId);
        client.lrem(socket.data.roomName, 1, el);
      });
    });
  });

  socket.on('disconnecting', () => {
    client.lrange(socket.data.roomName, 0, -1, (err, items) => {
      if (err) return;
      items.forEach((el) => {
        if (JSON.parse(el).sid !== socket.id) return;
        socket.to(socket.data.roomName).emit('OFF', JSON.parse(el).userId);
        client.lrem(socket.data.roomName, 1, el);
      });
    });
  });

  socket.on('NEW_EPIC', (epicId: number) => {
    socket.to(socket.data.roomName).emit('GET_EPIC', epicId);
  });

  socket.on('UPDATE_EPIC_BAR', (epicId: number) => {
    socket.to(socket.data.roomName).emit('UPDATE_EPIC_BAR', epicId);
  });

  socket.on('UPDATE_EPIC_ORDER', (epicId: number) => {
    socket.to(socket.data.roomName).emit('UPDATE_EPIC_ORDER', epicId);
  });

  socket.on('DELETE_EPIC', (epicId: number) => {
    socket.to(socket.data.roomName).emit('DELETE_EPIC', epicId);

  socket.on('NEW_STORY', (storyId: number) => {
    socket.to(socket.data.roomName).emit('NEW_STORY', storyId);
  });

  socket.on('DELETE_STORY', (storyId: number) => {
    socket.to(socket.data.roomName).emit('DELETE_STORY', storyId);
  });

  socket.on('UPDATE_STORY', (storyId: number) => {
    socket.to(socket.data.roomName).emit('UPDATE_STORY', storyId);
  });

  socket.on('NEW_TASK', (userId: number) => {
    socket.to(socket.data.roomName).emit('NEW_TASK', userId);
  });
});

export default io;
