# BLAMM
## Team BLAMM backend
<hr>

## Hosted on Heroku
### https://blamm-store-backend.herokuapp.com/

## API Documentation
#### V1 Endpoints (Static JSON responses):
- **GET** - /api/v1/products - `Returns a list of all of the hero's and villain's in the DB`
- **GET** - /api/v1/products/type/:type - `Takes a title (hero, villain) and returns a list of only hero's of that type`
- **GET** - /api/v1/products/name/:title - `Takes a listings title and returns full details about that product (only works for Batman)`


#### V2 Endpoints (pull from DB)
- **METHOD** - ENDPOINT - `description and return value`
 - JSON parameters

###### Public Routes

 - **GET** - /api/v2/products - `Returns a list of all of the hero's and villain's in the DB`
 - **GET** - /api/v2/products/type/:type - `Takes a type (hero, villain) and returns a list of only hero's of that type`
 - **GET** - /api/v2/products/name/:title - `Takes a listings title and returns full details about that product`

###### Authenticated Routes
- **POST** - /api/v2/signup -`Create a new user, returns {"user": "username"}`
  - username - unique string
  - email - unique string
  - password - password
  - imgSrc - string link to served image file
  - admin - boolean, default false
- **GET** - /api/v2/check - `Validate a user/pass, returns {"user": "username"}`
  - username
  - password
- **POST** - /api/v2/products/add - `Must have admin: true.  Creates a new product, returns {"product": "title"}`
  - title - unique string
  - tagline - a one sentence string highlighting the product
  - type - "hero" or "villain"
  - description - text
  - rate - number > 0
  - imgSrc - source of an image of the product
  - bgImg - source of a background image for the page
  - services - an array of services that the product provides
- **PUT** - /api/v2/products/:title/update - `Makes updates to a particular product`
  - tagline - a one sentence string highlighting the product (optional)
  - type - "hero" or "villain" (optional)
  - description - text (optional)
  - rate - number > 0 (optional)
  - imgSrc - source of an image of the product (optional)
  - bgImg - source of a background image for the page (optional)
  - services - an array of services that the product provides (optional)
- **DELETE** - /api/v2/products/:title/delete - `Removes a particular product`
 - must be admin who created the product
- **POST** - /api/v2/products/:title/review - `Adds a review to a particular product`
  - rating - integer between 0 and 5, inclusive
  - review - text
- **POST** - /api/v2/services/new - `Adds a new service to the database`
  - service - unique string
- **GET** - /api/v2/services/ - `pulls all listed services`
- **POST** - /api/v2/order - `Creates a new order and returns a receipt`
  - item - an array of objects containing { product:title, quantity:positiveNumber }

#### login and log out of ui is still being figured out.
