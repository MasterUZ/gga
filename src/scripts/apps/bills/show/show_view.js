define(["app"], function(GeneralAssemblyApp) {
  GeneralAssemblyApp.module("BillsApp.Show.View", function(View, GeneralAssemblyApp, Backbone, Marionette, $, _) {
    View.BillLayout = Marionette.Layout.extend({
      template: "#bill-detail-layout",
      className: "container",
      regions: {
        billRegion: "#bill-region",
        authorRegion: "#author-region",
        coauthorsRegion: "#coauthors-region",
        statusRegion: "#status-region",
        versionRegion: "#version-region"
      }
    });

    View.BillView = Marionette.ItemView.extend({
      template: "#bill-detail-template",
      className: "panel panel-default"
    });

    // Bill author views
    View.AuthorView = Marionette.ItemView.extend({
      tagName: "li",
      className: function() {
        return "media " + this.model.get("party")
      },
      template: "#bill-author-template"
    });
    View.AuthorsView = Marionette.CompositeView.extend({
      itemView: View.AuthorView,
      template: "#bill-author-list",
      itemViewContainer: "#bill-authors"
    });

    // Bill status views
    View.StatusView = Marionette.ItemView.extend({
      tagName: "li",
      className: "list-group-item",
      template: "#bill-status-template"
    });
    View.StatusListingsView = Marionette.CollectionView.extend({
      itemView: View.StatusView,
      tagName: "ul",
      className: "list-group"
    });

    // Bill version views
    View.VersionView = Marionette.ItemView.extend({
      tagName: "li",
      className: "list-group-item",
      template: "#bill-version-template"
    });
    View.VersionsListingView = Marionette.CollectionView.extend({
      itemView: View.VersionView,
      tagName: "ul",
      className: "list-group"
    });
  });
  return GeneralAssemblyApp.BillsApp.Show.View;
});