# Models
Schema/shape checking on incoming data required fields present, correct types, string lengths, valid email format, enum values, etc. Pure input validation, no business rules and no DB calls.

## Example (validators/userValidator)
```js
import { z } from 'zod';

export const createUserSchema = z.object({
    email: z.string().email(),
    name: z.string().min(1).max(100).optional(),
});
```

It's usually wired in as middleware, since "reject bad input before it reaches the controller" is exactly what middleware is for:

## Example (middleware/validate)
```js
export function validate(schema) {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({ errors: result.error.errors });
        }
        req.body = result.data;
        next();
    };
}
```

## Example (routes)
```js
router.post('/users', validate(createUserSchema), userController.createUser);
```