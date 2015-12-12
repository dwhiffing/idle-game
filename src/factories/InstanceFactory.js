import store from 'utils/reduxStore'
import Constants from 'utils/Constants'

export default (property, state) => {
  const id = Object.keys(state).length
  const nth = Object.values(state).filter(obj => obj.type == property.id).length + 1
  return {
    id: id,
    type: property.id,
    name: property.name,
    color: property.color,
    currencyName: property.currencyName,
    researchName: property.researchName,
    autoComplete: 0,
    complete: false,
    progress: 0,
    goal: 10 * nth,
    money: property.research("startMoney"),
    buildings() {
      const start = this.id*10
      const buildings = store.getState().buildings
      return Object.values(buildings).slice(start, start + 9)
    },
    property() {
      return store.getState().properties[this.type]
    },
    income() {
      const passiveIncome = this.property().research("passiveIncome")
      const buildingIncome = this.buildings().reduce((a, b) => a + b.income(), 0)
      return buildingIncome + passiveIncome
    },
    autoCompleteDuration() {
      return this.property().research("autoComplete")
    }
  }
}
