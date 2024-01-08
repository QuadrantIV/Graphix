import { config } from './instance';
import Document from './document';
import DocumentCollection, { DocumentCollectionData } from './document/collection';
import { DocumentData, SettingConfig } from './types';

export default class Workspace {
  private document: Document;
  private documentCollection: DocumentCollection;

  initDocument(data: DocumentData, settingsConfig: Array<SettingConfig> = []): Document {
    if (this.document) {
      return this.document;
    }

    this.document = new Document(data, settingsConfig);
    return this.document;
  }

  initDocumentCollection(data: DocumentCollectionData, settingsConfig: Array<SettingConfig> = []): DocumentCollection {
    if (this.documentCollection) {
      return this.documentCollection;
    }

    this.documentCollection = new DocumentCollection(data, settingsConfig);
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
