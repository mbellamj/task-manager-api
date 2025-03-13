import { Server } from './server';

async function bootstrap() {
  const server = Server.new();
  await server.run();
}

bootstrap();
