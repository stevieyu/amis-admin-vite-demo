import './main.css'
import config,{history} from "./config.js";
import authing from './authing.js'

authing();

let amis = amisRequire('amis/embed');
import amisJSON from './json/app'

//https://aisuda.github.io/amis-editor-demo
//demo: https://github.com/aisuda/amis-admin/blob/master/pages/site.json

let amisInstance = amis.embed(
    '#app',
    amisJSON,
    {
        location: history.location
    },
    config
);

history.listen(state => {
    amisInstance.updateProps({
        location: state.location || state
    });
});

