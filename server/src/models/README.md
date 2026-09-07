# Models
Data access only, the actual SQL (or ORM calls). No business rules, just "talk to the table."

## Example
```js
export async function insertUser(email, name) {
    const [result] = await pool.query(
        'INSERT INTO users (email, name) VALUES (?, ?)', [email, name]
    );
    return { id: result.insertId, email, name };
}
```