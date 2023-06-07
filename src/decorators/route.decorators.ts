import express, { Request, Response } from "express";

export function Controller(path: string): ClassDecorator {
  return function (target: any) {
    target.prototype.path = path;
  };
}

export function Post(route: string): MethodDecorator {
  return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    const app = express();
    const path = `${target.prototype.path}${route}`;
    const routeHandler = descriptor.value;

    app.post(path, (req: Request, res: Response) => {
      routeHandler.call(target, req, res);
    });

    app.listen(3000, () => {
      console.log(`Server listening on port 3000`);
    });
  };
}

export function Get(route: string): MethodDecorator {
  return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    const app = express();
    const path = `${target.prototype.path}${route}`;
    const routeHandler = descriptor.value;

    app.get(path, (req: Request, res: Response) => {
      routeHandler.call(target, req, res);
    });

    app.listen(3000, () => {
      console.log(`Server listening on port 3000`);
    });
  };
}
