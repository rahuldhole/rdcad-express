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

const HTML_ROUTES = [
  "/",
  "/bbs",
  "/beam",
  "/column",
  "/download",
  "/foundation",
  "/library",
  "/project",
  "/slab",
  "/stairs",
  "/tank",
  "/templates",
  "/utilities"
];

const additionalEntries = HTML_ROUTES.map(url => ({
  url,
  revision: "v1"
}));

const serwist = new Serwist({
  precacheEntries: [...(self.__SW_MANIFEST || []), ...additionalEntries],
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: false, // Disabled to prevent ERR_FAILED on hard reloads while offline
  runtimeCaching: defaultCache,
});

serwist.addEventListeners();
