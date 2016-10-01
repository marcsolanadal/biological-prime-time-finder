import React from 'react'

import Carousel from '../../components/Carousel/Carousel.jsx'
import Button from '../../components/Button/Button.jsx'

const Tips = () => (
  <Carousel thereshold={window.innerWidth}>

    <Tip icon='http://placehold.it/100x100' color='red'>
      <p><strong>Cut out</strong> <i>caffeine, alcohol</i>, and any other <i>mood enhancers</i> or depressants to get an accurate reading</p>
    </Tip>

    <Tip icon='http://placehold.it/100x100' color='orange'>
      <p>Collect at least <strong>three weeks</strong> of <i>data</i></p>
    </Tip>

    <Tip icon='http://placehold.it/100x100' color='yellow'>
      <p>Record you energy levels <strong>every hour</strong> when you receive the <i>notification</i></p>
    </Tip>

    <Tip icon='http://placehold.it/100x100' color='green'>
      <p><i>Wake up</i> and <i>fall asleep</i> <strong>naturally</strong>, without setting an alarm</p>
    </Tip>

    <Tip icon='http://placehold.it/100x100' color='lightblue'>
      <p>Notification interval</p>
      <div className='buttonContainer'>
        <Button type='settings' text='30m' />
        <Button type='settings' text='1H' />
        <Button type='settings' text='2H' />
      </div>
      <Button type='apply' to='hello' text='APPLY' />
    </Tip>

  </Carousel>
)

const Tip = (props) => (
  <div className='tip'>
    <img src={props.icon} />
    <div className='text'>{props.children}</div>
  </div>
)

const { string, object } = React.PropTypes
Tip.propTypes = {
  icon: string,
  children: object
}

export default Tips
