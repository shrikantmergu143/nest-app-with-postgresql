/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Controller, Get, Render } from '@nestjs/common';
import { ApiDocsService } from './api-docs.service';
import ApiDocs from 'src/react-app/ApiDocs';
import ReactDOMServer from 'react-dom/server';
import React from 'react';

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
  @Get('data')
  getData() {
    // return this.docsService.getDocs();
    return this.docsService.getApiDocs();
  }
  @Get('view')
  render() {
    const apiDocs = this.docsService.getApiDocs();

    // Render React component to string
    const reactHtml = ReactDOMServer.renderToString(
      React.createElement(ApiDocs, {
        title: 'API Docs SSR',
        api: apiDocs,
      }),
    );

    // Serve basic HTML with client hydration
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>API Docs</title>
        </head>
        <body>
          <div id="root">${reactHtml}</div>
          <script>
            window.__API_DOCS__ = ${JSON.stringify(apiDocs)};
          </script>
          <script type="module" src="/react-app/client.tsx"></script>
        </body>
      </html>
    `;
  }
}
