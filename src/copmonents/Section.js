export default class Section {
    constructor({ items, renderer }, container) {
        //массив данных, которые нужно добавить на страницу
        this._items = items;
        //функция, которая отвечает за создание и отрисовку данных на странице
        this._renderer = renderer;
        //селектор контейнера, в который нужно добавлять созданные элементы
        this._container = container;
    }

    renderItems() {
        this._items.forEach(item => this._renderer(item));  
    // вызываем renderer, передав item
      }

    addItem(element) {
        this._container.prepend(element);
    }

}
