/** @odoo-module **/

import { Component, useSubEnv } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { getDefaultConfig } from "@web/views/view" ;
import { useService } from "@web/core/utils/hooks";
import { Domain } from "@web/core/domain";

import { Layout } from "@web/search/layout";

class AwesomeDashboard extends Component {

    setup(){
        useSubEnv({
            config: {
                ...getDefaultConfig(),
                ...this.env.config,
            }
        });

        this.display = {controlPanel: { "top-right": false, "bottom-right": false } };
        this.action = useService("action");
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

AwesomeDashboard.components = { Layout };
AwesomeDashboard.template = "awesome_tshirt.clientaction";

registry.category("actions").add("awesome_tshirt.dashboard", AwesomeDashboard);
   