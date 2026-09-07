# MiddleWare
Functions that run before (or after) a controller, shared across routes: auth checks, request validation, logging, error handlers, rate limiting. Anything that says "every request hitting these routes needs to pass through this first."

## Example
```js
export function requireAuth(req, res, next) {
    if (!req.session.user) return res.status(401).send('Unauthorized');
    next();
}
```