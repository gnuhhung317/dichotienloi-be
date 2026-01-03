###### food

## POST /food
{
  "name": "string",
  "foodCategoryName": "string",
  "unitName": "string"
}

## GET /food

## PUT /food
{
  "name": "string",
  "newCategory": "string",
  "newUnit": "string"
}

## DELETE /food
{
  "name": "string"
}

## GET /food/category

## GET /food/unit

## GET /food/log

###### fridge

## POST /fridge
{
  "foodName": "string",
  "quantity": "number",
  "expiredAt": "string"
}

## GET /fridge

## PUT /fridge
{
  "itemId": "string",
  "quantity": "number",
  "expiredAt": "string"
}

## PATCH /fridge
{
    "itemId": "string",
    "quantity": "number",
    "action": "string" ["consume", "discard"]
}

## DELETE /fridge
{
  "itemId": "string"
}


###### recipe

## POST /recipe 
{
    "name":
    "description":
    "groupOnly":
}

## GET /recipe/
{
  "groupOnly": boolean
}

## GET /recipe/id
{
  "recipeId": "string"
}

## PUT /recipe
{
  "recipeId": "string",
  "newName": "string",
  "newDescription": "string"
}

## DELETE /recipe
{
  "recipeId": "string"
}

## POST /recipe/ingredient
{
  "recipeId": "string",
  "foodId": "string",
  "quantity": "number"
}

## PUT /recipe/ingredient
{
  "recipeId": "string",
  "foodId": "string",
  "newQuantity": "number"
}

## DELETE /recipe/ingredient
{
  "recipeId": "string",
  "foodId": "string"
}

###### shopping

## POST /shopping
{
  "foodId": "string",
  "quantity": "number"
}

## GET /shopping

## PUT /shopping/marker
{
  "itemId": "string",
  "isBought": "boolean"
}


## PUT /shopping
{
  "itemId": "string",
  "newQuantity": "number"
}

## DELETE /shopping
{
  "itemId": "string"
}

###### meal

## POST /meal
{
  "recipeId": "string",
  "date": "string",
  "mealType": "string"
}

## GET /meal
{
  "date": "string",
  "mealType": "string"
}

## DELETE /meal
{
  "mealRecipeId": "string"
}



