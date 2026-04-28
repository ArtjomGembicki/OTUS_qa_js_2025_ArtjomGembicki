const { I } = inject();

module.exports = {
  items: '.inventory_item',
  cartBadge: '[data-test="shopping-cart-badge"]',

  addFirstItem() {
    I.click('.inventory_item button');
  },
};