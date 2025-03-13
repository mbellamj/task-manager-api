import { INestApplication, Injectable } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import {
  ISwaggerService,
  MainSwaggerDocument,
  SwaggerDocument,
} from '@/common/interfaces/swagger.service';

@Injectable()
export class SwaggerService implements ISwaggerService {
  constructor(private readonly app: INestApplication) {}

  setupGlobalDocument(document: MainSwaggerDocument): void {
    const options = new DocumentBuilder()
      .setTitle(document.title)
      .setDescription(document.description)
      .setVersion(document.version || '')
      .addTag(document.tag)
      .addBearerAuth()
      .build();

    const documentFactory = () =>
      SwaggerModule.createDocument(this.app, options);

    const url = this.getDocumentURL(document.name);

    SwaggerModule.setup(document.name, this.app, documentFactory, {
      explorer: document.documents.length > 0,
      swaggerOptions: {
        urls: [
          { name: document.name, url },
          ...this.getDocuments(document.documents),
        ],
      },
      jsonDocumentUrl: url,
    });
    document.documents.forEach((doc) => this.setupDocument(doc));
  }

  setupDocument(document: SwaggerDocument) {
    const options = new DocumentBuilder()
      .setTitle(document.title)
      .setDescription(document.description)
      .setVersion(document.version || '')
      .addTag(document.tag)
      .addBearerAuth()
      .addSecurityRequirements('bearer')
      .build();

    const documentFactory = () =>
      SwaggerModule.createDocument(this.app, options, {
        include: [document.module],
      });

    SwaggerModule.setup(document.name, this.app, documentFactory, {
      jsonDocumentUrl: this.getDocumentURL(document.name),
    });
  }

  private getDocuments(
    documents: SwaggerDocument[],
  ): { name: string; url: string }[] {
    return documents.map((document, idx) => ({
      name: `${idx + 1}. ${document.title}`,
      url: this.getDocumentURL(document.name),
    }));
  }

  private getDocumentURL(name: string) {
    return `${name.toLowerCase()}/docs/swagger.json`;
  }
}
