/** @odoo-module **/

import { Component, useSubEnv, onWillStart } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { getDefaultConfig } from "@web/views/view" ;
import { useService } from "@web/core/utils/hooks";
import { Domain } from "@web/core/domain";
import { Card } from "./card/card";

import { Layout } from "@web/search/layout";

class AwesomeDashboard extends Component {

    setup(){
        useSubEnv({
            config: {
                ...getDefaultConfig(),
                ...this.env.config,
            }
        });

        this.tshirtService = useService("tshirtService");
        this.cardStrings = {
            nb_new_orders : "Number of new orders this month",
            total_amount : "Total amount of new orders this month",
            average_quantity : "Average amount of t-shirt by order this month",
            nb_cancelled_orders : "Number of cancelled orders this month",
            average_time : "Average time for an order to go from ‘new’ to ‘sent’ or ‘cancelled’", 
        };

        this.display = {controlPanel: { "top-right": false, "bottom-right": false } };
        this.action = useService("action");
        onWillStart(async ()=>{
             this.statistics = await this.tshirtService.loadStatistics();
            // this.statevalue = newOrders : 2.5};
        });
    }
    
    openCustomersview(){
        this.action.doAction("base.action_partner_form")
    }

    openOrders(title, domain){
        this.action.doAction({
            type : "ir.actions.act_window",
            name : title,
            res_model : "awesome_tshirt.order",
            domain : new Domain(domain).toList(),
            views : [
                [false, "list"],
                [false, "form"],
            ]
        })
    }
    openLast7DaysOrders(){
        const domain = "[('create_date','>=', (context_today() - datetime.timedelta(days=7)).strftime('%Y-%m-%d'))]";
        this.openOrders("Last 7 Days Orders", domain);
    }

    openLast7CancelledOrders(){
        const domain = "[('create_date','>=', (context_today() - datetime.timedelta(days=7)).strftime('%Y-%m-%d')), ('state', '=', 'cancelled')]";
        this.openOrders("Last 7 Days Cancelled Orders", domain);
    }
}

AwesomeDashboard.components = { Layout,Card };
AwesomeDashboard.template = "awesome_tshirt.clientaction";

registry.category("actions").add("awesome_tshirt.dashboard", AwesomeDashboard);
   