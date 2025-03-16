import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import { ArrowLeft, ShoppingCart, Check } from "lucide-react";
import { useCart } from "../context/CartContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Product } from "../components/ProductGrid";
import ProductReviews from "../components/ProductReviews";

// Sample product database
const productsDatabase: Record<string, Product> = {
  "product-1": {
    id: "product-1",
    name: "Детский комбинезон",
    price: 2499,
    image:
      "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=800&q=80",
    discount: 10,
    season: "winter",
    age: "0-1",
    sizes: ["56", "62", "68", "74"],
    colors: [
      { name: "Синий", value: "blue" },
      { name: "Серый", value: "gray" },
    ],
    description:
      "Теплый и удобный комбинезон для малышей. Идеально подходит для холодной погоды. Изготовлен из мягких и безопасных материалов.",
    material: "100% хлопок, утеплитель - синтепон",
    care: "Машинная стирка при 30°C, не отбеливать, не сушить в машине",
  },
  "product-2": {
    id: "product-2",
    name: "Платье для девочки",
    price: 1899,
    image:
      "https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=800&q=80",
    season: "summer",
    age: "3-6",
    sizes: ["98", "104", "110", "116"],
    colors: [
      { name: "Розовый", value: "pink" },
      { name: "Белый", value: "white" },
    ],
    description:
      "Легкое летнее платье для девочек. Красивый дизайн с цветочным принтом. Идеально для праздников и повседневной носки.",
    material: "95% хлопок, 5% эластан",
    care: "Машинная стирка при 30°C, не отбеливать, гладить при низкой температуре",
  },
  "product-3": {
    id: "product-3",
    name: "Куртка для мальчика",
    price: 3499,
    image:
      "https://images.unsplash.com/photo-1445796886651-d31a2c15f3c9?w=800&q=80",
    discount: 15,
    season: "autumn",
    age: "6-9",
    sizes: ["122", "128", "134", "140"],
    colors: [
      { name: "Зеленый", value: "green" },
      { name: "Синий", value: "blue" },
    ],
    description:
      "Стильная осенняя куртка для мальчиков. Водоотталкивающий материал, теплая подкладка. Подходит для прохладной погоды.",
    material: "Верх: 100% полиэстер, подкладка: 100% хлопок",
    care: "Машинная стирка при 30°C, не отбеливать, не сушить в машине",
  },
  "product-4": {
    id: "product-4",
    name: "Школьная форма",
    price: 4299,
    image:
      "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=800&q=80",
    season: "demi",
    age: "6-9",
    sizes: ["122", "128", "134", "140"],
    colors: [
      { name: "Черный", value: "black" },
      { name: "Синий", value: "blue" },
    ],
    description:
      "Классическая школьная форма для мальчиков. Включает пиджак и брюки. Стильный и элегантный дизайн, соответствует школьным требованиям.",
    material: "65% полиэстер, 35% вискоза",
    care: "Сухая чистка, гладить при средней температуре",
  },
  "product-5": {
    id: "product-5",
    name: "Детские кроссовки",
    price: 1999,
    image:
      "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=800&q=80",
    discount: 5,
    season: "summer",
    age: "3-6",
    sizes: ["28", "29", "30", "31"],
    colors: [
      { name: "Белый", value: "white" },
      { name: "Черный", value: "black" },
    ],
    description:
      "Удобные и легкие кроссовки для детей. Дышащий материал, амортизирующая подошва. Идеально для активных игр и прогулок.",
    material: "Верх: текстиль, подошва: резина",
    care: "Ручная стирка, сушить при комнатной температуре",
  },
  "product-6": {
    id: "product-6",
    name: "Шапка зимняя",
    price: 899,
    image:
      "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=800&q=80",
    season: "winter",
    age: "1-3",
    sizes: ["48", "50", "52"],
    colors: [
      { name: "Красный", value: "red" },
      { name: "Синий", value: "blue" },
    ],
    description:
      "Теплая зимняя шапка для детей. Мягкая флисовая подкладка, защита ушей. Сохраняет тепло даже в сильные морозы.",
    material: "50% шерсть, 50% акрил, подкладка: флис",
    care: "Ручная стирка в холодной воде, сушить в расправленном виде",
  },
  "product-7": {
    id: "product-7",
    name: "Пижама детская",
    price: 1299,
    image:
      "https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?w=800&q=80",
    discount: 20,
    season: "all",
    age: "3-6",
    sizes: ["98", "104", "110", "116"],
    colors: [
      { name: "Голубой", value: "lightblue" },
      { name: "Розовый", value: "pink" },
    ],
    description:
      "Мягкая и уютная пижама для детей. Приятный к телу материал, свободный крой. Обеспечивает комфортный сон.",
    material: "100% хлопок",
    care: "Машинная стирка при 40°C, не отбеливать, гладить при низкой температуре",
  },
  "product-8": {
    id: "product-8",
    name: "Носки детские (3 пары)",
    price: 499,
    image:
      "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=800&q=80",
    season: "all",
    age: "all",
    sizes: ["16-18", "19-22", "23-26"],
    colors: [{ name: "Микс", value: "mix" }],
    description:
      "Набор из трех пар детских носков. Мягкие и эластичные, не сдавливают ногу. Разные цвета в комплекте.",
    material: "80% хлопок, 15% полиамид, 5% эластан",
    care: "Машинная стирка при 30°C, не отбеливать",
  },
  // Для малышей
  "baby-1": {
    id: "baby-1",
    name: "Боди с длинным рукавом",
    price: 899,
    image:
      "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=800&q=80",
    season: "all",
    age: "0-1",
    sizes: ["56", "62", "68"],
    colors: [
      { name: "Белый", value: "white" },
      { name: "Бежевый", value: "beige" },
    ],
    description:
      "Мягкое боди с длинным рукавом для новорожденных. Удобные кнопки для легкой смены подгузника. Гипоаллергенный материал.",
    material: "100% органический хлопок",
    care: "Машинная стирка при 40°C, не отбеливать",
  },
  "baby-2": {
    id: "baby-2",
    name: "Пинетки меховые",
    price: 699,
    image:
      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&q=80",
    season: "winter",
    age: "0-1",
    sizes: ["16", "17", "18"],
    colors: [
      { name: "Розовый", value: "pink" },
      { name: "Голубой", value: "lightblue" },
    ],
    description:
      "Теплые меховые пинетки для малышей. Мягкая подошва, удобная резинка. Сохраняют ножки в тепле.",
    material:
      "Внешний слой: 100% полиэстер, внутренний слой: искусственный мех",
    care: "Ручная стирка в холодной воде",
  },
  "baby-3": {
    id: "baby-3",
    name: "Комплект на выписку",
    price: 3499,
    image:
      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&q=80",
    season: "all",
    age: "0-1",
    sizes: ["56", "62"],
    colors: [
      { name: "Белый", value: "white" },
      { name: "Молочный", value: "cream" },
    ],
    description:
      "Элегантный комплект для выписки из роддома. Включает конверт, шапочку и распашонку. Нежный дизайн и качественные материалы.",
    material: "100% хлопок, наполнитель: холлофайбер",
    care: "Ручная стирка при 30°C, не отбеливать",
  },
  // Для девочек
  "girl-1": {
    id: "girl-1",
    name: "Платье праздничное",
    price: 2899,
    image:
      "https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=800&q=80",
    season: "all",
    age: "3-6",
    sizes: ["98", "104", "110", "116"],
    colors: [
      { name: "Розовый", value: "pink" },
      { name: "Белый", value: "white" },
    ],
    description:
      "Нарядное платье для девочек. Пышная юбка, декоративные элементы. Идеально для праздников и особых случаев.",
    material: "Верх: 100% полиэстер, подкладка: 100% хлопок",
    care: "Ручная стирка в холодной воде, не отбеливать",
  },
  "girl-2": {
    id: "girl-2",
    name: "Джинсовый комбинезон",
    price: 1999,
    image:
      "https://images.unsplash.com/photo-1519238359922-989348752efb?w=800&q=80",
    season: "summer",
    age: "3-6",
    sizes: ["98", "104", "110", "116"],
    colors: [
      { name: "Синий", value: "blue" },
      { name: "Светло-синий", value: "lightblue" },
    ],
    description:
      "Стильный джинсовый комбинезон для девочек. Удобные регулируемые лямки, множество карманов. Практичный и модный.",
    material: "100% хлопок",
    care: "Машинная стирка при 30°C, не отбеливать",
  },
  "girl-3": {
    id: "girl-3",
    name: "Футболка с единорогом",
    price: 799,
    image:
      "https://images.unsplash.com/photo-1519238359922-989348752efb?w=800&q=80",
    season: "summer",
    age: "3-6",
    sizes: ["98", "104", "110", "116"],
    colors: [
      { name: "Розовый", value: "pink" },
      { name: "Фиолетовый", value: "purple" },
    ],
    description:
      "Яркая футболка с принтом единорога. Мягкий материал, свободный крой. Идеально для повседневной носки.",
    material: "100% хлопок",
    care: "Машинная стирка при 40°C, не отбеливать",
  },
  // Для мальчиков
  "boy-1": {
    id: "boy-1",
    name: "Спортивный костюм",
    price: 2499,
    image:
      "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=800&q=80",
    season: "all",
    age: "6-9",
    sizes: ["122", "128", "134", "140"],
    colors: [
      { name: "Синий", value: "blue" },
      { name: "Черный", value: "black" },
    ],
    description:
      "Удобный спортивный костюм для мальчиков. Включает толстовку и брюки. Идеально для спорта и активного отдыха.",
    material: "80% хлопок, 20% полиэстер",
    care: "Машинная стирка при 30°C, не отбеливать",
  },
  "boy-2": {
    id: "boy-2",
    name: "Джинсы с карманами",
    price: 1699,
    image:
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80",
    season: "all",
    age: "6-9",
    sizes: ["122", "128", "134", "140"],
    colors: [
      { name: "Синий", value: "blue" },
      { name: "Черный", value: "black" },
    ],
    description:
      "Практичные джинсы для мальчиков. Множество карманов, прочный материал. Подходят для повседневной носки.",
    material: "98% хлопок, 2% эластан",
    care: "Машинная стирка при 30°C, не отбеливать",
  },
  "boy-3": {
    id: "boy-3",
    name: "Рубашка в клетку",
    price: 1299,
    image:
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80",
    season: "all",
    age: "6-9",
    sizes: ["122", "128", "134", "140"],
    colors: [
      { name: "Красный", value: "red" },
      { name: "Зеленый", value: "green" },
    ],
    description:
      "Стильная рубашка в клетку для мальчиков. Классический дизайн, качественный материал. Подходит как для школы, так и для повседневной носки.",
    material: "100% хлопок",
    care: "Машинная стирка при 40°C, гладить при средней температуре",
  },
  // Школьная форма
  "school-1": {
    id: "school-1",
    name: "Школьный пиджак для мальчика",
    price: 2499,
    image:
      "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=800&q=80",
    season: "demi",
    age: "6-9",
    sizes: ["122", "128", "134", "140"],
    colors: [
      { name: "Синий", value: "blue" },
      { name: "Черный", value: "black" },
    ],
    description:
      "Классический школьный пиджак для мальчиков. Строгий дизайн, качественный материал. Соответствует школьным требованиям.",
    material: "65% полиэстер, 35% вискоза",
    care: "Сухая чистка, гладить при средней температуре",
  },
  "school-2": {
    id: "school-2",
    name: "Школьная юбка для девочки",
    price: 1299,
    image:
      "https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=800&q=80",
    season: "demi",
    age: "6-9",
    sizes: ["122", "128", "134", "140"],
    colors: [
      { name: "Синий", value: "blue" },
      { name: "Черный", value: "black" },
    ],
    description:
      "Классическая школьная юбка для девочек. Строгий дизайн, качественный материал. Соответствует школьным требованиям.",
    material: "65% полиэстер, 35% вискоза",
    care: "Машинная стирка при 30°C, гладить при средней температуре",
  },
  "school-3": {
    id: "school-3",
    name: "Школьная блузка для девочки",
    price: 999,
    image:
      "https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=800&q=80",
    season: "demi",
    age: "6-9",
    sizes: ["122", "128", "134", "140"],
    colors: [{ name: "Белый", value: "white" }],
    description:
      "Элегантная школьная блузка для девочек. Классический дизайн, качественный материал. Соответствует школьным требованиям.",
    material: "65% хлопок, 35% полиэстер",
    care: "Машинная стирка при 30°C, гладить при средней температуре",
  },
  // Летняя коллекция
  "summer-1": {
    id: "summer-1",
    name: "Шорты джинсовые",
    price: 999,
    image:
      "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&q=80",
    season: "summer",
    age: "3-6",
    sizes: ["98", "104", "110", "116"],
    colors: [
      { name: "Синий", value: "blue" },
      { name: "Светло-синий", value: "lightblue" },
    ],
    description:
      "Удобные джинсовые шорты для детей. Прочный материал, регулируемый пояс. Идеально для летних прогулок и игр.",
    material: "100% хлопок",
    care: "Машинная стирка при 30°C, не отбеливать",
  },
  "summer-2": {
    id: "summer-2",
    name: "Купальник для девочки",
    price: 1299,
    image:
      "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&q=80",
    season: "summer",
    age: "3-6",
    sizes: ["98", "104", "110", "116"],
    colors: [
      { name: "Розовый", value: "pink" },
      { name: "Голубой", value: "lightblue" },
    ],
    description:
      "Яркий купальник для девочек. Быстросохнущий материал, удобный крой. Идеально для пляжа и бассейна.",
    material: "80% полиамид, 20% эластан",
    care: "Ручная стирка в холодной воде, не отбеливать",
  },
  "summer-3": {
    id: "summer-3",
    name: "Панама детская",
    price: 599,
    image:
      "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&q=80",
    season: "summer",
    age: "all",
    sizes: ["48", "50", "52"],
    colors: [
      { name: "Белый", value: "white" },
      { name: "Желтый", value: "yellow" },
    ],
    description:
      "Легкая панама для защиты от солнца. Дышащий материал, широкие поля. Незаменима для летних прогулок.",
    material: "100% хлопок",
    care: "Машинная стирка при 30°C, не отбеливать",
  },
  // Верхняя одежда
  "outerwear-1": {
    id: "outerwear-1",
    name: "Зимний пуховик",
    price: 4999,
    image:
      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&q=80",
    season: "winter",
    age: "3-6",
    sizes: ["98", "104", "110", "116"],
    colors: [
      { name: "Синий", value: "blue" },
      { name: "Красный", value: "red" },
    ],
    description:
      "Теплый зимний пуховик для детей. Водоотталкивающий материал, капюшон с мехом. Сохраняет тепло даже в сильные морозы.",
    material: "Верх: 100% полиэстер, наполнитель: 80% пух, 20% перо",
    care: "Сухая чистка",
  },
  "outerwear-2": {
    id: "outerwear-2",
    name: "Демисезонная куртка",
    price: 2999,
    image:
      "https://images.unsplash.com/photo-1445796886651-d31a2c15f3c9?w=800&q=80",
    season: "demi",
    age: "6-9",
    sizes: ["122", "128", "134", "140"],
    colors: [
      { name: "Зеленый", value: "green" },
      { name: "Желтый", value: "yellow" },
    ],
    description:
      "Легкая демисезонная куртка для детей. Водоотталкивающий материал, капюшон. Идеально для весны и осени.",
    material: "100% полиэстер, подкладка: 100% хлопок",
    care: "Машинная стирка при 30°C, не отбеливать",
  },
  "outerwear-3": {
    id: "outerwear-3",
    name: "Дождевик",
    price: 1499,
    image:
      "https://images.unsplash.com/photo-1445796886651-d31a2c15f3c9?w=800&q=80",
    season: "all",
    age: "all",
    sizes: ["98", "104", "110", "116", "122", "128", "134", "140"],
    colors: [
      { name: "Желтый", value: "yellow" },
      { name: "Прозрачный", value: "transparent" },
    ],
    description:
      "Практичный дождевик для детей. Полностью водонепроницаемый, с капюшоном. Незаменим в дождливую погоду.",
    material: "100% ПВХ",
    care: "Протирать влажной тканью",
  },
  // Обувь
  "shoes-1": {
    id: "shoes-1",
    name: "Кроссовки детские",
    price: 1999,
    image:
      "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=800&q=80",
    season: "all",
    age: "3-6",
    sizes: ["28", "29", "30", "31"],
    colors: [
      { name: "Белый", value: "white" },
      { name: "Черный", value: "black" },
    ],
    description:
      "Удобные кроссовки для детей. Легкие, с амортизирующей подошвой. Подходят для повседневной носки и активных игр.",
    material: "Верх: текстиль, подошва: резина",
    care: "Протирать влажной тканью",
  },
  "shoes-2": {
    id: "shoes-2",
    name: "Сандалии детские",
    price: 1499,
    image:
      "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=800&q=80",
    season: "summer",
    age: "3-6",
    sizes: ["28", "29", "30", "31"],
    colors: [
      { name: "Синий", value: "blue" },
      { name: "Розовый", value: "pink" },
    ],
    description:
      "Удобные сандалии для детей. Анатомическая стелька, регулируемые ремешки. Идеально для летних прогулок.",
    material: "Верх: натуральная кожа, подошва: термопластичная резина",
    care: "Протирать влажной тканью",
  },
  "shoes-3": {
    id: "shoes-3",
    name: "Зимние ботинки",
    price: 2999,
    image:
      "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=800&q=80",
    season: "winter",
    age: "6-9",
    sizes: ["32", "33", "34", "35"],
    colors: [
      { name: "Черный", value: "black" },
      { name: "Коричневый", value: "brown" },
    ],
    description:
      "Теплые зимние ботинки для детей. Водоотталкивающий материал, меховая подкладка. Сохраняют тепло даже в сильные морозы.",
    material:
      "Верх: натуральная кожа, подкладка: натуральный мех, подошва: термопластичная резина",
    care: "Протирать влажной тканью, обрабатывать водоотталкивающим спреем",
  },
  // Аксессуары
  "accessories-1": {
    id: "accessories-1",
    name: "Шапка и шарф (комплект)",
    price: 1299,
    image:
      "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=800&q=80",
    season: "winter",
    age: "all",
    sizes: ["48", "50", "52"],
    colors: [
      { name: "Серый", value: "gray" },
      { name: "Розовый", value: "pink" },
    ],
    description:
      "Теплый комплект из шапки и шарфа для детей. Мягкий материал, приятный к телу. Сохраняет тепло в холодную погоду.",
    material: "50% шерсть, 50% акрил",
    care: "Ручная стирка в холодной воде, сушить в расправленном виде",
  },
  "accessories-2": {
    id: "accessories-2",
    name: "Перчатки детские",
    price: 699,
    image:
      "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=800&q=80",
    season: "winter",
    age: "all",
    sizes: ["S", "M", "L"],
    colors: [
      { name: "Черный", value: "black" },
      { name: "Синий", value: "blue" },
    ],
    description:
      "Теплые перчатки для детей. Водоотталкивающий материал, эластичные манжеты. Сохраняют тепло в холодную погоду.",
    material: "100% полиэстер, утеплитель: Thinsulate",
    care: "Ручная стирка в холодной воде",
  },
  "accessories-3": {
    id: "accessories-3",
    name: "Рюкзак детский",
    price: 1999,
    image:
      "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=800&q=80",
    season: "all",
    age: "3-6",
    sizes: ["One Size"],
    colors: [
      { name: "Синий", value: "blue" },
      { name: "Розовый", value: "pink" },
    ],
    description:
      "Яркий рюкзак для детей. Множество карманов, регулируемые лямки. Идеально для школы и прогулок.",
    material: "100% полиэстер",
    care: "Протирать влажной тканью",
  },
  // Зимняя коллекция
  "winter-1": {
    id: "winter-1",
    name: "Зимний комбинезон",
    price: 4999,
    image:
      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&q=80",
    season: "winter",
    age: "0-1",
    sizes: ["56", "62", "68", "74"],
    colors: [
      { name: "Синий", value: "blue" },
      { name: "Розовый", value: "pink" },
    ],
    description:
      "Теплый зимний комбинезон для малышей. Водоотталкивающий материал, капюшон с мехом. Сохраняет тепло даже в сильные морозы.",
    material: "Верх: 100% полиэстер, наполнитель: 80% пух, 20% перо",
    care: "Сухая чистка",
  },
  "winter-2": {
    id: "winter-2",
    name: "Зимние варежки",
    price: 799,
    image:
      "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=800&q=80",
    season: "winter",
    age: "1-3",
    sizes: ["S", "M"],
    colors: [
      { name: "Красный", value: "red" },
      { name: "Синий", value: "blue" },
    ],
    description:
      "Теплые варежки для малышей. Водоотталкивающий материал, длинные манжеты. Сохраняют тепло в холодную погоду.",
    material: "100% полиэстер, утеплитель: Thinsulate",
    care: "Ручная стирка в холодной воде",
  },
  "winter-3": {
    id: "winter-3",
    name: "Зимние сапоги",
    price: 2499,
    image:
      "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=800&q=80",
    season: "winter",
    age: "3-6",
    sizes: ["28", "29", "30", "31"],
    colors: [
      { name: "Черный", value: "black" },
      { name: "Синий", value: "blue" },
    ],
    description:
      "Теплые зимние сапоги для детей. Водоотталкивающий материал, меховая подкладка. Сохраняют тепло даже в сильные морозы.",
    material:
      "Верх: текстиль, подкладка: натуральный мех, подошва: термопластичная резина",
    care: "Протирать влажной тканью, обрабатывать водоотталкивающим спреем",
  },
  // Спортивная одежда
  "sport-1": {
    id: "sport-1",
    name: "Спортивный костюм",
    price: 2499,
    image:
      "https://images.unsplash.com/photo-1518310952931-b1de897abd40?w=800&q=80",
    season: "all",
    age: "6-9",
    sizes: ["122", "128", "134", "140"],
    colors: [
      { name: "Синий", value: "blue" },
      { name: "Черный", value: "black" },
    ],
    description:
      "Удобный спортивный костюм для детей. Дышащий материал, эластичные манжеты. Идеально для спорта и активного отдыха.",
    material: "80% хлопок, 20% полиэстер",
    care: "Машинная стирка при 30°C, не отбеливать",
  },
  "sport-2": {
    id: "sport-2",
    name: "Футболка спортивная",
    price: 799,
    image:
      "https://images.unsplash.com/photo-1518310952931-b1de897abd40?w=800&q=80",
    season: "summer",
    age: "6-9",
    sizes: ["122", "128", "134", "140"],
    colors: [
      { name: "Белый", value: "white" },
      { name: "Синий", value: "blue" },
    ],
    description:
      "Легкая спортивная футболка для детей. Дышащий материал, свободный крой. Идеально для спорта и активного отдыха.",
    material: "100% полиэстер",
    care: "Машинная стирка при 30°C, не отбеливать",
  },
  "sport-3": {
    id: "sport-3",
    name: "Шорты спортивные",
    price: 899,
    image:
      "https://images.unsplash.com/photo-1518310952931-b1de897abd40?w=800&q=80",
    season: "summer",
    age: "6-9",
    sizes: ["122", "128", "134", "140"],
    colors: [
      { name: "Черный", value: "black" },
      { name: "Синий", value: "blue" },
    ],
    description:
      "Удобные спортивные шорты для детей. Дышащий материал, эластичный пояс. Идеально для спорта и активного отдыха.",
    material: "100% полиэстер",
    care: "Машинная стирка при 30°C, не отбеливать",
  },
};

// Map category to product IDs
const categoryProducts: Record<string, string[]> = {
  babies: ["baby-1", "baby-2", "baby-3", "product-1", "product-7"],
  girls: ["girl-1", "girl-2", "girl-3", "product-2", "product-7"],
  boys: ["boy-1", "boy-2", "boy-3", "product-3", "product-4"],
  school: ["school-1", "school-2", "school-3", "product-4"],
  summer: ["summer-1", "summer-2", "summer-3", "product-2", "product-5"],
  outerwear: ["outerwear-1", "outerwear-2", "outerwear-3", "product-3"],
  shoes: ["shoes-1", "shoes-2", "shoes-3", "product-5"],
  accessories: [
    "accessories-1",
    "accessories-2",
    "accessories-3",
    "product-6",
    "product-8",
  ],
  winter: ["winter-1", "winter-2", "winter-3", "product-1", "product-6"],
  sport: ["sport-1", "sport-2", "sport-3", "boy-1"],
};

const ProductPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [isAdded, setIsAdded] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (!productId || !productsDatabase[productId]) {
      navigate("/");
      return;
    }

    const currentProduct = productsDatabase[productId];
    setProduct(currentProduct);

    // Set default selected size and color
    if (currentProduct.sizes && currentProduct.sizes.length > 0) {
      setSelectedSize(currentProduct.sizes[0]);
    }

    if (currentProduct.colors && currentProduct.colors.length > 0) {
      setSelectedColor(currentProduct.colors[0].value);
    }

    // Find related products (from the same category or with the same age/season)
    const related: Product[] = [];

    // Find which categories this product belongs to
    const productCategories = Object.entries(categoryProducts)
      .filter(([_, ids]) => ids.includes(productId))
      .map(([category]) => category);

    if (productCategories.length > 0) {
      // Get products from the same categories (up to 4)
      const categoryRelated = new Set<string>();

      for (const category of productCategories) {
        for (const id of categoryProducts[category]) {
          if (id !== productId && categoryRelated.size < 4) {
            categoryRelated.add(id);
          }
        }
      }

      for (const id of categoryRelated) {
        related.push(productsDatabase[id]);
      }
    }

    setRelatedProducts(related);
  }, [productId, navigate]);

  if (!product) {
    return null;
  }

  const discountedPrice =
    product.discount && product.discount > 0
      ? Math.round(product.price * (1 - product.discount / 100))
      : product.price;

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: discountedPrice,
      size: selectedSize,
      color: selectedColor,
      imageUrl: product.image,
    });

    // Show added confirmation
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          className="mb-6 flex items-center gap-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4" />
          Вернуться назад
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Product Image */}
          <div className="rounded-xl overflow-hidden bg-gray-50 relative">
            {product.discount && product.discount > 0 && (
              <div className="absolute right-4 top-4 rounded-full bg-red-500 px-3 py-1.5 text-sm font-bold text-white z-10">
                -{product.discount}%
              </div>
            )}
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto object-cover aspect-square"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mb-4">
              {product.discount && product.discount > 0 ? (
                <>
                  <span className="text-2xl font-bold text-primary">
                    {discountedPrice} ₽
                  </span>
                  <span className="text-lg text-muted-foreground line-through">
                    {product.price} ₽
                  </span>
                </>
              ) : (
                <span className="text-2xl font-bold text-primary">
                  {product.price} ₽
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="text-sm text-gray-500 mb-1 block">
                  Размер
                </label>
                <Select value={selectedSize} onValueChange={setSelectedSize}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Выберите размер" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.sizes?.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm text-gray-500 mb-1 block">Цвет</label>
                <Select value={selectedColor} onValueChange={setSelectedColor}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Выберите цвет" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.colors?.map((color) => (
                      <SelectItem key={color.value} value={color.name}>
                        {color.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              onClick={handleAddToCart}
              className={`w-full ${isAdded ? "bg-green-600 hover:bg-green-700" : "bg-pink-600 hover:bg-pink-700"} transition-all duration-300 transform hover:scale-105 rounded-full py-6 text-lg mb-6`}
              disabled={isAdded}
              size="lg"
            >
              {isAdded ? (
                <>
                  <Check className="mr-2 h-5 w-5" />
                  Добавлено в корзину
                </>
              ) : (
                <>
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Добавить в корзину
                </>
              )}
            </Button>

            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description">Описание</TabsTrigger>
                <TabsTrigger value="details">Характеристики</TabsTrigger>
                <TabsTrigger value="care">Уход</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="mt-4 text-gray-700">
                <p>{product.description}</p>
              </TabsContent>
              <TabsContent value="details" className="mt-4">
                <div className="space-y-2">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-500">Возраст</span>
                    <span className="font-medium">{product.age}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-500">Сезон</span>
                    <span className="font-medium">
                      {product.season === "winter" && "Зима"}
                      {product.season === "summer" && "Лето"}
                      {product.season === "autumn" && "Осень"}
                      {product.season === "spring" && "Весна"}
                      {product.season === "demi" && "Демисезон"}
                      {product.season === "all" && "Всесезонный"}
                    </span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-500">Материал</span>
                    <span className="font-medium">{product.material}</span>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="care" className="mt-4 text-gray-700">
                <p>{product.care}</p>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Product Reviews */}
        <div className="mb-12">
          <ProductReviews productId={product.id} />
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Похожие товары
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct.id} className="flex justify-center">
                  <div
                    className="cursor-pointer"
                    onClick={() => navigate(`/product/${relatedProduct.id}`)}
                  >
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-64 object-cover rounded-lg mb-2"
                    />
                    <h3 className="font-medium text-gray-800">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-primary font-bold">
                      {relatedProduct.price} ₽
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ProductPage;
