export default class Section {
    constructor({ renderer }, container) {
        //функция, которая отвечает за создание и отрисовку данных на странице
        this._renderer = renderer;
        //селектор контейнера, в который нужно добавлять созданные элементы
        this._container = container;
    }
    
      renderItems(items) {
        items.reverse().forEach(item => this._renderer(item));  
      }

      addItem(element) {
        this._container.prepend(element);
    }

}
