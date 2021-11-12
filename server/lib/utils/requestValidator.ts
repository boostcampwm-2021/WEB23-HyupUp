import * as core from 'express-serve-static-core';

export function queryValidator(query: core.Query, properties: Array<string>) {
  return (
    properties.length === properties.filter((el) => el in query && query[el] !== undefined).length
  );
}

export function bodyValidator(body: any, properties: Array<string>) {
  return (
    properties.length === properties.filter((el) => el in body && body[el] !== undefined).length
  );
}
