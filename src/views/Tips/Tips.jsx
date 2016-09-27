import React from 'react'

import Carousel from '../../components/Carousel/Carousel.jsx'

const Tips = () => (
  <Carousel thereshold={window.innerWidth}>
    <Tip1 />
    <img src='http://placekitten.com/g/300/300' />
    <img src='http://placekitten.com/g/300/300' />
    <img src='http://placekitten.com/g/200/200' />
  </Carousel>
)

const Tip1 = () => (
  <div>
    <img src='http://placehold.it/100x100' />
    <p>Cut out caffeine, alcohol, and any other mood enhancers or depressants to get an accurate reading</p>
  </div>
)

export default Tips
