'use strict';

/**
 * Class representing a modal.
 * @class
 */
class EvilModal{

  /**
   *
   * @constructor
   * @param {object} settings - Set of settings.
   */
  constructor(settings = {}){
    this.settings = {
      onOpen: null,
      onConfirm: null,
      onClose: null,
      clickOut: true,
      marginTopStick: 30,
      ...settings
    };

    this._onClick = this._onClick.bind(this);
    this._centerModal = this._centerModal.bind(this);
  }

  /**
   * Open the modal.
   * @param {string} modalId - Id of modal.
   * @param {object} data - User data
   * @param {callbak} callback - Callback on close
   * @returns {Promise}
   */
  open(modalId, data, callback){
    this.data = data;
    this.$ = document.querySelector(`[data-modal="${modalId}"]`);
    this.content = this.$.querySelector('.evil-modal-content');

    if(this.$){
      this._setEvents();
    }else{
      return console.error('Target must exist on page.');
    }

    if(EvilModal.isFunction(callback)){
      this.callback = callback;
    }

    this._setStylesAndAttrs();

    EvilModal.isFunction(this.settings.onOpen) &&
      this.settings.onOpen.call(this, this.data);

    this._centerModal();

    return new Promise((resolve) => {
      this._resolve = resolve;
    });
  }

  /**
   * Close the modal.
   * @param {any} result.
   */
  close(result){
    this._clearStylesAndAttrs();

    EvilModal.isFunction(this.settings.onClose) &&
      this.settings.onClose.call(this, result);

    this.callback && this.callback(result);

    this._resolve(result);
    this._cleanUp();
  }

  /**
   *
   * @private
   */
  _centerModal(){
      let offset = (document.documentElement.clientHeight - this.content.clientHeight) / 2;

      if(offset < this.settings.marginTopStick){
        this.content.style.marginTop = this.settings.marginTopStick;
      }else{
        this.content.style.marginTop = `${offset}px`;
      }
  }

  /**
   * On click handler for comfirm and dismiss
   * @private
   */
  _onClick(e){
    if(e.target.hasAttribute('modal-confirm')){
      EvilModal.isFunction(this.settings.onConfirm) &&
        this.settings.onConfirm.call(this);
    }

    e.target.hasAttribute('modal-dismiss') && this.close();

    if(this.settings.clickOut && e.target.classList.contains('evil-modal')){
      this.close();
    }
  }

  /**
   *
   * @private
   */
  _setStylesAndAttrs(){
    let checkScrollBar = EvilModal.checkScrollbar();

    document.body.style.setProperty('overflow', 'hidden');

    if(checkScrollBar.scroll){
      document.body.style.setProperty('padding-right',
        `${checkScrollBar.scrollWidth}px`);
    }

    this.$.setAttribute('show', '');
  }

  /**
   *
   * @private
   */
  _clearStylesAndAttrs(){
    document.body.style.removeProperty('overflow');
    document.body.style.removeProperty('padding-right');
    this.$.removeAttribute('show');
  }

  /**
   *
   * @private
   */
  _setEvents(){
    this._removeEvents();
    this.$.addEventListener('click', this._onClick, false);
    window.addEventListener('resize', this._centerModal, false);
  }

  /**
   *
   * @private
   */
  _removeEvents(){
    this.$.removeEventListener('click', this._onButns);
    window.removeEventListener('resize', this._centerModal);
  }

  /**
   *
   * @private
   */
  _cleanUp(){
    this._removeEvents();
    this.$ = this.content = this._resolve = this.callback = this.data = void 0;
  }

  /**
   * Is a given obj function?
   * @static
   * @returns {Boolean}
   */
  static isFunction(obj){
    return typeof obj == 'function' || false;
  }

  /**
   * Get scroll width
   * @static
   * @returns {Boolean}
   */
  static measureScrollbar () {
    let scrollDiv = document.createElement('div'),
      scrollbarWidth = null;

    scrollDiv.className = 'evil-modal-scrollbar-measure';
    document.body.appendChild(scrollDiv);

    scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);

    return scrollbarWidth;
  }

  /**
   * Is there a scroll?
   * @static
   * @returns {Object} - scroll {Boolean}, scrollWidth {Number}
   */
  static checkScrollbar() {
    let fullWindowWidth = window.innerWidth,
      documentElementRect = null;

    return {
      scroll: document.body.clientWidth < fullWindowWidth,
      scrollWidth: EvilModal.measureScrollbar()
    }
  }
}
