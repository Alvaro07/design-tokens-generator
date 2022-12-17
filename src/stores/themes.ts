import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'

interface State {
  activeTheme: string
  tabIndex: number
  themes: {
    title: string
    name: string
    properties: any
  }[]
}

export const useThemeStore = defineStore('Themes', {
  state: (): State => ({
    activeTheme: '',
    themes: [],
    tabIndex: 0,
  }),

  actions: {
    addTheme({ title }: { title: any }) {
      const newTabName = `${++this.tabIndex}`
      const isFirst = !this.themes.length

      let newProperties: any = {}

      if (!isFirst) {
        for (const prop in this.themes[0].properties) {
          const uid = uuidv4()

          newProperties[uid] = {
            name: this.themes[0].properties[prop].name,
            value: '',
          }
        }
      }

      this.themes.push({
        title,
        name: newTabName,
        properties: !isFirst ? newProperties : {},
      })
      this.activeTheme = newTabName
    },

    removeTheme({ name }: { name: string }) {
      const tabs = this.themes
      let activeName = this.activeTheme
      if (activeName === name) {
        tabs.forEach((tab, index) => {
          if (tab.name === name) {
            const nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activeName = nextTab.name
            }
          }
        })
      }

      this.activeTheme = activeName
      this.themes = tabs.filter((tab) => tab.name !== name)
    },

    addProperty() {
      const uid = uuidv4()
      this.themes = this.themes.map((e) => ({
        ...e,
        properties: { ...e.properties, [uid]: { name: '', value: '' } },
      }))
    },
  },
})
