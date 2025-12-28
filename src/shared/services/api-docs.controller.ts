/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Controller, Get } from '@nestjs/common';
import { ApiDocsService } from './api-docs.service';

@Controller('api-docs')
export class ApiDocsController {
  constructor(private readonly docsService: ApiDocsService) {}

  @Get()
  getDocs() {
    return this.docsService.getDocs();
  }
}
