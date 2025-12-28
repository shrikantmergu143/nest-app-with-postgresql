/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, RequestMethod } from '@nestjs/common';
import { DiscoveryService, Reflector } from '@nestjs/core';
import { API_DOC_KEY } from '../decorators/api-doc.decorator';

@Injectable()
export class ApiDocsService {
  constructor(
    private readonly discovery: DiscoveryService,
    private readonly reflector: Reflector,
  ) {}

  getDocs() {
    const docs: any[] = [];
    const controllers = this.discovery.getControllers();

    for (const wrapper of controllers) {
      const instance = wrapper.instance;
      if (!instance) continue;

      const prototype = Object.getPrototypeOf(instance);
      const controllerPath =
        Reflect.getMetadata('path', wrapper.metatype) || '';

      for (const methodName of Object.getOwnPropertyNames(prototype)) {
        if (methodName === 'constructor') continue;

        const methodRef = prototype[methodName];

        // 1️⃣ Read our custom API doc metadata
        const apiDoc = this.reflector.get(API_DOC_KEY, methodRef);
        if (!apiDoc) continue;

        // 2️⃣ Read Nest route metadata safely
        const routePath = Reflect.getMetadata('path', methodRef);
        const requestMethod = Reflect.getMetadata('method', methodRef);

        // ❗ Skip if not an HTTP route
        if (requestMethod === undefined) continue;

        docs.push({
          method: RequestMethod[requestMethod],
          route: `/${controllerPath}/${routePath}`.replace(/\/+/g, '/'),
          ...apiDoc,
        });
      }
    }

    return docs;
  }
}
