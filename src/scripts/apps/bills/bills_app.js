GeneralAssemblyApp.module("BillsApp", function(BillsApp, GeneralAssemblyApp, Backbone, Marionette, $, _) {
  BillsApp.Router = Marionette.AppRouter.extend({
    appRoutes: {
      "bills/:id": "showBill",
    }
  });

  var API = {
    showBill: function(id) {
      BillsApp.Show.Controller.showBill(id);
    }
  };

  GeneralAssemblyApp.on("bills:show", function(id) {
    GeneralAssemblyApp.navigate("bills/" + id);
  });

  GeneralAssemblyApp.addInitializer(function() {
    new BillsApp.Router({
      controller: API
    });
  });
});
