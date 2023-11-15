import { User } from './types'
import UserDisplay from './components/UserDisplay'

function App() {
  const users: User[] = [{
    name: "Sacha",
    messages: [{
      body: 'Prisma rocks!!'
    }, {
      body: 'Did I mention I love Prisma?'
    }]
  },
  {
    name: "Jules",
    messages: [{
      body: 'Yo le gang'
    }]
  }]

  return (
    <div className="flex-col h-screen w-full flex items-center justify-center p-4 gap-y-12 overflow-scroll">
      <h2 className="text-4xl text-yellow-500">Hello World!</h2>
      <div>
        <h3>My list of users</h3>
        {
          users.map(user=>{
            return UserDisplay(user)
          })
        }
      </div>
    </div>
  )
}

export default App