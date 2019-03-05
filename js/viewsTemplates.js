var Song = Backbone.Model.extend();

var SongView = Backbone.View.extend({
    render: function(){
        var template = _.template($('#songTemplate').html())
        //can take JSON to make template
        var html = template(this.model.toJSON())
        this.$el.html(html)
        return this;
    }
});

var song = new Song({ title: "Sonata 9", plays: 10});

var songView = new SongView({ el: "#container5", model: song});
songView.render()