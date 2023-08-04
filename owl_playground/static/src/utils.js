/** @odoo-module */

import { onMounted, useRef } from "@odoo/owl";

export function useAutofocus(el){

    const ele = useRef(el);
    onMounted(() => ele.el.focus()); 
}
