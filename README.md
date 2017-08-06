# BLAMM
## Team BLAMM backend
<hr>

## Hosted on Heroku
### https://blamm-store-backend.herokuapp.com/

## API Documentation
- **METHOD** - ENDPOINT - `description`
  - JSON parameters
  - **return** `{"return": "JSON"}`
#### V1 Endpoints (Static JSON responses):
- **GET** - /api/v1/products - `Returns a list of all of the hero's and villain's from a static JSON file`
- **GET** - /api/v1/products/type/:type - `Takes a type (hero, villain) and returns a list of only hero's of that type`
- **GET** - /api/v1/products/name/:title - `Takes a listings title and returns full details about that product (only works for Batman)`


#### V2 Endpoints (Responsive to the DB)
###### Public Routes (no authentication needed)
- **GET** - /api/v2/products - `Returns a list of all of the hero's and villain's in the DB`
  - **return**

    ```
    { "count": Integer,
      "results": [
        {
          "title": String,
          "rate": Number,
          "imgSrc": URL,
          "type": String,
          "tagline": String,
          "services": [
            "String"
          ]
        }
      ]}
    ```

- **GET** - /api/v2/products/type/:type - `Takes a type (hero, villain) and returns a list of only hero's of that type`
  - **return**

    ```
    { "count": Integer,
      "results": [
        {
          "title": String,
          "rate": Number,
          "imgSrc": URL,
          "type": String,
          "tagline": String,
          "services": [
            "String"
          ]
        }
      ]}
    ```

- **GET** - /products/service/:service - `Takes a service and returns products with that service`
  - **return**

    ```
    { "count": Integer,
      "results": [
        {
          "title": String,
          "rate": Number,
          "imgSrc": URL,
          "type": String,
          "tagline": String,
          "services": [
            "String"
          ]
        }
      ]}
    ```


- **GET** - /api/v2/products/name/:title - `Takes a listings title and returns full details about that product`
  - **return**
  ```
    { "count": 1,
      "title": String,
      "tagline": String,
      "type": String,
      "rate": Number,
      "description": String,
      "imgSrc": URL,
      "bgImg": URL,
      "services": [
        "String"
      ],
      "reviews": [
        {
          "username": String,
          "userImg": URL,
          "rating": Integer,
          "review": String
        }
      ]
    }
    ```

- **POST** - /api/v2/signup -`Create a new user, returns {"user": "username"}`
  - username - unique string
  - email - unique string
  - password - password
  - imgSrc - string link to served image file
  - admin - boolean, default false

###### Authenticated Routes (username/password)
- **GET** - /api/v2/check - `Validate a user/pass`
  - username
  - password
  - **returns** `{"user": "username"}`
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
