/* eslint-disable react/no-unknown-property */
import emailjs from "@emailjs/browser";
import { Canvas } from "@react-three/fiber";
import { Suspense, useRef, useState } from "react";

import Fox  from "../models/Fox";
import useAlert from "../hook/useAlert";
import   Loader  from "../components/Loader";

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  })
  const { alert, showAlert, hideAlert } = useAlert();
  const [currentAnimation, setCurrentAnimation] = useState("idle");
  const formRef = useRef(null)
  const [isLoading , setIsLoading] = useState(false)
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }
  const handleFocus = () => setCurrentAnimation("walk");
  const handleBlur = () => setCurrentAnimation("idle");
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setCurrentAnimation("hit");
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
    ).
then(() => {
      setIsLoading(false);
      
      showAlert({
        show: true,
        text: "Thank you for your message 😃",
        type: "success",
      });
      setTimeout(() => {
       
        setCurrentAnimation("idle");
        setForm({
          name: "",
          email: "",
          message: "",
        });
      }, [3000]);
      //add alert
    })
    .catch((err) => {
      setIsLoading(false);
      console.log(err);
      setCurrentAnimation("idle");
      //add alert
    })
  }
  return (
    <section className="relativer flex lg:flex-row flex-col  max-container">
       {alert.show && <Alert {...alert} />}

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
          ref={formRef}
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
        <div className='lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px]'>
        <Canvas
          camera={{
            position: [0, 0, 5],
            fov: 75,
            near: 0.1,
            far: 1000,
          }}
        >
          <directionalLight position={[0, 0, 1]} intensity={2.5} />
          <ambientLight intensity={1} />
          <pointLight position={[5, 10, 0]} intensity={2} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            intensity={2}
          />

          <Suspense fallback={<Loader />}>
            <Fox
              currentAnimation={currentAnimation}
              position={[0.5, 0.35, 0]}
              rotation={[12.629, -0.6, 0]}
              scale={[0.5, 0.5, 0.5]}
            />
          </Suspense>
        </Canvas>
      </div>
      </div>

    </section>
  )
}

export default Contact