import React, { useEffect } from 'react';
import { useContent } from '../context/ContentContext';

export const FaviconManager: React.FC = () => {
  const { content } = useContent();
  const favicon = content.header.favicon;

  useEffect(() => {
    if (!favicon) return;

    const setFavicon = (url: string) => {
      let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.getElementsByTagName('head')[0].appendChild(link);
      }
      link.href = url;
    };

    setFavicon(favicon);
  }, [favicon]);

  return null;
};
