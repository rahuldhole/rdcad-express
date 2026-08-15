/// <reference lib="webworker" />
import { defaultCache } from "@serwist/next/worker";
import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import { Serwist } from "serwist";

declare global {
 interface WorkerGlobalScope extends SerwistGlobalConfig {
 __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
 }
}

declare const self: ServiceWorkerGlobalScope;

const serwist = new Serwist({
 precacheEntries: self.__SW_MANIFEST,
 skipWaiting: true,
 clientsClaim: true,
 navigationPreload: false, // Disabled to prevent ERR_FAILED on hard reloads while offline
 runtimeCaching: defaultCache,
});

serwist.addEventListeners();

const HTML_ROUTES = [
 "/",
 "/bbs",
 "/beam",
 "/column",
 "/setup",
 "/foundation",
 "/library",
 "/project",
 "/slab",
 "/stairs",
 "/tank",
 "/templates",
 "/utilities"
];

self.addEventListener("install", (event) => {
 event.waitUntil(
 caches.open("offline-html-cache").then((cache) => {
 const urls = HTML_ROUTES.map(r => r === "/" ? "/" : r + ".html");
 return cache.addAll(urls).catch(err => console.error("Cache addAll failed", err));
 })
 );
});

self.addEventListener("fetch", (event) => {
 if (event.request.mode === "navigate") {
 const url = new URL(event.request.url);
 let htmlUrl = url.pathname === "/" ? "/" : url.pathname + ".html";
 if (htmlUrl.includes("?")) htmlUrl = htmlUrl.split("?")[0];
 
 // We only provide a fallback if the network fails
 event.respondWith(
 fetch(event.request).catch(async () => {
 const cache = await caches.open("offline-html-cache");
 const cachedResponse = await cache.match(htmlUrl);
 if (cachedResponse) return cachedResponse;
 
 const fallbackResponse = await cache.match("/");
 if (fallbackResponse) return fallbackResponse;
 
 return new Response("Network error happened", {
 status: 408,
 headers: { "Content-Type": "text/plain" },
 });
 })
 );
 }
});
