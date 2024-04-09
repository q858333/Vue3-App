import SvgIcon from '@/components/SvgIcon.vue';
import type { App, Component } from 'vue';

const allComponents: { [name: string]: Component } = { SvgIcon };

export default {
    install(app: App) {
        Object.keys(allComponents).forEach((key: string) => {
            app.component(key, allComponents[key]);
        })
    }
}