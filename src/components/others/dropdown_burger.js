import React from 'react'
import { Dropdown } from 'semantic-ui-react'


const friendOptions = [
  {
    key: 'Jenny Hess',
    text: 'Jenny Hess',
    value: 'Jenny Hess',
    image: { avatar: true, src: '/assets/images/avatar/small/jenny.jpg' },
  },
  {
    key: 'Elliot Fu',
    text: 'Elliot Fu',
    value: 'Elliot Fu',
    image: { avatar: true, src: '/assets/images/avatar/small/elliot.jpg' },
  },
  {
    key: 'Stevie Feliciano',
    text: 'Stevie Feliciano',
    value: 'Stevie Feliciano',
    image: { avatar: true, src: '/assets/images/avatar/small/stevie.jpg' },
  },
  {
    key: 'Christian',
    text: 'Christian',
    value: 'Christian',
    image: { avatar: true, src: '/assets/images/avatar/small/christian.jpg' },
  },
  {
    key: 'Matt',
    text: 'Matt',
    value: 'Matt',
    image: { avatar: true, src: '/assets/images/avatar/small/matt.jpg' },
  },
  {
    key: 'Justen Kitsune',
    text: 'Justen Kitsune',
    value: 'Justen Kitsune',
    image: { avatar: true, src: '/assets/images/avatar/small/justen.jpg' },
  },
]



import { friendOptions } from '../common'
const style = {background: 'red', color: 'white'}
const DropdownExampleImage = () => (
  <Dropdown style={style} icon='ellipsis vertical' color='red' floating  button className='icon' color='red'>
    <Dropdown.Menu>
      <Dropdown.Header content='People You Might Know' />
      {friendOptions.map(option => <Dropdown.Item key={option.value} {...option} />)}
    </Dropdown.Menu>
  </Dropdown>
)

export default DropdownExampleImage
