import React from "react"
import _ from "lodash"
import { format as f, titleify } from "utils/helpers"
import { ProgressBar } from 'react-bootstrap'
import BuildingLineItem from 'views/components/BuildingLineItem'

export default React.createClass({
  render() {
    const instance = this.props.instances[this.props.params.instance]

    if (!instance) {
      return false
    }

    const { doBuildingPurchase, doUpgradePurchase, unlockBuilding} = this.props
    const { id, type, money, currencyName, goal } = instance
    const {upgrades, multi} = this.props.ui

    const name = titleify(instance.name)
    const progress = Math.floor(Math.min(100, instance.progress))
    const { researchMoney, researchName } = instance.property()
    const income = instance.income()
    const link = (
      <a href={`#/research/${instance.type}`}>{name} Improvements</a>
    )

    return (
      <div>
        <div className="text-center">
          <h2>
            {name}
          </h2>

          {instance.progress >= 100 &&
            <div onClick={() => {this.props.markInstanceComplete(id)}}>
              <ProgressBar
                className="pointer"
                now={100 - instance.autoCompleteProgress()}
                label="%(percent)s%">
              </ProgressBar>
              <h6>Click bar to complete level or wait for auto-complete</h6>
            </div>
          }

          {instance.progress < 100 &&
            <ProgressBar now={progress} label="%(percent)s%" />
          }

          <h5 style={{textAlign:'center'}}>
            Goal: {goal.description}
          </h5>
        </div>

        <p>
          Contains {f(money, "0,0")} {currencyName} producing {income} {currencyName}/sec
        </p>

        <p>
          {researchMoney} {researchName} available for {link}.
        </p>

        <table className="table">

          <thead><tr>
            <th>Building</th>
            <th>#</th>
            <th>Cost</th>
            <th>Income</th>
            <th>/ Tick</th>
          </tr></thead>

          <tbody>
            {instance.buildings().map((building, index) => {
              return (
                <BuildingLineItem key={index}
                  building={building}
                  instance={instance}
                  index={index}
                  type={type}
                  multi={multi}
                  upgrades={upgrades}
                  doUpgradePurchase={doUpgradePurchase}
                  doBuildingPurchase={doBuildingPurchase}
                  unlockBuilding={unlockBuilding}>
                </BuildingLineItem>
              )
            })}
          </tbody>

        </table>
      </div>
    )
  }
})
