import React from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { App } from './App';
import './styles.css';

const roots = new WeakMap<Element, Root>();

export function mountCharaLog(container: Element) {
  const root = createRoot(container);
  roots.set(container, root);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}

export function unmountCharaLog(container: Element) {
  roots.get(container)?.unmount();
  roots.delete(container);
}
