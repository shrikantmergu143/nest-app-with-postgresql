/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React from 'react';
import ReactDOM from 'react-dom/client';
import ApiDocs from './ApiDocs';

declare global {
  interface Window {
    __API_DOCS__: any;
  }
}

// Grab preloaded data from SSR
const apiDocs = window.__API_DOCS__ || [];

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.hydrate(<ApiDocs title="API Docs (Hydrated)" api={apiDocs} />);
