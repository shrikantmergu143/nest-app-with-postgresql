// src/api-docs/api-docs.module.ts
import { Module } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';
import { ApiDocsService } from './api-docs.service';
import { ApiDocsController } from './api-docs.controller';

@Module({
  imports: [
    DiscoveryModule, // ✅ REQUIRED
  ],
  controllers: [ApiDocsController],
  providers: [ApiDocsService],
})
export class ApiDocsModule {}
