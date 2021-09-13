import React, { useEffect, useState } from 'react'
import Form from './Form'
import News from './News'
import Buttons from './Buttons'
import $ from 'jquery'

const App = () => {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    $(function () {
      $('.loader').delay(2000).fadeOut('slow')
      $('#overlayer').delay(2000).fadeOut('slow')
      setLoading(false)
    })
  }, [])

  return (
    <>
      <div id='overlayer'>
        <span className='loader'>
          <span className='loader-inner'></span>
        </span>
      </div>
      {!loading && (
        <>
          <Form />
          <Buttons />
          <News />
        </>
      )}
    </>
  )
}

export default App
