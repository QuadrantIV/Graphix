import { EventEmitter } from 'events';
import Document from './index';
import { DocumentData, SettingConfig } from '../types';

export interface DocumentCollectionData {
  documents: DocumentData[];
}

export default class DocumentCollection {
  private emitter: EventEmitter = new EventEmitter();
  private items: Document[] = [];
  private current: Document | null = null;

  constructor(data: DocumentCollectionData, private settingsConfig?: Array<SettingConfig>) {
    this.items = [];
  }

  createDocument(data: DocumentData): Document {
    return new Document(data, this.settingsConfig);
  }

  addDocument(doc: DocumentData | Document, index: number | null = null): Document {
    if (!(doc instanceof Document)) {
      doc = this.createDocument(doc);
    }

    if (index === null || index > this.items.length) {
      index = this.items.length;
    } else if (index < 0) {
      index = 0;
    }

    this.items.splice(index, 0, doc);

    if (!this.current) {
      this.setCurrent(doc);
    }

    return doc;
  }

  removeDocument(doc: Document): void {
    const i = this.items.indexOf(doc);
    if (i > -1) {
      this.items.splice(i, 1);
      if (this.current === doc) {
        this.setCurrent(this.getDocument(0));
      }
    }
  }

  getDocument(index: number): Document | null {
    return this.items[index] || null;
  }

  getItems(): Document[] {
    return this.items;
  }

  getCurrent(): Document | null {
    return this.current;
  }

  setCurrent(doc: Document | null): void {
    if (this.current === doc) {
      return;
    }
    const orig = this.current;
    this.current = doc;
    this.emitter.emit('currentchange');
  }

  onCurrentChange(fn: () => void): () => void {
    this.emitter.on('currentchange', fn);
    return () => {
      this.emitter.removeListener('currentchange', fn);
    };
  }

  getData(): DocumentCollectionData {
    return {
      documents: this.items.map((doc) => doc.getData()),
    };
  }
}
