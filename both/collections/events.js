import { SimpleSchema } from 'meteor/aldeed:simple-schema';

Events = new Mongo.Collection( 'events' );


let EventsSchema = new SimpleSchema({
  'title': {
    type: String,
    label: 'The title of this event.'
  },
  'start': {
    type: String,
    label: 'When this event will start.'
  },
  'end': {
    type: String,
    label: 'When this event will end.'
  },
  'type': {
    type: String,
    label: 'What type of event is this?',
    allowedValues: [ 'Birthday', 'Corporate', 'Wedding', 'Miscellaneous' ]
  },
  'guests': {
    type: Number,
    label: 'The number of guests expected at this event.'
  }
});

Events.attachSchema( EventsSchema );