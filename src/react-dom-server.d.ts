
declare module 'next/dist/compiled/react-dom/server.edge' {
  import { renderToReadableStream as r } from 'react-dom/server';
  const renderToReadableStream: typeof r;

  export {renderToReadableStream}
}
