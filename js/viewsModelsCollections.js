//passing models into Views

var Song = Backbone.Model.extend(
    {
        defaults: {
            listeners: 0
        }
    }
);

//to handle events raised by DOM elements, use events property, can use any selector that jquery uses here as well
var SongView = Backbone.View.extend({
    initialize: function(){
        //can take callback function, 3rd param is referring to this object 
        this.model.on("change", this.onModelChange, this)
    },
      events: {
        "click": "onClick",
        "click .bookmark" : "onClickBookmark"
      },
      onModelChange: function(){
          this.$el.addClass('someclass')
      },
      onClick: function(){
          //normally use classes to specify, like in jquery
          console.log('clicked')
      },
      onClickBookmark: function(e){
          e.stopPropagation(); 

          console.log('bookmark')
      },
    render: function(){
        // this.$el.html(this.model.get('title')+ " <button>Listen</button> <button class='bookmark'>Bookmark</button>" + "listeners" + this.model.get('listeners'))
       this.$el.html(this.model.get('title'));
        this.$el.attr("id", this.model.cid)

        return this;
    }
})

var song = new Song({ title: 'Sonata 12'});

var songView = new SongView({ el: '#container3', model: song})
songView.render()

//can also pass collections to views

var Songs = Backbone.Collection.extend({
    model: Song
})

var songs = new Songs([
    new Song({ title: 'Sonata4'}),
     new Song({
         title: 'Sonata6'
     }),
      new Song({
          title: 'Sonata8'
      }),
])

var SongsView = Backbone.View.extend({
    initialize: function () {
        this.model.on("add", this.onSongAdded, this);
        this.model.on("remove", this.onSongRemoved, this)
    },
    onSongAdded: function(){
        var songView1 = new SongView({ model: song});
        this.$el.append(songView1.render().$el)
    },
    onSongRemoved: function(){
       this.$("div#" + song.cid).remove()

    },

    render: function(){
        //common convention to refer to view regardless of scope
        var self = this;

        this.model.each(function(song){
            var songView = new SongView({ model: song});
            self.$el.append(songView.render().$el);
        })
    }
})

var songsView = new SongsView({ el: '#container4', model: songs})
songsView.render()

//listening to collection events in view

