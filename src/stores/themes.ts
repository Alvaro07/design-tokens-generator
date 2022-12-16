import { defineStore } from 'pinia'

interface State {
  activeTheme: string
  themes: { title: string; name: string }[]
  tabIndex: number
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
      this.themes.push({ title, name: newTabName })
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
  },
})
