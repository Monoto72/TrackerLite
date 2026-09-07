# Models
Just wiring. Map HTTP verb + path > controller function (+ any middleware for that route). No logic at all.

## Example
```js
router.post('/users', validateUser, userController.createUser);
```