import { Response, Request } from "express"
import { Pool, QueryResult } from "pg"

const pool = new Pool()

const createBounds = (req: Request, res: Response) => {
  
  var {name, upperleft, lowerright} = req.body

  pool.query(`INSERT INTO areafilters (name, upperleft, lowerright) VALUES ($1,$2,$3)`,
    [name, upperleft, lowerright],
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
  let id = req.params.id
  pool.query(`DELETE FROM areafilters * WHERE id = $1`,
    [id],
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
  let id = req.params.id
  var { name, upperleft, lowerright } = req.body
  pool.query(`UPDATE areafilters SET name=$1, upperleft=$2, lowerright=$3 WHERE id=$4`,
    [name, upperleft, lowerright, id],
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