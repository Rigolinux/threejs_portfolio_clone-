
import { useState, useRef } from 'react';
import emailjs from "@emailjs/browser";
const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  })
  const formRef = useRef(null)
  const [isLoading , setIsLoading] = useState(false)
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }
  const handleFocus = () => {
   
  }
  const handleBlur = () => {}
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    emailjs.send(
      import.meta.env.VITE_APP_EMAILJS_SERV,
      import.meta.env.VITE_APP_EMAILJS_TEMPLATE,
      {
        from_name: form.name,
        to_name: "Rahul",
        from_email: form.email,
        to_email: 'bussniescontactportillo@gmail.com',
        message: form.message
      },
      import.meta.env.VITE_APP_EMAILJS_PUBLICKEY
    ).then(() => {
      setIsLoading(false);
      setForm({
        name: '',
        email: '',
        message: ''
      })
      //add alert
    })
    .catch((err) => {
      setIsLoading(false);
      console.log(err);
      //add alert
    })
  }
  return (
    <section className="relativer flex lg:flex-row flex-col  max-container">
      <div
        className="flex-1 min-w-[50%] flex flex-col"
      >
        <h1
          className="head-text"
        > 
          Get in Touch
        </h1>
        <form
          className="w-full flex flex-col gap-7 mt-14"
          onSubmit={handleSubmit}
        >
         <label className="text-black-500 font-semibold">Name</label>
           <input
              type='text'
              name='name'
              className='input'
              placeholder='John'
              required
              value={form.name}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
           <label className="text-black-500 font-semibold">Email</label>
          <input
            className="input"
            name='email'
            type="email"
            placeholder="email"
            required
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={form.email}
          />
           <label className="text-black-500 font-semibold">Your Message</label>
          <textarea
            className="textarea"
            rows={4}
            placeholder="Let me know what you think"
            name='message'
            required
            value={form.message}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <button
            className="btn"
            type="submit"
            disabled={isLoading}
            onFocus={handleFocus}
            onBlur={handleBlur}
          >

            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </form>
      </div>

    </section>
  )
}

export default Contact