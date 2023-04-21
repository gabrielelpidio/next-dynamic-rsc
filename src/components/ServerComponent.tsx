"use client";

import { use, useState } from "react";

//@ts-expect-error not typed
import { createFromFetch } from "next/dist/compiled/react-server-dom-webpack/client";
import { getBaseUrl } from "@/lib/getBaseUrl";

const initialCache = new Map();

function flattenObject(obj: Record<string, any>, prefix = "") {
  return Object.keys(obj).reduce((acc, k) => {
    const pre = prefix.length ? prefix + "." : "";
    if (typeof obj[k] === "object")
      Object.assign(acc, flattenObject(obj[k], pre + k));
    else acc[pre + k] = obj[k];
    return acc;
  }, {} as Record<string, any>);
}

function ServerComponent<T>({
  basePath,
  componentProps,
  children,
  componentRoute,
}: {
  basePath: string;
  componentRoute: string;
  componentProps?: T;
  children?: React.ReactNode;
}) {
  const [cache, setCache] = useState(initialCache);

  const props = flattenObject(componentProps ?? {});

  const searchParams = new URLSearchParams({
    ...props,
    __component_route: componentRoute,
  }).toString();

  const baseUrl = new URL(basePath, getBaseUrl()).toString();

  const url = searchParams ? `${baseUrl}?${searchParams}` : baseUrl;

  if (!cache.has(url)) {
    cache.set(url, createFromFetch(fetch(url)));
  }
  const lazyJsx = cache.get(url);

  const rendered = lazyJsx ? use(lazyJsx) : null;

  return (rendered ?? children) as React.ReactElement;
}

export default ServerComponent;
