# **pg-query-object**

[![PG Query Object Package](https://github.com/max10rogerio/pg-query-object/actions/workflows/npm-release.yml/badge.svg)](https://github.com/max10rogerio/pg-query-object/actions/workflows/npm-release.yml)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![npm version](https://badge.fury.io/js/pg-query-object.svg)]

Run a raw query sql in postgres with object in params

## **How to use**

```typescript
type Params {
  name: string
  order: 'ASC' | 'DESC'
  limit: number
}

const params: Params = {
  name: 'max',
  order: 'ASC',
  limit: 10,
}

const sql = `
  select
      *,
      :limit AS itens_per_page
  from
      table
  where
      nome = :name
  order by name :order
  limit :limit
`

const [formattedRawQuery, arrayParams] = toSQL<Params>(sql, params)

/*
Output formattedRawQuery variable:

select
    *,
    $3 AS itens_per_page
from
    table
where
    nome = $1
order by name $2
limit $3

----------------------------------------
Output arrayParams variable:

['max', 'ASC', 10]
*/
```

---

## **Example with pg-query:**

```typescript
import { Client } from "pg";

const client = new Client();
await client.connect();
const res = await client.query(formattedRawQuery, arrayParams);
console.log(res.rows);
await client.end();
```

## **Example with typeorm**

```typescript
import { getManager } from "typeorm";

const manager = getManager();
const rawData = await manager.query(formattedRawQuery, arrayParams);

console.log(rawData);
```
