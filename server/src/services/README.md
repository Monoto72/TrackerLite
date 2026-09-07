# Models
Business logic. Validation rules, calculations, coordinating multiple models/tables, transactions, calling external APIs. This is the layer that would still make sense if you swapped Express for a CLI tool or a cron job, it doesn't know about req/res at all.

## Example
```js
export async function createUser({ email, name }) {
    if (!email.includes('@')) throw new Error('Invalid email');
    return userModel.insertUser(email, name);
}
```