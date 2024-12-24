import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-gallery', 
  imports:[CommonModule],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css', '../home/home.component.css']
})
export class GalleryComponent {
  vegetarian = [
    { name: 'Savory Spinach Pie', image: '../img/gallery/food/StockCake-Healthy Meal Box_1734951598.jpg' },
    { name: 'Savory Brussels Sprouts', image: '../img/gallery/food/StockCake-Savory Brussels Sprouts_1734817778.jpg' },
    { name: 'Savory Rice Dish', image: '../img/gallery/food/rous.jpg' },
    { name: 'Colorful Vegetarian Platter', image: '../img/gallery/food/StockCake-Healthy Buddha Bowl_1734951480.jpg' },
  ];

  lunch = [
    { name: 'Lasagne', image: '../img/gallery/food/StockCake-Delectable Lasagna Dish_1734810262.jpg' },
    { name: 'Steamy Spaghetti Dinner', image: '../img/gallery/food/StockCake-Steamy_spaghetti_dinner_1734870362.jpg' },
    { name: 'Festive Thanksgiving Spread', image: '../img/gallery/food/StockCake-Festive_Thanksgiving_Spread_1734870775.jpg' },
    { name: 'Delicious Ramen Bowl', image: '../img/gallery/food/StockCake-Delicious_Ramen_Bowl_1734870398.jpg' },
  ];

  breakfast = [
    { name: 'Seafood ', image:   '../img/gallery/food/StockCake-Savory Seafood Paella_1734953529.jpg'},
    { name: 'Grilled', image:'../img/gallery/food/StockCake-Succulent Grilled Salmon_1734953413.jpg'},
    { name: 'Shrimp', image: '../img/gallery/food/StockCake-Grilled Shrimp Feast_1734953478.jpg' },
    { name: 'Delicious seafood stew', image: '../img/gallery/food/StockCake-Delicious seafood stew_1734953911.jpg' },
  ];

  dinner = [
    { name: 'Steamy Dumpling Delight', image: '../img/gallery/food/StockCake-Steamy_Dumpling_Delight_1734954855.jpg' },
    { name: 'Burger', image: '../img/gallery/food/StockCake-Juicy Burger Feast_1734954388.jpg' },
    { name: 'Hot Dog', image: '../img/gallery/food/StockCake-Loaded Hot Dog_1734954294.jpg' },
    { name: 'Pizza', image: '../img/gallery/food/StockCake-Stretching_Melted_Mozzarella_1734954779.jpg' },
  ];
}
