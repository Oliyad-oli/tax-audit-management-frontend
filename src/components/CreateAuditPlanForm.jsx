import { useState } from "react"

function CreateAuditPlanForm() {

  const [form, setForm] = useState({
    planName: "",
    auditType: "",
    startDate: "",
    endDate: ""
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(form)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      <input
        type="text"
        name="planName"
        placeholder="Plan Name"
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <select
        name="auditType"
        onChange={handleChange}
        className="w-full border p-2 rounded"
      >
        <option>Audit Type</option>
        <option>Desk Audit</option>
        <option>Issue Audit</option>
        <option>Comprehensive Audit</option>
      </select>

      <input
      
        type="date"
        name="startDate"
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <input
        type="date"
        name="endDate"
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Save Plan
      </button>

    </form>
  )
}

export default CreateAuditPlanForm