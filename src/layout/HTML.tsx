import { html } from "@hono/hono/html";

/**
 * HTMLを返す
 */

export const HTML = ({ children }: { children: unknown }) => {
  return html`<!DOCTYPE html>
    <html lang="pt-br">
      ${children}
    </html>`;
};
