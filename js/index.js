const _ = require('lodash');
const $ = require('jquery');

const ele = {
  item: $('#sticker-item')
};

const selector = {
  stickerContent: '.sticker__content'
};

$(function() {
  let list = JSON.parse(localStorage.getItem('stickerWall')) || [];
  const stickerList = _.sortBy(list, 'index');
  let indexStart = _.last(stickerList).index;

  const renderList = () => {
    const compiled = _.template($('#sticker-list').html());
    var html = compiled({'list': stickerList});
    $('.sticker-wrapper').html(html);
  };

  const compiledStickerTemplate = _.template($('#sticker-item').html());

  const newSticker = () => {
    $(document).on('click', '#sticker-add', () => {
      const html = compiledStickerTemplate({index: ++indexStart, content: ''});
      $('#sticker-add').before(html);
    });
  };

  const deleteSticker = () => {
    $(document).on('click', '.sticker__remove', (e) => {
      _.remove(list, (item) => {

        return item.index == $(e.target).parent(ele.item).data('index');

      });

      localStorage.setItem('stickerWall', JSON.stringify(list));
      $(e.target).parent('.sticker-item').remove();

    });
  };

  const storeSticker = (e) => {
    const editedSticker = [{ index: $(e.target).parent(ele.item).data('index'), content: $(e.target).val().trim() }];
    list = _.unionBy(editedSticker, list, 'index');

    localStorage.setItem('stickerWall', JSON.stringify(list));
  };

  const submitSticker = () => {
    $(document).on('keyup', selector.stickerContent, (e) => {
      if(e.keyCode == 13)
      {
        storeSticker(e);
        $(e.target).blur();
      }
    });

    $(document).on('focusout',selector.stickerContent, (e) => {
      storeSticker(e);
    });
  };

  const bind = () => {
    newSticker();
    deleteSticker();
    submitSticker();
  };

  const init = () => {
    renderList(list);
    bind();
  };

  init();
});
