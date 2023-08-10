import { Button } from '@nextui-org/react'
import Nav from '../../components/Navbar/index'

export default function About () {
  return (
    <div className='card px-3 py-3'>
      <Nav />
      <div className='mt-8 px-4'>
        <Button color='primary' variant='solid'>
          Solid
        </Button>
        <Button color='primary' variant='faded'>
          Faded
        </Button>
        <Button color='primary' variant='bordered'>
          Bordered
        </Button>
        <Button color='primary' variant='light'>
          Light
        </Button>
        <Button color='primary' variant='flat'>
          Flat
        </Button>
        <Button color='primary' variant='ghost'>
          Ghost
        </Button>
        <Button color='primary' variant='shadow'>
          Shadow
        </Button>
      </div>
    </div>
  )
}
