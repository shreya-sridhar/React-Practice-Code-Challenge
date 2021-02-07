import React, { Fragment } from 'react'
import MoreButton from '../components/MoreButton'
import Sushi from '../components/Sushi.js'

const SushiContainer = (props) => {
  return (
    <Fragment>
      <div className="belt">
        {props.sushis.map(sushi =>
          <Sushi sushi = {sushi} budget = {props.budget} isSushiEaten = {props.isSushiEaten} eatSushi = {props.eatSushi} />).slice(props.startIndex,props.startIndex+4)}
        <MoreButton getMoreSushi = {props.getMoreSushi} />
      </div>
    </Fragment>
  )
}

export default SushiContainer


