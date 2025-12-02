import React, { useEffect } from 'react';
import { useContent } from '../context/ContentContext';

export const ScriptManager: React.FC = () => {
  const { content } = useContent();
  const { scripts } = content;

  useEffect(() => {
    // Function to safely inject scripts into the DOM
    const injectScripts = (htmlString: string | undefined, location: 'head' | 'body', idPrefix: string) => {
      if (!htmlString || !htmlString.trim()) {
        // Cleanup if empty
        const existingContainer = document.getElementById(idPrefix);
        if (existingContainer) existingContainer.remove();
        return;
      }

      // Cleanup previous injection to prevent duplicates on edit
      const existingContainer = document.getElementById(idPrefix);
      if (existingContainer) existingContainer.remove();

      // Create a container div (or use Range for pure script injection)
      // Using createContextualFragment is the standard way to make inserted <script> tags execute
      const range = document.createRange();
      range.selectNode(document.getElementsByTagName(location)[0]);
      
      const container = document.createElement('div');
      container.id = idPrefix;
      container.style.display = 'none'; // Hidden container
      
      try {
          // Convert string to nodes
          const fragment = range.createContextualFragment(htmlString);
          container.appendChild(fragment);

          if (location === 'head') {
            document.head.appendChild(container);
          } else {
            // For GTM body (noscript), it usually wants to be immediately after body start.
            document.body.prepend(container);
          }
      } catch (e) {
          console.error("Failed to inject script:", e);
      }
    };

    if (scripts) {
      injectScripts(scripts.facebookPixel, 'head', 'dynamic-fb-pixel-container');
      injectScripts(scripts.googleAnalytics, 'head', 'dynamic-ga-container');
      injectScripts(scripts.gtmHead, 'head', 'dynamic-gtm-head-container');
      injectScripts(scripts.gtmBody, 'body', 'dynamic-gtm-body-container');
    }

    // Cleanup on unmount is tricky because we might want pixels to persist during navigation,
    // but in this single page app, unmount usually means closing the tab or full reload.
  }, [scripts]);

  return null; // This component renders nothing visually
};