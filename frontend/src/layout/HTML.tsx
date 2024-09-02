import { html } from "@hono/hono/html";

export function HTML({ children }: { children: unknown }) {
  return html`<!DOCTYPE html>
    <html lang="pt-br">
      ${children}
    </html>`;
}
