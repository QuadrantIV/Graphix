import { config } from './instance';
import Document from './document';
import DocumentCollection, { DocumentCollectionData } from './document/collection';
import { DocumentData } from './types';

export default class Workspace {
  private document: Document;
  private documentCollection: DocumentCollection;

  initDocument(data: DocumentData): Document {
    if (this.document) {
      return this.document;
    }

    this.document = new Document(data, config.getDocSettings());
    return this.document;
  }

  initDocumentCollection(data: DocumentCollectionData): DocumentCollection {
    if (this.documentCollection) {
      return this.documentCollection;
    }

    this.documentCollection = new DocumentCollection(data, config.getDocSettings());
    return this.documentCollection;
  }

  getDocument(): Document {
    return this.document;
  }

  getDocumentCollection(): DocumentCollection {
    return this.documentCollection;
  }

  destroy() {
    this.document = undefined!;
    this.documentCollection = undefined!;
  }
}
