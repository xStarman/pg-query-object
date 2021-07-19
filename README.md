# **pg-query-object**

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
      **,
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
