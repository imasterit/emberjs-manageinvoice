import Controller from '@ember/controller';
// import moment from 'moment';
import { computed } from '@ember/object';
// import { or } from '@ember/object/computed';
import { task } from "ember-concurrency";
import { inject as service } from '@ember/service';


export default Controller.extend({
  store: service(),
  invoices: null,

  init() {
    this._super(...arguments);
    this.get('findInvoicesTask').perform();
  },

  totalAmount: computed('invoices.[]', function () {
    return this.get('invoices').reduce((previousValue, item) => {
      return previousValue + +item.get('amount');
    }, 0);
  }),

  findInvoicesTask: task(function* () {
    yield this.get('store')
      .findAll('invoice')
      .then(invoices => {
        this.set('invoices', invoices);
      });
  }).drop()
});
