import * as core from 'express-serve-static-core';

export function queryVaildator(query: core.Query, properties: Array<string>) {
  return (
    properties.length === properties.filter((el) => el in query && query[el] !== undefined).length
  );
}

export function bodyVaildator(body: any, properties: Array<string>) {
  return (
    properties.length === properties.filter((el) => el in body && body[el] !== undefined).length
  );
}
