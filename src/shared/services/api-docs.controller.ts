import { Controller, Get, Render } from '@nestjs/common';
import { ApiDocsService } from './api-docs.service';

@Controller('api-docs')
export class ApiDocsController {
  constructor(private readonly docsService: ApiDocsService) {}

  @Get()
  @Render('api-docs')
  getDocs() {
    // return this.docsService.getDocs();
    return {
      title: 'API Documentation',
      apis: this.docsService.getApiDocs(),
    };
  }
}
