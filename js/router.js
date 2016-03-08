// Filename: router.js
define([
    'jquery',
    'underscore',
    'backbone',
    'views/home/HomeView',
    'views/contacto/ContactoView',
    'views/generals/GeneralView',
    'views/generals/BiografiaView',
    'views/generals/InvestigacionView',
    'views/generals/InvestigacionSinMenuView',
    'views/generals/ArticulosView',
    'views/generals/ProyectosView',
    'views/generals/LaboratoriosView',
    'views/generals/NoticiaView',
    'views/formularios/formularioView',
    'views/formularios/insertarView',
    'views/formularios/editarView',
    'views/formularios/editPersonalView',
    'views/formularios/editArticuloView',
    'views/formularios/editProyectoView',
    'views/formularios/editNoticiaView'

], function($, _, Backbone, HomeView, ContactoView, GeneralView, BioView, InvesView,
            InvesSinMenuView, ArticView, ProyView, LaboratoriosView, NoticiaView, 
            FormView, InsertarView, EditarView, EditPersonalView, EditArticuloView, EditProyectoView, EditNoticiaView) {
  
    var AppRouter = Backbone.Router.extend({
        routes: {
            // Define some URL routes
            'contacto':'showContacto',
            'historia': 'showHistoria',
            'objetivos': 'showObjetivos',
            'autoridades': 'showAutoridades',
            'estructura-administrativa': 'showEstructura',
            'investigadores-conicet': 'showInvesCon',
            'investigadores-cic': 'showInvesCic',
            'investigadores-uns': 'showInvesUns',
            'becarios-conicet': 'showBecCon',
            'profesionales-apoyo': 'showProfAp',
            'biografia/:id': 'showBio',
            'proy-investigacion': 'showProyInv',
            'prod-cientifica': 'showProdCient',
            'lineas-investigacion': 'showLinInves',
            'Articulos/:year' : 'showArticulos',
            'Proyectos/:year' : 'showProyectos',
            'extension' : 'showExtension',
            'servicios' : 'showServicios',
            'palinologia' : 'showPalinologia',
            'petrotomia' : 'showPetrotomia',
            'noticia/:id': "showNoticia",
            'formulario' : 'showForm',
            'insertar' : 'showInsertar',
            'insertTab' : 'showInsertar',
            'editTab' : 'showEditar',
            'edit_personal/:id': 'showEditPersonal',
            'edit_articulo/:id': 'showEditArticulo',
            'edit_proyecto/:id': 'showEditProyecto',
            'edit_noticia/:id': 'showEditNoticia',
            // Default
            '*actions': 'defaultAction'
        }
    });
  
    var initialize = function(){

        var app_router = new AppRouter;
        
       
        app_router.on('route:showContacto', function(){
       
            // Call render on the module we loaded in via the dependency array
            var contactoView = new ContactoView();
            contactoView.render();

        });

        app_router.on('route:showHistoria', function(){
       
            // Call render on the module we loaded in via the dependency array
            var historiaView = new GeneralView();
            historiaView.render('historia');

        });

        app_router.on('route:showObjetivos', function(){
       
            // Call render on the module we loaded in via the dependency array
            var objetivosView = new GeneralView();
            objetivosView.render('objetivos');

        });

        app_router.on('route:showAutoridades', function(){
       
            // Call render on the module we loaded in via the dependency array
            var objetivosView = new GeneralView();
            objetivosView.render('autoridades');

        });

        app_router.on('route:showEstructura', function(){
       
            // Call render on the module we loaded in via the dependency array
            var objetivosView = new GeneralView();
            objetivosView.render('estructura');

        });

        app_router.on('route:showInvesCon', function(){

            // Call render on the module we loaded in via the dependency array
            var invesConicetView = new GeneralView();
            invesConicetView.render('investigadores-conicet');

        });

        app_router.on('route:showInvesCic', function(){

            // Call render on the module we loaded in via the dependency array
            var invesCicView = new GeneralView();
            invesCicView.render('investigadores-cic');

        });

        app_router.on('route:showInvesUns', function(){

            // Call render on the module we loaded in via the dependency array
            var invesUnsView = new GeneralView();
            invesUnsView.render('investigadores-uns');

        });

        app_router.on('route:showBecCon', function(){

            // Call render on the module we loaded in via the dependency array
            var becConView = new GeneralView();
            becConView.render('becarios-conicet');

        });
      
        app_router.on('route:showProfAp', function(){

            // Call render on the module we loaded in via the dependency array
            var profApView = new GeneralView();
            profApView.render('profesionales-apoyo');

        });

        app_router.on('route:showBio', function(id){

            // Call render on the module we loaded in via the dependency array
            var BiografiaView = new BioView();
            BiografiaView.render(id);

        });

        app_router.on('route:showProyInv', function(){

            // Call render on the module we loaded in via the dependency array
            var ProyInvesView = new InvesView();
            ProyInvesView.render('Proyectos');

        });

        app_router.on('route:showProdCient', function(){

            // Call render on the module we loaded in via the dependency array
            var ProdCienView = new InvesView();
            ProdCienView.render('Articulos');

        });

        app_router.on('route:showLinInves', function(year){

            // Call render on the module we loaded in via the dependency array
            var ProyectosView = new InvesView();
            ProyectosView.render('');

        });

        app_router.on('route:showExtension', function(){

            // Call render on the module we loaded in via the dependency array
            var extensionView = new GeneralView();
            extensionView.render('extension');

        });

        app_router.on('route:showServicios', function(){

            // Call render on the module we loaded in via the dependency array
            var servView = new GeneralView();
            servView.render('servicios');

        });

        app_router.on('route:showArticulos', function(year){

            // Call render on the module we loaded in via the dependency array
            var ArticulosView = new ArticView();
            ArticulosView.render(year,'Articulos');

        });

        app_router.on('route:showProyectos', function(year){

            // Call render on the module we loaded in via the dependency array
            var ProyectosView = new ProyView();
            ProyectosView.render(year,'Proyectos');

        });

        app_router.on('route:showPalinologia', function(year){

            // Call render on the module we loaded in via the dependency array
            var LabView = new LaboratoriosView();
            LabView.render('palinologia');

        });

        app_router.on('route:showPetrotomia', function(year){

            // Call render on the module we loaded in via the dependency array
            var LabView = new LaboratoriosView();
            LabView.render('petrotomia');

        });

        app_router.on('route:showNoticia', function(id){

            // Call render on the module we loaded in via the dependency array
            var notiView = new NoticiaView();
            notiView.render(id);

        });

        app_router.on('route:showForm', function(){

            // Call render on the module we loaded in via the dependency array
            var FormularioView = new FormView();
            FormularioView.render();

        });

        app_router.on('route:showInsertar', function(){

            // Call render on the module we loaded in via the dependency array
            var InsView = new InsertarView();
            InsView.render();

        });

        app_router.on('route:showEditar', function(){

            // Call render on the module we loaded in via the dependency array
            var EditView = new EditarView();
            EditView.render();

        });

        app_router.on('route:showEditPersonal', function(id){

            // Call render on the module we loaded in via the dependency array
            var EditPerView = new EditPersonalView();
            EditPerView.render(id);

        });

        app_router.on('route:showEditArticulo', function(id){

            // Call render on the module we loaded in via the dependency array
            var EditArtView = new EditArticuloView();
            EditArtView.render(id);

        });

        app_router.on('route:showEditProyecto', function(id){

            // Call render on the module we loaded in via the dependency array
            var EditProView = new EditProyectoView();
            EditProView.render(id);

        });

        app_router.on('route:showEditNoticia', function(id){

            // Call render on the module we loaded in via the dependency array
            var EditNotView = new EditNoticiaView();
            EditNotView.render(id);

        });

        app_router.on('route:defaultAction', function(){
       
            // Call render on the module we loaded in via the dependency array
            var homeView = new HomeView();
            homeView.render();

        });

        Backbone.history.start();
    };
    
    return { 
        initialize: initialize
    };
});
