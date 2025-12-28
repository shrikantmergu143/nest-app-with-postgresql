import { SetMetadata } from '@nestjs/common';

export const API_DOC_KEY = 'api_doc';

export interface ApiDocOptions {
  description: string;
  headers?: Record<string, string>;
  body?: Record<string, any>;
  response?: Record<string, any>;
}

export const ApiDoc = (options: ApiDocOptions) =>
  SetMetadata(API_DOC_KEY, options);
