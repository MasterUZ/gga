define(["app"], function(GeneralAssemblyApp) {
  GeneralAssemblyApp.module("Entities", function(Entities, GeneralAssemblyApp, Backbone, Marionette, $, _){
    // Bills
    Entities.Bill = Backbone.Model.extend({
      initialize: function(id) {
        this.url = "http://ajcgga-api.herokuapp.com/api/bills/" + id
      }
    });
    Entities.Bills = Backbone.Collection.extend({
      model: Entities.Bill,
      url: "http://ajcgga-api.herokuapp.com/api/bills/"
    });

    // BillsCount
    Entities.BillsCount = Backbone.Model.extend({
      url: "http://ajcgga-api.herokuapp.com/api/bills/count/"
    });

    // BillAuthors
    Entities.BillAuthor = Backbone.Model.extend({
      initialize: function() {
        var full_name = this.get("name_first") + " ";
        if ( ! _.isNull(this.get("name_middle")) ) full_name += this.get("name_middle") + " ";
        if ( ! _.isNull(this.get("name_nickname")) ) full_name += "'" + this.get("name_nickname") + "' ";
        full_name += this.get("name_last");
        this.set("full_name", full_name);
      }
    });
    Entities.BillAuthors = Backbone.Collection.extend({
      model: Entities.BillAuthor
    });

    // BillStatusListings
    Entities.BillStatusListing = Backbone.Model.extend({
      initialize: function() {
        this.set("status_date", new Date(this.get("status_date")));
      }
    });
    Entities.BillStatusListings = Backbone.Collection.extend({
      model: Entities.BillStatusListing
    });

    // BillVersions
    Entities.BillVersion = Backbone.Model.extend();
    Entities.BillVersions = Backbone.Collection.extend({
      model: Entities.BillVersion
    });

    // BillVotes
    Entities.BillVote = Backbone.Model.extend({
      initialize: function() {
        this.set("vote_date", new Date(this.get("vote_date")));
      }
    });
    Entities.BillVotes = Backbone.Collection.extend({
      model: Entities.BillVote
    });

    var API = {
      getBillsCount: function() {
        var defer = $.Deferred();
        Entities.bills_count = new Entities.BillsCount()
        Entities.bills_count.fetch({
          dataType: "jsonp",
          success: function(data) {
            defer.resolve(data);
          }it,
        });
        return defer.promise();
      },

      getBill: function(id) {
        var defer = $.Deferred();
        bill = new Entities.Bill(id);
        bill.fetch({
          dataType: "jsonp",
          success: function(data) {
            defer.resolve(data)
          }
        });
        return defer.promise();
      }
    };

    GeneralAssemblyApp.reqres.setHandler("bills:count", function() {
      return API.getBillsCount();
    });

    GeneralAssemblyApp.reqres.setHandler("bills:bill", function(id) {
      return API.getBill(id);
    });
  });
  return GeneralAssemblyApp.Entities.Bill;
});
