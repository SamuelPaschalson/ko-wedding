import React from 'react';
import { createRoot } from 'react-dom/client';

// Self-hosted fonts (bundled, so they render even where Google Fonts is
// blocked — some office and hotel networks block the CDN).
import '@fontsource/prata/400.css';
import '@fontsource/pinyon-script/400.css';
import '@fontsource/jost/300.css';
import '@fontsource/jost/400.css';
import '@fontsource/jost/500.css';
import '@fontsource/old-standard-tt/400.css';
import '@fontsource/old-standard-tt/700.css';
import '@fontsource/old-standard-tt/400-italic.css';

import App from './App';
import './styles/index.css';
import './styles/envelope.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
