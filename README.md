# BLAMM
## Team BLAMM backend
<hr>

## Hosted on Heroku
### https://blamm-store-backend.herokuapp.com/

## API Documentation
#### V1 Endpoints (Static JSON responses):
- /api/v1/products - Returns a list of all of the hero's and villain's in the DB
- /api/v1/products/type/:type - Takes a title (hero, villain) and returns a list of only hero's of that type
- /api/v1/products/name/:title - Takes a listings title and returns full details about that product (currently only works for Batman)


#### V2 Endpoints (pull from DB)
- /api/v2/signup
-- username - unique string
-- email - unique string
-- password - password
-- imgSrc - string link to served image file
-- admin - boolean, default false
