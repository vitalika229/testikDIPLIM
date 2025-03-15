import React from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Separator } from "./ui/separator";

const Footer = () => {
  return (
    <footer className="w-full bg-slate-100 py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900">
              Детский Гардероб
            </h3>
            <p className="text-slate-600">
              Стильная и качественная одежда для детей всех возрастов
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-600 hover:text-slate-900">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-slate-600 hover:text-slate-900">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-slate-600 hover:text-slate-900">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-slate-600 hover:text-slate-900">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-900">Категории</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-slate-600 hover:text-slate-900">
                  Для малышей
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-600 hover:text-slate-900">
                  Для девочек
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-600 hover:text-slate-900">
                  Для мальчиков
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-600 hover:text-slate-900">
                  Школьная форма
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-600 hover:text-slate-900">
                  Аксессуары
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-900">Информация</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-slate-600 hover:text-slate-900">
                  О нас
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-600 hover:text-slate-900">
                  Доставка и оплата
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-600 hover:text-slate-900">
                  Возврат и обмен
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-600 hover:text-slate-900">
                  Политика конфиденциальности
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-600 hover:text-slate-900">
                  Вопросы и ответы
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-900">Контакты</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <Phone size={18} className="text-slate-600" />
                <span className="text-slate-600">+7 (800) 123-45-67</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail size={18} className="text-slate-600" />
                <span className="text-slate-600">info@detskiy-garderob.ru</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin size={18} className="text-slate-600" />
                <span className="text-slate-600">
                  г. Москва, ул. Примерная, д. 123
                </span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-600 text-sm">
            © 2023 Детский Гардероб. Все права защищены.
          </p>
          <div className="mt-4 md:mt-0">
            <img
              src="https://images.unsplash.com/photo-1580508174046-170816f65662?w=200&q=80"
              alt="Способы оплаты"
              className="h-8"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
