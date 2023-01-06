import pages from './pages.json?url'
import {authUser, authUserProfile, logout} from "../authing.js";

const me = await authUser()

function switchFullscreen(props) {
  const {store} = props
  const isFullscreen = !!store.data.isFullscreen
  store.updateData({"isFullscreen": !isFullscreen});
  isFullscreen ? document.exitFullscreen() : document.documentElement.requestFullscreen()
}

//https://cdn.jsdelivr.net/gh/aisuda/amis-editor-demo@gh-pages/schema.json
export default {
  "type": "app",
  "brandName": "应用名称",
  logo: '/vite.svg',
  api: pages,
  header: {
    "type": "flex",
    "justify": 'space-between',
    className: 'w-full',
    "items": [
      {
        className: 'flex-auto',
        "type": "tpl",
      },
      {
        type: 'flex',
        items: [
          {
            "type": "tooltip-wrapper",
            "content": "${ isFullscreen ? '退出全屏' : '进入全屏' }",
            placement: 'bottom',
            "tooltipTheme": "dark",
            "offset": [-(innerWidth / 192), 0],
            "body": [
              {
                "type": "button",
                "icon": "fa-solid fa-expand",
                onClick: (e, props) => {
                  switchFullscreen(props);
                },
                "visibleOn": "${ !isFullscreen }"
              },
              {
                "type": "button",
                "icon": "fa-solid fa-compress",
                onClick: (e, props) => {
                  switchFullscreen(props);
                },
                "visibleOn": "${ isFullscreen }"
              },
            ]
          },
          {
            "type": "dropdown-button",
            "trigger": "hover",
            "label": me?.nickname,
            "icon": me?.photo || me?.picture,
            "align": "right",
            "buttons": [
              {
                "type": "button",
                "label": "个人信息",
                "actionType": "dialog",
                "dialog": {
                  "size": "full",
                  "title": "个人信息",
                  "actions": [],
                  "body": {
                    "type": "iframe",
                    "src": authUserProfile(),
                    "height": "calc(100% - 6px)"
                  }
                }
              },
              {
                "type": "button",
                "label": "退出登录",
                "actionType": "dialog",
                "dialog": {
                  "size": "sm",
                  "title": "",
                  "body": "确定退出登录？",
                  "onEvent": {
                    confirm: {
                      actions: [
                        {
                          "actionType": "custom",
                          "script"(){
                            logout()
                          }
                        }
                      ]
                    }
                  }
                },
              }
            ]
          }
        ]
      },
    ]
  },
}