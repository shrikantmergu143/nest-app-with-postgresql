/* eslint-disable @typescript-eslint/no-unsafe-return */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */

/* eslint-disable @typescript-eslint/no-unsafe-call */
// src/react-app/ApiDocs.tsx
import React, { useState } from 'react';

export type ApiDoc = {
  method: string;
  route: string;
  description: string;
  body?: Record<string, unknown>;
  response?: Record<string, unknown>;
};

export type ApiDocsProps = {
  title: string;
  api?: ApiDoc[];
};

export default function ApiDocs({ title, api = [] }: ApiDocsProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div style={{ padding: 24, fontFamily: 'Arial' }}>
      <h1>API Documentation {title}</h1>

      {api.length === 0 && <p>No API documentation available.</p>}

      {api.map((doc, index) => (
        <div
          key={`${doc.method}-${doc.route}`}
          style={{
            border: '1px solid #ddd',
            borderRadius: 6,
            marginBottom: 16,
          }}
        >
          {/* HEADER */}
          <div
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            style={{
              padding: 12,
              cursor: 'pointer',
              background: '#f5f5f5',
              display: 'flex',
              gap: 12,
            }}
          >
            <strong>{doc.method}</strong>
            <span>{doc.route}</span>
          </div>

          {/* DETAILS */}
          {openIndex === index && (
            <div style={{ padding: 16 }}>
              <p>{doc.description}</p>

              {doc.body && (
                <>
                  <h4>Request Body</h4>
                  <pre>{JSON.stringify(doc.body, null, 2)}</pre>
                </>
              )}

              {doc.response && (
                <>
                  <h4>Response</h4>
                  <pre>{JSON.stringify(doc.response, null, 2)}</pre>
                </>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
