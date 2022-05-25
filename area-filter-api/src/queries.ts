import { Response, Request } from "express"
import { Pool, QueryResult } from "pg"

const pool = new Pool()

const createBounds = (req: Request, res: Response) => {
  
  console.log(req.body)
  var { name, vertices } = req.body
  const objVertices = {
    value: vertices
  }
 
  pool.query(`INSERT INTO area_filters (name, vertices) VALUES ($1,$2)`,
    [name, objVertices],
    (error: Error, result: QueryResult<any>) => {
    if (error) {
      console.error(error)
      res.status(500).json(error)
    }
    else {
      res.status(200).json(result.rows)
    }
  })
}

const deleteBounds = (req: Request, res: Response) => {
  let filterID = req.params.id; 
  pool.query(`DELETE FROM area_filters * WHERE filterID = $1`,
    [filterID],
    (error: Error, result: QueryResult<any>) => {
    if (error) {
      console.error(error)
      res.status(500).json(error)
    }
    else {
      res.status(200).json(result.rows)
    }
  })
}

const updateBounds = (req: Request, res: Response) => { 
  let filterID = req.params.id
  var { name, vertices } = req.body
  const objVertices = {
    value: vertices
  }
  pool.query(`UPDATE area_filters SET name=$1, vertices=$2, WHERE filterID=$3`,
    [name, objVertices, filterID],
    (error: Error, result: QueryResult<any>) => {
    if (error) {
      console.error(error)
      res.status(500).json(error)
    }
    else {
      res.status(200).json(result.rows)
    }
  })
}


export {createBounds, deleteBounds, updateBounds}