# VanillaModal
**Modal without dependencies**

## How to build
```sh
npm install && npm run build
```

## How to use

### JS
```js
let modal = new EvilModal();
modal.open('modal1');

//Data will be accessible via this.data
modal.open('modal1', {name: 'Alise'});

//Promise
modal.open('modal1', {name: 'Alise'}).then((data) => {
  console.log(data); //Data that have been passed to the close method
});

//You can use callback instead of promise
modal.open('modal1', null, (data) => {
  console.log(data);
});

//Close the modal
modal.close(data); //You can pass some data

```

### HTML
```html
<div class="evil-modal" data-modal="modal1">
  <div class="evil-modal-content">
    <button type="button" class="myButton" modal-confirm>Confirm</button>
    <button type="button" class="myButton" modal-dismiss>Dismiss</button>
  </div>
</div>
```

`modal-confirm` and `modal-dismiss` attributes can be used to manipulate the modal.
Click on element that has `modal-dismiss` attribute will close the modal.

### Settings
```js
onOpen: null, //{function}
onConfirm: null, //{function}
onClose: null, //{function}
clickOut: true, //Close on outside click
marginTopStick: 30, //Stick to top when the modal bigger than the window
```

### Example
```js
let modal = new EvilModal({
  onOpen: function(data){
    console.log(data);//Data from the open method
  },
  onConfirm: function(){
    console.log(this.data, this.$);
    //this.data - Data from the open method.
    //this.$ - Modal element (.evil-modal).
  },
  onClose: function(){
  },
  clickOut: false,
  marginTopStick: 30
});

modal.open('modal1').then((data) => {
  console.log(data); //true
});

modal.close(true);

```
