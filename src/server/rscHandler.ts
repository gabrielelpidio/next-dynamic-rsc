// @ts-expect-error not typed
import * as ReactServerDom from "next/dist/compiled/react-server-dom-webpack/server.browser";

import { createElement } from "react";
import RegisteredComponents from "./registerdComponents";

const unflattenObject = (obj: Record<string, any>) =>
  Object.keys(obj).reduce((acc, k) => {
    k.split(".").reduce(
      (acc, e, i, keys) =>
        acc[e] ||
        (acc[e] = isNaN(Number(keys[i + 1]))
          ? keys.length - 1 === i
            ? obj[k]
            : {}
          : []),
      acc
    );
    return acc;
  }, {} as Record<string, any>);

const rscHandleRequest = async (req: Request) => {
  const { searchParams } = new URL(req.url);

  const componentRoute = searchParams.get("__component_route");

  if (!componentRoute) {
    return new Response("Missing component route", { status: 400 });
  }

  const ComponentFn = RegisteredComponents.get(componentRoute);

  if (!ComponentFn) {
    return new Response("Component not found", { status: 404 });
  }

  const props = unflattenObject(
    Object.fromEntries(
      Array.from(searchParams.entries())
        .filter(([key]) => key !== "__component_route")
        .map(([k, v]) => [k, JSON.parse(v)])
    )
  );

  const Component = await ComponentFn();

  const element = createElement(Component.default, props);

  const stream = ReactServerDom.renderToReadableStream(element);

  return new Response(stream);
};

export default rscHandleRequest;
