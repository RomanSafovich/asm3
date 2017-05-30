/*jslint browser: true, forin: true, eqeq: true, white: true, sloppy: true, vars: true, nomen: true */
/*global $, jQuery, _, asm, common, config, controller, dlgfx, format, header, html, validate */

$(function() {

    var animal_bulk = {

        render: function() {
            var choosetypes = [];
            $.each(controller.movementtypes, function(i, v) {
                if (v.ID == 8 && !config.bool("DisableRetailer")) {
                    choosetypes.push(v);
                }
                else if (v.ID != 0 && v.ID !=8 && v.ID != 9 && v.ID != 10 && v.ID != 11 && v.ID != 12) {
                    choosetypes.push(v);
                }
            });
            return [
                html.content_header(_("Bulk change animals")),
                '<table class="asm-table-layout" style="padding-bottom: 5px;">',
                '<tr>',
                '<td>',
                '<label for="animals">' + _("Animals") + '</label>',
                '</td>',
                '<td>',
                '<input id="animals" data="animals" type="hidden" class="asm-animalchoosermulti" value=\'\' />',
                '</td>',
                '</tr>',

                '<tr id="litteridrow">',
                '<td>',
                '<label for="litterid">' + _("Litter") + '</label></td>',
                '<td><input type="text" id="litterid" data-post="litterid" class="asm-textbox" title="' + html.title(_("The litter this animal belongs to")) + '" />',
                '</td>',
                '</tr>',
                '<tr>',
                '<td><label for="animaltype">' + _("Type") + '</label></td>',
                '<td><select id="animaltype" data-post="animaltype" class="asm-selectbox" title="' + html.title(_("The shelter category for this animal")) + '">',
                '<option value="-1">' + _("(no change)") + '</option>',
                html.list_to_options(controller.animaltypes, "ID", "ANIMALTYPE"),
                '</select></td>',
                '</tr>',
                '<tr id="locationrow">',
                '<td><label for="location">' + _("Location") + '</label></td>',
                '<td>',
                '<select id="location" data-post="location" class="asm-selectbox" title="' + html.title(_("Where this animal is located within the shelter")) + '">',
                '<option value="-1">' + _("(no change)") + '</option>',
                html.list_to_options(controller.internallocations, "ID", "LOCATIONNAME"),
                '</select></td>',
                '</tr>',

                '<tr id="feerow">',
                '<td><label for="fee">' + _("Adoption Fee") + '</label></td>',
                '<td><input id="fee" data-post="fee" class="asm-currencybox asm-textbox" /></td>',
                '</tr>',

                '<tr id="boardingcostrow">',
                '<td><label for="boardingcost">' + _("Daily Boarding Cost") + '</label></td>',
                '<td><input id="boardingcost" data-post="boardingcost" class="asm-currencybox asm-textbox" /></td>',
                '</tr>',

                '<tr>',
                '<td><label for="notforadoption">' + _("Not For Adoption") + '</label></td>',
                '<td><select id="notforadoption" data-post="notforadoption" class="asm-selectbox">',
                '<option value="-1">' + _("(no change)") + '</option>',
                '<option value="0">' + _("Adoptable") + '</option>',
                '<option value="1">' + _("Not For Adoption") + '</option>',
                '</select>',
                '</td>',
                '</tr>',

                '<tr>',
                '<td>',
                '<label for="goodwithcats">' + _("Good with cats") + '</label>',
                '</td>',
                '<td>',
                '<select class="asm-selectbox" id="goodwithcats" data-post="goodwithcats">',
                '<option value="-1">' + _("(no change)") + '</option>',
                html.list_to_options(controller.ynun, "ID", "NAME"),
                '</select>',
                '</td>',
                '</tr>',
                '<tr>',
                '<td>',
                '<label for="goodwithdogs">' + _("Good with dogs") + '</label>',
                '</td>',
                '<td>',
                '<select class="asm-selectbox" id="goodwithdogs" data-post="goodwithdogs">',
                '<option value="-1">' + _("(no change)") + '</option>',
                html.list_to_options(controller.ynun, "ID", "NAME"),
                '</select>',
                '</td>',
                '</tr>',
                '<tr>',
                '<td>',
                '<label for="goodwithkids">' + _("Good with kids") + '</label>',
                '</td>',
                '<td>',
                '<select class="asm-selectbox" id="goodwithkids" data-post="goodwithkids">',
                '<option value="-1">' + _("(no change)") + '</option>',
                html.list_to_options(controller.ynun, "ID", "NAME"),
                '</select>',
                '</td>',
                '</tr>',
                '<tr>',
                '<td>',
                '<label for="housetrained">' + _("Housetrained") + '</label>',
                '</td>',
                '<td>',
                '<select class="asm-selectbox" id="housetrained" data-post="housetrained">',
                '<option value="-1">' + _("(no change)") + '</option>',
                html.list_to_options(controller.ynun, "ID", "NAME"),
                '</select>',
                '</td>',
                '</tr>',

                '<tr id="neuteredrow">',
                '<td>',
                '<label for="neutereddate">' + _("Altered") + '</label>',
                '</td>',
                '<td>',
                '<input id="neutereddate" data-post="neutereddate" class="asm-textbox asm-datebox" />',
                '</td>',
                '</tr>',

                '<tr id="holdrow">',
                '<td>',
                '<label for="holduntil">' + _("Hold until") + '</label>',
                '</td>',
                '<td>',
                '<input id="holduntil" data-post="holduntil" class="asm-textbox asm-datebox" />',
                '</td>',
                '</tr>',

                '<tr id="coordinatorrow">',
                '<td>',
                '<label for="coordinator">' + _("Adoption Coordinator") + '</label>',
                '</td>',
                '<td>',
                '<input id="coordinator" data-post="adoptioncoordinator" type="hidden" data-filter="coordinator" class="asm-personchooser" />',
                '</td>',
                '</tr>',

                '<tr id="currentvetrow">',
                '<td>',
                '<label for="currentvet">' + _("Current Vet") + '</label>',
                '</td>',
                '<td>',
                '<input id="currentvet" data-post="currentvet" type="hidden" data-filter="vet" class="asm-personchooser" />',
                '</td>',
                '</tr>',

                '<tr id="ownersvetrow">',
                '<td>',
                '<label for="ownersvet">' + _("Owners Vet") + '</label>',
                '</td>',
                '<td>',
                '<input id="ownersvet" data-post="ownersvet" type="hidden" data-filter="vet" class="asm-personchooser"  />',
                '</td>',
                '</tr>',

                '<tr id="animalflagsrow">',
                '<td><label for="addflag">' + _("Add Flag") + '</label></td>',
                '<td>',
                '<select id="addflag" data-post="addflag" class="asm-selectbox">',
                '<option value=""></option>',
                html.list_to_options(controller.flags, "FLAG", "FLAG"),
                '</select>',
                '</td>',
                '</tr>',

                '<tr id="moverow">',
                '<td><label for="movementtype">' + _("Add Movement") + '</label></td>',
                '<td>',
                '<select id="movementtype" data-post="movementtype" class="asm-halfselectbox">',
                '<option value="-1"></option>',
                html.list_to_options(choosetypes, "ID", "MOVEMENTTYPE"),
                '</select> ',
                _("on"),
                ' <input id="movementdate" data-post="movementdate" type="text" class="asm-datebox asm-halftextbox" />',
                '</td>',
                '</tr>',

                '<tr id="movetorow">',
                '<td>',
                '<label for="moveto">' + _("to") + '</label>',
                '</td>',
                '<td>',
                '<input id="moveto" data-post="moveto" type="hidden" data-filter="all" class="asm-personchooser" />',
                '</td>',
                '</tr>',


                '</table>',
                '<div class="centered">',
                '<button id="bulk">' + html.icon("animal") + ' ' + _("Update") + '</button>',
                '</div>',
                html.content_footer()
            ].join("\n");
        },

        bind: function() {

            // Litter autocomplete
            $("#litterid").autocomplete({source: html.decode(controller.autolitters)});

            $("#bulk").button().click(function() {
                if (!validate.notblank([ "animals" ])) { return; }
                $("#bulk").button("disable");
                header.show_loading(_("Updating..."));
                var formdata = $("input, select, textarea").toPOST();
                common.ajax_post("animal_bulk", formdata)
                    .then(function(data) {
                        header.hide_loading();
                        header.show_info(_("{0} animals successfully updated.").replace("{0}", data));
                    })
                    .always(function() {
                        $("#bulk").button("enable");
                    });
            });

            // Remove any retired lookups from the lists
            $(".asm-selectbox").select("removeRetiredOptions");

        },

        destroy: function() {
            common.widget_destroy("#animals");
            common.widget_destroy("#coordinator", "personchooser");
            common.widget_destroy("#currentvet", "personchooser");
            common.widget_destroy("#ownersvet", "personchooser");
            common.widget_destroy("#moveto", "personchooser");
        },

        name: "animal_bulk",
        animation: "newdata",
        autofocus: "#litterid", 
        title: function() { return _("Bulk change animals"); },

        routes: {
            "animal_bulk": function() {
                common.module_loadandstart("animal_bulk", "animal_bulk");
            }
        }


    };

    common.module_register(animal_bulk);

});
