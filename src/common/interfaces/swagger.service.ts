export interface Swagger {
  name: string;
  title: string;
  description: string;
  tag: string;
  version?: string;
}

export interface SwaggerDocument extends Swagger {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  module: Function;
}

export interface MainSwaggerDocument extends Swagger {
  documents: SwaggerDocument[];
}

export interface ISwaggerService {
  setupGlobalDocument(document: MainSwaggerDocument): void;
  setupDocument(document: SwaggerDocument);
}
