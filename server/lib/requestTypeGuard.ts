import * as core from 'express-serve-static-core';

export function queryTypeGuard(query: core.Query, properties: Array<string>) {
  return properties.length === properties.filter((el) => el in query).length ? true : false;
}

export function bodyTypeGuard(body: any, properties: Array<string>) {
  return properties.length === properties.filter((el) => el in body).length ? true : false;
}
