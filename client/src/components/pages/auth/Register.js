import { useState } from "react";
import {useNavigate} from 'react-router-dom'
//import toastify
import { toast } from "react-toastify";
//function
import { registerHandler } from "../../functions/auth";

const Register = () => {
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    password2: "",
  });

  const [isloading, setIsLoading] = useState(false);

  const { name, password, password2 } = formData;

  const onchange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    setIsLoading(true)
    e.preventDefault();
    if (password !== password2) {
      toast.error('password not match')
      setIsLoading(false)
    } else {
      //
      const newUser = {
        name,
        password,
      };
      registerHandler(newUser)
        .then((res) => {
          setIsLoading(false)
          toast.success('🦄 Register Complete!', {
            position: "top-right",
            autoClose: 2000,
            closeOnClick: true,
            theme: "light",
            });
          navigate('/')
        })
        .catch((err) => {
          toast.error(err?.response?.data?.msg);
          setIsLoading(false)
        });
    }
  };
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {!isloading ? <h1>Register</h1> : <h1>Loading...</h1>}
          <form onSubmit={onSubmit}>
            <input
              type="text"
              name="name"
              autoFocus
              placeholder="username"
              className="form-control"
              onChange={(e) => onchange(e)}
            />
            <input
              type="password"
              name="password"
              autoFocus
              placeholder="password"
              className="form-control"
              onChange={(e) => onchange(e)}
            />
            <input
              type="password"
              name="password2"
              autoFocus
              placeholder="confirm password"
              className="form-control"
              onChange={(e) => onchange(e)}
            />
            <button type="submit" className="btn btn-success" disabled={password.length<6}>
              save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
