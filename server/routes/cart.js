const express = require("express");
const router = express.Router();
const pool = require("../db.js");

router.post("/create", async (req, res) => {
  const {
    customerName,
    customerNumber,
    customerAddress,
    paymentMethod,
    cart,
    subtotal,
    tax,
    grandTotal,
  } = req.body;

  try {
    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      // Insert order details
      const insertOrderQuery = `
        INSERT INTO orders (customer_name, customer_number, customer_address, payment_method, subtotal, tax, grand_total)
        VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id
      `;
      const result = await client.query(insertOrderQuery, [
        customerName,
        customerNumber,
        customerAddress,
        paymentMethod,
        subtotal,
        tax,
        grandTotal,
      ]);
      const orderId = result.rows[0].id;

      // Insert order items
      const insertOrderItemsQuery = `
        INSERT INTO order_items (order_id, product_id, product_name, quantity, price)
        VALUES ($1, $2, $3, $4, $5)
      `;
      for (const item of cart) {
        await client.query(insertOrderItemsQuery, [
          orderId,
          item.id,
          item.product_name, // Assuming your cart item has a "product_name" property
          item.quantity,
          item.price,
        ]);
      }

      await client.query("COMMIT");
      res.status(201).json({ message: "Order created successfully" });
    } catch (error) {
      await client.query("ROLLBACK");
      console.error("Error creating order:", error);
      res.status(500).json({ error: "Error creating order" });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).json({ error: "Database connection error" });
  }
});

module.exports = router;
