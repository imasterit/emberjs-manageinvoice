import DS from 'ember-data';
const { Model, attr } = DS;

export default Model.extend({
  date: attr('string'),
  amount: attr('number')
});
