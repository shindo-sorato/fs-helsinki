import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Add from './components/Add'
import phoneService from './services/phone'
import Notification from './components/Notification'
import Person from './components/Person'
import DeleteButton from './components/DeleteButton'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [newMsg, setNewMsg] = useState(null)
  const [msgColor, setMsgColor] = useState('')

  useEffect(
    () => {
      console.log('effect')
      phoneService.getAll()
        .then(returnedPersons => {
          console.log('returned getAll: ', returnedPersons);
          setPersons(returnedPersons)
        }).catch(
          err => {
            console.log('fail', err)
          }
        )
    }, [])

  console.log('render ' + persons.length + ' numbers')

  const handleNameChange = (event) => {
    console.log("changing name....")
    console.log(event.target.value)
    setNewName(event.target.value)

  }

  const handleFilterChange = (event) => {
    console.log("searching with keyword: ", event.target.value)
    setNewFilter(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log("changing number....")
    console.log(event.target.value)
    setNewNumber(event.target.value)

  }

  const addPhoneBook = (event) => {
    event.preventDefault()
    console.log('Button clicked', event.target)

    const phoneBookObject = {
      name: newName,
      number: newNumber
    }

    const alreadyThere = persons.findIndex((e) => e.name === phoneBookObject.name)

    if (alreadyThere !== -1) {
      const msg = `${phoneBookObject.name} is already added to phonebook, replace the old number with a new one?`
      const conf = window.confirm(msg)

      if (conf === true) {
        console.log(`Updating ${phoneBookObject.name}'s number....`);

        const entry = persons.find(n => n.name === phoneBookObject.name)

        const obj = {
          ...entry,
          number: newNumber
        }

        phoneService
          .updateNumber(obj.id, obj)
          .then(
            returnedPhoneNumber => {
              console.log('returned phone number: ', returnedPhoneNumber)
              setPersons(
                persons.map(
                  person => {
                    return (person.id !== returnedPhoneNumber.id) ? person : returnedPhoneNumber
                  }))
            }).catch(
              err => console.log('fail ', err)
            )

        return 1
      } else {
        return 0
      }

    }

    phoneService.create(phoneBookObject)
      .then(returnedPerson => {
        console.log("return created person: ", returnedPerson)
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')

        setNewMsg(`Added ${returnedPerson.name}`)
        setMsgColor('green')

        setTimeout(
          () => {
            setNewMsg(null)
            setMsgColor('')
          }, 5000
        )


      }).catch(err => {
        console.log('fail', err);
      }

      )

  }

  const deleteEntry = (event, id, name) => {
    event.preventDefault()
    const msg = `Delete ${name}?`
    const conf = window.confirm(msg)
    console.log('confirm? ', conf)

    if (conf === true) {
      console.log("proceeding deletion of " + id + "....");
      phoneService.deletePerson(id)
        .then((i) => {
          console.log("Success ", i)
          setNewMsg(`Successfully delete ${i.name}'s information`)
          setMsgColor('red')
          setPersons(
            persons.filter(
              ps => {
                return (ps.id !== id)
              }
            )
          )

          setTimeout(
            () => {
              setNewMsg(null)
              setMsgColor('')
            }, 5000
          )
        })
        .catch(
          err => {
            // console.log("fail ", err)
            setNewMsg(`Information of ${name} has already been removed from server`)
            setMsgColor('red')
            setPersons(
              persons.filter(
                ps => {
                  return (ps.id !== id)
                }
              )
            )
            setTimeout(
              () => {
                setNewMsg(null)
                setMsgColor('')
              }, 5000
            )
          }
        )
    }

  }

  const filterNotEmpty = newFilter !== ''

  const personsToShow = filterNotEmpty ? persons.filter(ps =>
    ps.name.toLowerCase().includes(newFilter.toLowerCase()) === true) : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification msg={newMsg} category={msgColor} />

      <Filter text='filter shown with' value={newFilter} onChange={handleFilterChange} />

      <h2>add a new</h2>

      <Add text1='name: ' value1={newName} func1={handleNameChange} text2='number: ' value2={newNumber} func2={handleNumberChange} submitfunc={addPhoneBook} />

      <h2>Numbers</h2>
      {/* <Numbers persons={personsToShow} /> */}
      {
        persons.map(ps => {
          return (
            <div key={ps.id}>
              <Person id={ps.id} name={ps.name} number={ps.number} />
              <DeleteButton function={() => {
                deleteEntry(event, ps.id, ps.name)
              }} />
            </div>
          )
        })
      }

    </div>
  )
}

export default App