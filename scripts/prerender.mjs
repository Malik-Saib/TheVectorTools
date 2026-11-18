// Post-build prerenderer: for every public route, writes a static HTML file
// (dist/<route>/index.html) built from the Vite shell with the route's own
// title, meta description, canonical URL and a static rendering of the page's
// editorial content inside #root. React replaces the static content on load,
// so users get the full interactive app while crawlers and ad-review systems
// see substantive content without executing JavaScript.

import { build } from 'esbuild';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const rootDir = join(dirname(fileURLToPath(import.meta.url)), '..');
const distDir = join(rootDir, 'dist');
const bundlePath = join(rootDir, 'scripts', '.prerender-bundle.mjs');

function escAttr(s) {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

function applyMeta(shell, route, site) {
  const url = route.path === '' ? `${site}/` : `${site}/${route.path}`;
  let html = shell;
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escAttr(route.title)}</title>`);
  html = html.replace(
    /<meta name="description" content="[^"]*" \/>/,
    `<meta name="description" content="${escAttr(route.description)}" />`,
  );
  html = html.replace(
    /<meta property="og:title" content="[^"]*" \/>/,
    `<meta property="og:title" content="${escAttr(route.title)}" />`,
  );
  html = html.replace(
    /<meta property="og:description" content="[^"]*" \/>/,
    `<meta property="og:description" content="${escAttr(route.description)}" />`,
  );
  html = html.replace(
    /<meta property="og:url" content="[^"]*" \/>/,
    `<meta property="og:url" content="${url}" />`,
  );
  html = html.replace(
    /<meta name="twitter:title" content="[^"]*" \/>/,
    `<meta name="twitter:title" content="${escAttr(route.title)}" />`,
  );
  html = html.replace(
    /<meta name="twitter:description" content="[^"]*" \/>/,
    `<meta name="twitter:description" content="${escAttr(route.description)}" />`,
  );
  html = html.replace('</head>', `    <link rel="canonical" href="${url}" />\n  </head>`);
  html = html.replace('<div id="root"></div>', `<div id="root">\n${route.html}\n</div>`);
  return html;
}

async function main() {
  await build({
    entryPoints: [join(rootDir, 'scripts', 'prerender-entry.ts')],
    bundle: true,
    platform: 'node',
    format: 'esm',
    outfile: bundlePath,
    logLevel: 'warning',
  });
  const mod = await import(pathToFileURL(bundlePath).href);
  const routes = mod.buildRoutes();
  const site = mod.SITE;

  const shell = await readFile(join(distDir, 'index.html'), 'utf8');
  if (!shell.includes('<div id="root"></div>')) {
    throw new Error('dist/index.html does not contain the expected <div id="root"></div> shell');
  }

  let totalWords = 0;
  for (const route of routes) {
    const out = applyMeta(shell, route, site);
    const words = route.html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
    totalWords += words;
    const target =
      route.path === '' ? join(distDir, 'index.html') : join(distDir, route.path, 'index.html');
    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, out, 'utf8');
    console.log(`prerendered /${route.path} (${words} words)`);
  }
  console.log(`Prerender complete: ${routes.length} routes, ${totalWords} total static words.`);
}

main().catch((err) => {
  console.error('Prerender failed:', err);
  process.exit(1);
});
