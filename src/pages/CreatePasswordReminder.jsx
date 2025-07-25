import PasswordReminders from "../components/PasswordReminders"


const CreatePasswordReminder = ({ accountId }) => {
  

  
  return (
    <div className="container mx-auto px-4 border-solid">
    <PasswordReminders accountId={accountId}/>
    </div>
  )
}

export default CreatePasswordReminder