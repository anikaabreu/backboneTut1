
// In the first few sections, we do all the coding here.
// Later, you'll see how to organize your code into separate
// files and modules.

var Song = Backbone.Model.extend({
    //initialize automatically supplied by backbone ext, to create instance have to instantiate it as new whatever()
    initialize: function(){
        console.log('New song')
    },
    //if don't set value, this is default
    defaults: {
        genre: 'jazz'
    },
    //backbone calls this method whenever trying to set attributes to song object, uses json object to go through attributes and validate them
    //can check to see if object is valid by using isValid method i.e. song.isValid()
    validate: function(attrs){
        if(!attrs.title){
            return "Title is required"
        }
    } 
})

var song = new Song();

//backbone models store attributes in an object/hash, have to use set to set them unline song.title = whatever

song.set('title', 'bipi')

//can use json to set multiple attributes at once

song.set({
    artist: 'hozier',
    publishYr: 2018
})

//can also set attributes when initializing model object

var song1 = new Song({
    title: 'backbone',
    artist: 'anika',
    publishYr: 2019
});
//can convert to json object, by model.toJSON()
//to convert JSON to object model, can pass json when instantiating

//to get attribute, call get method
// to remove attribute, call set method
//can remove all attributes of model by calling the clar method
//can check what model has by using .has method

//