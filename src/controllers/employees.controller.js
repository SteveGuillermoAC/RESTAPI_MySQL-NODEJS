import { pool } from "../db.js";

export const getEmployees = async (req, res) => {
  try {
    throw new Error("DB Error");
    const [rows] = await pool.query("SELECT * FROM EMPLOYEE");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const getEmployeeById = async (req, res) => {
  try {
    console.log(req.params.id);
    const [rows] = await pool.query("SELECT * FROM EMPLOYEE WHERE id = ? ", [
      req.params.id,
    ]);

    if (rows.length <= 0)
      return res.status(404).json({
        message: "Employee not found",
      });
    console.log(rows);
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const createEmployee = async (req, res) => {
  try {
    console.log(req.body);
    const { name, salary } = req.body;
    const [rows] = await pool.query(
      "INSERT INTO employee (name,salary) VALUES (?,?)",
      [name, salary]
    );
    res.send({
      id: rows.insertId,
      name,
      salary,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM EMPLOYEE where id =?", [
      req.params.id,
    ]);
    console.log(result);
    if (result.affectedRows <= 0)
      return res.status(404).json({
        message: "empleado no encontrado",
      });
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, salary } = req.body;

  try {
    const [result] = await pool.query(
      "UPDATE EMPLOYEE SET name = IFNULL(?,name), salary=IFNULL(?,salary) WHERE ID = ?",
      [name, salary, id]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({
        message: "employee not found sir",
      });

    const [rows] = await pool.query("SELECT * FROM EMPLOYEE WHERE id =?", [id]);
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};
