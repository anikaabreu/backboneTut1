
// In the first few sections, we do all the coding here.
// Later, you'll see how to organize your code into separate
// files and modules.

// MODELS
var Tune = Backbone.Model.extend({
    //initialize automatically supplied by backbone ext, to create instance have to instantiate it as new whatever()
    initialize: function(){
        // console.log('New song')
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

var song = new Tune();

//backbone models store attributes in an object/hash, have to use set to set them unline song.title = whatever

song.set('title', 'bipi')

//can use json to set multiple attributes at once

song.set({
    artist: 'hozier',
    publishYr: 2018
})

//can also set attributes when initializing model object

var song1 = new Tune({
    title: 'backbone',
    artist: 'anika',
    publishYr: 2019
});
/*can convert to json object, by model.toJSON()
to convert JSON to object model, can pass json when instantiating

to get attribute, call get method
to remove attribute, call set method
can remove all attributes of model by calling the clar method
can check what model has by using .has method */



var Animal = Backbone.Model.extend({
    walk: function(){
    // console.log('animal walking')
    }
})

//can override base class functionality w/ extending in inherited class, now console logs dog walking
var Dog = Animal.extend({
    walk: function(){
        //if want to use original base class func as well as extended inheritance, extend prototype, now outputs both messages
        Animal.prototype.walk.apply(this);

        // console.log('dog walking')
    }
});

var dog = new Dog()

dog.walk()

/*models use 3 persistent operations
fetch()- GET
save()- POST/PUT
destroy()- DELETE

backbone uses urlRoot to define url where server is located
methods accept success, error callback w/funky syntax

song.fetch({
    success: function(){},
    error: function(){}
}),

song.save({hash of attributes you want to change},
    {
    success: function(){},
    error: function(){}
    })
*/


// COLLECTIONS- collections of models- ordered set of models

//can pass models like this 
var Song = Backbone.Model.extend();

var Songs = Backbone.Collection.extend({
    model: Song
})

//collection of songs
var songs = new Songs([
    new Song({ title: "Song 1"}),
    new Song({ title: "Song 2" }),
    new Song({ title: "Song 3" }),
])

//can also add to collection with add method provided by underscore
songs.add(new Song({ title: 'Song 5'}))

/*can use songs.at(index) to get specific model, can get model by cid also, i.e. songs.at(c1)
can remove model by using songs.remove(songs.at(index))
can also use at to insert models in specific places in the collection
*/
//passing a json object that specifies index
songs.add(new Song({ title: 'Song5', genre: 'classical', downloads: 110}), { at: 0 })

//works like jquery push
songs.push(new Song({ title: "Song6", genre: 'Jazz', downloads: 90}))

//returns model at end of collection, like pop jquery
var lastSong = songs.pop()
//to search models in a collection, case sensitive when it comes to strings

//where returns array
var jazzSongs = songs.where({ genre: 'Jazz'});

//returns first instance
var firstJazzSong = songs.findWhere({ genre: 'Jazz'})

// console.log( 'jazz songs', jazzSongs)
// console.log('first song', firstJazzSong)

//can add multiple filters in where method

var filteredSongs = songs.where({ genre: 'Jazz', title: 'Song2'})
// console.log(filteredSongs)

//where method does equality check between the attributes you pass and attributes of model inside the collection

/*to filter collection by custom logic, use the filter method
argument in filter uses predicate function, calls the function for every model in collection, 
job of function is to check if model has critera we are looking for, func returns true/false if true, 
underscore adds to filtered models*/
var topDownloads = songs.filter(function(song){
    return song.get('downloads') > 100
})

// console.log(topDownloads)

/*each method- expects callback function to be executed for each iteration, like each/foreach*/
songs.each(function(song){
    // console.log(song)
})

/*connecting to the server to retrieve collection data
can specify url in model or can specify in fetch 
*/
// songs.fetch({
//     url: "/api/songs",
//     data: {
//         page: 2
//     },
//     success: function(){},
//     error: function(){}
// })

// VIEWS

/* backbone view is object responsible to rendering html and responding to events, 
more like controllers in mvc, have a dom element*/

var SongView = Backbone.View.extend({
    //can use tagname property to specify type of element to be created, can give class, id, and attributes
    tagName: "span",
    className: 'song',
    id:'123',
    attributes: {
        "data-genre" : 'Jazz'
    },
    render: function(){
        //this.$el is jquery dom object that contains dom element
        this.$el.html('Hello World');

        return this;
    }
})

/*specify dom element to attach to, using jquery selector string 
if don't instantiate w/specific element, backbone does it with a div that is in memory, not in the html markup, but cannot 
assign same view to two ids, have to assign only to 1*/
var songView = new SongView({ el: '#container'});
var songView = new SongView({ });

songView.render()

//can also assign this way, only works if instantiated empty, can chain render method
 $('#container1').html(songView.render().$el)




