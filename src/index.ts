/**
 * Returna a reference like: `$1`
 */
const createReference = (ref: number): string => `\$${ref}`

/**
 * Returna a parameter key like: `:name`
 */
const createParameterKey = (key: string): string => `:${key}`

/**
 * Function to create a raw query with parameters using json object
 * 
 * Example:
 * 
 * ```typescript
 
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


  // Example with pg-query:
  import { Client } from 'pg'

  const client = new Client()
  await client.connect()
  const res = await client.query(formattedRawQuery, arrayParams)
  console.log(res.rows)
  await client.end()

  // Example with typeorm
  import { getManager } from 'typeorm'

  const manager = getManager()
  const rawData = await manager.query(formattedRawQuery, arrayParams)

  console.log(rawData)
 * ```
 */
export const toSQL = <T extends object = any>(sql: string, parameters: T): [string, any[]] => {
  const entries = Object.entries(parameters)
  const arrParams = []
  let refIndex = 1
  let newSql = sql

  for(const [key, value] of entries) {
      const parameter = createParameterKey(key)
      const regex = new RegExp(parameter, 'g')
      
      if (!newSql.match(regex)) continue
   
      const reference = createReference(refIndex)
      newSql = newSql.replace(regex, reference)

      arrParams.push(value)
      refIndex++
  }

  return [newSql, arrParams]
}
