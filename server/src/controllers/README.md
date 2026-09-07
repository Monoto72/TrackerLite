# Controllers
The HTTP layer. Pulls data out of req, calls a service to do the actual work, and shapes the res. Should not contain business logic or SQL. Just orchestration and status codes.

## Example
```js
export async function createUser(req, res) {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}
```