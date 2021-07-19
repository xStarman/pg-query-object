import { toSQL } from '../src/index'

describe('toSQL - Function', () => {
  it('should be convert a sql with param to pg-query', () => {
    const expectedSQL = "SELECT * FROM table WHERE name = $1"
    const expectedArr = ['max']
    const query = "SELECT * FROM table WHERE name = :name"
    const params = { name: 'max' }

    const [sql, arrParams] = toSQL<{ name: string }>(query, params)

    expect(sql).toEqual(expectedSQL)
    expect(arrParams).toEqual(expectedArr)
  })
})