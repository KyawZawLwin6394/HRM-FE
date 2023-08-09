import { Button } from '@nextui-org/react'

export default function About () {
  return (
    <div className='card px-3 py-3'>
      <h2>This is about page!</h2>
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
  )
}
