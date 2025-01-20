import express from "express";
import { db } from "../models/db.js";
import { authenticateJWT } from "../middleware/auth.js";

const router = express.Router();

// Dodaj opinię o produkcie
router.post("/", authenticateJWT, (req, res) => {
  const { productId, rating, body } = req.body;

  if (!productId || !rating) {
    return res.status(400).send("Product ID and rating are required.");
  }

  if (rating < 0 || rating > 5) {
    return res.status(400).send("Rating must be between 0 and 5.");
  }

  // Sprawdź, czy użytkownik już dodał opinię
  db.get(
    `SELECT * FROM Opinions WHERE UserID = ? AND ProductID = ?`,
    [req.user.userId, productId],
    (err, row) => {
      if (err) {
        return res.status(500).send("Error checking existing opinion.");
      }
      if (row) {
        return res.status(400).send("You have already reviewed this product.");
      }
      // Jeśli brak opinii, dodaj nową
      db.run(
        `INSERT INTO Opinions (UserID, ProductID, Rating, Body) VALUES (?, ?, ?, ?);`,
        [req.user.userId, productId, rating, body || ""],
        function (err) {
          if (err) {
            return res.status(500).send("Error adding opinion.");
          }

          // Pobierz pełne dane nowo dodanej opinii, w tym dane użytkownika
          db.get(
            `SELECT Opinions.OpinionID, Opinions.Rating, Opinions.Body, Users.FirstName, Users.LastName
         FROM Opinions
         JOIN Users ON Opinions.UserID = Users.UserID
         WHERE Opinions.OpinionID = ?;`,
            [this.lastID],
            (err, opinion) => {
              if (err) {
                return res
                  .status(500)
                  .send("Error fetching the newly added opinion.");
              }
              res.status(201).send(opinion); // Zwróć pełne dane opinii
            }
          );
        }
      );
    }
  );
});

// Pobierz opinie o produkcie
router.get("/:productId", (req, res) => {
  db.all(
    `SELECT Opinions.OpinionID, Opinions.Rating, Opinions.Body, Users.FirstName, Users.LastName
     FROM Opinions
     JOIN Users ON Opinions.UserID = Users.UserID
     WHERE ProductID = ?;`,
    [req.params.productId],
    (err, opinions) => {
      if (err) {
        return res.status(500).send("Error fetching opinions.");
      }
      res.status(200).send(opinions);
    }
  );
});

// Edytuj opinię
router.put("/:opinionId", authenticateJWT, (req, res) => {
  const { rating, body } = req.body;

  if (!rating && !body) {
    return res
      .status(400)
      .send("At least one of rating or body must be provided.");
  }

  const updates = [];
  const params = [];

  if (rating) {
    updates.push("Rating = ?");
    params.push(rating);
  }
  if (body) {
    updates.push("Body = ?");
    params.push(body);
  }

  if (rating && (rating < 0 || rating > 5)) {
    return res.status(400).send("Rating must be between 0 and 5.");
  }

  params.push(req.params.opinionId, req.user.userId);

  db.run(
    `UPDATE Opinions SET ${updates.join(
      ", "
    )} WHERE OpinionID = ? AND UserID = ?;`,
    params,
    function (err) {
      if (err) {
        return res.status(500).send("Error updating opinion.");
      }

      if (this.changes === 0) {
        return res
          .status(404)
          .send("Opinion not found or you do not have permission to edit it.");
      }

      res.status(200).send("Opinion updated successfully.");
    }
  );
});

router.delete("/:opinionId", authenticateJWT, (req, res) => {
  const opinionId = req.params.opinionId;
  const userId = req.user.userId;

  console.log(`DELETE request for OpinionID: ${opinionId}, UserID: ${userId}`);

  db.get(
    `SELECT * FROM Opinions WHERE OpinionID = ? AND UserID = ?`,
    [opinionId, userId],
    (err, row) => {
      if (err) {
        console.error("Error fetching opinion:", err.message);
        return res.status(500).send("Error deleting opinion.");
      }

      if (!row) {
        console.warn(
          `Opinion not found for OpinionID: ${opinionId}, UserID: ${userId}`
        );
        return res
          .status(404)
          .send(
            "Opinion not found or you do not have permission to delete it."
          );
      }

      db.run(
        `DELETE FROM Opinions WHERE OpinionID = ? AND UserID = ?`,
        [opinionId, userId],
        function (err) {
          if (err) {
            console.error("Error deleting opinion:", err.message);
            return res.status(500).send("Error deleting opinion.");
          }

          if (this.changes === 0) {
            console.warn(
              `Failed to delete OpinionID: ${opinionId}, UserID: ${userId}`
            );
            return res
              .status(404)
              .send(
                "Opinion not found or you do not have permission to delete it."
              );
          }

          console.log(`Opinion deleted successfully: OpinionID: ${opinionId}`);
          res.status(200).send("Opinion deleted successfully.");
        }
      );
    }
  );
});

export default router;
