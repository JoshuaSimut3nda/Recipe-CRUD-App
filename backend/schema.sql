CREATE TABLE IF NOT EXISTS recipes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    ingredients TEXT,
    instructions TEXT,
    prep_time_mins INTEGER,
    category TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO recipes (title, ingredients, instructions, prep_time_mins, category) VALUES 
('Pancakes', 'Flour, Milk, Eggs', 'Mix and fry on pan', 15, 'Breakfast'),
('Omelette', 'Eggs, Cheese, Salt', 'Whisk and cook', 10, 'Breakfast'),
('Chicken Salad', 'Chicken, Lettuce, Mayo', 'Chop and toss', 20, 'Lunch'),
('Grilled Cheese', 'Bread, Cheese, Butter', 'Toast on skillet', 10, 'Snack'),
('Spaghetti Bolognese', 'Pasta, Minced Meat, Tomato', 'Boil pasta and make sauce', 30, 'Dinner'),
('Beef Stew', 'Beef, Potatoes, Carrots', 'Simmer in a pot', 60, 'Dinner'),
('Fruit Smoothie', 'Banana, Berries, Yogurt', 'Blend together', 5, 'Beverage'),
('Garlic Bread', 'Bread, Garlic, Butter', 'Bake in oven', 12, 'Snack'),
('Pancakes V2', 'Flour, Sugar, Water', 'Mix and bake', 15, 'Breakfast'),
('Rice and Beans', 'Rice, Beans, Spices', 'Boil and mix', 40, 'Lunch');